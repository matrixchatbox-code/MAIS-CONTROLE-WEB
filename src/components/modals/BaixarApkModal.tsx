import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
  Share2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Info,
  Apple,
} from 'lucide-react';

interface BaixarApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BaixarApkModal: React.FC<BaixarApkModalProps> = ({ isOpen, onClose }) => {
  const [workerPhone, setWorkerPhone] = useState('11 98451-2290');
  const [workerName, setWorkerName] = useState('Novo Cobrador / Trabalhador');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://mais-controle.ai.studio';
  const apkDownloadUrl = `${currentOrigin}/mais-controle-trabalhador.apk`;
  const webAppUrl = `${currentOrigin}/#/app`;

  const whatsappMessage = 
    `Olá *${workerName}*! Segue seu aplicativo oficial *MAIS CONTROLE | Trabalhador*:\n\n` +
    `📦 *Download do APK Oficial (Android - 26 MB):*\n${apkDownloadUrl}\n\n` +
    `🌐 *Acesso Direto Online / iOS (PWA):*\n${webAppUrl}\n\n` +
    `*Passo a passo para instalar no seu aparelho celular:*\n` +
    `1. Clique no link do APK acima para fazer o download (26 MB).\n` +
    `2. Quando concluir, abra o arquivo e clique em 'Instalar'.\n` +
    `3. Se o Android pedir, marque 'Permitir desta fonte'.\n` +
    `4. Abra o app Mais Controle e acesse com seus dados de acesso!\n\n` +
    `Suporte e Central de Operações Mais Controle.`;

  const handleCopyApkLink = () => {
    navigator.clipboard?.writeText(apkDownloadUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard?.writeText(whatsappMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = workerPhone.replace(/\D/g, '');
    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/55${cleanPhone || '11984512290'}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#50007d] via-[#420068] to-[#2e004a] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Smartphone className="w-5 h-5 text-[#8cc63f]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-base tracking-tight">Gerar & Baixar APK do Trabalhador</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#8cc63f] text-slate-950 uppercase">
                  v6.7.0.4 APK
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Instalação direta no aparelho celular Android ou iOS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800 text-xs">
          {/* Card Principal: Download do Arquivo APK */}
          <div className="bg-gradient-to-br from-purple-50 via-white to-slate-50 border-2 border-[#76b82a] rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#50007d] block mb-0.5">
                  Pacote de Instalação Oficial
                </span>
                <h4 className="text-base font-black text-slate-900">
                  mais-controle-trabalhador.apk
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  APK Universal Nativo Android • Tamanho: <b className="text-slate-800">60 MB</b> • Assinado com v1/v2 • Android 7.0 a 15
                </p>
              </div>

              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <a
                href={apkDownloadUrl}
                download="mais-controle-trabalhador.apk"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#76b82a] hover:bg-[#6aa822] text-white font-black text-xs flex items-center justify-center space-x-2 transition shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>BAIXAR ARQUIVO APK (60 MB)</span>
              </a>

              <button
                onClick={handleCopyApkLink}
                className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
                title="Copiar Link de Download do APK"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link APK'}</span>
              </button>
            </div>
          </div>

          {/* Envio Direto para o Celular do Trabalhador via WhatsApp */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#25D366]" />
                Enviar APK / Acesso pelo WhatsApp do Trabalhador
              </span>
              <span className="text-[10px] text-slate-400 font-mono">1-Clique</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">Nome do Trabalhador</label>
                <input
                  type="text"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  placeholder="Nome do cobrador"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-0.5">WhatsApp com DDD</label>
                <input
                  type="text"
                  value={workerPhone}
                  onChange={(e) => setWorkerPhone(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-mono"
                  placeholder="11 98451-2290"
                />
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs flex items-center justify-center space-x-2 transition shadow-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar Instruções de Instalação no WhatsApp</span>
            </button>
          </div>

          {/* Instruções de Instalação Passo a Passo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-700">
            {/* Android */}
            <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Instalação no Android (APK)</span>
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-600">
                <li>Baixe o arquivo <b>.apk</b> no celular.</li>
                <li>Toque no arquivo baixado nas notificações.</li>
                <li>Se solicitado, autorize <b>"Fontes Desconhecidas"</b>.</li>
                <li>Toque em <b>"Instalar"</b> e abra o app.</li>
              </ol>
            </div>

            {/* iOS */}
            <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold text-slate-900">
                <Apple className="w-4 h-4 text-slate-800" />
                <span>Instalação no iPhone (PWA)</span>
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-600">
                <li>Abra o link do app no <b>Safari</b>.</li>
                <li>Toque no botão <b>Compartilhar</b> (ícone do quadrado com seta).</li>
                <li>Selecione <b>"Adicionar à Tela de Início"</b>.</li>
                <li>O ícone nativo Mais Controle ficará salvo.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-100 transition cursor-pointer"
          >
            Fechar
          </button>

          <a
            href={webAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#50007d] hover:bg-[#400066] text-white font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
          >
            <span>Testar App Mobile Online</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8cc63f]" />
          </a>
        </div>
      </div>
    </div>
  );
};
