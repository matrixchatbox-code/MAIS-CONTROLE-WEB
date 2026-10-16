import React, { useState } from 'react';
import { X, DollarSign, Calendar, User, Percent, CheckCircle } from 'lucide-react';
import { ClientProfile, SaleContract, Language } from '../../types';

interface NovaVendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: ClientProfile[];
  onAddSale: (contract: SaleContract) => void;
  language: Language;
}

export const NovaVendaModal: React.FC<NovaVendaModalProps> = ({
  isOpen,
  onClose,
  clients,
  onAddSale,
  language,
}) => {
  const isPt = language === 'pt';
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [amount, setAmount] = useState<number>(1000);
  const [interestRate, setInterestRate] = useState<number>(20);
  const [installmentsCount, setInstallmentsCount] = useState<number>(24);
  const [frequency, setFrequency] = useState<'Diario' | 'Semanal Cuota Fija' | 'Quincenal' | 'Mensual'>('Diario');
  const [unitId, setUnitId] = useState('ugi-1');

  if (!isOpen) return null;

  const finalAmount = amount * (1 + interestRate / 100);
  const installmentValue = installmentsCount > 0 ? finalAmount / installmentsCount : 0;
  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    const newContract: SaleContract = {
      id: `cont-${Date.now()}`,
      saleId: `VEN-${Math.floor(10000 + Math.random() * 90000)}`,
      clientId: selectedClient.id,
      clientName: selectedClient.fullName,
      clientAlias: selectedClient.alias,
      unitId: unitId,
      unitName: unitId === 'ugi-1' ? '1 - UGI-1' : '2 - UGI-2',
      saleDate: new Date().toLocaleDateString('pt-BR'),
      amount: amount,
      interestRate: interestRate,
      finalAmount: finalAmount,
      installmentsCount: installmentsCount,
      installmentValue: installmentValue,
      paidInstallments: 0,
      pendingBalance: finalAmount,
      frequency: frequency,
      collectionDay: 'Segunda',
      firstPaymentDate: new Date().toLocaleDateString('pt-BR'),
      status: 'Activa',
      additionalCollected: 0,
      extraCollected: 0,
    };

    onAddSale(newContract);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 w-full max-w-lg overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-[#8cc63f]" />
            <h3 className="font-bold text-base">
              {isPt ? 'Nova Venda / Contrato' : 'Nueva Venta / Contrato'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Client Selection */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#50007d]" />
              {isPt ? 'Cliente' : 'Cliente'}
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#50007d] focus:outline-none"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.alias} - {c.fullName} ({c.documentType}: {c.documentNumber}) [Score: {c.score}]
                </option>
              ))}
            </select>
          </div>

          {/* Unit Selection */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              {isPt ? 'Unidade de Cobrança (UGI)' : 'Unidad (UGI)'}
            </label>
            <select
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#50007d] focus:outline-none"
            >
              <option value="ugi-1">1 - UGI-1 (Carlos Oliveira)</option>
              <option value="ugi-2">2 - UGI-2 (Roberto Mendes)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Amount */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {isPt ? 'Valor Emprestado (R$)' : 'Valor Prestado'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={100}
                step={50}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-bold focus:ring-1 focus:ring-[#50007d] focus:outline-none"
                required
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <Percent className="w-3 h-3 text-[#76b82a]" />
                {isPt ? 'Taxa de Juros (%)' : 'Tasa de Interés (%)'}
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0}
                max={100}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-bold focus:ring-1 focus:ring-[#50007d] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Installments Count */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {isPt ? 'Quantidade de Parcelas' : 'Número de Cuotas'}
              </label>
              <input
                type="number"
                value={installmentsCount}
                onChange={(e) => setInstallmentsCount(Number(e.target.value))}
                min={1}
                max={360}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#50007d] focus:outline-none"
                required
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {isPt ? 'Frequência de Pagamento' : 'Modalidad de Cobro'}
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-1 focus:ring-[#50007d] focus:outline-none"
              >
                <option value="Diario">{isPt ? 'Diário (Seg a Sáb)' : 'Diario'}</option>
                <option value="Semanal Cuota Fija">{isPt ? 'Semanal' : 'Semanal'}</option>
                <option value="Quincenal">{isPt ? 'Quinzenal' : 'Quincenal'}</option>
                <option value="Mensual">{isPt ? 'Mensal' : 'Mensual'}</option>
              </select>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#f7f2fa] border border-purple-200 rounded-xl p-3.5 space-y-1.5 text-slate-700">
            <div className="flex justify-between">
              <span>{isPt ? 'Total a Cobrar:' : 'Total a Cobrar:'}</span>
              <span className="font-bold text-[#50007d] font-mono text-sm">
                R$ {finalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{isPt ? 'Valor da Parcela:' : 'Valor de Cuota:'}</span>
              <span className="font-bold text-[#76b82a] font-mono text-sm">
                R$ {installmentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold transition"
            >
              {isPt ? 'Cancelar' : 'Cancelar'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#76b82a] hover:bg-[#68a722] text-white font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isPt ? 'Criar Contrato' : 'Crear Contrato'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
