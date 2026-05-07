export interface GalleryEntry {
  id: string;
  folder: string;
  thumbnail?: string;
  alt: string;
  caption: string;
  category: string;
  span: "tall" | "wide" | "normal";
}

export const galleryEntries: GalleryEntry[] = [
  {
    id: "graduation",
    folder: "education",
    alt: "Graduation ceremony",
    caption: "Graduation Day",
    category: "Education",
    span: "tall",
  },
  {
    id: "event-1",
    folder: "events",
    thumbnail: "/personal/events/photo_1_2026-03-13_10-17-12.jpg",
    alt: "Tech event presentation",
    caption: "Tech Conference",
    category: "Events",
    span: "normal",
  },
  {
    id: "event-2",
    folder: "events",
    thumbnail: "/personal/events/photo_2_2026-03-13_10-17-12.jpg",
    alt: "Hackathon participation",
    caption: "Hackathon",
    category: "Events",
    span: "normal",
  },
  {
    id: "work",
    folder: "work",
    alt: "Professional life",
    caption: "Professional Life",
    category: "Work",
    span: "wide",
  },
];
