import React, { useState } from 'react';
import { Language } from '../types';
import { Search, Calendar, ChevronLeft, ChevronRight, TrendingUp, DollarSign } from 'lucide-react';

interface TryEstadisticasViewProps {
  language: Language;
}

export const TryEstadisticasView: React.FC<TryEstadisticasViewProps> = ({ language }) => {
  const [startDate, setStartDate] = useState('31/08/2026');
  const [endDate, setEndDate] = useState('11/10/2026');
  const [recaudoPage, setRecaudoPage] = useState<'1' | '2'>('1');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const isPt = language === 'pt';

  const weeks = [
    'Aug-31 / Sep-6',
    'Sep-7 / Sep-13',
    'Sep-14 / Sep-20',
    'Sep-21 / Sep-27',
    'Sep-28 / Oct-4',
    'Oct-5 / Oct-11',
  ];

  return (
    <div className="space-y-4">
      {/* Green Header Banner matching screenshot */}
      <div className="bg-[#8cc63f] text-slate-900 px-4 py-2.5 rounded-t-xl font-bold text-sm flex items-center space-x-2 shadow-xs">
        <TrendingUp className="w-4 h-4" />
        <span>{isPt ? 'Painel de Controle e Estatísticas' : 'Dashboard'}</span>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-b-xl rounded-t-none shadow-xs border border-slate-200 p-6 space-y-6 -mt-4">
        {/* Date Filter Bar matching screenshot */}
        <div className="flex flex-wrap items-end gap-4 pb-4 border-b border-slate-100">
          <div className="w-48">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              {isPt ? 'Data Inicial' : 'Fecha inicial'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#76b82a]"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="w-48">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              {isPt ? 'Data Final' : 'Fecha final'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-[#76b82a]"
              />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <button
            onClick={() => alert(isPt ? 'Dados atualizados para as últimas 6 semanas!' : '¡Datos actualizados!')}
            className="w-9 h-9 rounded-lg bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 flex items-center justify-center transition shadow-xs"
            title="Buscar"
          >
            <Search className="w-4 h-4 font-bold" />
          </button>

          <div className="ml-auto text-xs text-slate-400 italic">
            * {isPt ? 'Os intervalos são calculados no máximo para 6 semanas (Segunda a Domingo)' : 'Los rangos de fechas se manejan máximo por 6 semanas'}
          </div>
        </div>

        {/* 2x2 Grid of Authentic Charts matching TryController screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Cartera */}
          <div className="border border-slate-200/90 rounded-xl p-5 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-slate-900">
                {isPt ? 'Carteira' : 'Cartera'}
              </h4>
              <div className="flex items-center space-x-4 text-xs">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#2e86ab] rounded-2xs inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Valor em carteira' : 'Valor en cartera'}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 bg-orange-500 inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Número de clientes' : 'Número de clientes'}</span>
                </span>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="h-60 relative w-full pt-2">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                {[0, 20, 40, 60, 80, 100].map((val) => {
                  const y = 170 - (val / 100) * 140;
                  return (
                    <g key={val}>
                      <line x1="35" y1={y} x2="465" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="25" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}
                      </text>
                      <text x="475" y={y + 3} textAnchor="start" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Bars (Valor en Cartera) */}
                {[
                  { x: 65, h: 72, val: 'R$ 72.000' },
                  { x: 135, h: 84, val: 'R$ 84.000' },
                  { x: 205, h: 90, val: 'R$ 90.000' },
                  { x: 275, h: 65, val: 'R$ 65.000' },
                  { x: 345, h: 78, val: 'R$ 78.000' },
                  { x: 415, h: 88, val: 'R$ 88.000' },
                ].map((bar, i) => {
                  const y = 170 - (bar.h / 100) * 140;
                  const height = (bar.h / 100) * 140;
                  return (
                    <rect
                      key={i}
                      x={bar.x - 12}
                      y={y}
                      width="24"
                      height={height}
                      fill="#2e86ab"
                      rx="2"
                      className="transition-all hover:opacity-80 cursor-pointer"
                    >
                      <title>{`${weeks[i]}: ${bar.val}`}</title>
                    </rect>
                  );
                })}

                {/* Trend line (Número de clientes) */}
                <path
                  d="M 65 130 L 135 110 L 205 100 L 275 125 L 345 115 L 415 95"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {[
                  { cx: 65, cy: 130, c: 45 },
                  { cx: 135, cy: 110, c: 52 },
                  { cx: 205, cy: 100, c: 58 },
                  { cx: 275, cy: 125, c: 48 },
                  { cx: 345, cy: 115, c: 54 },
                  { cx: 415, cy: 95, c: 62 },
                ].map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="3.5"
                    fill="#ffffff"
                    stroke="#f97316"
                    strokeWidth="2"
                    className="cursor-pointer hover:r-5 transition"
                  >
                    <title>{`${weeks[i]}: ${pt.c} clientes`}</title>
                  </circle>
                ))}

                {/* X Axis Labels */}
                {weeks.map((w, i) => {
                  const x = 65 + i * 70;
                  return (
                    <text
                      key={i}
                      x={x}
                      y="185"
                      textAnchor="end"
                      fontSize="8"
                      fill="#64748b"
                      transform={`rotate(-35, ${x}, 185)`}
                    >
                      {w}
                    </text>
                  );
                })}

                {/* Y Axis Titles */}
                <text x="8" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(-90, 8, 100)">
                  {isPt ? 'Carteira' : 'Cartera'}
                </text>
                <text x="495" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(90, 495, 100)">
                  # Clientes
                </text>
              </svg>
            </div>
          </div>

          {/* Chart 2: Recaudos */}
          <div className="border border-slate-200/90 rounded-xl p-5 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-slate-900">
                {isPt ? 'Arrecadação' : 'Recaudos'}
              </h4>
              <div className="flex items-center space-x-3 text-xs">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#1d4ed8] rounded-2xs inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Total arrecadado' : 'Total recaudado'}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#dc2626] rounded-2xs inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Pretendido' : 'Recaudo pretendido'}</span>
                </span>
                {/* 1/2 pagination matching screenshot */}
                <div className="flex items-center space-x-1 bg-slate-100 rounded px-1.5 py-0.5 font-mono text-[10px] text-slate-700">
                  <button onClick={() => setRecaudoPage('1')} className="hover:text-black">◀</button>
                  <span>{recaudoPage}/2</span>
                  <button onClick={() => setRecaudoPage('2')} className="hover:text-black">▶</button>
                </div>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="h-60 relative w-full pt-2">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Grid */}
                {[0, 20, 40, 60, 80, 100].map((val) => {
                  const y = 170 - (val / 100) * 140;
                  return (
                    <g key={val}>
                      <line x1="35" y1={y} x2="465" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="25" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}
                      </text>
                      <text x="475" y={y + 3} textAnchor="start" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* Dual Bars (Arrecadado vs Pretendido) */}
                {[
                  { x: 65, arr: 55, pret: 60 },
                  { x: 135, arr: 70, pret: 75 },
                  { x: 205, arr: 82, pret: 80 },
                  { x: 275, arr: 60, pret: 68 },
                  { x: 345, arr: 75, pret: 78 },
                  { x: 415, arr: 92, pret: 90 },
                ].map((item, i) => {
                  const yArr = 170 - (item.arr / 100) * 140;
                  const hArr = (item.arr / 100) * 140;
                  const yPret = 170 - (item.pret / 100) * 140;
                  const hPret = (item.pret / 100) * 140;
                  return (
                    <g key={i}>
                      <rect
                        x={item.x - 14}
                        y={yArr}
                        width="12"
                        height={hArr}
                        fill="#1d4ed8"
                        rx="1.5"
                        className="cursor-pointer hover:opacity-80"
                      >
                        <title>{`${weeks[i]} Arrecadado: R$ ${item.arr * 800}`}</title>
                      </rect>
                      <rect
                        x={item.x + 2}
                        y={yPret}
                        width="12"
                        height={hPret}
                        fill="#dc2626"
                        rx="1.5"
                        className="cursor-pointer hover:opacity-80"
                      >
                        <title>{`${weeks[i]} Pretendido: R$ ${item.pret * 800}`}</title>
                      </rect>
                    </g>
                  );
                })}

                {/* X Axis Labels */}
                {weeks.map((w, i) => {
                  const x = 65 + i * 70;
                  return (
                    <text
                      key={i}
                      x={x}
                      y="185"
                      textAnchor="end"
                      fontSize="8"
                      fill="#64748b"
                      transform={`rotate(-35, ${x}, 185)`}
                    >
                      {w}
                    </text>
                  );
                })}

                {/* Axis Labels */}
                <text x="8" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(-90, 8, 100)">
                  Valor
                </text>
                <text x="495" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(90, 495, 100)">
                  % {isPt ? 'Arrecadado' : 'Recaudo'}
                </text>
              </svg>
            </div>
          </div>

          {/* Chart 3: Ventas */}
          <div className="border border-slate-200/90 rounded-xl p-5 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-slate-900">
                {isPt ? 'Vendas' : 'Ventas'}
              </h4>
              <div className="flex items-center space-x-4 text-xs">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-cyan-400 rounded-2xs inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Total de vendas' : 'Total de ventas'}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 bg-amber-500 inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Número de vendas' : 'Número de ventas'}</span>
                </span>
              </div>
            </div>

            <div className="h-60 relative w-full pt-2">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {[0, 20, 40, 60, 80, 100].map((val) => {
                  const y = 170 - (val / 100) * 140;
                  return (
                    <g key={val}>
                      <line x1="35" y1={y} x2="465" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="25" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}
                      </text>
                      <text x="475" y={y + 3} textAnchor="start" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {[
                  { x: 65, h: 42 },
                  { x: 135, h: 58 },
                  { x: 205, h: 74 },
                  { x: 275, h: 50 },
                  { x: 345, h: 68 },
                  { x: 415, h: 80 },
                ].map((b, i) => {
                  const y = 170 - (b.h / 100) * 140;
                  const height = (b.h / 100) * 140;
                  return (
                    <rect
                      key={i}
                      x={b.x - 12}
                      y={y}
                      width="24"
                      height={height}
                      fill="#22d3ee"
                      rx="2"
                      className="cursor-pointer hover:opacity-80"
                    >
                      <title>{`${weeks[i]}: R$ ${b.h * 1000}`}</title>
                    </rect>
                  );
                })}

                {/* Line */}
                <path
                  d="M 65 145 L 135 125 L 205 105 L 275 135 L 345 110 L 415 95"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {weeks.map((w, i) => {
                  const x = 65 + i * 70;
                  return (
                    <text
                      key={i}
                      x={x}
                      y="185"
                      textAnchor="end"
                      fontSize="8"
                      fill="#64748b"
                      transform={`rotate(-35, ${x}, 185)`}
                    >
                      {w}
                    </text>
                  );
                })}

                <text x="8" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(-90, 8, 100)">
                  {isPt ? 'Vendas' : 'Ventas'}
                </text>
                <text x="495" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(90, 495, 100)">
                  # {isPt ? 'Vendas' : 'Ventas'}
                </text>
              </svg>
            </div>
          </div>

          {/* Chart 4: Gastos */}
          <div className="border border-slate-200/90 rounded-xl p-5 bg-white shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm text-slate-900">
                {isPt ? 'Despesas & Gastos' : 'Gastos'}
              </h4>
              <div className="flex items-center space-x-4 text-xs">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#4338ca] rounded-2xs inline-block"></span>
                  <span className="text-slate-600">{isPt ? 'Total de gastos' : 'Total de gastos'}</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-0.5 bg-red-500 inline-block"></span>
                  <span className="text-slate-600">% {isPt ? 'Gasto sobre carteira' : 'Gasto'}</span>
                </span>
              </div>
            </div>

            <div className="h-60 relative w-full pt-2">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {[0, 20, 40, 60, 80, 100].map((val) => {
                  const y = 170 - (val / 100) * 140;
                  return (
                    <g key={val}>
                      <line x1="35" y1={y} x2="465" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                      <text x="25" y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}
                      </text>
                      <text x="475" y={y + 3} textAnchor="start" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                        {val}%
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {[
                  { x: 65, h: 22 },
                  { x: 135, h: 30 },
                  { x: 205, h: 18 },
                  { x: 275, h: 25 },
                  { x: 345, h: 20 },
                  { x: 415, h: 28 },
                ].map((b, i) => {
                  const y = 170 - (b.h / 100) * 140;
                  const height = (b.h / 100) * 140;
                  return (
                    <rect
                      key={i}
                      x={b.x - 12}
                      y={y}
                      width="24"
                      height={height}
                      fill="#4338ca"
                      rx="2"
                      className="cursor-pointer hover:opacity-80"
                    >
                      <title>{`${weeks[i]}: R$ ${b.h * 150}`}</title>
                    </rect>
                  );
                })}

                {/* Line */}
                <path
                  d="M 65 155 L 135 150 L 205 160 L 275 152 L 345 158 L 415 148"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {weeks.map((w, i) => {
                  const x = 65 + i * 70;
                  return (
                    <text
                      key={i}
                      x={x}
                      y="185"
                      textAnchor="end"
                      fontSize="8"
                      fill="#64748b"
                      transform={`rotate(-35, ${x}, 185)`}
                    >
                      {w}
                    </text>
                  );
                })}

                <text x="8" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(-90, 8, 100)">
                  {isPt ? 'Gastos' : 'Ventas'}
                </text>
                <text x="495" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" transform="rotate(90, 495, 100)">
                  % {isPt ? 'Gasto' : 'Gasto'}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
