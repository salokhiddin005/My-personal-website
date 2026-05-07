import manifest from "virtual:personal-media";

const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);

export function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.has(src.substring(src.lastIndexOf(".")).toLowerCase());
}

export function getGalleryMedia(folderName: string): string[] {
  return manifest[folderName] ?? [];
}

export function getGalleryThumbnail(folderName: string): string | undefined {
  return getGalleryMedia(folderName).find((src) => !isVideo(src));
}
