import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

import type { Plugin } from "vite";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);
const MEDIA_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ".mp4", ".mov", ".webm"]);
const VIRTUAL_MODULE_ID = "virtual:project-images";
const RESOLVED_ID = "\0" + VIRTUAL_MODULE_ID;
const PERSONAL_VIRTUAL_ID = "virtual:personal-media";
const PERSONAL_RESOLVED_ID = "\0" + PERSONAL_VIRTUAL_ID;

function projectImagesPlugin(): Plugin {
  const projectsDir = path.resolve(__dirname, "public/projects");
  let cache: Record<string, string[]> | null = null;

  function scanImages(): Record<string, string[]> {
    if (cache) return cache;

    const manifest: Record<string, string[]> = {};
    if (!fs.existsSync(projectsDir)) return manifest;

    for (const dir of fs.readdirSync(projectsDir, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const dirPath = path.join(projectsDir, dir.name);
      const images = fs
        .readdirSync(dirPath)
        .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .sort()
        .map((f) => `/projects/${dir.name}/${f}`);
      if (images.length > 0) {
        manifest[dir.name] = images;
      }
    }
    cache = manifest;
    return manifest;
  }

  return {
    name: "project-images",
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(scanImages())};`;
      }
    },
    configureServer(server) {
      server.watcher.add(projectsDir);
      server.watcher.on("all", (_event, filePath) => {
        if (filePath.startsWith(projectsDir)) {
          cache = null;
          const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: "full-reload" });
          }
        }
      });
    },
  };
}

function personalMediaPlugin(): Plugin {
  const personalDir = path.resolve(__dirname, "public/personal");
  let cache: Record<string, string[]> | null = null;

  function scanMedia(): Record<string, string[]> {
    if (cache) return cache;

    const manifest: Record<string, string[]> = {};
    if (!fs.existsSync(personalDir)) return manifest;

    for (const dir of fs.readdirSync(personalDir, { withFileTypes: true })) {
      if (!dir.isDirectory()) continue;
      const dirPath = path.join(personalDir, dir.name);
      const files = fs
        .readdirSync(dirPath)
        .filter((f) => MEDIA_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .sort()
        .map((f) => `/personal/${dir.name}/${f}`);
      if (files.length > 0) {
        manifest[dir.name] = files;
      }
    }
    cache = manifest;
    return manifest;
  }

  return {
    name: "personal-media",
    resolveId(id) {
      if (id === PERSONAL_VIRTUAL_ID) return PERSONAL_RESOLVED_ID;
    },
    load(id) {
      if (id === PERSONAL_RESOLVED_ID) {
        return `export default ${JSON.stringify(scanMedia())};`;
      }
    },
    configureServer(server) {
      server.watcher.add(personalDir);
      server.watcher.on("all", (_event, filePath) => {
        if (filePath.startsWith(personalDir)) {
          cache = null;
          const mod = server.moduleGraph.getModuleById(PERSONAL_RESOLVED_ID);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: "full-reload" });
          }
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), projectImagesPlugin(), personalMediaPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
