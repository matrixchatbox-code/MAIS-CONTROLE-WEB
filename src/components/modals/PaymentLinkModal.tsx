import React, { useState } from 'react';
import {
  X,
  Link2,
  Copy,
  Check,
  Share2,
  QrCode,
  DollarSign,
  Calendar,
  ShieldCheck,
  Send,
  Smartphone,
  CreditCard,
  Building,
} from 'lucide-react';

interface PaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
  clientPhone?: string;
  contractId?: string;
  defaultAmount?: number;
}

export const PaymentLinkModal: React.FC<PaymentLinkModalProps> = ({
  isOpen,
  onClose,
  clientName = 'Anielo Gomes Corvino',
  clientPhone = '+55 11 98452-1104',
  contractId = '1003161',
  defaultAmount = 120,
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [expirationHours, setExpirationHours] = useState<number>(24);
  const [paymentType, setPaymentType] = useState<'pix' | 'cartao' | 'todos'>('pix');
  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  const [hasCopiedPix, setHasCopiedPix] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);

  if (!isOpen) return null;

  // Link gerado dinâmico
  const linkId = `pay-${contractId}-${Math.floor(1000 + Math.random() * 9000)}`;
  const paymentUrl = `https://pagamento.maiscontrole.app/fatura/${linkId}?v=${amount.toFixed(2)}`;
  const pixCopiaECola = `00020126580014br.gov.bcb.pix0136maiscontrole-399901@pix.com.br520400005303986540${amount.toFixed(2).replace('.', '')}5802BR5916MAIS CONTROLE LTDA6009SAO PAULO62070503***6304E8A2`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(paymentUrl);
    setHasCopiedLink(true);
    setTimeout(() => setHasCopiedLink(false), 2000);
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixCopiaECola);
    setHasCopiedPix(true);
    setTimeout(() => setHasCopiedPix(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const textMsg = encodeURIComponent(
      `Olá *${clientName}*! Segue o link seguro para pagamento da sua parcela do contrato *#${contractId}* no valor de *R$ ${amount.toFixed(2)}*:\n\n` +
      `🔗 *Link de Pagamento:* ${paymentUrl}\n` +
      `🔑 *PIX Copia e Cola:* ${pixCopiaECola}\n\n` +
      `Este link é válido por ${expirationHours} horas. Após o pagamento, a baixa é automática em nosso sistema.`
    );
    const cleanPhone = clientPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone || '5511984521104'}?text=${textMsg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#50007d] to-[#3a005c] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Link2 className="w-5 h-5 text-[#8cc63f]" />
            </div>
            <div>
              <h3 className="font-black text-base tracking-tight">Gerar Link de Pagamento</h3>
              <p className="text-xs text-purple-200">
                Cobrança oficial com baixa automática PIX / Cartão
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

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800 text-xs">
          {/* Dados do Cliente */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Destinatário</span>
              <p className="font-black text-sm text-slate-900">{clientName}</p>
              <p className="text-slate-500 font-mono text-[11px]">Contrato #{contractId} • {clientPhone}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
              ATIVO
            </span>
          </div>

          {/* Valor e Expiração */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Valor da Parcela (R$)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.5"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-sm font-black font-mono text-slate-900 focus:outline-none focus:border-[#76b82a]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Validade do Link</label>
              <select
                value={expirationHours}
                onChange={(e) => setExpirationHours(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#76b82a]"
              >
                <option value={12}>12 horas</option>
                <option value={24}>24 horas (Recomendado)</option>
                <option value={48}>48 horas</option>
                <option value={72}>3 dias</option>
                <option value={168}>7 dias</option>
              </select>
            </div>
          </div>

          {/* Formas aceitas */}
          <div>
            <label className="font-bold text-slate-700 block mb-1">Método Preferencial</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentType('pix')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold transition cursor-pointer ${
                  paymentType === 'pix'
                    ? 'border-[#76b82a] bg-[#eaf5dc] text-[#50007d]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-[#76b82a]" />
                <span>PIX Instantâneo</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('cartao')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold transition cursor-pointer ${
                  paymentType === 'cartao'
                    ? 'border-[#76b82a] bg-[#eaf5dc] text-[#50007d]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#50007d]" />
                <span>Cartão de Crédito</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType('todos')}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 font-bold transition cursor-pointer ${
                  paymentType === 'todos'
                    ? 'border-[#76b82a] bg-[#eaf5dc] text-[#50007d]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>PIX + Cartão</span>
              </button>
            </div>
          </div>

          {/* Link Gerado com Visualização */}
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#50007d] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Link de Pagamento Pronto para Envio
              </span>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full font-bold">
                Expira em {expirationHours}h
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={paymentUrl}
                className="flex-1 bg-white border border-purple-300 rounded-xl px-3 py-1.5 text-[11px] font-mono text-slate-700 select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl bg-[#50007d] text-white font-bold text-xs flex items-center space-x-1 hover:bg-[#400066] transition cursor-pointer shrink-0 shadow-xs"
                title="Copiar URL"
              >
                {hasCopiedLink ? <Check className="w-3.5 h-3.5 text-[#8cc63f]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopiedLink ? 'Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>

            {/* PIX Copia e Cola */}
            <div className="pt-2 border-t border-purple-200/70">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase text-slate-600">
                  Código PIX (Copia e Cola Direto)
                </span>
                <button
                  onClick={handleCopyPix}
                  className="text-[11px] font-bold text-[#76b82a] hover:underline flex items-center space-x-1 cursor-pointer"
                >
                  {hasCopiedPix ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{hasCopiedPix ? 'Chave Copiada!' : 'Copiar Chave PIX'}</span>
                </button>
              </div>
              <div className="p-2 bg-white rounded-lg border border-purple-200 font-mono text-[9px] text-slate-500 break-all select-all">
                {pixCopiaECola}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-100 transition cursor-pointer"
          >
            Fechar
          </button>

          <button
            onClick={handleSendWhatsApp}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs flex items-center justify-center space-x-2 transition shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4" />
            <span>Disparar Link no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
