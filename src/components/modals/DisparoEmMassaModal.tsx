import React, { useState } from 'react';
import {
  X,
  Send,
  Zap,
  Users,
  CheckCircle2,
  Clock,
  Filter,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  DollarSign,
  Link2,
} from 'lucide-react';

interface DisparoEmMassaModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalClientsCount?: number;
}

interface AudiencePreset {
  id: 'atrasados' | 'hoje' | 'semana' | 'todos';
  title: string;
  badge: string;
  count: number;
  totalDebt: number;
}

export const DisparoEmMassaModal: React.FC<DisparoEmMassaModalProps> = ({
  isOpen,
  onClose,
  totalClientsCount = 48,
}) => {
  const [selectedAudience, setSelectedAudience] = useState<'atrasados' | 'hoje' | 'semana' | 'todos'>('atrasados');
  const [messageTemplate, setMessageTemplate] = useState<string>(
    'Olá {nome}, tudo bem? Identificamos uma pendência da sua parcela do contrato #{venda_id} no valor de R$ {valor}.\n\nPara facilitar, gerei seu link seguro com baixa automática via PIX ou Cartão:\n🔗 {link_pagamento}\n\nChave PIX: {chave_pix}\n\nQualquer dúvida estamos à disposição! Equipe Mais Controle.'
  );
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [successLogs, setSuccessLogs] = useState<string[]>([]);
  const [hasCopiedTemplate, setHasCopiedTemplate] = useState(false);

  if (!isOpen) return null;

  const audiences: AudiencePreset[] = [
    {
      id: 'atrasados',
      title: 'Em Atraso (> 1 dia)',
      badge: 'Prioridade Alta',
      count: 14,
      totalDebt: 3480,
    },
    {
      id: 'hoje',
      title: 'Vencendo Hoje',
      badge: 'Lembrete Amigável',
      count: 19,
      totalDebt: 2850,
    },
    {
      id: 'semana',
      title: 'Vencimentos da Semana',
      badge: 'Preventivo',
      count: 32,
      totalDebt: 5900,
    },
    {
      id: 'todos',
      title: 'Toda a Carteira Ativa',
      badge: 'Geral',
      count: totalClientsCount,
      totalDebt: 12450,
    },
  ];

  const currentAudience = audiences.find((a) => a.id === selectedAudience) || audiences[0];

  const handleApplyPreset = (type: 'cobranca' | 'lembrete' | 'quitacao') => {
    if (type === 'cobranca') {
      setMessageTemplate(
        'Olá {nome}! Notamos que a parcela #{venda_id} no valor de R$ {valor} encontra-se em aberto. Evite multas e bloqueio da linha de crédito. Efetue o pagamento pelo link oficial:\n🔗 {link_pagamento}\nChave PIX: {chave_pix}'
      );
    } else if (type === 'lembrete') {
      setMessageTemplate(
        'Bom dia {nome}! Passando para lembrar que sua parcela de hoje (contrato #{venda_id}) no valor de R$ {valor} já está disponível para pagamento no link seguro:\n🔗 {link_pagamento}\nObrigado pela sua pontualidade!'
      );
    } else if (type === 'quitacao') {
      setMessageTemplate(
        'Super Oportunidade Mais Controle para {nome}! Quite seu saldo restante do contrato #{venda_id} com até 15% de desconto especial à vista. Consulte os valores e pague no link:\n🔗 {link_pagamento}'
      );
    }
  };

  const handleStartDispatch = () => {
    setIsSending(true);
    setProgress(0);
    setSentCount(0);
    setSuccessLogs([]);

    const totalToSend = currentAudience.count;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      const pct = Math.min(Math.round((current / totalToSend) * 100), 100);
      setProgress(pct);
      setSentCount(current);
      setSuccessLogs((prev) => [
        `✓ Mensagem enviada para cliente #${1003100 + current} às ${new Date().toLocaleTimeString('pt-BR')}`,
        ...prev.slice(0, 5),
      ]);

      if (current >= totalToSend) {
        clearInterval(interval);
        setIsSending(false);
      }
    }, 180);
  };

  const previewMessage = messageTemplate
    .replace('{nome}', 'Anielo Gomes Corvino')
    .replace('{venda_id}', '1003161')
    .replace('{valor}', '120,00')
    .replace('{link_pagamento}', 'https://pagamento.maiscontrole.app/fatura/pay-1003161')
    .replace('{chave_pix}', 'maiscontrole-399901@pix.com.br');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#50007d] to-[#360055] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Zap className="w-5 h-5 text-[#8cc63f]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-base tracking-tight">Disparo em Massa de Cobrança</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#8cc63f] text-slate-950 uppercase">
                  WhatsApp Oficial
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Envio automatizado de avisos com link de pagamento e chave PIX
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

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800 text-xs">
          {/* Seletor de Público-Alvo */}
          <div>
            <label className="font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#50007d]" />
              Selecione o Público do Disparo:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {audiences.map((aud) => (
                <button
                  key={aud.id}
                  onClick={() => setSelectedAudience(aud.id)}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                    selectedAudience === aud.id
                      ? 'border-[#76b82a] bg-[#eaf5dc] ring-2 ring-[#76b82a]/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">
                    {aud.badge}
                  </span>
                  <span className="font-black text-slate-900 text-xs">{aud.title}</span>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="font-mono font-bold text-[#50007d] text-sm">{aud.count} clientes</span>
                    <span className="text-[10px] text-slate-500 font-mono">R$ {aud.totalDebt.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Modelos Prontos de Mensagem */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#76b82a]" />
                Mensagem do Disparo & Variáveis
              </label>
              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('cobranca')}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-purple-100 text-[#50007d] font-bold text-[10px] transition cursor-pointer"
                >
                  + Cobrança Atraso
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('lembrete')}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-purple-100 text-[#50007d] font-bold text-[10px] transition cursor-pointer"
                >
                  + Lembrete Hoje
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('quitacao')}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-purple-100 text-[#50007d] font-bold text-[10px] transition cursor-pointer"
                >
                  + Quitação
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={messageTemplate}
              onChange={(e) => setMessageTemplate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 font-sans focus:outline-none focus:border-[#76b82a] focus:bg-white transition"
              placeholder="Digite a mensagem do disparo em massa..."
            />

            <div className="flex flex-wrap gap-1.5 mt-1 text-[10px] text-slate-500">
              <span className="font-bold text-slate-700">Variáveis disponíveis:</span>
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono font-bold">{'{nome}'}</code>
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono font-bold">{'{valor}'}</code>
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono font-bold">{'{venda_id}'}</code>
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono font-bold">{'{link_pagamento}'}</code>
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-700 font-mono font-bold">{'{chave_pix}'}</code>
            </div>
          </div>

          {/* Pré-visualização da Mensagem */}
          <div className="bg-[#eef8ee] border border-[#c1e7c1] rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Como o Cliente Recebe no WhatsApp:
              </span>
              <span className="text-[10px] text-emerald-700 font-mono">Exemplo: Anielo Gomes Corvino</span>
            </div>
            <div className="bg-white rounded-lg p-3 text-slate-800 text-[11px] whitespace-pre-line border border-emerald-200/80 shadow-2xs font-sans">
              {previewMessage}
            </div>
          </div>

          {/* Barra de Progresso Durante o Disparo */}
          {(isSending || progress > 0) && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between font-bold text-xs">
                <span className="flex items-center gap-2">
                  <RefreshCw className={`w-3.5 h-3.5 text-[#50007d] ${isSending ? 'animate-spin' : ''}`} />
                  {isSending ? 'Disparando mensagens em lote...' : 'Disparo em massa concluído com sucesso!'}
                </span>
                <span className="font-mono text-[#50007d]">
                  {sentCount} / {currentAudience.count} ({progress}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#50007d] to-[#8cc63f] h-2 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Log Recente */}
              <div className="space-y-1 text-[10px] font-mono text-slate-500 pt-1">
                {successLogs.map((log, idx) => (
                  <div key={idx} className="truncate text-emerald-700">{log}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-[11px] text-slate-500">
            Total selecionado: <b className="text-slate-800">{currentAudience.count} clientes</b> (R$ {currentAudience.totalDebt.toLocaleString()})
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-100 transition cursor-pointer"
            >
              Fechar
            </button>

            <button
              disabled={isSending}
              onClick={handleStartDispatch}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#50007d] hover:bg-[#3f0063] disabled:opacity-60 text-white font-black text-xs flex items-center justify-center space-x-2 transition shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-[#8cc63f]" />
              <span>{isSending ? 'Disparando...' : `Iniciar Disparo (${currentAudience.count})`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
