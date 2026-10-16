import React from 'react';
import { Building, Layers, CheckSquare, Plus, Lock } from 'lucide-react';
import { Language } from '../types';

interface TryFilterBarProps {
  selectedCn: string;
  onSelectCn: (cn: string) => void;
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  viewAllUnits: boolean;
  onToggleViewAllUnits: () => void;
  language: Language;
  onOpenNovaVenda?: () => void;
  onOpenCierreMasivo?: () => void;
}

export const TryFilterBar: React.FC<TryFilterBarProps> = ({
  selectedCn,
  onSelectCn,
  selectedUnit,
  onSelectUnit,
  viewAllUnits,
  onToggleViewAllUnits,
  language,
  onOpenNovaVenda,
  onOpenCierreMasivo,
}) => {
  const isPt = language === 'pt';

  return (
    <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs w-full max-w-full overflow-x-hidden">
      {/* Dropdowns exactly like TryController screenshot */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
        {/* CN Dropdown with purple border */}
        <div className="relative w-full sm:w-auto sm:min-w-[260px] md:min-w-[280px]">
          <select
            value={selectedCn}
            onChange={(e) => onSelectCn(e.target.value)}
            className="w-full bg-white border border-[#50007d] text-slate-800 rounded-md px-3 py-1.5 font-medium text-xs focus:ring-1 focus:ring-[#50007d] focus:outline-none cursor-pointer appearance-none pr-8 shadow-xs"
          >
            <option value="/1/">/1/ - CN da sociedade 399901 (São Paulo)</option>
            <option value="/2/">/2/ - RAPI CRÉDITO (Campinas & Interior)</option>
            <option value="/3/">/3/ - CN Rio Guanabara (RJ)</option>
            <option value="all">{isPt ? 'Todos os Centros de Negócios' : 'Todos los Centros de Negocios'}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#50007d]">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Units Dropdown */}
        <div className="relative w-full sm:w-auto sm:min-w-[200px] md:min-w-[220px]">
          <select
            value={selectedUnit}
            onChange={(e) => onSelectUnit(e.target.value)}
            className="w-full bg-white border border-slate-300 text-slate-800 rounded-md px-3 py-1.5 font-medium text-xs focus:ring-1 focus:ring-[#76b82a] focus:outline-none cursor-pointer appearance-none pr-8 shadow-xs"
          >
            <option value="all">{isPt ? 'Todas as unidades (2)' : 'Todas las unidades (2)'}</option>
            <option value="ugi-1">1 - UGI-1 (Carlos Oliveira)</option>
            <option value="ugi-2">2 - UGI-2 (Roberto Mendes)</option>
            <option value="ugi-3">3 - UGI Centro Expandido</option>
            <option value="ugi-4">4 - UGI Campinas Norte</option>
            <option value="ugi-5">5 - UGI Rio Baixada</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {/* Ver todas as unidades Checkbox */}
        <label className="flex items-center space-x-2 text-slate-700 cursor-pointer select-none font-medium hover:text-slate-900 py-0.5">
          <input
            type="checkbox"
            checked={viewAllUnits}
            onChange={onToggleViewAllUnits}
            className="w-4 h-4 rounded border-slate-300 text-[#76b82a] focus:ring-[#76b82a]"
          />
          <span>{isPt ? 'Ver todas as unidades' : 'Ver todas las unidades'}</span>
        </label>
      </div>

      {/* Breadcrumb info matching screenshot and quick actions */}
      <div className="flex items-center justify-between md:justify-end space-x-3 text-slate-500 text-xs pt-1 md:pt-0 border-t md:border-t-0 border-slate-100">
        <span className="hidden lg:inline text-[11px] text-slate-500 font-medium">
          Plataforma 3999 • /1/ - CN de la sociedad 399901 • ERICSON VICENTE • Guarulhos/SP
        </span>

        {/* Quick Action shortcuts */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          {onOpenNovaVenda && (
            <button
              onClick={onOpenNovaVenda}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold transition shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isPt ? 'Nova Venda' : 'Nueva Venta'}</span>
            </button>
          )}
          {onOpenCierreMasivo && (
            <button
              onClick={onOpenCierreMasivo}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#50007d] hover:bg-[#400066] text-white font-semibold transition shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isPt ? 'Fechamento' : 'Cierre'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
