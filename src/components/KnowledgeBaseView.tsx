import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Building, 
  Calculator, 
  FileText, 
  Award, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  ChevronRight, 
  Tag, 
  ExternalLink,
  X
} from 'lucide-react';
import { KnowledgeArticle, Category } from '../types';
import { KNOWLEDGE_BASE_ARTICLES } from '../data/knowledgeBase';
import ReactMarkdown from 'react-markdown';

interface KnowledgeBaseProps {
  onNavigate: (page: string) => void;
  onAskAiWithContext?: (query: string) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseProps> = ({ onNavigate, onAskAiWithContext }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<KnowledgeArticle[]>(KNOWLEDGE_BASE_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  useEffect(() => {
    let filtered = [...KNOWLEDGE_BASE_ARTICLES];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    setArticles(filtered);
  }, [selectedCategory, searchQuery]);

  const categoryTabs = [
    { id: 'all', label: 'Все статьи', icon: BookOpen },
    { id: 'registration', label: 'Регистрация (ИП/ООО)', icon: Building },
    { id: 'taxes', label: 'Налоги и УСН', icon: Calculator },
    { id: 'documents', label: 'Документы и Код', icon: FileText },
    { id: 'support_programs', label: 'Гранты и Поддержка', icon: Award },
    { id: 'legal_basics', label: 'Юридические основы', icon: ShieldCheck },
    { id: 'finance', label: 'Финансы и Счета', icon: CreditCard },
  ];

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-y-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-blue-900 text-white space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-teal-300 text-xs font-bold mb-2 border border-white/10">
              <BookOpen className="w-3.5 h-3.5 text-teal-300" />
              <span>База знаний стартапа</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Проверенные материалы и нормативная база
            </h1>
            <p className="text-slate-300 text-xs mt-1">
              Официальные руководства ФНС, Налогового кодекса и фонда ФСИ для предпринимателей.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по статьям и тегам..."
              className="w-full bg-white text-slate-800 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold uppercase border border-teal-200">
                  {art.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">#{art.id}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-wrap gap-1">
                {art.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 border border-slate-200">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-blue-900 font-bold pt-1">
                <span>Читать статью</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Modal Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 shadow-xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-teal-50 text-teal-800 text-xs font-bold uppercase border border-teal-200">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500">Источник: {selectedArticle.source}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedArticle.title}</h2>
            </div>

            <div className="prose text-xs sm:text-sm leading-relaxed border-t border-b border-slate-200 py-6 text-slate-800">
              <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
            </div>

            {/* Quick Prompt CTA */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs text-slate-900">Остались индивидуальные вопросы?</div>
                <div className="text-[11px] text-slate-500">ИИ ответит с учетом особенностей вашего проекта.</div>
              </div>
              <button
                onClick={() => {
                  setSelectedArticle(null);
                  if (onAskAiWithContext) {
                    onAskAiWithContext(`Вопрос по статье "${selectedArticle.title}": `);
                  } else {
                    onNavigate('chat');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Задать вопрос ИИ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
