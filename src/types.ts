export type Category = 
  | 'registration'
  | 'taxes'
  | 'documents'
  | 'support_programs'
  | 'finance'
  | 'legal_basics';

export type ComplexityLevel = 'low' | 'medium' | 'high';

export type RecommendedAction = 'answer_user' | 'create_expert_ticket' | 'clarify_details';

export type TicketStatus = 'pending' | 'in_progress' | 'resolved';

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: Category;
  summary: string;
  content: string;
  source: string;
  tags: string[];
  commonQuestions: string[];
}

export interface ChatAnalysis {
  category: Category;
  categoryLabel: string;
  complexity_score: ComplexityLevel;
  confidence_score: number; // 0.0 to 1.0
  recommended_action: RecommendedAction;
  reasoning: string;
  sources: string[];
  nextSteps: string[];
  ticketCreated?: boolean;
  ticketId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  analysis?: ChatAnalysis;
}

export interface FounderContext {
  stage: 'Идея' | 'Прототип' | 'Первые продажи' | 'Масштабирование';
  founderCount: '1 основатель' | '2-3 основателя' | '4+ основателей';
  businessModel: 'B2B SaaS' | 'B2C Приложение' | 'Маркетплейс' | 'E-commerce' | 'Услуги';
  hasEmployees: boolean;
  hasForeignInvestors: boolean;
}

export interface ExpertTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userUniversity?: string;
  category: Category;
  title: string;
  description: string;
  context: {
    businessStage: string;
    founderCount: string;
    businessModel: string;
    hasForeignInvestors: boolean;
    previousAiAnswers: string[];
    aiRecommendations: string[];
    complexityScore: ComplexityLevel;
    confidenceScore: number;
    reasoning: string;
  };
  status: TicketStatus;
  createdAt: string;
  expertResponse?: string;
  expertName?: string;
  expertRespondedAt?: string;
}

export interface SupportProgram {
  id: string;
  name: string;
  organizer: string;
  amount: string;
  description: string;
  category: Category;
  deadline: string;
  requirements: string[];
  link: string;
}

export interface FundAnalytics {
  totalQuestions: number;
  closedByAiPercentage: number;
  transferredToExpertsPercentage: number;
  avgResponseTimeSec: number;
  categoryBreakdown: { category: Category; label: string; count: number }[];
}
