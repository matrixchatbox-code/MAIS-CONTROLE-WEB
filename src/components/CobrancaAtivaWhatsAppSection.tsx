import React, { useState, useMemo } from 'react';
import {
  Send,
  Phone,
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Filter,
  DollarSign,
  ArrowUpRight,
  ShieldAlert,
  Smartphone,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export interface CobrancaMonitorClient {
  id: string;
  name: string;
  business: string;
  balance: number;
  overdueDays: number;
  status: 'verde' | 'amarelo' | 'laranja' | 'vermelho';
  statusLabel: string;
  phone: string;
  score: number;
  pixKey?: string;
}

export const DEFAULT_COBRANCA_CLIENTS: CobrancaMonitorClient[] = [
  {
    id: 'c1',
    name: 'José Eduardo Alcantara',
    business: 'Panificadora Estrela do Brás ME',
    balance: 7200,
    overdueDays: 4,
    status: 'amarelo',
    statusLabel: 'Amarelo (4d)',
    phone: '(11) 98112-9011',
    score: 680,
    pixKey: '489.102.394-01',
  },
  {
    id: 'c2',
    name: 'Jorge Benício Santana',
    business: 'Oficina Mecânica São Jorge',
    balance: 4600,
    overdueDays: 18,
    status: 'laranja',
    statusLabel: 'Laranja (18d)',
    phone: '(11) 97234-1188',
    score: 540,
    pixKey: '11972341188',
  },
  {
    id: 'c3',
    name: 'Mariana Duarte Prado',
    business: 'Restaurante Sabor Mineiro',
    balance: 5800,
    overdueDays: 0,
    status: 'verde',
    statusLabel: 'Em Dia (0d)',
    phone: '(11) 98455-2233',
    score: 810,
    pixKey: 'mariana.prado@email.com',
  },
  {
    id: 'c4',
    name: 'Antônio de Pádua Martins',
    business: 'Comércio de Sucatas Martins',
    balance: 8400,
    overdueDays: 42,
    status: 'vermelho',
    statusLabel: 'Crítico (42d)',
    phone: '(11) 99188-7744',
    score: 390,
    pixKey: 'antonio.sucatas@pix.com',
  },
  {
    id: 'c5',
    name: 'Cláudia Silveira Gomes',
    business: 'Salão de Beleza Glamour',
    balance: 3100,
    overdueDays: 2,
    status: 'amarelo',
    statusLabel: 'Amarelo (2d)',
    phone: '(11) 99551-3322',
    score: 720,
    pixKey: 'claudia.salao@pix.com',
  },
  {
    id: 'c6',
    name: 'Rogério Batista Ramos',
    business: 'Mini Mercado Batista',
    balance: 6500,
    overdueDays: 24,
    status: 'laranja',
    statusLabel: 'Laranja (24d)',
    phone: '(11) 98774-6655',
    score: 510,
    pixKey: 'rogerio.mercado@pix.com',
  },
];

export const CobrancaAtivaWhatsAppSection: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<CobrancaMonitorClient>(DEFAULT_COBRANCA_CLIENTS[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<'d-3' | 'd-0' | 'd+3' | 'd+15'>('d+3');
  const [semaforoFilter, setSemaforoFilter] = useState<'todos' | 'verde' | 'amarelo' | 'laranja' | 'vermelho'>('todos');
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const filteredClients = useMemo(() => {
    if (semaforoFilter === 'todos') return DEFAULT_COBRANCA_CLIENTS;
    return DEFAULT_COBRANCA_CLIENTS.filter((c) => c.status === semaforoFilter);
  }, [semaforoFilter]);

  const semaforoCounts = useMemo(() => {
    return {
      verde: DEFAULT_COBRANCA_CLIENTS.filter((c) => c.status === 'verde').length + 1838,
      amarelo: DEFAULT_COBRANCA_CLIENTS.filter((c) => c.status === 'amarelo').length + 82,
      laranja: DEFAULT_COBRANCA_CLIENTS.filter((c) => c.status === 'laranja').length + 27,
      vermelho: DEFAULT_COBRANCA_CLIENTS.filter((c) => c.status === 'vermelho').length + 10,
    };
  }, []);

  const getReguaMessagePreview = (client: CobrancaMonitorClient, template: 'd-3' | 'd-0' | 'd+3' | 'd+15') => {
    switch (template) {
      case 'd-3':
        return `Olá, ${client.name}! Lembramos preventivamente que sua parcela Mais Controle no valor de R$ ${formatCurrency(
          client.balance
        )} vencerá em 3 dias. Antecipe seu pagamento via chave Pix (${client.pixKey || 'CNPJ Mais Controle'}) para manter seu limite renovado automaticamente. Tenha um excelente dia!`;
      case 'd-0':
        return `Prezado(a) ${client.name}, hoje é a data de vencimento da sua parcela Mais Controle (R$ ${formatCurrency(
          client.balance
        )}). Nosso agente autorizado já está em rota na sua região para recolhimento em mãos ou você pode quitar instantaneamente pelo Pix: ${
          client.pixKey || 'CNPJ Mais Controle'
        }. Em caso de dúvidas, responda aqui.`;
      case 'd+3':
        return `Olá, ${client.name}. Constatamos que sua parcela com vencimento recente está pendente há ${
          client.overdueDays
        } dias (Valor em aberto: R$ ${formatCurrency(
          client.balance
        )}). Regularize hoje para evitar encargos adicionais e manter sua linha de crédito ativa. Chave Pix: ${
          client.pixKey || 'CNPJ Mais Controle'
        }.`;
      case 'd+15':
        return `NOTIFICAÇÃO OPERACIONAL EXTRAJUDICIAL: Sr(a). ${client.name}, registramos débito de ${
          client.overdueDays
        } dias em aberto no montante de R$ ${formatCurrency(
          client.balance
        )}. Solicitamos contato urgente nas próximas 24h para renegociação com nosso comitê de exceções e evitar suspensão cadastral. Responda esta mensagem para atendimento imediato.`;
      default:
        return '';
    }
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = selectedClient.phone.replace(/\D/g, '');
    const message = getReguaMessagePreview(selectedClient, selectedTemplate);
    const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setDispatchedSuccess(true);
    setTimeout(() => setDispatchedSuccess(false), 3500);
  };

  return (
    <div className="bg-[#060c18] text-slate-100 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-5">
      {/* Header com identidade da régua de comunicação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center space-x-1">
              <MessageSquare className="w-3 h-3" />
              <span>Canal de Comunicação Essencial</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold tracking-wide">
              Régua Automatizada
            </span>
          </div>

          <h3 className="font-black text-xl text-white tracking-tight mt-1">
            Cobrança Ativa & Semáforo de Risco (WhatsApp)
          </h3>

          <p className="text-xs text-slate-400 mt-0.5">
            Classificação por faixas de atraso, disparador de mensagens preventivas via WhatsApp e acionamentos diretos de rota.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Gateway WhatsApp Conectado (Evolution / Z-API)</span>
        </div>
      </div>

      {/* 4 Semáforo Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Verde */}
        <div
          onClick={() => setSemaforoFilter(semaforoFilter === 'verde' ? 'todos' : 'verde')}
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            semaforoFilter === 'verde'
              ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40'
              : 'bg-[#0b1324] border-slate-800/90 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Verde (Em Dia)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"></span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black font-mono tracking-tight text-white">
              {semaforoCounts.verde.toLocaleString('pt-BR')}
            </span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">92.4% da carteira ativa</span>
        </div>

        {/* Card 2: Amarelo */}
        <div
          onClick={() => setSemaforoFilter(semaforoFilter === 'amarelo' ? 'todos' : 'amarelo')}
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            semaforoFilter === 'amarelo'
              ? 'bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/40'
              : 'bg-[#0b1324] border-slate-800/90 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Amarelo (1–7 dias)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"></span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black font-mono tracking-tight text-white">{semaforoCounts.amarelo}</span>
          </div>
          <span className="text-[11px] text-amber-400 font-medium">Régua preventiva D-3 e D-0</span>
        </div>

        {/* Card 3: Laranja */}
        <div
          onClick={() => setSemaforoFilter(semaforoFilter === 'laranja' ? 'todos' : 'laranja')}
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            semaforoFilter === 'laranja'
              ? 'bg-orange-950/40 border-orange-500/60 ring-1 ring-orange-500/40'
              : 'bg-[#0b1324] border-slate-800/90 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Laranja (8–29 dias)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]"></span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black font-mono tracking-tight text-white">{semaforoCounts.laranja}</span>
          </div>
          <span className="text-[11px] text-orange-400 font-medium">Rota física prioritária</span>
        </div>

        {/* Card 4: Vermelho */}
        <div
          onClick={() => setSemaforoFilter(semaforoFilter === 'vermelho' ? 'todos' : 'vermelho')}
          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
            semaforoFilter === 'vermelho'
              ? 'bg-rose-950/40 border-rose-500/60 ring-1 ring-rose-500/40'
              : 'bg-[#0b1324] border-slate-800/90 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Vermelho (&gt;30 dias)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]"></span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-black font-mono tracking-tight text-white">{semaforoCounts.vermelho}</span>
          </div>
          <span className="text-[11px] text-rose-400 font-medium">Comitê de Exceções</span>
        </div>
      </div>

      {/* Two-Column Area: Table on Left + WhatsApp Disparador on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Clientes em Monitoramento Table (Col 1-7) */}
        <div className="lg:col-span-7 bg-[#0b1324] border border-slate-800/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center space-x-2">
                <h4 className="font-black text-sm text-white">Clientes em Monitoramento</h4>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {filteredClients.length} listados
                </span>
              </div>
              <button
                onClick={() => setSemaforoFilter('todos')}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer transition"
              >
                Limpar Filtro (Ver Todos)
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800/80">
                  <tr>
                    <th scope="col" className="py-2.5 px-2">CLIENTE</th>
                    <th scope="col" className="py-2.5 px-3">SALDO EM ABERTO</th>
                    <th scope="col" className="py-2.5 px-3">DIAS ATRASO</th>
                    <th scope="col" className="py-2.5 px-2 text-right">SEMÁFORO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredClients.map((client) => {
                    const isSelected = selectedClient.id === client.id;
                    return (
                      <tr
                        key={client.id}
                        onClick={() => setSelectedClient(client)}
                        className={`cursor-pointer transition ${
                          isSelected
                            ? 'bg-sky-950/50 text-white border-l-2 border-sky-400'
                            : 'hover:bg-slate-900/60 text-slate-300'
                        }`}
                      >
                        <td className="py-3 px-2">
                          <div className="font-bold text-white text-xs">{client.name}</div>
                          <div className="text-[11px] text-slate-400">{client.business}</div>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-white">
                          R$ {formatCurrency(client.balance)}
                        </td>
                        <td className="py-3 px-3 font-semibold">
                          {client.overdueDays === 0 ? (
                            <span className="text-emerald-400">Em Dia</span>
                          ) : (
                            <span className="text-rose-400">+{client.overdueDays} dias</span>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              client.status === 'verde'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : client.status === 'amarelo'
                                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                : client.status === 'laranja'
                                ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {client.statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Row Notice & Refinancing Link */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
            <span>Atrasos &gt; 30 dias demandam parecer prévio do Sócio Diretor.</span>
            <button
              onClick={() =>
                alert(
                  `Iniciando protocolo de refinanciamento para ${selectedClient.name} (Saldo: R$ ${formatCurrency(
                    selectedClient.balance
                  )}).\nEncaminhado para a esteira executiva do Diretor.`
                )
              }
              className="text-sky-400 hover:text-sky-300 font-semibold flex items-center space-x-1 cursor-pointer transition"
            >
              <span>Abrir Refinanciamento</span>
            </button>
          </div>
        </div>

        {/* Right Column: Disparador Oficial WhatsApp (Col 8-12) */}
        <div className="lg:col-span-5 bg-[#0b1324] border border-slate-800/90 rounded-xl p-4 sm:p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Header with WhatsApp Badge & Client Details */}
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold tracking-wider uppercase">
                DISPARADOR OFICIAL WHATSAPP
              </span>
              <h4 className="text-base font-black text-white">{selectedClient.name}</h4>
              <p className="text-xs text-slate-400 font-mono">
                {selectedClient.phone} • Score: {selectedClient.score} pts
              </p>
            </div>

            {/* Template Selector 2x2 Grid */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-300">
                Selecione o Modelo da Régua:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedTemplate('d-3')}
                  className={`py-2 px-2.5 rounded-lg border text-left font-medium transition cursor-pointer text-[11px] ${
                    selectedTemplate === 'd-3'
                      ? 'border-sky-500 bg-sky-950/50 text-sky-200'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  Lembrete Preventivo (D-3)
                </button>
                <button
                  onClick={() => setSelectedTemplate('d-0')}
                  className={`py-2 px-2.5 rounded-lg border text-left font-medium transition cursor-pointer text-[11px] ${
                    selectedTemplate === 'd-0'
                      ? 'border-sky-500 bg-sky-950/50 text-sky-200'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  Vencimento Hoje (D-0)
                </button>
                <button
                  onClick={() => setSelectedTemplate('d+3')}
                  className={`py-2 px-2.5 rounded-lg border text-left font-medium transition cursor-pointer text-[11px] ${
                    selectedTemplate === 'd+3'
                      ? 'border-sky-500 bg-sky-950/50 text-sky-200'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  Cobrança Amigável (D+3)
                </button>
                <button
                  onClick={() => setSelectedTemplate('d+15')}
                  className={`py-2 px-2.5 rounded-lg border text-left font-medium transition cursor-pointer text-[11px] ${
                    selectedTemplate === 'd+15'
                      ? 'border-sky-500 bg-sky-950/50 text-sky-200'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  Notificação de Mora (D+15)
                </button>
              </div>
            </div>

            {/* Message Format Preview */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-300">
                Mensagem Formatada (Preview):
              </label>
              <div className="p-3 rounded-xl bg-[#030712] border border-slate-800 text-xs text-slate-200 space-y-2">
                <p className="leading-relaxed font-sans text-[11px]">
                  {getReguaMessagePreview(selectedClient, selectedTemplate)}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                  <span>Provedor: Evolution API / Z-API</span>
                  <span className="text-emerald-400">Canal Criptografado</span>
                </div>
              </div>
            </div>

            {/* Metrics Summary */}
            <div className="space-y-1 text-xs pt-1">
              <div className="flex items-center justify-between text-slate-400">
                <span>Dívida Acumulada:</span>
                <span className="font-mono font-bold text-white text-sm">
                  R$ {formatCurrency(selectedClient.balance)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Dias de Atraso Registrados:</span>
                <span className="font-mono font-bold text-rose-400">{selectedClient.overdueDays} dias</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3 rounded-xl bg-[#00a884] hover:bg-[#009272] text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{dispatchedSuccess ? '✓ Mensagem Enviada com Sucesso!' : 'Disparar WhatsApp Imediato'}</span>
            </button>

            <button
              onClick={() => {
                alert(`Iniciando discagem direta para ${selectedClient.name}: ${selectedClient.phone}`);
              }}
              className="w-full py-2.5 rounded-xl border border-slate-700/80 hover:bg-slate-800/80 text-slate-300 font-semibold text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Ligar Diretamente para o Cliente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
