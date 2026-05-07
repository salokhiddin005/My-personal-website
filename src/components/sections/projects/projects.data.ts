export interface ProjectMetric {
  value: string;
  label: string;
  context?: string;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string[];
  oneLiner: string;
  stats: string[];
  tech: string[];
  links: { label: string; url: string }[];
  image?: string;
  problem: string;
  solution: string;
  results: string;
  metrics?: ProjectMetric[];
  highlights?: ProjectHighlight[];
  architectureImage?: string;
  role?: string;
  team?: string;
  scale?: string;
}

export const projects: Project[] = [
  {
    id: "ai-chatbot",
    title: "AI Conversational Chatbot",
    category: ["LLM/NLP", "Full-Stack"],
    oneLiner:
      "Context-aware conversational AI assistant powered by LLMs — handles multi-turn dialogue, memory, and domain-specific Q&A",
    stats: ["Multi-turn dialogue", "Context memory", "REST API"],
    tech: ["Python", "OpenAI API", "LangChain", "FastAPI", "React", "PostgreSQL", "Docker"],
    links: [{ label: "Source Code", url: "https://github.com/salokhiddin005" }],
    problem:
      "Generic chatbots lose conversation context after each message, making them frustrating for complex, multi-step tasks. Users need an assistant that remembers prior exchanges and responds intelligently within a specific domain.",
    solution:
      "A full-stack conversational AI application using LangChain's memory modules to maintain multi-turn dialogue context. The backend exposes a FastAPI REST interface consumed by a React frontend, with conversation history persisted in PostgreSQL.",
    results:
      "Delivered a context-aware chatbot capable of sustaining coherent multi-turn conversations, supporting domain-specific knowledge injection, and responding in near real-time.",
    role: "Solo Developer",
    metrics: [
      { value: "Multi-Turn", label: "Dialogue Memory", context: "Persistent conversation context across sessions" },
      { value: "REST API", label: "Integration", context: "FastAPI backend for easy third-party integration" },
      { value: "Real-Time", label: "Response Speed", context: "Streaming LLM responses to the frontend" },
      { value: "Full-Stack", label: "Architecture", context: "React frontend + FastAPI backend + PostgreSQL" },
    ],
    highlights: [
      {
        title: "Persistent Conversation Memory",
        description:
          "LangChain ConversationBufferMemory stores full dialogue history per session — enabling the assistant to reference earlier messages and maintain coherent, multi-turn conversations.",
      },
      {
        title: "Domain Knowledge Injection",
        description:
          "System prompt engineering allows the chatbot to operate within a specific domain, rejecting off-topic queries while providing accurate, grounded responses for its target use case.",
      },
      {
        title: "Streaming Responses",
        description:
          "Server-sent events deliver LLM tokens to the React frontend as they are generated — eliminating the perceived wait time and giving users a responsive, real-time experience.",
      },
    ],
  },
  {
    id: "rag-qa",
    title: "RAG-Based Document Q&A System",
    category: ["LLM/NLP"],
    oneLiner:
      "Retrieval-Augmented Generation system for intelligent document question answering — upload files, ask questions, get source-grounded answers",
    stats: ["Vector search", "Source citations", "Multi-format docs"],
    tech: ["Python", "LangChain", "OpenAI API", "pgvector", "FastAPI", "React", "PostgreSQL"],
    links: [{ label: "Source Code", url: "https://github.com/salokhiddin005" }],
    problem:
      "LLMs hallucinate when asked questions about private documents they have never seen. Users need a system that grounds every answer in actual uploaded content — with citations — rather than generating plausible-sounding but incorrect responses.",
    solution:
      "A RAG pipeline that chunks and embeds uploaded documents into a pgvector store, then retrieves the most relevant passages at query time and passes them as context to the LLM. Every answer includes source references so users can verify the information.",
    results:
      "Accurate, source-grounded answers over private documents with zero hallucination on in-scope queries. Supports PDF, DOCX, and plain text uploads with sub-second retrieval.",
    role: "Solo Developer",
    metrics: [
      { value: "pgvector", label: "Vector Store", context: "Semantic similarity search over document embeddings" },
      { value: "Cited", label: "Answers", context: "Every response references its source passages" },
      { value: "Multi-Format", label: "Doc Support", context: "PDF, DOCX, and TXT ingestion pipeline" },
      { value: "<1s", label: "Retrieval Speed", context: "Sub-second vector similarity search" },
    ],
    highlights: [
      {
        title: "Chunking & Embedding Pipeline",
        description:
          "Documents are split into overlapping chunks, embedded with OpenAI's text-embedding model, and stored in pgvector — enabling fast semantic similarity search at query time.",
      },
      {
        title: "Source-Grounded Responses",
        description:
          "Retrieved passages are injected into the LLM prompt with explicit source metadata. The model is instructed to answer only from provided context, eliminating hallucination on in-scope queries.",
      },
      {
        title: "Multi-Format Ingestion",
        description:
          "LangChain document loaders handle PDF, DOCX, and plain text files — automatically extracting and normalizing text before chunking, making the system format-agnostic.",
      },
    ],
  },
  {
    id: "text-classification",
    title: "NLP Text Classification Pipeline",
    category: ["LLM/NLP"],
    oneLiner:
      "End-to-end text classification system — from raw text to labeled categories using fine-tuned transformers and traditional ML baselines",
    stats: ["Transformer fine-tuning", "Multi-class", "REST API"],
    tech: ["Python", "Hugging Face Transformers", "scikit-learn", "FastAPI", "Pandas", "NumPy"],
    links: [{ label: "Source Code", url: "https://github.com/salokhiddin005" }],
    problem:
      "Manually categorizing large volumes of text — support tickets, product reviews, news articles — is slow, inconsistent, and unscalable. Organizations need automated classification that matches human-level accuracy.",
    solution:
      "An end-to-end text classification pipeline comparing traditional ML baselines (TF-IDF + Logistic Regression) against fine-tuned transformer models. Exposes predictions via a FastAPI endpoint for easy integration into existing workflows.",
    results:
      "Fine-tuned transformer significantly outperformed baseline models on multi-class classification tasks, with the full pipeline deployable as a REST API endpoint.",
    role: "Solo Developer",
    metrics: [
      { value: "Transformer", label: "Best Model", context: "Fine-tuned BERT outperforms TF-IDF baselines" },
      { value: "Multi-Class", label: "Classification", context: "Supports arbitrary number of label categories" },
      { value: "REST API", label: "Deployment", context: "FastAPI endpoint for production integration" },
      { value: "Baseline vs Fine-Tune", label: "Comparison", context: "Systematic evaluation of ML approaches" },
    ],
    highlights: [
      {
        title: "Model Comparison Framework",
        description:
          "Systematic evaluation of TF-IDF + Logistic Regression, TF-IDF + SVM, and fine-tuned BERT — providing a clear benchmark of when to use lightweight ML vs. transformer models.",
      },
      {
        title: "Hugging Face Fine-Tuning",
        description:
          "BERT fine-tuned on the target classification dataset using the Trainer API — with learning rate scheduling, gradient accumulation, and early stopping for efficient training.",
      },
      {
        title: "Production-Ready API",
        description:
          "FastAPI endpoint accepts raw text, runs inference on the best model, and returns predicted label with confidence score — ready for integration into content pipelines.",
      },
    ],
  },
  {
    id: "summarizer",
    title: "AI Content Summarization Tool",
    category: ["LLM/NLP", "Full-Stack"],
    oneLiner:
      "Intelligent content summarization tool — paste any article, document, or URL and get a concise, structured summary in seconds",
    stats: ["URL & text input", "Adjustable length", "Multi-language"],
    tech: ["Python", "OpenAI API", "LangChain", "FastAPI", "React", "Tailwind CSS"],
    links: [{ label: "Source Code", url: "https://github.com/salokhiddin005" }],
    problem:
      "Reading through long articles, research papers, or reports takes hours. People need a fast way to extract the key ideas — without losing important nuance — so they can decide what to read in full.",
    solution:
      "A web app where users paste text or a URL and receive a structured summary with key points, main argument, and conclusion. Summary length and style (bullet points vs. prose) are adjustable via UI controls. LangChain prompt templates ensure consistent output structure.",
    results:
      "Reduces reading time by 80%+ for long-form content. Deployed as a web app with support for multi-language input and output.",
    role: "Solo Developer",
    metrics: [
      { value: "80%+", label: "Time Saved", context: "vs. reading full-length articles manually" },
      { value: "URL & Text", label: "Input Modes", context: "Paste text or scrape any web URL" },
      { value: "Adjustable", label: "Summary Length", context: "Short, medium, or detailed output" },
      { value: "Multi-Language", label: "Support", context: "Input and output in multiple languages" },
    ],
    highlights: [
      {
        title: "Structured Output via Prompt Engineering",
        description:
          "LangChain prompt templates enforce a consistent JSON-structured summary with key points, main argument, and conclusion — making output predictable and easy to display.",
      },
      {
        title: "URL Scraping Pipeline",
        description:
          "BeautifulSoup scrapes article text from any URL, strips ads and navigation, and passes clean content to the LLM — letting users summarize any web page without copy-pasting.",
      },
      {
        title: "Adjustable Summarization Style",
        description:
          "UI controls let users choose summary length (short / medium / detailed) and format (bullet points vs. prose) — dynamically updating the prompt to match user preference.",
      },
    ],
  },
  {
    id: "ai-web-app",
    title: "AI-Powered Web Application",
    category: ["LLM/NLP", "Full-Stack"],
    oneLiner:
      "Full-stack web application with embedded AI features — smart search, content generation, and automated workflows built on LLM APIs",
    stats: ["AI-enhanced UX", "Full-stack", "REST + WebSocket"],
    tech: ["React", "TypeScript", "FastAPI", "Python", "OpenAI API", "PostgreSQL", "Docker", "Tailwind CSS"],
    links: [{ label: "Source Code", url: "https://github.com/salokhiddin005" }],
    problem:
      "Most web applications treat AI as an afterthought — a chatbot bolted on the side. Building AI natively into the product experience requires a thoughtful architecture that handles async LLM calls, streaming, and graceful degradation.",
    solution:
      "A full-stack web application with AI deeply integrated — semantic search over content, LLM-powered content generation, and automated workflow triggers. FastAPI handles async LLM calls with streaming via WebSocket; React renders streamed output in real time.",
    results:
      "A production-quality web app demonstrating how to architect AI features cleanly — with async processing, real-time streaming, and fallback handling for API failures.",
    role: "Solo Developer",
    metrics: [
      { value: "Streaming", label: "AI Responses", context: "WebSocket delivery of LLM tokens in real time" },
      { value: "Semantic", label: "Search", context: "Vector-based content discovery beyond keyword matching" },
      { value: "Async", label: "Architecture", context: "Non-blocking LLM calls via FastAPI async endpoints" },
      { value: "Dockerized", label: "Deployment", context: "Containerized for consistent local and cloud deploys" },
    ],
    highlights: [
      {
        title: "Native AI Integration",
        description:
          "AI features are woven into the core UX — semantic search, smart content suggestions, and automated text generation — rather than isolated in a sidebar chatbot widget.",
      },
      {
        title: "Real-Time Streaming Architecture",
        description:
          "FastAPI async WebSocket endpoint streams LLM tokens directly to the React client, providing a responsive feel even for long-running generation tasks.",
      },
      {
        title: "Graceful AI Degradation",
        description:
          "Every AI feature has a non-AI fallback — if the LLM API is unavailable, the app continues to function with standard search and manual workflows, ensuring reliability.",
      },
    ],
  },
];

export const projectCategories = ["All", "LLM/NLP", "Full-Stack"];
