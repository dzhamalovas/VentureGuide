import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { KNOWLEDGE_BASE_ARTICLES } from "./src/data/knowledgeBase";
import { INITIAL_TICKETS, SUPPORT_PROGRAMS, FUND_ANALYTICS } from "./src/data/demoData";
import { Category, ComplexityLevel, ExpertTicket, ChatMessage } from "./src/types";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google Gen AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// In-memory data state
let tickets: ExpertTicket[] = [...INITIAL_TICKETS];
let knowledgeArticles = [...KNOWLEDGE_BASE_ARTICLES];

// Helper: Simple RAG search in knowledge base
function searchKnowledgeBase(query: string, founderContext?: any) {
  const qLower = query.toLowerCase();
  
  // Score articles based on keyword matching and relevance
  const scored = knowledgeArticles.map(article => {
    let score = 0;
    const textToMatch = `${article.title} ${article.summary} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
    
    // Check words
    const keywords = qLower.split(/\s+/).filter(w => w.length > 2);
    for (const kw of keywords) {
      if (textToMatch.includes(kw)) {
        score += 1;
      }
    }
    
    // Category boost
    if (qLower.includes('ип') || qLower.includes('ооо') || qLower.includes('регистр')) {
      if (article.category === 'registration') score += 3;
    }
    if (qLower.includes('налог') || qLower.includes('усн') || qLower.includes('нпд') || qLower.includes('патент')) {
      if (article.category === 'taxes') score += 3;
    }
    if (qLower.includes('грант') || qLower.includes('студенческ') || qLower.includes('фси') || qLower.includes('поддержк')) {
      if (article.category === 'support_programs') score += 3;
    }
    if (qLower.includes('инвест') || qLower.includes('дол') || qLower.includes('иностран') || qLower.includes('сша') || qLower.includes('оаэ')) {
      if (article.category === 'legal_basics' || article.category === 'finance') score += 3;
    }
    
    return { article, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter(s => s.score > 0).slice(0, 3).map(s => s.article);
}

// Category Russian Labels
const CATEGORY_LABELS: Record<Category, string> = {
  registration: 'Регистрация бизнеса',
  taxes: 'Налоги и налоговые режимы',
  documents: 'Документы и договоры',
  support_programs: 'Меры поддержки и гранты',
  finance: 'Финансы, счета и эквайринг',
  legal_basics: 'Юридические основы и инвесторы'
};

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", appName: "Цифровой навигатор предпринимателя" });
});

// GET Knowledge Base
app.get("/api/kb", (req, res) => {
  const { category, query } = req.query;
  let results = [...knowledgeArticles];

  if (category && category !== 'all') {
    results = results.filter(a => a.category === category);
  }

  if (query && typeof query === 'string') {
    const q = query.toLowerCase();
    results = results.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

// Serve PDF Presentation
app.get("/Digital_Entrepreneur_Navigator_Presentation.pdf", (_req, res) => {
  const pdfPath = path.join(process.cwd(), "Digital_Entrepreneur_Navigator_Presentation.pdf");
  res.sendFile(pdfPath);
});

app.get("/api/download-presentation", (_req, res) => {
  const pdfPath = path.join(process.cwd(), "Digital_Entrepreneur_Navigator_Presentation.pdf");
  res.download(pdfPath, "Digital_Entrepreneur_Navigator_Presentation.pdf");
});

// Serve PPTX Presentation
app.get("/Digital_Entrepreneur_Navigator_Presentation.pptx", (_req, res) => {
  const pptxPath = path.join(process.cwd(), "Digital_Entrepreneur_Navigator_Presentation.pptx");
  res.sendFile(pptxPath);
});

app.get("/api/download-presentation-pptx", (_req, res) => {
  const pptxPath = path.join(process.cwd(), "Digital_Entrepreneur_Navigator_Presentation.pptx");
  res.download(pptxPath, "Digital_Entrepreneur_Navigator_Presentation.pptx");
});

// GET Support Programs
app.get("/api/support-programs", (_req, res) => {
  res.json(SUPPORT_PROGRAMS);
});

// GET Fund Analytics
app.get("/api/stats", (_req, res) => {
  const total = 1240 + (tickets.length - INITIAL_TICKETS.length);
  const transferredCount = tickets.length;
  const transferredPercentage = Math.round((transferredCount / total) * 100) || 24;
  const closedByAiPercentage = 100 - transferredPercentage;

  res.json({
    ...FUND_ANALYTICS,
    totalQuestions: total,
    transferredToExpertsPercentage: transferredPercentage,
    closedByAiPercentage: closedByAiPercentage
  });
});

// GET Expert Tickets
app.get("/api/tickets", (_req, res) => {
  res.json(tickets);
});

// PATCH Expert Ticket (For Fund/Expert Panel response)
app.patch("/api/tickets/:id", (req, res) => {
  const { id } = req.params;
  const { status, expertResponse, expertName } = req.body;

  const ticketIndex = tickets.findIndex(t => t.id === id);
  if (ticketIndex === -1) {
    return res.status(404).json({ error: "Билет не найден" });
  }

  const updatedTicket = {
    ...tickets[ticketIndex],
    ...(status && { status }),
    ...(expertResponse && { expertResponse }),
    ...(expertName && { expertName }),
    ...(expertResponse && { expertRespondedAt: new Date().toISOString() })
  };

  tickets[ticketIndex] = updatedTicket;
  res.json(updatedTicket);
});

// Standalone Diagnostic / Classification API Endpoint
app.post("/api/classify", async (req, res) => {
  try {
    const { question, founderContext } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Вопрос обязателен" });
    }

    const matchedArticles = searchKnowledgeBase(question, founderContext);
    const kbContextText = matchedArticles.map(a => `[${a.title}]: ${a.summary}`).join('\n');

    const prompt = `Ты — ведущий эксперт и классификатор запросов в системе «Цифровой навигатор предпринимателя».
Проанализируй следующий вопрос начинающего предпринимателя-студента.

Контекст основателя:
${JSON.stringify(founderContext || { stage: "Идея", founderCount: "1 основатель" })}

Найденный контекст из базы знаний:
${kbContextText || "Общие нормы законодательства РФ"}

Вопрос:
"${question}"

Верни строгий JSON со следующими полями:
1. category: одно из ["registration", "taxes", "documents", "support_programs", "finance", "legal_basics"]
2. complexity_score: одно из ["low", "medium", "high"]
   - "low": стандартный типовой вопрос (как открыть ИП, какой УСН выбрать для 1 человека).
   - "medium": требуется выбор из нескольких вариантов с учетом условий (ИП или ООО при 2 фаундерах, переход с НПД на УСН).
   - "high": вопросы с участием иностранных инвесторов, сложных корпоративных договоров, суда, споров за интеллектуальную собственность, специальных валютных ограничений.
3. confidence_score: число от 0.50 до 0.99 (степень уверенности ИИ в правильности самостоятельного ответа).
4. recommended_action: одно из ["answer_user", "create_expert_ticket", "clarify_details"]. Если complexity_score = "high" или confidence_score < 0.80, рекомендовано "create_expert_ticket".
5. reasoning: краткое объяснение причисления к данной категории и уровню сложности (2-3 предложения на русском языке).
6. sources: массив строк с нормативными источниками (например, ["ФНС России", "ГК РФ ст. 23"]).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            complexity_score: { type: Type.STRING },
            confidence_score: { type: Type.NUMBER },
            recommended_action: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            sources: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["category", "complexity_score", "confidence_score", "recommended_action", "reasoning", "sources"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    parsed.categoryLabel = CATEGORY_LABELS[parsed.category as Category] || 'Общий юридический вопрос';

    res.json(parsed);
  } catch (error: any) {
    console.error("Error in /api/classify:", error);
    res.status(500).json({ error: error.message || "Ошибка классификации запроса" });
  }
});

// MAIN CHAT & RAG ENGINE ENDPOINT
app.post("/api/chat", async (req, res) => {
  try {
    const { question, founderContext, history } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Вопрос обязателен" });
    }

    // 1. Retrieve RAG context from Knowledge Base
    const matchedKbArticles = searchKnowledgeBase(question, founderContext);
    const kbText = matchedKbArticles.length > 0 
      ? matchedKbArticles.map(a => `--- КАТЕГОРИЯ: ${a.category} | ТЕМА: ${a.title} ---\nИСТОЧНИК: ${a.source}\nСОДЕРЖАНИЕ:\n${a.content}`).join("\n\n")
      : "Используй общую проверенную правовую базу РФ по малому бизнесу, ИП, ООО, Налоговому кодексу, 152-ФЗ и грантам ФСИ.";

    const systemPrompt = `Ты — «Цифровой навигатор предпринимателя», вежливый, профессиональный,структурированный ИИ-ассистент первого уровня поддержки для начинающих предпринимателей и студентов-основателей стартапов в РФ.

Твоя задача:
1. Проанализировать вопрос и отнести его к категории, уровню сложности и степени уверенности.
2. Подготовить понятный, четкий, высокоструктурированный ответ с практическим алгоритмом действий.
3. Отвечать структурированно с заголовками, маркерами и наглядными списками.
4. Выделить 3-5 конкретных следующих шагов (nextSteps).
5. Всегда соблюдать принцип: если ситуация очень сложная (например, инвестор из недружественной страны, судебные риски, продажа доли без корпоративного договора) — выставлять complexity_score = "high" и рекомендовать привлечение эксперта!

Важно:
Ответ носит информационный характер и не является официальной юридической или финансовой консультацией.

Контекст пользователя (основателя стартапа):
- Стадия: ${founderContext?.stage || "Идея"}
- Количество основателей: ${founderContext?.founderCount || "1 основатель"}
- Бизнес-модель: ${founderContext?.businessModel || "B2B SaaS"}
- Наличие сотрудников: ${founderContext?.hasEmployees ? "Да" : "Нет"}
- Иностранные инвесторы: ${founderContext?.hasForeignInvestors ? "Да" : "Нет"}

Релевантные материалы Базы Знаний:
${kbText}`;

    const userPrompt = `Вопрос предпринимателя:
"${question}"

Сгенерируй JSON-ответ точно по следующей схеме:
{
  "category": "registration" | "taxes" | "documents" | "support_programs" | "finance" | "legal_basics",
  "complexity_score": "low" | "medium" | "high",
  "confidence_score": 0.50..0.99,
  "recommended_action": "answer_user" | "create_expert_ticket" | "clarify_details",
  "reasoning": "Краткое обоснование классификации...",
  "sources": ["ФНС России", "ГК РФ"],
  "answerMarkdown": "Подробный структурированный ответ с заголовками и выводами...",
  "nextSteps": ["Шаг 1: ...", "Шаг 2: ...", "Шаг 3: ..."]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            complexity_score: { type: Type.STRING },
            confidence_score: { type: Type.NUMBER },
            recommended_action: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            sources: { type: Type.ARRAY, items: { type: Type.STRING } },
            answerMarkdown: { type: Type.STRING },
            nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["category", "complexity_score", "confidence_score", "recommended_action", "reasoning", "sources", "answerMarkdown", "nextSteps"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    const category = (parsed.category || "registration") as Category;
    const categoryLabel = CATEGORY_LABELS[category] || "Общий юридический вопрос";
    const complexityScore = (parsed.complexity_score || "low") as ComplexityLevel;
    const confidenceScore = typeof parsed.confidence_score === 'number' ? parsed.confidence_score : 0.92;
    const recommendedAction = parsed.recommended_action || "answer_user";

    let ticketCreated = false;
    let ticketId: string | undefined = undefined;

    // Auto-create ticket if high complexity OR low confidence OR explicit request
    const isHighRisk = complexityScore === "high" || confidenceScore < 0.78 || recommendedAction === "create_expert_ticket";

    if (isHighRisk) {
      ticketCreated = true;
      ticketId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTicket: ExpertTicket = {
        id: ticketId,
        userId: 'usr-current',
        userName: 'Студент-основатель (Вы)',
        userEmail: 'founder@student.edu.ru',
        userUniversity: 'Иннополис / МФТИ',
        category: category,
        title: question.slice(0, 60) + (question.length > 60 ? '...' : ''),
        description: question,
        context: {
          businessStage: founderContext?.stage || "Идея",
          founderCount: founderContext?.founderCount || "1 основатель",
          businessModel: founderContext?.businessModel || "B2B SaaS",
          hasForeignInvestors: !!founderContext?.hasForeignInvestors,
          previousAiAnswers: [parsed.answerMarkdown ? parsed.answerMarkdown.slice(0, 200) + "..." : "Запрос требует персональной экспертной оценки."],
          aiRecommendations: parsed.nextSteps || ["Ожидать ответа юриста/эксперта Фонда"],
          complexityScore: complexityScore,
          confidenceScore: confidenceScore,
          reasoning: parsed.reasoning || "Автоматическое сжатие контекста ИИ-Навигатором для экспертной передачи."
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      tickets.unshift(newTicket);
    }

    res.json({
      answerText: parsed.answerMarkdown,
      analysis: {
        category,
        categoryLabel,
        complexity_score: complexityScore,
        confidence_score: confidenceScore,
        recommended_action: isHighRisk ? "create_expert_ticket" : recommendedAction,
        reasoning: parsed.reasoning,
        sources: parsed.sources || ["ФНС РФ", "Гражданский кодекс РФ"],
        nextSteps: parsed.nextSteps || [],
        ticketCreated,
        ticketId
      }
    });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Ошибка работы ИИ-Навигатора" });
  }
});

// Create manual ticket
app.post("/api/tickets", (req, res) => {
  const { title, description, category, context } = req.body;
  const newTicket: ExpertTicket = {
    id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: 'usr-current',
    userName: 'Студент-основатель (Вы)',
    userEmail: 'founder@student.edu.ru',
    userUniversity: 'МГУ / Вышка / МФТИ',
    category: category || 'legal_basics',
    title: title || 'Консультация эксперта по запросу стартапа',
    description: description || '',
    context: context || {
      businessStage: 'Идея',
      founderCount: '1 основатель',
      businessModel: 'B2B SaaS',
      hasForeignInvestors: false,
      previousAiAnswers: ['Ручное создание обращения из ИИ-чата.'],
      aiRecommendations: ['Экспертное сопровождение'],
      complexityScore: 'medium',
      confidenceScore: 0.85,
      reasoning: 'Обращение создано по желанию пользователя.'
    },
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  tickets.unshift(newTicket);
  res.status(201).json(newTicket);
});

// Serve Vite in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Цифровой навигатор предпринимателя запущен на http://0.0.0.0:${PORT}`);
  });
}

startServer();
