import React from 'react';
import { 
  Home, 
  Bot, 
  LayoutDashboard, 
  BookOpen, 
  Gift, 
  MessageSquare, 
  ShieldAlert, 
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  pendingTicketsCount: number;
  currentRole: 'founder' | 'expert';
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  highlight?: boolean;
  count?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activePage, 
  onNavigate, 
  pendingTicketsCount,
  currentRole 
}) => {
  const navItems: NavItem[] = [
    { id: 'landing', label: 'Главная', icon: Home },
    { id: 'chat', label: 'AI Консультант', icon: Bot, badge: 'Pro', highlight: true },
    { id: 'dashboard', label: 'Мой стартап', icon: LayoutDashboard },
    { id: 'knowledge', label: 'База знаний', icon: BookOpen },
    { id: 'support', label: 'Меры поддержки', icon: Gift },
    { 
      id: 'tickets', 
      label: 'Эксперты', 
      icon: MessageSquare, 
      count: pendingTicketsCount > 0 ? pendingTicketsCount : undefined 
    },
  ];

  if (currentRole === 'expert') {
    navItems.push({
      id: 'admin',
      label: 'Панель Фонда',
      icon: ShieldAlert,
      badge: 'Admin'
    });
  }

  return (
    <aside className="w-56 flex flex-col gap-1 shrink-0 h-full">
      {/* Navigation menu */}
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-1">
        МЕНЮ
      </div>

      <div className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-900 font-bold border border-blue-100 shadow-xs'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900 rounded-xl'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-blue-900' : 'text-slate-400 group-hover:text-slate-700'
                }`} />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1">
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold uppercase ${
                    item.highlight 
                      ? 'bg-teal-100 text-teal-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick AI Advisor Assistant Widget */}
      <div className="mt-auto p-4 bg-blue-900 rounded-2xl text-white shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
          <p className="text-xs font-semibold">Нужна помощь?</p>
        </div>
        <p className="text-[10px] text-slate-300 leading-snug">
          Наши кураторы и ИИ-Навигатор на связи 24/7 для студентов.
        </p>
        <button
          onClick={() => onNavigate('chat')}
          className="w-full py-2 mt-1 bg-teal-500 hover:bg-teal-400 rounded-lg text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          Задать вопрос ИИ
        </button>
      </div>
    </aside>
  );
};
