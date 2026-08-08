import React from 'react';
import { Compass, ShieldCheck, UserCheck, Sparkles, Building2, ChevronRight, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentRole: 'founder' | 'expert';
  onRoleChange: (role: 'founder' | 'expert') => void;
  onNavigate: (page: string) => void;
  activePage: string;
}

export const Header: React.FC<HeaderProps> = ({ currentRole, onRoleChange, onNavigate, activePage }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <div className="w-4 h-4 border-2 border-white rotate-45"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-800 tracking-tight">
                НАВИГАТОР <span className="text-teal-600">СТАРТАПА</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                ИИ-Навигатор
              </span>
            </div>
          </div>
        </div>

        {/* Center Live AI Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-medium text-slate-700">Система онлайн:</span>
          <span className="text-teal-600 font-mono font-semibold">Gemini v3.6</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 text-[11px]">База знаний ФНС + ФСИ</span>
        </div>

        {/* Right Controls: Role Switcher */}
        <div className="flex items-center gap-2">
          {/* Quick Chat CTA */}
          {activePage !== 'chat' && (
            <button
              onClick={() => onNavigate('chat')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Задать вопрос ИИ</span>
            </button>
          )}

          {/* Role Switcher Pill */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              onClick={() => onRoleChange('founder')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                currentRole === 'founder'
                  ? 'bg-blue-900 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Основатель</span>
            </button>
            <button
              onClick={() => onRoleChange('expert')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                currentRole === 'expert'
                  ? 'bg-blue-900 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Фонд / Эксперт</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
