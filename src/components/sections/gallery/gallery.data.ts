export interface GalleryEntryMeta {
  id: string;
  folder: string;
  thumbnail?: string;
  span: "tall" | "wide" | "normal";
}

export interface GalleryEntry extends GalleryEntryMeta {
  alt: string;
  caption: string;
  category: string;
}

export const galleryEntries: GalleryEntryMeta[] = [
  {
    id: "graduation",
    folder: "education",
    span: "tall",
  },
  {
    id: "event-1",
    folder: "events",
    thumbnail: "/personal/events/photo_1_2026-03-13_10-17-12.jpg",
    span: "normal",
  },
  {
    id: "event-2",
    folder: "events",
    thumbnail: "/personal/events/photo_2_2026-03-13_10-17-12.jpg",
    span: "normal",
  },
  {
    id: "work",
    folder: "work",
    span: "wide",
  },
];
