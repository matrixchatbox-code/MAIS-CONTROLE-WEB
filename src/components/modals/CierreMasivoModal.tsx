import React, { useState } from 'react';
import { X, Lock, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { playFeedbackTone, playSuccessSound } from '../../utils/audio';

interface CierreMasivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCierre: () => void;
}

export const CierreMasivoModal: React.FC<CierreMasivoModalProps> = ({
  isOpen,
  onClose,
  onExecuteCierre,
}) => {
  const [pin, setPin] = useState('1234');
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const handleCierre = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    playFeedbackTone(600);

    setTimeout(() => {
      setIsProcessing(false);
      setIsFinished(true);
      playSuccessSound();
      onExecuteCierre();
    }, 1200);
  };

  const handleReset = () => {
    setIsFinished(false);
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl relative overflow-hidden animate-in fade-in">
        {/* Header Purple */}
        <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Lock className="w-5 h-5 text-[#8cc63f]" />
            <div>
              <h3 className="font-bold text-base">Cierre Masivo de Cajas en CNs</h3>
              <p className="text-xs text-purple-200">Consolidação e encerramento unificado</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-7 h-7 rounded-full bg-purple-900 flex items-center justify-center text-white hover:bg-purple-950"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-xs text-slate-700">
          {!isFinished ? (
            <form onSubmit={handleCierre} className="space-y-4">
              {/* Alert banner matching TryController PDF slide 3 */}
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 space-y-1">
                <div className="font-black text-xs text-[#50007d] uppercase flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>¡Todas las cajas de las Ugis deben estar cerradas!</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Dependiendo del CN seleccionado, todas las unidades dependientes deben estar previamente cerradas en el sistema antes de ejecutar el Cierre Masivo.
                </p>
              </div>

              {/* CN boxes status */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>/1/ - CN Sociedade 399901:</span>
                  <span className="font-bold text-emerald-700">2 UGIs Fechadas (100%)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>/2/ - Rapi Crédito Campinas:</span>
                  <span className="font-bold text-emerald-700">1 UGI Fechada (100%)</span>
                </div>
                <div className="flex justify-between font-bold border-t border-slate-200 pt-2 text-slate-900 text-xs">
                  <span>Total Consolidado para Fechamento:</span>
                  <span className="text-[#50007d]">R$ 23.633,58</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Chave Mestre de Segurança (PIN)
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-center font-mono font-bold text-base tracking-widest text-slate-900"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  required
                  className="w-4 h-4 rounded text-[#76b82a] border-slate-300"
                />
                <span className="text-slate-600 font-medium text-[11px]">
                  Confirmo o fechamento massivo de todas as caixas selecionadas
                </span>
              </label>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!confirmed || isProcessing}
                  className="px-5 py-2 rounded-lg bg-[#50007d] hover:bg-[#400066] disabled:opacity-50 text-white font-bold text-xs shadow-md"
                >
                  {isProcessing ? 'Processando Cierre...' : 'Executar Cierre Masivo'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-base text-slate-900">
                ¡Cierre Masivo Executado com Sucesso!
              </h4>
              <p className="text-slate-500 text-xs">
                Todas as caixas das UGIs associadas ao CN foram encerradas e travadas para nova conciliação.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-6 py-2 rounded-lg bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold text-xs"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
