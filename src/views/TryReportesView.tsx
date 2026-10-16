import React, { useState } from 'react';
import { Language } from '../types';
import {
  Search,
  ChevronDown,
  ChevronRight,
  FileSpreadsheet,
  BarChart2,
  Table as TableIcon,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

interface TryReportesViewProps {
  language: Language;
}

export const TryReportesView: React.FC<TryReportesViewProps> = ({ language }) => {
  const [selectedReport, setSelectedReport] = useState<string>('seguimiento_pago_cliente');
  const [reportSearch, setReportSearch] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [startDate, setStartDate] = useState('2026-09-01');
  const [endDate, setEndDate] = useState('2026-10-08');

  const isPt = language === 'pt';

  const reportListVentas = [
    { id: 'seguimiento_pago_cliente', name: isPt ? 'Seguimento de Pagamento por Cliente' : 'Seguimiento pago por cliente', category: 'Ventas' },
    { id: 'creditos_diarios', name: isPt ? 'Créditos Diários' : 'Créditos diarios', category: 'Ventas' },
    { id: 'desempeno_resumen', name: isPt ? 'Desempenho Resumo' : 'Desempeño resumen', category: 'Ventas' },
    { id: 'movimientos_cn', name: isPt ? 'Movimentos por Centro de Negócios' : 'Movimientos por Centro de Negocios', category: 'Ventas' },
    { id: 'cartera_clientes_activos', name: isPt ? 'Carteira de Clientes Ativos' : 'Cartera de clientes activos', category: 'Ventas' },
    { id: 'gastos_por_unidad', name: isPt ? 'Gastos por Unidade' : 'Gastos por unidad', category: 'Ventas' },
    { id: 'ingresos_por_unidad', name: isPt ? 'Ingressos por Unidade' : 'Ingresos por unidad', category: 'Ventas' },
    { id: 'cartera_vencida', name: isPt ? 'Carteira Vencida' : 'Cartera Vencida', category: 'Ventas' },
    { id: 'cajas_sin_movimientos', name: isPt ? 'Caixas sem Movimento' : 'Cajas sin movimientos', category: 'Ventas' },
    { id: 'panico_historico', name: isPt ? 'Histórico de Alertas de Pânico' : 'Histórico de alertas de pánico', category: 'Ventas' },
  ];

  const filteredReports = reportListVentas.filter((r) =>
    r.name.toLowerCase().includes(reportSearch.toLowerCase())
  );

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Cliente,Documento,Unidade,Valor_Venda,Recaudo_Adicional,Saldo_Pendente,Status\n' +
      '1052824,Elias Silveira Santos,97378184820,UGI-1,18000.00,120.00,3600.00,Activo\n' +
      '1005654,Carmela Sanchez Hernandez,83920194821,UGI-1,7200.00,50.00,2880.00,Activo\n' +
      '1075001,William Abella Souza,39201948271,UGI-2,3600.00,0.00,180.00,Al dia\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_${selectedReport}_${startDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Left Sidebar Accordion matching TryController screenshot */}
      <div className="w-full md:w-72 bg-white rounded-xl shadow-xs border border-slate-200 p-4 space-y-4 flex-shrink-0">
        <div>
          <h4 className="font-bold text-sm text-slate-900 mb-2">
            {isPt ? 'Relatórios Disponíveis' : 'Relatórios'}
          </h4>
          <div className="relative">
            <input
              type="text"
              placeholder={isPt ? 'Buscar relatório...' : 'Buscar relatório'}
              value={reportSearch}
              onChange={(e) => setReportSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#76b82a]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Categories list */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between py-1.5 px-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-slate-50 rounded">
            <span>{isPt ? 'Plataforma' : 'Plataforma'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center justify-between py-1.5 px-2 text-slate-500 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-slate-50 rounded">
            <span>{isPt ? 'Resumo' : 'Resumen'}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

          <div className="py-1">
            <div className="flex items-center justify-between py-1 px-2 font-bold text-purple-900 uppercase text-[10px]">
              <span>💲 {isPt ? 'Vendas & Cobrança' : 'Ventas'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-purple-900" />
            </div>

            <div className="space-y-0.5 mt-1 pl-1">
              {filteredReports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition truncate ${
                    selectedReport === r.id
                      ? 'bg-[#eaf5dc] text-[#50007d] font-bold border-l-3 border-[#76b82a]'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={r.name}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
        {/* Top Controls: View Mode Tabs & Export Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'table'
                  ? 'bg-[#50007d] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>{isPt ? 'Ver Tabela' : 'Ver tabela'}</span>
            </button>

            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === 'chart'
                  ? 'bg-[#50007d] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{isPt ? 'Ver Gráficos' : 'Ver gráficos'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-slate-700 text-xs focus:outline-none"
              />
              <span className="text-slate-400">até</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-slate-700 text-xs focus:outline-none"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isPt ? 'Exportar Excel' : 'Exportar Excel'}</span>
            </button>
          </div>
        </div>

        {/* Active Report Header */}
        <div>
          <h3 className="font-bold text-sm text-[#50007d]">
            {reportListVentas.find((r) => r.id === selectedReport)?.name}
          </h3>
          <p className="text-[11px] text-slate-500">
            {isPt
              ? 'Exibindo dados sincronizados com separador de milhar por ponto e decimais por vírgula.'
              : 'Consultando datos hasta 90 días en formato oficial TryController.'}
          </p>
        </div>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-3 py-2.5">{isPt ? 'Centro de Negócios' : 'Centro de negocios'}</th>
                  <th className="px-3 py-2.5">ID Cliente</th>
                  <th className="px-4 py-2.5">{isPt ? 'Nome Completo' : 'Nombre Completo'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Apelido (Apodo)' : 'Apodo'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Valor Venda' : 'Valor venta'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Total Arrecadado' : 'Total Recaudo'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Recaudo Adicional' : 'Recaudo Adicional'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Caixas Transcorridos' : 'Cajas transcurridas'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Saldo Pendente' : 'Saldo pendiente'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-mono text-slate-500">/1/ - CN 399901</td>
                  <td className="px-3 py-3 font-mono font-bold text-[#50007d]">1052824</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">Elias Silveira Santos</td>
                  <td className="px-3 py-3 text-slate-600 italic">Elias Restaurante</td>
                  <td className="px-3 py-3 text-right font-mono font-bold">R$ 18.000,00</td>
                  <td className="px-3 py-3 text-right font-mono text-emerald-700 font-bold">R$ 14.400,00</td>
                  <td className="px-3 py-3 text-right font-mono text-amber-700 font-bold">R$ 120,00</td>
                  <td className="px-3 py-3 text-center font-mono">16</td>
                  <td className="px-3 py-3 text-right font-mono text-rose-600 font-bold">R$ 3.600,00</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-100/60">
                  <td className="px-3 py-3 font-mono text-slate-500">/1/ - CN 399901</td>
                  <td className="px-3 py-3 font-mono font-bold text-[#50007d]">1005654</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">Carmela Sánchez Hernández</td>
                  <td className="px-3 py-3 text-slate-600 italic">Carmela Modas</td>
                  <td className="px-3 py-3 text-right font-mono font-bold">R$ 7.200,00</td>
                  <td className="px-3 py-3 text-right font-mono text-emerald-700 font-bold">R$ 4.320,00</td>
                  <td className="px-3 py-3 text-right font-mono text-amber-700 font-bold">R$ 50,00</td>
                  <td className="px-3 py-3 text-center font-mono">12</td>
                  <td className="px-3 py-3 text-right font-mono text-rose-600 font-bold">R$ 2.880,00</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-mono text-slate-500">/1/ - CN 399901</td>
                  <td className="px-3 py-3 font-mono font-bold text-[#50007d]">1075001</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">William Abella Souza</td>
                  <td className="px-3 py-3 text-slate-600 italic">William Barbearia</td>
                  <td className="px-3 py-3 text-right font-mono font-bold">R$ 3.600,00</td>
                  <td className="px-3 py-3 text-right font-mono text-emerald-700 font-bold">R$ 3.420,00</td>
                  <td className="px-3 py-3 text-right font-mono text-slate-400">R$ 0,00</td>
                  <td className="px-3 py-3 text-center font-mono">19</td>
                  <td className="px-3 py-3 text-right font-mono text-emerald-700 font-bold">R$ 180,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Chart View */}
        {viewMode === 'chart' && (
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-400 text-xs">
            <div className="text-center space-y-2">
              <BarChart2 className="w-10 h-10 mx-auto text-[#76b82a]" />
              <p className="font-semibold text-slate-600">Visualização Gráfica do Relatório</p>
              <p className="text-[11px]">Gráfico consolidado de amortização e cobranças por UGI</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
