export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    company: "Freelance AI Projects",
    role: "AI/ML Developer",
    period: "2023 – Present",
    location: "Uzbekistan (Remote)",
    achievements: [
      "Built and deployed conversational AI chatbots using OpenAI and LangChain frameworks",
      "Developed RAG-based Q&A systems for intelligent document retrieval and question answering",
      "Created text classification pipelines for automated content categorization",
      "Built content summarization tools leveraging large language model APIs",
      "Delivered AI-powered web applications with FastAPI backends and React frontends",
    ],
    tech: ["Python", "LangChain", "OpenAI API", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
  {
    company: "Personal & Academic Projects",
    role: "AI/ML Engineer & Developer",
    period: "2022 – 2023",
    location: "Tashkent, Uzbekistan",
    achievements: [
      "Explored machine learning fundamentals and applied them to real-world datasets",
      "Built web applications integrating AI APIs for automation and productivity",
"Contributed to academic research in digital transformation and AI adoption",
    ],
    tech: ["Python", "scikit-learn", "TensorFlow", "JavaScript", "React", "Node.js", "SQL"],
  },
];
