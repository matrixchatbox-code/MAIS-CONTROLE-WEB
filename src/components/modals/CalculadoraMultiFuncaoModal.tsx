import React, { useState } from 'react';
import {
  X,
  Percent,
  Calculator,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldAlert,
  RotateCcw,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Sliders,
} from 'lucide-react';

interface CalculadoraMultiFuncaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'juros' | 'desconto' | 'multa' | 'amortizacao' | 'giro';
  onApplyCalculatedValues?: (values: any) => void;
}

export const CalculadoraMultiFuncaoModal: React.FC<CalculadoraMultiFuncaoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'juros',
  onApplyCalculatedValues,
}) => {
  const [activeTab, setActiveTab] = useState<'juros' | 'desconto' | 'multa' | 'amortizacao' | 'giro'>(initialTab);

  // 1. Juros / Venda State
  const [valorBase, setValorBase] = useState<number>(1000);
  const [taxaJuros, setTaxaJuros] = useState<number>(20);
  const [parcelas, setParcelas] = useState<number>(24);
  const [frequencia, setFrequencia] = useState<'diario' | 'semanal' | 'mensal'>('diario');

  // 2. Desconto / Quitar State
  const [saldoQuitar, setSaldoQuitar] = useState<number>(1080);
  const [descontoPct, setDescontoPct] = useState<number>(10);

  // 3. Multa & Atraso State
  const [saldoAtrasado, setSaldoAtrasado] = useState<number>(1080);
  const [diasAtraso, setDiasAtraso] = useState<number>(5);
  const [multaAtrasoPct, setMultaAtrasoPct] = useState<number>(5);
  const [jurosDiarioPct, setJurosDiarioPct] = useState<number>(0.33);

  // 4. Amortização State
  const [saldoAmortizar, setSaldoAmortizar] = useState<number>(1200);
  const [entradaAmortizar, setEntradaAmortizar] = useState<number>(300);
  const [novasParcelas, setNovasParcelas] = useState<number>(18);
  const [novaTaxa, setNovaTaxa] = useState<number>(15);

  // 5. Giro / Rentabilidade State
  const [capitalEmprestado, setCapitalEmprestado] = useState<number>(5000);
  const [diasCiclo, setDiasCiclo] = useState<number>(30);
  const [taxaCiclo, setTaxaCiclo] = useState<number>(20);

  if (!isOpen) return null;

  // Cálculos 1: Juros / Venda
  const lucroJuros = (valorBase * taxaJuros) / 100;
  const totalContrato = valorBase + lucroJuros;
  const valorParcela = parcelas > 0 ? totalContrato / parcelas : 0;

  // Cálculos 2: Desconto / Quitar
  const valorDesconto = (saldoQuitar * descontoPct) / 100;
  const valorQuitacaoFinal = saldoQuitar - valorDesconto;

  // Cálculos 3: Multa & Atraso
  const valorMulta = (saldoAtrasado * multaAtrasoPct) / 100;
  const valorJurosMora = (saldoAtrasado * (jurosDiarioPct * diasAtraso)) / 100;
  const saldoDevedorAtualizado = saldoAtrasado + valorMulta + valorJurosMora;

  // Cálculos 4: Amortização
  const saldoAposEntrada = Math.max(0, saldoAmortizar - entradaAmortizar);
  const jurosRenegociacao = (saldoAposEntrada * novaTaxa) / 100;
  const totalRenegociado = saldoAposEntrada + jurosRenegociacao;
  const novaParcelaValor = novasParcelas > 0 ? totalRenegociado / novasParcelas : 0;

  // Cálculos 5: Giro
  const retornoBrutoGiro = (capitalEmprestado * taxaCiclo) / 100;
  const capitalFinalGiro = capitalEmprestado + retornoBrutoGiro;
  const rentabilidadeMensal = ((retornoBrutoGiro / capitalEmprestado) * (30 / Math.max(1, diasCiclo))) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#50007d] to-[#3a005c] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Calculator className="w-5 h-5 text-[#8cc63f]" />
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight">Calculadora % Mais Controle</h3>
              <p className="text-xs text-purple-200">
                Multi-Ferramentas financeiras de rota, taxas e amortizações
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas Superiores Multi-Função */}
        <div className="flex items-center overflow-x-auto custom-scrollbar bg-slate-100 p-1.5 border-b border-slate-200 gap-1 text-[11px] font-bold">
          <button
            onClick={() => setActiveTab('juros')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'juros'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            ✓ Juros / Venda
          </button>

          <button
            onClick={() => setActiveTab('desconto')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'desconto'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            ⚡ Desconto / Quitar
          </button>

          <button
            onClick={() => setActiveTab('multa')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'multa'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            ⚠️ Multa & Atraso
          </button>

          <button
            onClick={() => setActiveTab('amortizacao')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'amortizacao'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            🔄 Amortização
          </button>

          <button
            onClick={() => setActiveTab('giro')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer ${
              activeTab === 'giro'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            📈 Giro & Retorno
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* TAB 1: JUROS / VENDA */}
          {activeTab === 'juros' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Valor Base (R$)</label>
                  <input
                    type="number"
                    value={valorBase}
                    onChange={(e) => setValorBase(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Taxa de Juros (%)</label>
                  <input
                    type="number"
                    value={taxaJuros}
                    onChange={(e) => setTaxaJuros(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qtd. de Parcelas</label>
                  <input
                    type="number"
                    value={parcelas}
                    onChange={(e) => setParcelas(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Frequência</label>
                  <select
                    value={frequencia}
                    onChange={(e) => setFrequencia(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#76b82a]"
                  >
                    <option value="diario">Diário (Seg a Sáb)</option>
                    <option value="semanal">Semanal</option>
                    <option value="mensal">Mensal</option>
                  </select>
                </div>
              </div>

              {/* Box Demonstrativo Conforme Imagem */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Lucro / Juros:</span>
                  <span className="font-black text-emerald-600 text-sm">
                    + R$ {lucroJuros.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-800 pt-1 border-t border-slate-200">
                  <span className="font-bold">Total do Contrato:</span>
                  <span className="font-black text-base text-[#50007d]">
                    R$ {totalContrato.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-[#eaf5dc] p-2.5 rounded-xl border border-[#c3e699]">
                  <span className="font-bold text-slate-800 font-sans text-xs">
                    Valor Parcela ({parcelas}x):
                  </span>
                  <span className="font-black text-base text-slate-900">
                    R$ {valorParcela.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESCONTO / QUITAR */}
          {activeTab === 'desconto' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saldo Devedor (R$)</label>
                  <input
                    type="number"
                    value={saldoQuitar}
                    onChange={(e) => setSaldoQuitar(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Desconto para Quitação (%)</label>
                  <input
                    type="number"
                    value={descontoPct}
                    onChange={(e) => setDescontoPct(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5 font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Economia do Cliente:</span>
                  <span className="font-black text-emerald-600 text-sm">
                    - R$ {valorDesconto.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-800 pt-1 border-t border-slate-200">
                  <span className="font-bold">Saldo Original:</span>
                  <span className="font-bold text-slate-700">R$ {saldoQuitar.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center bg-emerald-50 p-2.5 rounded-xl border border-emerald-300">
                  <span className="font-bold text-emerald-900 font-sans text-xs">
                    Valor Final para Quitar à Vista:
                  </span>
                  <span className="font-black text-base text-emerald-800">
                    R$ {valorQuitacaoFinal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MULTA & ATRASO (NOVIDADE SOLICITADA PELO CLIENTE) */}
          {activeTab === 'multa' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <b>Cálculo Oficial de Atraso:</b> Aplica multa contratual fixa/percentual mais juros moratórios proporcionais aos dias vencidos.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saldo Vencido (R$)</label>
                  <input
                    type="number"
                    value={saldoAtrasado}
                    onChange={(e) => setSaldoAtrasado(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dias em Atraso</label>
                  <input
                    type="number"
                    value={diasAtraso}
                    onChange={(e) => setDiasAtraso(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-rose-700 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Multa por Atraso (%)</label>
                  <input
                    type="number"
                    value={multaAtrasoPct}
                    onChange={(e) => setMultaAtrasoPct(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Juros de Mora Diários (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={jurosDiarioPct}
                    onChange={(e) => setJurosDiarioPct(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Saldo Original:</span>
                  <span className="font-bold">R$ {saldoAtrasado.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600">
                  <span>+ Multa Contratual ({multaAtrasoPct}%):</span>
                  <span className="font-bold">+ R$ {valorMulta.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-rose-600">
                  <span>+ Juros Moratórios ({diasAtraso} dias):</span>
                  <span className="font-bold">+ R$ {valorJurosMora.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center bg-rose-50 p-2.5 rounded-xl border border-rose-300 pt-2 border-t mt-1">
                  <span className="font-bold text-rose-950 font-sans text-xs">
                    Novo Saldo Devedor Atualizado:
                  </span>
                  <span className="font-black text-base text-rose-700">
                    R$ {saldoDevedorAtualizado.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AMORTIZAÇÃO & RENEGOCIAÇÃO */}
          {activeTab === 'amortizacao' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Saldo Atual (R$)</label>
                  <input
                    type="number"
                    value={saldoAmortizar}
                    onChange={(e) => setSaldoAmortizar(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Entrada / Abatimento (R$)</label>
                  <input
                    type="number"
                    value={entradaAmortizar}
                    onChange={(e) => setEntradaAmortizar(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Novas Parcelas</label>
                  <input
                    type="number"
                    value={novasParcelas}
                    onChange={(e) => setNovasParcelas(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nova Taxa (%)</label>
                  <input
                    type="number"
                    value={novaTaxa}
                    onChange={(e) => setNovaTaxa(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-black font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Saldo a Financiar:</span>
                  <span className="font-bold">R$ {saldoAposEntrada.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Novo Total Renegociado:</span>
                  <span className="font-black text-[#50007d]">R$ {totalRenegociado.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                  <span className="font-bold text-purple-950 font-sans text-xs">
                    Nova Parcela ({novasParcelas}x):
                  </span>
                  <span className="font-black text-base text-[#50007d]">
                    R$ {novaParcelaValor.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GIRO & RETORNO */}
          {activeTab === 'giro' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Capital (R$)</label>
                  <input
                    type="number"
                    value={capitalEmprestado}
                    onChange={(e) => setCapitalEmprestado(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-black font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ciclo (Dias)</label>
                  <input
                    type="number"
                    value={diasCiclo}
                    onChange={(e) => setDiasCiclo(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-black font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Taxa Ciclo (%)</label>
                  <input
                    type="number"
                    value={taxaCiclo}
                    onChange={(e) => setTaxaCiclo(Number(e.target.value) || 0)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-black font-mono"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 font-mono">
                <div className="flex justify-between items-center text-slate-600">
                  <span>Lucro Bruto do Ciclo:</span>
                  <span className="font-black text-emerald-600">+ R$ {retornoBrutoGiro.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span>Montante Total Recuperado:</span>
                  <span className="font-bold">R$ {capitalFinalGiro.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-[#eaf5dc] p-2.5 rounded-xl border border-[#c3e699]">
                  <span className="font-bold text-slate-900 font-sans text-xs">
                    Taxa Efetiva Mensal Equivalente:
                  </span>
                  <span className="font-black text-base text-emerald-700">
                    {rentabilidadeMensal.toFixed(1)}% / mês
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-100 transition cursor-pointer"
          >
            Fechar
          </button>

          <button
            onClick={() => {
              if (onApplyCalculatedValues) {
                onApplyCalculatedValues({
                  activeTab,
                  valorBase,
                  totalContrato,
                  valorParcela,
                  saldoDevedorAtualizado,
                  valorQuitacaoFinal,
                });
              }
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#50007d] hover:bg-[#3f0063] text-white font-black text-xs shadow-md transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Concluir & Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};
