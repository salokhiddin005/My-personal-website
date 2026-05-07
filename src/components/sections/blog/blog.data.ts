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
    title: "Building a RAG-Based Q&A System: From Document Upload to Grounded Answers",
    category: "LLM Engineering",
    date: "Coming Soon",
    readTime: "10 min read",
    excerpt:
      "A practical walkthrough of building a retrieval-augmented generation pipeline — chunking, embedding, vector search with pgvector, and source-cited LLM responses.",
    comingSoon: true,
  },
  {
    title: "Text Classification with Transformers vs. TF-IDF: A Practical Comparison",
    category: "NLP",
    date: "Coming Soon",
    readTime: "8 min read",
    excerpt:
      "When should you fine-tune BERT vs. use a simple TF-IDF + Logistic Regression baseline? A hands-on comparison with real benchmark results and deployment considerations.",
    comingSoon: true,
  },
  {
    title: "How I Built an AI Chatbot with Persistent Memory Using LangChain",
    category: "AI Development",
    date: "Coming Soon",
    readTime: "7 min read",
    excerpt:
      "Step-by-step guide to building a context-aware conversational AI — covering LangChain memory modules, FastAPI streaming, and integrating everything into a React frontend.",
    comingSoon: true,
  },
];
