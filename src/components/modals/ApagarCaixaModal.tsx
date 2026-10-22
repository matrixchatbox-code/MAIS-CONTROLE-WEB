import React, { useState } from 'react';
import {
  X,
  Trash2,
  AlertTriangle,
  Lock,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { CashMovement } from '../../types';

interface ApagarCaixaModalProps {
  isOpen: boolean;
  onClose: () => void;
  movements?: CashMovement[];
  onDeleteMovement?: (movementId: string) => void;
  onResetCaixa?: (motivo: string) => void;
}

export const ApagarCaixaModal: React.FC<ApagarCaixaModalProps> = ({
  isOpen,
  onClose,
  movements = [],
  onDeleteMovement,
  onResetCaixa,
}) => {
  const [activeTab, setActiveTab] = useState<'apagar_movimento' | 'zerar_caixa'>('apagar_movimento');
  const [selectedMovementId, setSelectedMovementId] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [motivo, setMotivo] = useState<string>('Lançamento duplicado ou incorreto');
  const [observacao, setObservacao] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const validPin = '1234'; // PIN padrão de segurança de rota

  const handleExecuteDelete = () => {
    setPinError(null);
    if (pinInput !== validPin) {
      setPinError('Código PIN de segurança incorreto! (Padrão de autorização: 1234)');
      return;
    }

    if (activeTab === 'apagar_movimento') {
      if (!selectedMovementId && movements.length > 0) {
        setPinError('Selecione o movimento que deseja excluir.');
        return;
      }
      if (onDeleteMovement) {
        onDeleteMovement(selectedMovementId || movements[0]?.id);
      }
      setActionSuccess('Movimento excluído com sucesso! Saldo do caixa recalculado automaticamente.');
    } else {
      if (onResetCaixa) {
        onResetCaixa(motivo);
      }
      setActionSuccess('Caixa zerado e limpo com sucesso! Todos os lançamentos foram cancelados.');
    }

    setTimeout(() => {
      setActionSuccess(null);
      setPinInput('');
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-rose-950 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Trash2 className="w-5 h-5 text-rose-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-base tracking-tight">Ferramenta de Apagar Caixa & Movimentos</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-200 text-rose-950 uppercase">
                  Segurança Rota
                </span>
              </div>
              <p className="text-xs text-rose-100">
                Sistema facilitador para exclusão, estornos e limpeza do caixa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab('apagar_movimento');
              setPinError(null);
            }}
            className={`py-2 rounded-xl transition ${
              activeTab === 'apagar_movimento'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Excluir Movimento Específico
          </button>

          <button
            onClick={() => {
              setActiveTab('zerar_caixa');
              setPinError(null);
            }}
            className={`py-2 rounded-xl transition ${
              activeTab === 'zerar_caixa'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Zerar / Apagar Caixa Inteiro
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-slate-800">
          {actionSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-black text-sm text-emerald-900">{actionSuccess}</h4>
              <p className="text-xs text-emerald-700">Fechando modal...</p>
            </div>
          ) : (
            <>
              {/* Aviso de Segurança */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start space-x-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <b className="block">Ação de Auditoria e Estorno Controlada</b>
                  <span>
                    Todas as exclusões atualizam o saldo do caixa em tempo real e ficam registradas no livro de auditoria da unidade.
                  </span>
                </div>
              </div>

              {activeTab === 'apagar_movimento' ? (
                <div className="space-y-3">
                  <label className="font-bold text-slate-700 block">
                    Selecione o Movimento a ser Apagado:
                  </label>

                  {movements.length === 0 ? (
                    <div className="p-4 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-medium">
                      Nenhum movimento pendente de exclusão no caixa atual.
                    </div>
                  ) : (
                    <div className="max-h-44 overflow-y-auto custom-scrollbar space-y-2 border border-slate-200 rounded-xl p-2 bg-slate-50">
                      {movements.map((mov) => (
                        <div
                          key={mov.id}
                          onClick={() => setSelectedMovementId(mov.id)}
                          className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition ${
                            selectedMovementId === mov.id || (!selectedMovementId && mov === movements[0])
                              ? 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400'
                              : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          <div>
                            <span className="font-black text-xs block">{mov.category || mov.description}</span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Tipo: {mov.type} • {mov.workerName || 'Cobrador'}
                            </span>
                          </div>
                          <span className="font-mono font-black text-xs text-rose-700">
                            R$ {mov.value.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-1">
                    <span className="font-black text-xs block">⚠️ Atenção: Zerar Caixa do Dia</span>
                    <p className="text-[11px] text-rose-800">
                      Esta operação estorna todos os gastos, retiradas e receitas avulsas registradas nesta sessão, retornando o saldo para zero.
                    </p>
                  </div>
                </div>
              )}

              {/* Motivo Obrigatório */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Motivo da Exclusão / Estorno*
                </label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-rose-500"
                >
                  <option value="Lançamento duplicado ou incorreto">Lançamento duplicado ou incorreto</option>
                  <option value="Valor digitado errado pelo operador">Valor digitado errado pelo operador</option>
                  <option value="Cancelamento de despesa / rota abortada">Cancelamento de despesa / rota abortada</option>
                  <option value="Ajuste de conferência física de caixa">Ajuste de conferência física de caixa</option>
                  <option value="Outro motivo operacional">Outro motivo operacional</option>
                </select>
              </div>

              {/* PIN de Segurança Autorizadora */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-rose-600" />
                    Código PIN de Segurança (Padrão: 1234)*
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">Supervisor / Rota</span>
                </div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Digite o PIN de 4 dígitos (ex: 1234)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError(null);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono tracking-widest text-center text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition"
                />
                {pinError && (
                  <p className="text-rose-600 font-bold text-[11px] mt-1">{pinError}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!actionSuccess && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-100 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              onClick={handleExecuteDelete}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center space-x-1.5 shadow-md transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Trash2 className="w-4 h-4" />
              <span>
                {activeTab === 'apagar_movimento' ? 'Confirmar Exclusão' : 'Zerar Caixa Agora'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
