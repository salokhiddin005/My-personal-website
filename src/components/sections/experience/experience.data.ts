export interface Experience {
  company?: string;
  role: string;
  period?: string;
  location?: string;
  email?: string;
  achievements: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Burhan Vision",
    role: "AI/ML Engineer & Computer Vision Specialist",
    period: "2024 – 2025",
    location: "Tashkent, Uzbekistan",
    email: "salokhiddin@burhanvision.com",
    achievements: [
      "Designed and deployed real-time computer vision systems for object detection, tracking, and classification across industrial and healthcare environments",
      "Built a PPE compliance detection system using YOLOv8 to automate workplace safety monitoring and reduce manual inspection overhead",
      "Engineered a violence and fight detection pipeline for live security surveillance, enabling automated threat alerting in real time",
      "Developed a medical-grade IV drip drop counter using computer vision, reducing manual patient monitoring errors in clinical settings",
      "Delivered production-ready CV models with FastAPI REST endpoints, enabling seamless integration into client infrastructure",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "PyTorch", "FastAPI", "TensorFlow", "Docker"],
  },
  {
    company: "Freelance AI Projects",
    role: "AI/ML Developer",
    period: "2024 – Present",
    location: "Uzbekistan (Remote)",
    achievements: [
      "Built and deployed conversational AI chatbots using OpenAI and LangChain frameworks",
      "Built a free, on-device text-to-speech system supporting 12 voices across 7 languages, running CPU-only on laptops, Android, and deployed as a public web app via Flask and Gradio on Hugging Face Spaces",
      "Created text classification pipelines for automated content categorization",
      "Built content summarization tools leveraging large language model APIs",
      "Delivered AI-powered web applications with FastAPI backends and React frontends",
    ],
    tech: ["Python", "LangChain", "OpenAI API", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
  {
    company: "Personal & Academic Projects",
    role: "AI/ML Engineer & Developer",
    achievements: [
      "Explored machine learning fundamentals and applied them to real-world datasets",
      "Built web applications integrating AI APIs for automation and productivity",
      "Contributed to academic research in digital transformation and AI adoption",
    ],
    tech: ["Python", "scikit-learn", "TensorFlow", "JavaScript", "React", "Node.js", "SQL"],
  },
];
