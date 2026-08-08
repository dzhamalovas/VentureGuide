import React from 'react';
import { Gift, CheckCircle2, Award, ExternalLink, Sparkles, Building, ChevronRight } from 'lucide-react';
import { SUPPORT_PROGRAMS } from '../data/demoData';

interface SupportProgramsProps {
  onNavigate: (page: string) => void;
}

export const SupportProgramsView: React.FC<SupportProgramsProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-y-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-blue-900 text-white space-y-3 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-teal-300 text-xs font-bold border border-white/10">
          <Gift className="w-3.5 h-3.5 text-teal-300" />
          <span>Государственная & Университетская поддержка</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Меры поддержки и гранты для студенческих стартапов
        </h1>
        <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
          Актуальные программы финансирования, налоговые льготы и грантовые конкурсы с пошаговыми инструкциями ИИ-Навигатора.
        </p>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SUPPORT_PROGRAMS.map((prog) => (
          <div
            key={prog.id}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-900 transition-all flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-900 text-[10px] font-bold uppercase border border-blue-100">
                  {prog.organizer}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {prog.amount}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{prog.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-700 text-[11px]">Ключевые требования:</div>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {prog.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px]">Срок: {prog.deadline}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('chat')}
                  className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors flex items-center gap-1 text-xs cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Спросить ИИ</span>
                </button>
                <a
                  href={prog.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
