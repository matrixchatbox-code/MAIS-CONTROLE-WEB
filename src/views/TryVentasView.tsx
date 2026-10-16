import React, { useState } from 'react';
import {
  CashMovement,
  SaleContract,
  ClientProfile,
  Language,
  SubViewSection,
} from '../types';
import { TryResumoPeriodoView } from './TryResumoPeriodoView';
import {
  DollarSign,
  ClipboardList,
  Plus,
  Search,
  Calendar,
  FileText,
  Printer,
  Share2,
  CheckCircle2,
  Lock,
  Unlock,
  CreditCard,
  X,
  Camera,
  Download
} from 'lucide-react';

interface TryVentasViewProps {
  movements: CashMovement[];
  contracts: SaleContract[];
  clients: ClientProfile[];
  language: Language;
  onAddMovement: (mov: CashMovement) => void;
  onAddSale: (contract: SaleContract) => void;
  subView?: SubViewSection;
  onNavigateSubView?: (sub: SubViewSection) => void;
}

export const TryVentasView: React.FC<TryVentasViewProps> = ({
  movements,
  contracts,
  clients,
  language,
  onAddMovement,
  onAddSale,
  subView,
  onNavigateSubView,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'historico' | 'nuevo_ingreso' | 'ventas' | 'caja' | 'resumo_periodo'>(
    subView === 'ventas_resumen_periodo' ? 'resumo_periodo' : 'historico'
  );

  const isResumoPeriodo = subView === 'ventas_resumen_periodo' || activeSubTab === 'resumo_periodo';
  const [startDate, setStartDate] = useState('01/10/2026');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isNewIncomeModalOpen, setIsNewIncomeModalOpen] = useState(false);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [selectedContractForReceipt, setSelectedContractForReceipt] = useState<SaleContract | null>(null);

  // New Movement Form state
  const [movType, setMovType] = useState<'Ingreso' | 'Gasto'>('Ingreso');
  const [movCategory, setMovCategory] = useState('Recaudo Adicional');
  const [movValue, setMovValue] = useState('150.00');
  const [movDescription, setMovDescription] = useState('Entrada de capital em rota');
  const [movComments, setMovComments] = useState('Comprovante conferido');

  // New Sale Form state
  const [saleClient, setSaleClient] = useState(clients[0]?.id || '');
  const [saleAmount, setSaleAmount] = useState('3000.00');
  const [saleRate, setSaleRate] = useState('20');
  const [saleInstallments, setSaleInstallments] = useState('20');
  const [saleFrequency, setSaleFrequency] = useState<'Diario' | 'Semanal Cuota Fija' | 'Semanal Interés' | 'Quincenal' | 'Mensual'>('Diario');
  const [saleFirstDate, setSaleFirstDate] = useState('2026-10-15');

  const isPt = language === 'pt';

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const filteredMovements = movements.filter((m) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      m.unitName.toLowerCase().includes(term) ||
      m.workerName.toLowerCase().includes(term) ||
      m.description.toLowerCase().includes(term) ||
      (m.saleId && m.saleId.includes(term))
    );
  });

  const handleCreateMovement = (e: React.FormEvent) => {
    e.preventDefault();
    const newMov: CashMovement = {
      id: `mov-${Date.now()}`,
      unitId: 'ugi-1',
      unitName: '1 - UGI-1',
      workerName: 'Carlos Oliveira',
      type: movType,
      category: movCategory,
      value: parseFloat(movValue) || 100,
      paymentMethod: 'Efectivo',
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
      description: movDescription,
      comments: movComments,
      approved: true,
    };
    onAddMovement(newMov);
    setIsNewIncomeModalOpen(false);
  };

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === saleClient) || clients[0];
    const principal = parseFloat(saleAmount) || 1000;
    const rate = parseFloat(saleRate) || 20;
    const count = parseInt(saleInstallments) || 20;
    const finalVal = principal * (1 + rate / 100);
    const installmentVal = finalVal / count;

    const newSale: SaleContract = {
      id: `sale-${Date.now()}`,
      saleId: `${Math.floor(1000000 + Math.random() * 900000)}`,
      clientId: client.id,
      clientName: client.fullName,
      clientAlias: client.alias,
      unitId: 'ugi-1',
      unitName: '1 - UGI-1',
      saleDate: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
      amount: principal,
      interestRate: rate,
      finalAmount: finalVal,
      installmentsCount: count,
      paidInstallments: 0,
      installmentValue: installmentVal,
      frequency: saleFrequency,
      collectionDay: 'Diário',
      firstPaymentDate: saleFirstDate,
      status: 'Activa',
      pendingBalance: finalVal,
      additionalCollected: 0,
      extraCollected: 0,
    };

    onAddSale(newSale);
    setIsNewSaleModalOpen(false);
    setSelectedContractForReceipt(newSale);
  };

  return (
    <div className="space-y-4">
      {/* Sub Tabs matching TryController screenshot */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setIsNewIncomeModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold text-xs bg-[#50007d] hover:bg-[#400066] text-white transition shadow-xs"
        >
          <DollarSign className="w-4 h-4 text-[#8cc63f]" />
          <span>{isPt ? 'Novo Ingresso / Entrada' : 'Nuevo Ingreso'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('historico')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold text-xs transition shadow-xs ${
            activeSubTab === 'historico'
              ? 'bg-[#8cc63f] text-slate-900 shadow-sm'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>{isPt ? 'Histórico de Movimentos' : 'Histórico'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ventas')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold text-xs transition shadow-xs ${
            activeSubTab === 'ventas'
              ? 'bg-[#8cc63f] text-slate-900 shadow-sm'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>{isPt ? 'Contratos e Vendas' : 'Ventas y Contratos'}</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('resumo_periodo');
            onNavigateSubView?.('ventas_resumen_periodo');
          }}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold text-xs transition shadow-xs ${
            isResumoPeriodo
              ? 'bg-[#50007d] text-white shadow-sm ring-2 ring-[#8cc63f]'
              : 'bg-purple-50 border border-purple-300 text-[#50007d] hover:bg-purple-100 font-bold'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#8cc63f]" />
          <span>{isPt ? 'Resumo por Período' : 'Resumen por Período'}</span>
        </button>

        <button
          onClick={() => setIsNewSaleModalOpen(true)}
          className="w-full sm:w-auto sm:ml-auto flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg font-bold text-xs bg-[#76b82a] hover:bg-[#6aa822] text-white transition shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{isPt ? 'Emitir Nova Venda' : 'Crear Venta'}</span>
        </button>
      </div>

      {isResumoPeriodo ? (
        <TryResumoPeriodoView
          language={language}
          onBackToVentas={() => {
            setActiveSubTab('historico');
            onNavigateSubView?.('ventas_lista');
          }}
        />
      ) : (
        /* Main Container Card matching TryController screenshot */
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
        {/* Date Filter & Search input matching screenshot */}
        <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-44">
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">
              {isPt ? 'Data Início' : 'Fecha inicio'}
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

          <div className="flex-1 min-w-[260px]">
            <label className="text-[10px] font-semibold text-slate-500 block mb-1">
              {isPt ? 'Filtro de busca' : 'Buscar'}
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={isPt ? 'Ex: Nº Caixa, Nome do trabalhador ou Descrição' : 'Ejem: N° Caja, Nombre de trabajador y Descripción'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-l-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#76b82a]"
              />
              <button className="h-full px-3.5 py-2 bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 rounded-r-lg font-bold flex items-center justify-center">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: Movement History Table */}
        {activeSubTab === 'historico' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-3 py-2.5">{isPt ? 'Unidade' : 'Unidade'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Caixa' : 'Caixa'}</th>
                  <th className="px-4 py-2.5">{isPt ? 'Trabalhador' : 'Trabajador'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Tipo' : 'Tipo'}</th>
                  <th className="px-4 py-2.5 text-right">{isPt ? 'Valor' : 'Valor'}</th>
                  <th className="px-3 py-2.5 font-mono">{isPt ? 'ID Venda' : 'Id de venda'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Data' : 'Fecha'}</th>
                  <th className="px-4 py-2.5">{isPt ? 'Comentários' : 'Comentários'}</th>
                  <th className="px-4 py-2.5">{isPt ? 'Descrição' : 'Descrição'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Ações' : 'Acciones'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMovements.map((mov, i) => (
                  <tr key={mov.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-3 py-3 font-semibold text-slate-900">{mov.unitName}</td>
                    <td className="px-3 py-3 text-center font-mono text-slate-600">365</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{mov.workerName}</td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          mov.type === 'Ingreso' || mov.type === 'Cobro'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {mov.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-slate-900">
                      R$ {formatCurrency(mov.value)}
                    </td>
                    <td className="px-3 py-3 font-mono text-slate-500">{mov.saleId || '-'}</td>
                    <td className="px-3 py-3 text-slate-500 font-mono text-[11px]">{mov.date}</td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-xs">{mov.comments}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{mov.description}</td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => {
                          const sale = contracts.find((c) => c.saleId === mov.saleId) || contracts[0];
                          setSelectedContractForReceipt(sale);
                        }}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600"
                        title="Ver Comprovante / Carnê"
                      >
                        <FileText className="w-4 h-4 text-[#50007d]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View Mode: Contracts and Sales Table */}
        {activeSubTab === 'ventas' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-3 py-2.5 font-mono">{isPt ? 'ID Venda' : 'ID Venta'}</th>
                  <th className="px-4 py-2.5">{isPt ? 'Cliente' : 'Cliente'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Apelido / Apodo' : 'Apodo'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Unidade' : 'Unidad'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Valor Total' : 'Valor Total'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Parcelas' : 'Cuotas'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Valor Parcela' : 'Valor Cuota'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Frequência' : 'Frecuencia'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Status' : 'Estado'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Saldo Devedor' : 'Saldo'}</th>
                  <th className="px-4 py-2.5 text-center">{isPt ? 'Ações' : 'Acciones'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contracts.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-3 py-3 font-mono font-bold text-[#50007d]">{c.saleId}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{c.clientName}</td>
                    <td className="px-3 py-3 text-slate-600 italic">{c.clientAlias}</td>
                    <td className="px-3 py-3 font-mono text-slate-600">{c.unitName}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">
                      R$ {formatCurrency(c.finalAmount)}
                    </td>
                    <td className="px-3 py-3 text-center font-mono">
                      <span className="text-emerald-700 font-bold">{c.paidInstallments}</span> / {c.installmentsCount}
                    </td>
                    <td className="px-3 py-3 text-right font-mono font-semibold text-slate-700">
                      R$ {formatCurrency(c.installmentValue)}
                    </td>
                    <td className="px-3 py-3 text-slate-600">{c.frequency}</td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Al día' || c.status === 'Activa'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-rose-700">
                      R$ {formatCurrency(c.pendingBalance)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => setSelectedContractForReceipt(c)}
                          className="px-2 py-1 rounded bg-[#50007d] hover:bg-[#400066] text-white font-bold text-[10px] flex items-center space-x-1"
                        >
                          <Printer className="w-3 h-3" />
                          <span>{isPt ? 'Extrato' : 'Extracto'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-2 text-xs text-slate-500 flex justify-between items-center">
          <span>{isPt ? `Mostrando de 1 a 10 registros` : `Mostrando de 1 a 10 registros`}</span>
          <div className="flex space-x-1">
            <button className="px-2 py-0.5 rounded border border-slate-200 text-slate-400">&lt;</button>
            <button className="px-2.5 py-0.5 rounded bg-[#50007d] text-white font-bold">1</button>
            <button className="px-2 py-0.5 rounded border border-slate-200 text-slate-400">&gt;</button>
          </div>
        </div>
      </div>
      )}

      {/* Modal: Novo Ingresso / Entrada */}
      {isNewIncomeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
            <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-[#8cc63f]" />
                <span>{isPt ? 'Registrar Movimento de Caixa' : 'Registro de Movimiento'}</span>
              </h3>
              <button
                onClick={() => setIsNewIncomeModalOpen(false)}
                className="w-7 h-7 rounded-full bg-purple-900 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMovement} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMovType('Ingreso')}
                  className={`py-2 rounded-lg font-bold border transition ${
                    movType === 'Ingreso'
                      ? 'bg-[#76b82a] text-white border-[#76b82a]'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  {isPt ? '+ Entrada / Ingresso' : '+ Ingreso'}
                </button>
                <button
                  type="button"
                  onClick={() => setMovType('Gasto')}
                  className={`py-2 rounded-lg font-bold border transition ${
                    movType === 'Gasto'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 text-slate-700 border-slate-300'
                  }`}
                >
                  {isPt ? '- Despesa / Gasto' : '- Gasto'}
                </button>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {isPt ? 'Categoria' : 'Categoría'}
                </label>
                <select
                  value={movCategory}
                  onChange={(e) => setMovCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium"
                >
                  <option value="Recaudo Adicional">{isPt ? 'Recaudo Adicional (Amortização Extra)' : 'Recaudo Adicional'}</option>
                  <option value="Combustível / Gasolina">{isPt ? 'Combustível / Gasolina' : 'Gasolina'}</option>
                  <option value="Almoço / Refeição">{isPt ? 'Almoço / Refeição' : 'Almuerzo'}</option>
                  <option value="Aporte de Fundo">{isPt ? 'Aporte de Caixa CN' : 'Aporte de caja'}</option>
                  <option value="Outros">{isPt ? 'Outros Gastos de Rota' : 'Otros'}</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {isPt ? 'Valor (R$)' : 'Valor'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={movValue}
                  onChange={(e) => setMovValue(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold font-mono text-slate-900 focus:border-[#76b82a]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {isPt ? 'Descrição' : 'Descripción'}
                </label>
                <input
                  type="text"
                  value={movDescription}
                  onChange={(e) => setMovDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {isPt ? 'Comentários' : 'Comentarios'}
                </label>
                <textarea
                  value={movComments}
                  onChange={(e) => setMovComments(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewIncomeModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                >
                  {isPt ? 'Cancelar' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold"
                >
                  {isPt ? 'Salvar Movimento' : 'Guardar Movimiento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Emitir Nova Venda matching slide 6 & 3 */}
      {isNewSaleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center space-x-2">
                  <CreditCard className="w-5 h-5 text-[#8cc63f]" />
                  <span>{isPt ? 'Nova Venda & Emissão de Carnê' : 'Nueva Venta'}</span>
                </h3>
                <p className="text-xs text-purple-200 font-mono">UGI: 1 - UGI-1 / Carlos Oliveira</p>
              </div>
              <button
                onClick={() => setIsNewSaleModalOpen(false)}
                className="w-7 h-7 rounded-full bg-purple-900 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {isPt ? 'Cliente' : 'Cliente'}
                </label>
                <select
                  value={saleClient}
                  onChange={(e) => setSaleClient(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} ({c.alias}) - CPF: {c.documentNumber} [Score {c.score}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {isPt ? 'Valor da Venda (R$)' : 'Valor de venta*'}
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {isPt ? 'Taxa de Juros (%)' : 'Interés*'}
                  </label>
                  <input
                    type="number"
                    value={saleRate}
                    onChange={(e) => setSaleRate(e.target.value)}
                    required
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold font-mono text-slate-900"
                  />
                </div>
              </div>

              {/* Frequência matching screenshot */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1.5">
                  {isPt ? 'Frequência de Pagamento' : 'Frecuencia'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['Diario', 'Semanal Cuota Fija', 'Semanal Interés', 'Quincenal', 'Mensual'] as const).map((freq) => (
                    <button
                      type="button"
                      key={freq}
                      onClick={() => setSaleFrequency(freq)}
                      className={`p-2 rounded-lg text-center border font-semibold text-[11px] transition ${
                        saleFrequency === freq
                          ? 'bg-[#50007d] text-white border-[#50007d] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {isPt ? 'Número de Parcelas' : 'Cuotas'}
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setSaleInstallments(String(Math.max(1, parseInt(saleInstallments) - 1)))}
                      className="w-8 h-8 rounded bg-slate-200 font-bold text-slate-700"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={saleInstallments}
                      onChange={(e) => setSaleInstallments(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-center font-bold font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setSaleInstallments(String(parseInt(saleInstallments) + 1))}
                      className="w-8 h-8 rounded bg-slate-200 font-bold text-slate-700"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {isPt ? '1ª Data de Cobrança' : 'Primera fecha de cobro'}
                  </label>
                  <input
                    type="date"
                    value={saleFirstDate}
                    onChange={(e) => setSaleFirstDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Simulation Result Box */}
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-purple-700 font-semibold block">{isPt ? 'Valor Final do Carnê:' : 'Valor total final:'}</span>
                  <span className="text-lg font-black text-[#50007d] font-mono">
                    R$ {formatCurrency((parseFloat(saleAmount) || 0) * (1 + (parseFloat(saleRate) || 0) / 100))}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-purple-700 font-semibold block">{isPt ? 'Valor da Parcela:' : 'Valor cuota:'}</span>
                  <span className="text-lg font-black text-[#76b82a] font-mono">
                    R$ {formatCurrency(((parseFloat(saleAmount) || 0) * (1 + (parseFloat(saleRate) || 0) / 100)) / (parseInt(saleInstallments) || 1))}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewSaleModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold"
                >
                  {isPt ? 'Cancelar' : 'Cancelar'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold"
                >
                  {isPt ? 'Confirmar & Gerar Carnê' : 'Guardar Venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Extrato de Pagamento / Carnê em Português matching slide 4/5 */}
      {selectedContractForReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
            {/* Header */}
            <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center space-x-2">
                  <span>{isPt ? 'Extrato de Pagamento & Carnê de Cobrança' : 'Información de la venta'}</span>
                </h3>
                <p className="text-xs text-purple-200 font-mono">
                  {isPt ? 'Unidade' : 'Unidad'}: {selectedContractForReceipt.unitName} • ID Venda: #{selectedContractForReceipt.saleId}
                </p>
              </div>
              <button
                onClick={() => setSelectedContractForReceipt(null)}
                className="w-7 h-7 rounded-full bg-purple-900 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Carnê Content in Portuguese matching TryController requirement */}
            <div className="p-6 space-y-4 text-xs font-sans max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="border-b pb-4 flex justify-between items-start">
                <div>
                  <div className="text-base font-black text-slate-900">{selectedContractForReceipt.clientName}</div>
                  <div className="text-slate-500 font-medium">Apelido: {selectedContractForReceipt.clientAlias}</div>
                  <div className="text-slate-500 font-mono text-[11px]">Código Cliente: #{selectedContractForReceipt.clientId}</div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-0.5 rounded-full font-bold bg-[#8cc63f] text-slate-900">
                    {selectedContractForReceipt.status}
                  </span>
                  <div className="text-slate-400 text-[11px] font-mono mt-1">{selectedContractForReceipt.saleDate}</div>
                </div>
              </div>

              {/* Informações da Venda em Português */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">{isPt ? 'Valor Total da Venda' : 'Valor total venta'}</span>
                  <span className="font-bold font-mono text-slate-900">R$ {formatCurrency(selectedContractForReceipt.finalAmount)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isPt ? 'Valor da Parcela' : 'Valor cuota'}</span>
                  <span className="font-bold font-mono text-[#50007d]">R$ {formatCurrency(selectedContractForReceipt.installmentValue)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isPt ? 'Saldo Pendente' : 'Saldo pendiente'}</span>
                  <span className="font-bold font-mono text-rose-600">R$ {formatCurrency(selectedContractForReceipt.pendingBalance)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isPt ? 'Frequência de Cobrança' : 'Frecuencia'}</span>
                  <span className="font-medium text-slate-800">{selectedContractForReceipt.frequency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isPt ? 'Parcelas Pagas' : 'Cuotas'}</span>
                  <span className="font-mono text-slate-800 font-semibold">{selectedContractForReceipt.paidInstallments} / {selectedContractForReceipt.installmentsCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">{isPt ? 'Dias em Atraso' : 'Días de mora'}</span>
                  <span className="font-mono text-emerald-600 font-semibold">0 dias</span>
                </div>
              </div>

              {/* Tabela do Histórico de Pagamentos */}
              <div>
                <h5 className="font-bold text-slate-800 mb-2 flex items-center justify-between">
                  <span>{isPt ? 'Histórico de Pagamento das Parcelas' : 'Historial de pagos'}</span>
                  <span className="text-[10px] text-slate-400 font-mono">100% {isPt ? 'Sincronizado' : 'Sincronizado'}</span>
                </h5>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-100 font-bold text-slate-700">
                      <tr>
                        <th className="px-3 py-2">{isPt ? 'Data Pgto' : 'Fecha'}</th>
                        <th className="px-3 py-2 text-right">{isPt ? 'Valor Pago' : 'Valor'}</th>
                        <th className="px-3 py-2 text-right">{isPt ? 'Recaudo Adic.' : 'Rec. Adic.'}</th>
                        <th className="px-3 py-2 text-right">{isPt ? 'Saldo Após' : 'Saldo'}</th>
                        <th className="px-3 py-2 text-center">{isPt ? 'Forma' : 'Forma'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-white">
                        <td className="px-3 py-2 font-mono text-slate-600">08/10/2026</td>
                        <td className="px-3 py-2 text-right font-mono font-bold text-emerald-700">R$ {formatCurrency(selectedContractForReceipt.installmentValue)}</td>
                        <td className="px-3 py-2 text-right font-mono text-amber-700">R$ 50,00</td>
                        <td className="px-3 py-2 text-right font-mono text-slate-700">R$ {formatCurrency(selectedContractForReceipt.pendingBalance)}</td>
                        <td className="px-3 py-2 text-center text-slate-600 font-medium">{isPt ? 'Dinheiro' : 'Efectivo'}</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="px-3 py-2 font-mono text-slate-600">07/10/2026</td>
                        <td className="px-3 py-2 text-right font-mono font-bold text-emerald-700">R$ {formatCurrency(selectedContractForReceipt.installmentValue)}</td>
                        <td className="px-3 py-2 text-right font-mono text-slate-400">R$ 0,00</td>
                        <td className="px-3 py-2 text-right font-mono text-slate-700">R$ {formatCurrency(selectedContractForReceipt.pendingBalance + selectedContractForReceipt.installmentValue)}</td>
                        <td className="px-3 py-2 text-center text-slate-600 font-medium">Pix</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Botões de Ação para o Cliente (WhatsApp / PDF / Imprimir) */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => alert(isPt ? 'Comprovante em PDF baixado com sucesso!' : '¡PDF descargado con éxito!')}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Baixar Extrato (PDF)' : 'Descargar PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(isPt ? 'Link do extrato compartilhado via WhatsApp!' : '¡Compartido vía WhatsApp!')}
                  className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center space-x-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Enviar via WhatsApp' : 'Enviar WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedContractForReceipt(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  {isPt ? 'Fechar' : 'Cerrar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
