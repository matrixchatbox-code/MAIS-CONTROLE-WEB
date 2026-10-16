import React, { useState } from 'react';
import { Language } from '../types';
import { NOVEDADES_SLIDES } from '../data/mockData';
import {
  Zap,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TryNovedadesViewProps {
  language: Language;
}

export const TryNovedadesView: React.FC<TryNovedadesViewProps> = ({ language }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const isPt = language === 'pt';

  const slide = NOVEDADES_SLIDES[currentSlideIndex];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#50007d] to-[#3f0063] rounded-2xl p-6 text-white shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8cc63f] text-slate-900 font-bold text-xs mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{isPt ? 'Novidades & Central de Treinamento' : '¡Novedades Try Controller!'}</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">
            {isPt ? 'Recursos e Atualizações Mais Controle / Try Controller' : 'Nuevas Funcionalidades Web y App'}
          </h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">
            {isPt
              ? 'Conheça todas as novas telas, regras de negócio e melhorias lançadas na plataforma Web e no App Móvel de campo.'
              : 'Conoce todas las actualizaciones que constantemente realizamos para ti en la Web y la App.'}
          </p>
        </div>

        {/* Slide Counter */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-white/10 rounded-lg">
            {currentSlideIndex + 1} / {NOVEDADES_SLIDES.length}
          </span>
          <button
            onClick={() => setCurrentSlideIndex(Math.min(NOVEDADES_SLIDES.length - 1, currentSlideIndex + 1))}
            disabled={currentSlideIndex === NOVEDADES_SLIDES.length - 1}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Card matching the visual style of Try Controller slides */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Slide Top Accent Bar */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: slide.accentColor || '#8cc63f' }}
        ></div>

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span
              className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-2xs"
              style={{ backgroundColor: slide.accentColor || '#50007d' }}
            >
              {slide.badge}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {slide.category}
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight">
              {slide.title}
            </h3>
            <p className="text-sm font-semibold text-[#50007d] mt-1">
              {slide.subtitle}
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {slide.content}
          </p>

          {/* Bullet Points */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-xs uppercase text-slate-400 tracking-wider">
              {isPt ? 'Pontos Principais:' : 'Puntos Clave:'}
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {slide.bulletPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#eaf5dc]/40 border border-[#8cc63f]/30"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#76b82a] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Thumbnails Navigation Bar */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between overflow-x-auto gap-2">
          {NOVEDADES_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center space-x-1.5 ${
                currentSlideIndex === idx
                  ? 'bg-[#50007d] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{idx + 1}.</span>
              <span>{s.badge}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
