export interface BlogPost {
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  comingSoon: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Building a Scam Call Detector with n8n, Twilio, and OpenAI",
    category: "AI Automation",
    date: "Coming Soon",
    readTime: "9 min read",
    excerpt:
      "How I'm wiring together n8n, Twilio, and OpenAI to make and receive calls, transcribe conversations in real time, score scam risk, and fire alerts — a fully automated phone-call AI agent with no manual review.",
    comingSoon: true,
  },
  {
    title: "AI Roof Visualization: Detecting Roof Areas and Applying Realistic Materials from a Single Photo",
    category: "Computer Vision",
    date: "Coming Soon",
    readTime: "10 min read",
    excerpt:
      "A deep dive into building a web-based roof visualizer — segmenting roof regions from uploaded house photos, then applying roofing colors and materials while preserving real-world lighting, shadows, and perspective.",
    comingSoon: true,
  },
  {
    title: "Smart Package Room Monitor: Detecting People Carrying Packages with Video Analytics",
    category: "Edge AI",
    date: "Coming Soon",
    readTime: "11 min read",
    excerpt:
      "Designing a video analytics system for residential package rooms — detecting people carrying boxes, bags, and envelopes, tracking entry events, and pushing structured alerts to a backend in real time.",
    comingSoon: true,
  },
];
