import React, { useState, useMemo } from 'react';
import {
  UnitSummaryItem,
  Language,
  SaleContract,
  ClientProfile,
  CashMovement,
  DeviceItem,
} from '../types';
import {
  Hexagon,
  X,
  Calendar,
  Play,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  Wallet,
  Box,
  ShoppingBag,
  TrendingDown,
  Calculator,
  RotateCcw,
  RefreshCw,
  FileText,
  MapPin,
  Phone,
  Radio,
  Zap,
  Battery,
  Shield,
  Layers,
  ChevronDown,
  Info,
  Scale,
  Percent,
  PiggyBank,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  Check,
  Search,
  BookOpen,
  Send,
  Eye,
  Link2
} from 'lucide-react';
import {
  DesempenhoFuncionarioSection,
  INITIAL_EMPLOYEE_PERFORMANCE,
  EmployeePerformanceData,
} from '../components/DesempenhoFuncionarioSection';
import { CobrancaAtivaWhatsAppSection } from '../components/CobrancaAtivaWhatsAppSection';
import { DossieCompletoModal } from '../components/modals/DossieCompletoModal';
import { PaymentLinkModal } from '../components/modals/PaymentLinkModal';
import { DisparoEmMassaModal } from '../components/modals/DisparoEmMassaModal';
import { CalculadoraMultiFuncaoModal } from '../components/modals/CalculadoraMultiFuncaoModal';

interface TryInicioViewProps {
  units: UnitSummaryItem[];
  contracts?: SaleContract[];
  clients?: ClientProfile[];
  movements?: CashMovement[];
  devices?: DeviceItem[];
  language: Language;
  onOpenScoreConfig: () => void;
  onSelectUnitDetails?: (unit: UnitSummaryItem) => void;
  onNavigateTab?: (tab: any, subView?: any) => void;
}

export const TryInicioView: React.FC<TryInicioViewProps> = ({
  units,
  contracts = [],
  clients = [],
  movements = [],
  devices = [],
  language,
  onOpenScoreConfig,
  onSelectUnitDetails,
  onNavigateTab,
}) => {
  // Modal & Selection States
  const [selectedUnitForModal, setSelectedUnitForModal] = useState<UnitSummaryItem | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isFormulaExplainerOpen, setIsFormulaExplainerOpen] = useState(false);
  const [isPanicResolved, setIsPanicResolved] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<'carlos' | 'fernanda' | 'roberto' | 'marcos' | 'lucas'>('carlos');
  const [telemetriaFilter, setTelemetriaFilter] = useState<'todos' | 'em_rota' | 'cobrando' | 'panico'>('todos');
  const [showRastro, setShowRastro] = useState(true);
  const [selectedDossieEmployee, setSelectedDossieEmployee] = useState<EmployeePerformanceData | null>(null);

  // Seletor de Período & Descarga (Conforme Imagem na Área Representada pelo Retângulo)
  const [filterStartDateInput, setFilterStartDateInput] = useState<string>('09/10/2026');
  const [filterEndDateInput, setFilterEndDateInput] = useState<string>('16/10/2026');
  const [isPeriodFilterActive, setIsPeriodFilterActive] = useState<boolean>(true);
  const [periodActionToast, setPeriodActionToast] = useState<string | null>(null);

  const handleAcionarFiltro = () => {
    setIsPeriodFilterActive(true);
    setPeriodActionToast(`✓ Filtro Acionado: Período ${filterStartDateInput} até ${filterEndDateInput} habilitado no Painel Geral!`);
    setTimeout(() => setPeriodActionToast(null), 3500);
  };

  // Score Configuration Criteria (Criteria A, B, C matching Slide 6)
  const [criterioA, setCriterioA] = useState(30);
  const [criterioB, setCriterioB] = useState(50);
  const [criterioC, setCriterioC] = useState(20);
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  // Table Filter & Search State
  const [filterActive, setFilterActive] = useState<'todos' | 'abertas' | 'fechadas'>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Modais de Novidades Solicitadas pelo Cliente (WhatsApp)
  const [isDisparoEmMassaOpen, setIsDisparoEmMassaOpen] = useState(false);
  const [isPaymentLinkOpen, setIsPaymentLinkOpen] = useState(false);
  const [isMultiCalcOpen, setIsMultiCalcOpen] = useState(false);

  // Interactive Calculator State (Resultado Real) - Default matching system benchmark
  const [inputRecaudos, setInputRecaudos] = useState<number>(86200);
  const [inputVendas, setInputVendas] = useState<number>(42000);
  const [inputGastos, setInputGastos] = useState<number>(12430);

  // Operational metrics for tickets and volume
  const [clientesCobradosCount, setClientesCobradosCount] = useState<number>(342);
  const [novasVendasCount, setNovasVendasCount] = useState<number>(28);

  // Base carteira visual & caixa reference
  const baseCarteraVisual = 128420;

  // Currency Formatter
  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // =========================================================================
  // RECALCULATED CORE FINANCIAL FORMULAS (SETOR DE CONTROLADORIA E TESOURARIA)
  // =========================================================================

  // 1. RESULTADO REAL OPERACIONAL (Geração Líquida de Caixa Diária)
  // Fórmula: Recaudos (+) - Total de Vendas / Novos Desembolsos (-) - Total de Gastos de Rota (-)
  const resultadoReal = inputRecaudos - inputVendas - inputGastos;

  // 2. MARGEM OPERACIONAL LÍQUIDA (% de Retenção Livre por Real Cobrado)
  // Fórmula: (Resultado Real / Recaudos) * 100
  const margemLiquidaNum = inputRecaudos > 0 ? (resultadoReal / inputRecaudos) * 100 : 0;
  const margemLiquida = margemLiquidaNum.toFixed(2);

  // 3. TAXA DE REINVESTIMENTO / GIRO DA CARTEIRA (% de Recaudo reemprestado no mesmo dia)
  // Fórmula: (Total de Vendas / Recaudos) * 100
  const taxaReinvestimentoNum = inputRecaudos > 0 ? (inputVendas / inputRecaudos) * 100 : 0;
  const taxaReinvestimento = taxaReinvestimentoNum.toFixed(2);

  // 4. ÍNDICE OPEX / CUSTO OPERACIONAL DE ROTA (Custo logístico por Real cobrado)
  // Fórmula: (Total de Gastos / Recaudos) * 100
  const indiceOpexNum = inputRecaudos > 0 ? (inputGastos / inputRecaudos) * 100 : 0;
  const indiceOpex = indiceOpexNum.toFixed(2);

  // 5. TAXA DE RECAUDO SOBRE CARTEIRA TOTAL (% de Retorno do Ativo Circulante no Dia)
  // Fórmula: (Recaudos / Carteira Total Ativa) * 100
  const percentRecaudoSobreCartera = baseCarteraVisual > 0
    ? ((inputRecaudos / baseCarteraVisual) * 100).toFixed(2)
    : '0,00';

  // 6. TICKETS MÉDIOS OPERACIONAIS REAIS
  // Ticket Médio de Cobrança: Recaudos / Quantidade de Clientes Cobrados
  const ticketMedioRecaudo = clientesCobradosCount > 0
    ? (inputRecaudos / clientesCobradosCount).toFixed(2)
    : '0,00';

  // Ticket Médio de Venda: Total de Vendas / Quantidade de Novos Contratos
  const ticketMedioVenda = novasVendasCount > 0
    ? (inputVendas / novasVendasCount).toFixed(2)
    : '0,00';

  // 7. PONTO DE EQUILÍBRIO DIÁRIO (Break-even de Cobrança)
  // Recaudo mínimo necessário para não queimar caixa das rotas
  const pontoEquilibrio = inputVendas + inputGastos;

  // 8. CÁLCULO DINÂMICO CONSOLIDADO DOS CAIXAS DAS UNIDADES
  const totalCaixaInicialUnidades = useMemo(() => {
    return units.reduce((acc, u) => acc + (u.initialCash || 0), 0);
  }, [units]);

  const totalCaixaFinalUnidades = useMemo(() => {
    return units.reduce((acc, u) => acc + (u.finalCash || 0), 0);
  }, [units]);

  // Delta de Arrecadação Líquida Física em Mãos
  const deltaArrecadacaoUnidades = totalCaixaFinalUnidades - totalCaixaInicialUnidades;

  // Saldo Consolidado em Tesouraria
  const saldoCaixaConsolidado = totalCaixaFinalUnidades;
  // Filtered Units List for Table
  const filteredUnits = useMemo(() => {
    return units.filter((u) => {
      const matchesFilter =
        filterActive === 'todos'
          ? true
          : filterActive === 'abertas'
          ? u.status.toLowerCase().includes('abier') || u.status.toLowerCase().includes('aber')
          : u.status.toLowerCase().includes('cerr') || u.status.toLowerCase().includes('fech');

      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.collectorName && u.collectorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (u.location && u.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        u.cnCode.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [units, filterActive, searchQuery]);

  // Sincronizar com Caixas Reais da Base
  const handleSincronizarComBase = () => {
    const somaDelta = Math.max(deltaArrecadacaoUnidades, 15000);
    setInputRecaudos(somaDelta * 3.5);
    setInputVendas(somaDelta * 1.8);
    setInputGastos(somaDelta * 0.45);
    setClientesCobradosCount(units.length * 35);
    setNovasVendasCount(units.length * 4);
  };

  // Exportar Relatório Executivo CSV
  const handleExportExcel = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'RELATORIO EXECUTIVO DE FLUXO DE CAIXA E RESULTADO REAL - MAIS CONTROLE\n' +
      `Data de Emissao,${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\n\n` +
      'SETOR,METRICA / VARIAVEL,VALOR (R$),UTILIDADE OPERACIONAL / FORMULA\n' +
      `Arrecadacao,Recaudos do Dia,${inputRecaudos},Amortizacao e parcelas pagas em rota\n` +
      `Comercial,Total de Vendas,${inputVendas},Capital desembolsado em novos contratos\n` +
      `Controladoria,Total de Gastos,${inputGastos},Despesas operacionais (gasolina alimentacao motos)\n` +
      `Controladoria,Resultado Real do Dia,${resultadoReal},Formula R - V - G (Geracao Liquida de Caixa)\n` +
      `Tesouraria,Margem Operacional Liquida,${margemLiquida}%,(Resultado Real / Recaudos) * 100\n` +
      `Comercial,Taxa de Reinvestimento,${taxaReinvestimento}%,(Total de Vendas / Recaudos) * 100\n` +
      `Controladoria,Indice Opex de Rota,${indiceOpex}%,(Total de Gastos / Recaudos) * 100\n` +
      `Risco,Retorno s/ Carteira Ativa,${percentRecaudoSobreCartera}%,(Recaudos / Carteira Total R$ 128.420) * 100\n` +
      `Operacoes,Ticket Medio de Recaudo,${ticketMedioRecaudo},Recaudos / ${clientesCobradosCount} Clientes Cobrados\n` +
      `Comercial,Ticket Medio de Nova Venda,${ticketMedioVenda},Vendas / ${novasVendasCount} Novos Contratos\n` +
      `Tesouraria,Ponto de Equilibrio (Break-even),${pontoEquilibrio},Vendas + Gastos (Recaudo Minimo Necessario)\n` +
      `Tesouraria,Caixa Consolidado em Maos,${saldoCaixaConsolidado},Soma dos saldos finais das unidades fisicas\n\n` +
      'DETALHAMENTO POR UNIDADE DE GESTAO (UGI)\n' +
      'UNIDADE,COBRADOR,STATUS,CAIXA INICIAL (R$),CAIXA FINAL (R$),DELTA ARRECADACAO (R$),PROGRESSO\n' +
      units
        .map(
          (u) =>
            `"${u.name}","${u.collectorName || '-'}","${u.status}",${u.initialCash},${u.finalCash},${
              u.finalCash - u.initialCash
            },${u.progressPercent}%`
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mais_controle_resultado_real_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-7 w-full max-w-full overflow-x-hidden">
      {/* =========================================================================
          BANNER INFORMATIVO DE BOAS-VINDAS COM PAPÉIS E FUNÇÕES DOS SETORES
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#50007d] via-[#43006a] to-[#25003b] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-purple-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#8cc63f] text-slate-950">
                Central Executiva
              </span>
              <span className="text-purple-300 text-xs font-medium">
                Plataforma de Gestão 3999 • Sociedade 399901 • Ciclo Diário de Rotas
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Painel Operacional & Indicadores de Tesouraria
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 max-w-3xl leading-relaxed">
              Supervisão em tempo real de caixas de cobradores, liquidação de contratos, geração líquida de caixa (
              <span className="text-white font-mono font-bold">R - V - G = Resultado Real</span>) e telemetria tática de rotas.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-wrap items-center gap-2 justify-start sm:justify-end mt-2 lg:mt-0">
            {/* Seletor de Período & Ações: [ 09/10/2026 ] - [ 16/10/2026 ] [ Acionar ] [ Descarga ] */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 bg-black/45 border border-purple-400/50 rounded-xl p-1.5 sm:px-2.5 sm:py-1 shadow-inner backdrop-blur-xs w-full sm:w-auto">
              <div className="flex items-center space-x-1.5">
                {/* Data Início: 09/10/2026 */}
                <div className="flex items-center space-x-1.5 bg-purple-950/90 border border-purple-400/60 hover:border-[#8cc63f] rounded-lg px-2 sm:px-2.5 py-1 text-white shadow-inner transition">
                  <Calendar className="w-3.5 h-3.5 text-[#8cc63f] shrink-0" />
                  <input
                    type="text"
                    value={filterStartDateInput}
                    onChange={(e) => setFilterStartDateInput(e.target.value)}
                    placeholder="09/10/2026"
                    className="bg-transparent text-white text-xs font-mono font-bold focus:outline-none w-20 text-center tracking-tight"
                    title="Data de Início do Período (DD/MM/AAAA)"
                  />
                </div>

                {/* Separador Traço */}
                <span className="text-purple-300 font-black text-xs px-0.5">-</span>

                {/* Data Fim: 16/10/2026 */}
                <div className="flex items-center space-x-1.5 bg-purple-950/90 border border-purple-400/60 hover:border-[#8cc63f] rounded-lg px-2 sm:px-2.5 py-1 text-white shadow-inner transition">
                  <Calendar className="w-3.5 h-3.5 text-[#8cc63f] shrink-0" />
                  <input
                    type="text"
                    value={filterEndDateInput}
                    onChange={(e) => setFilterEndDateInput(e.target.value)}
                    placeholder="16/10/2026"
                    className="bg-transparent text-white text-xs font-mono font-bold focus:outline-none w-20 text-center tracking-tight"
                    title="Data de Fim do Período (DD/MM/AAAA)"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-1.5 w-full sm:w-auto justify-end">
                {/* Botão Acionar com Borda Verde Conforme Imagem */}
                <button
                  type="button"
                  onClick={handleAcionarFiltro}
                  className="flex-1 sm:flex-none justify-center px-2.5 sm:px-3 py-1 rounded-lg border-2 border-[#8cc63f] bg-[#8cc63f]/10 text-[#8cc63f] hover:bg-[#8cc63f] hover:text-slate-950 font-black text-xs transition cursor-pointer shadow-xs uppercase tracking-wider flex items-center space-x-1"
                  title="Acionar e habilitar o filtro para o período selecionado"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Acionar</span>
                </button>

                {/* Botão Descarga com Borda Verde Conforme Imagem */}
                <button
                  type="button"
                  onClick={handleExportExcel}
                  className="flex-1 sm:flex-none justify-center px-2.5 sm:px-3 py-1 rounded-lg border-2 border-[#8cc63f] bg-[#8cc63f]/10 text-[#8cc63f] hover:bg-[#8cc63f] hover:text-slate-950 font-black text-xs transition cursor-pointer shadow-xs uppercase tracking-wider flex items-center space-x-1"
                  title="Gerar e efetuar descarga operacional deste período"
                >
                  <FileSpreadsheet className="w-3 h-3 text-[#8cc63f]" />
                  <span>Descarga</span>
                </button>

                {/* Botão para Acessar Sessão Completa do Resumo por Período */}
                <button
                  type="button"
                  onClick={() => onNavigateTab?.('ventas', 'ventas_resumen_periodo')}
                  className="flex-1 sm:flex-none justify-center px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white font-bold text-xs transition cursor-pointer border border-purple-400/50 flex items-center space-x-1"
                  title="Abrir tela completa do Resumo por Período (Somente Caixas Fechadas)"
                >
                  <Layers className="w-3 h-3 text-[#8cc63f]" />
                  <span className="hidden sm:inline">Ver Resumo Geral</span>
                </button>
              </div>
            </div>

            {/* Novidades Solicitadas pelo Cliente: Disparo em Massa, Link de Pagamento e Calculadora % */}
            <button
              onClick={() => setIsDisparoEmMassaOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
              title="Disparo em massa de cobrança via WhatsApp oficial com link de pagamento"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-white" />
              <span>Disparo em Massa</span>
            </button>

            <button
              onClick={() => setIsPaymentLinkOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-900/90 hover:bg-purple-800 border border-[#8cc63f]/60 text-white font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              title="Gerar e compartilhar link de pagamento com chave PIX e QR Code"
            >
              <Link2 className="w-3.5 h-3.5 text-[#8cc63f]" />
              <span>Link de Pagamento</span>
            </button>

            <button
              onClick={() => setIsMultiCalcOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-900/90 hover:bg-purple-800 border border-purple-400/50 text-white font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs"
              title="Calculadora Multi-Função % Mais Controle (Juros, Quitação, Multas, Amortização)"
            >
              <Percent className="w-3.5 h-3.5 text-[#8cc63f]" />
              <span>Calculadora %</span>
            </button>

            <button
              onClick={() => setIsFormulaExplainerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center space-x-2 transition cursor-pointer backdrop-blur-xs"
            >
              <BookOpen className="w-4 h-4 text-[#8cc63f]" />
              <span className="hidden sm:inline">Manual das Fórmulas & Setores</span>
              <span className="sm:hidden">Fórmulas</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center space-x-2 transition cursor-pointer backdrop-blur-xs"
              title="Exportar relatório consolidado dos caixas e carteira"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#8cc63f]" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={handleSincronizarComBase}
              className="px-3.5 py-2 rounded-xl bg-[#8cc63f] hover:bg-[#7cb342] text-slate-950 font-black text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-md"
              title="Sincronizar valores com os caixas reais abertos"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sincronizar Caixas</span>
            </button>
          </div>
        </div>

        {/* Toast de Acionamento de Período */}
        {periodActionToast && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{periodActionToast}</span>
          </div>
        )}

        {/* =========================================================================
            NOVIDADE SOLICITADA PELO CLIENTE (PRINT WHATSAPP):
            CÁLCULO AUTOMÁTICO DO RESUMO
            Coleção / Recaudo ($) - Vendas Totais ($) - Gastos Totais ($) = Resultado ($)
            ========================================================================= */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-black/80 to-purple-950/90 border-2 border-[#8cc63f]/60 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-purple-800/60">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#8cc63f] text-slate-950 flex items-center justify-center font-black shadow-xs">
                <Calculator className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-black text-sm text-white tracking-tight">
                    Cálculo Automático do Resumo Diário
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#8cc63f] text-slate-950 uppercase tracking-wider">
                    Fórmula Ativa
                  </span>
                </div>
                <p className="text-[11px] text-purple-200">
                  Fórmula oficial: <span className="font-mono text-[#8cc63f] font-bold">Coleção (Recaudo $) — Vendas Totais ($) — Gastos / Despesas ($) = Resultado Líquido</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setIsMultiCalcOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center space-x-1 transition cursor-pointer"
              >
                <Percent className="w-3 h-3 text-[#8cc63f]" />
                <span>Simular / Recalcular</span>
              </button>
              <button
                onClick={() => setIsDisparoEmMassaOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center space-x-1 transition cursor-pointer"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Disparo Rápido</span>
              </button>
            </div>
          </div>

          {/* Grid dos 4 Termos Matemáticos da Fórmula */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-3">
            {/* Termo 1: Coleção / Recaudo */}
            <div className="bg-purple-900/40 rounded-xl p-2.5 border border-purple-700/50 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span>(+) 1. Coleção / Recaudo</span>
              </span>
              <div className="text-lg sm:text-xl font-black font-mono text-emerald-400 mt-1">
                R$ {formatCurrency(inputRecaudos)}
              </div>
              <span className="text-[9px] text-purple-300">Entrada total de pagamentos em rota</span>
            </div>

            {/* Termo 2: Vendas Totais */}
            <div className="bg-purple-900/40 rounded-xl p-2.5 border border-purple-700/50 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <span>(-) 2. Vendas Totais</span>
              </span>
              <div className="text-lg sm:text-xl font-black font-mono text-amber-400 mt-1">
                R$ {formatCurrency(inputVendas)}
              </div>
              <span className="text-[9px] text-purple-300">Novos empréstimos concedidos</span>
            </div>

            {/* Termo 3: Gastos / Despesas */}
            <div className="bg-purple-900/40 rounded-xl p-2.5 border border-purple-700/50 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <span>(-) 3. Gastos / Despesas</span>
              </span>
              <div className="text-lg sm:text-xl font-black font-mono text-rose-400 mt-1">
                R$ {formatCurrency(inputGastos)}
              </div>
              <span className="text-[9px] text-purple-300">Custos operacionais e opex de rota</span>
            </div>

            {/* Termo 4: Resultado Real do Caixa */}
            <div className="bg-gradient-to-br from-[#8cc63f]/25 to-emerald-950/40 rounded-xl p-2.5 border-2 border-[#8cc63f] flex flex-col justify-between">
              <span className="text-[10px] font-black text-[#8cc63f] uppercase tracking-wider flex items-center justify-between">
                <span>(=) 4. Resultado Líquido</span>
                <span className="text-[9px] font-mono text-slate-200">Margem: {margemLiquida}%</span>
              </span>
              <div className="text-lg sm:text-xl font-black font-mono text-white mt-1">
                {resultadoReal >= 0 ? '+' : ''}R$ {formatCurrency(resultadoReal)}
              </div>
              <span className="text-[9px] text-emerald-200 font-bold">
                {resultadoReal >= 0 ? '✓ Superávit Livre de Caixa' : '⚠️ Consumo de Capital'}
              </span>
            </div>
          </div>
        </div>

        {/* Setores e Suas Funções Reais na Empresa */}
        <div className="mt-4 pt-4 border-t border-purple-800/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-[11px]">
          <div className="bg-purple-900/40 rounded-lg p-2 border border-purple-700/40">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">1. Auditoria UGIs</span>
            <span className="text-slate-100 font-medium">Conferência de Caixas Físicos</span>
          </div>
          <div className="bg-purple-900/40 rounded-lg p-2 border border-purple-700/40">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">2. Tesouraria</span>
            <span className="text-slate-100 font-medium">Caixa em Mãos & Custódia</span>
          </div>
          <div className="bg-purple-900/40 rounded-lg p-2 border border-purple-700/40">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">3. Arrecadação</span>
            <span className="text-slate-100 font-medium">Recaudos & Parcelas de Rota</span>
          </div>
          <div className="bg-purple-900/40 rounded-lg p-2 border border-purple-700/40">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">4. Comercial</span>
            <span className="text-slate-100 font-medium">Vendas & Novos Desembolsos</span>
          </div>
          <div className="bg-purple-900/40 rounded-lg p-2 border border-purple-700/40">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">5. Controladoria</span>
            <span className="text-slate-100 font-medium">Resultado Real & Gastos Opex</span>
          </div>
          <div className="bg-purple-900/40 rounded-lg p-2 border border-purple-700/40">
            <span className="text-purple-300 font-bold block text-[10px] uppercase">6. Risco & GPS</span>
            <span className="text-slate-100 font-medium">Score 2.0 & Segurança Rota</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RESUMO EXECUTIVO DE DESEMPENHO (UNIDADE • DISPOSITIVO • USUÁRIOS • COBRANÇA)
          Substituição da tabela de UGIs pelo Resumo Executivo conforme solicitação
          ========================================================================= */}
      <DesempenhoFuncionarioSection
        units={units}
        devices={devices}
        language={language}
        onNavigateTab={onNavigateTab}
        onLocateOnRadar={(agentId) => {
          setSelectedAgentId(agentId as any);
          const radarElem = document.getElementById('central-telemetria-gps');
          if (radarElem) {
            radarElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />


      {/* =========================================================================
          SETOR 2: DASHBOARD GERAL DE TESOURARIA & INDICADORES MACRO (KPIS)
          ========================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#50007d] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              SETOR 2: TESOURARIA & RISCO
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Indicadores de Exposição & Liquidez
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              5 Rotas Ativas (Grande SP / Capital)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 uppercase">
              OPERAÇÃO NORMAL
            </span>
          </div>
        </div>

        {/* 6 KPI Metric Cards Row with explicit sector utility and TOTAL card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {/* Card 1: Carteira Final (Setor de Crédito & Cobrança) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs relative overflow-hidden flex flex-col justify-between hover:border-purple-300 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  CARTEIRA ATIVA EM RUA
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#50007d] flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                R$ {formatCurrency(baseCarteraVisual)}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-semibold text-purple-700">Setor: Crédito</span>
              <span>Total Emprestado</span>
            </div>
          </div>

          {/* Card 2: Caixa Atual (Setor de Tesouraria) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs relative overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  CAIXA DISPONÍVEL EM MÃOS
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Box className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono text-emerald-700">
                R$ {formatCurrency(saldoCaixaConsolidado)}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span className="font-semibold text-emerald-700">Setor: Tesouraria</span>
              <span>Custódia dos Cobradores</span>
            </div>
          </div>

          {/* Card 3: Recaudos (Setor de Cobrança em Campo) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs relative overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  RECAUDOS DO DIA
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  $
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono text-[#50007d]">
                R$ {formatCurrency(inputRecaudos)}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-semibold text-emerald-700">Setor: Cobrança</span>
              <span>Entrada em Espécie (+)</span>
            </div>
          </div>

          {/* Card 4: Total de Vendas (Setor Comercial / Concessão de Empréstimos) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs relative overflow-hidden flex flex-col justify-between hover:border-amber-300 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  TOTAL DE VENDAS
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono text-amber-700">
                R$ {formatCurrency(inputVendas)}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-semibold text-amber-700">Setor: Comercial</span>
              <span>Novos Empréstimos (-)</span>
            </div>
          </div>

          {/* Card 5: Total de Gastos (Setor de Controladoria / Logística de Rota) */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs relative overflow-hidden flex flex-col justify-between hover:border-rose-300 transition">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  TOTAL DE GASTOS
                </span>
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono text-rose-600">
                R$ {formatCurrency(inputGastos)}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span className="font-semibold text-rose-600">Setor: Logística</span>
              <span>Despesas Opex de Rota (-)</span>
            </div>
          </div>

          {/* Card 6: TOTAL / RESULTADO REAL (Setor de Controladoria & Geração Líquida) */}
          <div
            onClick={() => {
              alert(
                `Demonstrativo do Total Líquido Diário (Resultado Real):\n\n` +
                  `(+) Recaudos Cobrados: R$ ${formatCurrency(inputRecaudos)}\n` +
                  `(-) Novos Empréstimos: R$ ${formatCurrency(inputVendas)}\n` +
                  `(-) Gastos Operacionais: R$ ${formatCurrency(inputGastos)}\n` +
                  `---------------------------------------------\n` +
                  `(=) TOTAL LÍQUIDO DO DIA: R$ ${formatCurrency(resultadoReal)}\n` +
                  `Margem Líquida Operacional: ${margemLiquida}%\n` +
                  `Status: ${resultadoReal >= 0 ? 'Superávit Livre de Caixa' : 'Consumo de Capital'}`
              );
            }}
            className="bg-gradient-to-br from-[#50007d] via-[#43006a] to-[#2b0042] text-white rounded-xl p-4 border border-purple-500/50 shadow-md relative overflow-hidden flex flex-col justify-between hover:border-[#8cc63f] hover:shadow-xl transition-all cursor-pointer group"
            title="Clique para ver o demonstrativo analítico da fórmula R - V - G"
          >
            {/* Subtle background glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#8cc63f]/15 rounded-full blur-xl pointer-events-none group-hover:bg-[#8cc63f]/30 transition"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-purple-200">
                    TOTAL (RESULTADO REAL)
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8cc63f] animate-pulse"></span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#8cc63f] text-slate-950 flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition">
                  <Calculator className="w-4 h-4 text-slate-950" />
                </div>
              </div>
              <div className="text-2xl font-black text-white tracking-tight font-mono">
                {resultadoReal >= 0 ? '+' : ''}R$ {formatCurrency(resultadoReal)}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-purple-700/60 flex items-center justify-between text-[10px]">
              <span className="font-bold text-[#8cc63f]">
                Setor: Controladoria
              </span>
              <span className="text-purple-200 font-mono text-[9px] bg-purple-900/70 px-2 py-0.5 rounded border border-purple-600/50">
                R - V - G (Líquido)
              </span>
            </div>
          </div>
        </div>

        {/* Detalhamento Complementar: Indicadores Derivados da Fórmula (Conforme Imagem calc.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              Margem Operacional Líquida
            </span>
            <span className="text-sm font-black font-mono text-emerald-700 block">
              {margemLiquida}%
            </span>
            <span className="text-[9px] text-slate-400">
              (Resultado Real / Recaudos)
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              Taxa de Reinvestimento
            </span>
            <span className="text-sm font-black font-mono text-amber-700 block">
              {taxaReinvestimento}%
            </span>
            <span className="text-[9px] text-slate-400">
              (Total Vendas / Recaudos)
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              Índice OPEX de Rota
            </span>
            <span className="text-sm font-black font-mono text-rose-600 block">
              {indiceOpex}%
            </span>
            <span className="text-[9px] text-slate-400">
              (Total Gastos / Recaudos)
            </span>
          </div>
        </div>

        {/* Summary Bar da Fórmula R - V - G */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                Geração Líquida em Rota (Controladoria & Tesouraria)
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-purple-800 text-purple-200 border border-purple-600">
                Fórmula R - V - G
              </span>
            </div>
            <span className="text-xl font-black font-mono text-emerald-400">
              {resultadoReal >= 0 ? '+' : ''}R$ {formatCurrency(resultadoReal)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
              ✓ Fórmula Auditada & Saldo Conciliado
            </span>
            <button
              onClick={() => alert('Fórmula e fechamento chancelados com sucesso pela Controladoria!')}
              className="px-3 py-1.5 rounded-lg bg-[#8cc63f] hover:bg-[#7db734] text-slate-950 font-black text-xs transition cursor-pointer flex items-center space-x-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Chancelar Cálculo</span>
            </button>
          </div>
        </div>
      </div>



      {/* =========================================================================
          SETORES 4 & 5: ANÁLISE DE SCORE POR DIA DA SEMANA & DISTRIBUIÇÃO CARTERA
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Score por Unidade (Col 1-7) - SETOR DE RISCO & CRÉDITO */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                SETOR 4: INTELIGÊNCIA DE RISCO
              </span>
              <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                Score vs Recaudos — Rota UGI-1 Brasil SP (Seg-Sáb)
              </h4>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              Ciclo Semanal
            </span>
          </div>

          {/* Bar Chart comparing Score vs Recaudos */}
          <div className="h-64 flex flex-col justify-end pt-4 pb-2">
            <div className="flex-1 flex items-end justify-between gap-3 px-2 border-b border-slate-200">
              {/* Seg */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div className="w-4 bg-[#56007e] rounded-t hover:opacity-80 transition" style={{ height: '40%' }} title="Score Previsto: 4.000 pts"></div>
                  <div className="w-4 bg-[#8cc63f] rounded-t hover:opacity-80 transition" style={{ height: '22%' }} title="Recaudos Realizados: R$ 2.200"></div>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-2">Seg</span>
              </div>

              {/* Ter */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div className="w-4 bg-[#56007e] rounded-t hover:opacity-80 transition" style={{ height: '28%' }} title="Score Previsto: 2.800 pts"></div>
                  <div className="w-4 bg-[#8cc63f] rounded-t hover:opacity-80 transition" style={{ height: '20%' }} title="Recaudos Realizados: R$ 2.000"></div>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-2">Ter</span>
              </div>

              {/* Qua - Pico de Cobrança */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div className="w-4 bg-[#56007e] rounded-t hover:opacity-80 transition" style={{ height: '20%' }} title="Score Previsto: 2.000 pts"></div>
                  <div className="w-4 bg-[#8cc63f] rounded-t hover:opacity-80 transition relative" style={{ height: '98%' }} title="Recaudos Realizados: R$ 9.800 (Pico)">
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1 rounded">
                      Pico
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-600 font-bold mt-2 text-emerald-700">Qua</span>
              </div>

              {/* Qui */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div className="w-4 bg-[#56007e] rounded-t hover:opacity-80 transition" style={{ height: '26%' }} title="Score Previsto: 2.600 pts"></div>
                  <div className="w-4 bg-[#8cc63f] rounded-t hover:opacity-80 transition" style={{ height: '37%' }} title="Recaudos Realizados: R$ 3.700"></div>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-2">Qui</span>
              </div>

              {/* Sex */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div className="w-4 bg-[#56007e] rounded-t hover:opacity-80 transition" style={{ height: '18%' }} title="Score Previsto: 1.800 pts"></div>
                  <div className="w-4 bg-[#8cc63f] rounded-t hover:opacity-80 transition" style={{ height: '46%' }} title="Recaudos Realizados: R$ 4.600"></div>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-2">Sex</span>
              </div>

              {/* Sab */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  <div className="w-4 bg-[#56007e] rounded-t hover:opacity-80 transition" style={{ height: '21%' }} title="Score Previsto: 2.100 pts"></div>
                  <div className="w-4 bg-[#8cc63f] rounded-t hover:opacity-80 transition" style={{ height: '36%' }} title="Recaudos Realizados: R$ 3.600"></div>
                </div>
                <span className="text-[11px] text-slate-600 font-medium mt-2">Sab</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-3 text-xs text-slate-600 flex-wrap gap-2">
              <div className="flex items-center space-x-6">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#56007e] rounded-2xs inline-block"></span>
                  <span className="text-slate-600 font-medium">Score Ponderado (Meta)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 bg-[#8cc63f] rounded-2xs inline-block"></span>
                  <span className="text-slate-600 font-medium">Recaudos Efetivos (R$)</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Pico semanal registrado às quartas-feiras
              </span>
            </div>
          </div>
        </div>

        {/* Right Chart: Distribuição Cartera (Col 8-12) - SETOR DE PLANEJAMENTO & EXPANSÃO */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              SETOR 5: ALOCAÇÃO DE CAPITAL
            </span>
            <h4 className="font-bold text-sm text-slate-900 mt-0.5">
              Distribuição da Carteira por Unidade
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Participação de cada UGI no total ativo de R$ 128.420,00
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
            {/* Donut Chart SVG */}
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#e2e8f0"
                  strokeWidth="16"
                />
                {/* Purple Ring (UGI-1: 65%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#56007e"
                  strokeWidth="16"
                  strokeDasharray="238.76"
                  strokeDashoffset="83.56"
                />
                {/* Green Ring (UGI-2: 35%) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#8cc63f"
                  strokeWidth="16"
                  strokeDasharray="238.76"
                  strokeDashoffset="155.19"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                <span className="text-xs font-mono font-black text-slate-900">R$ 128,4k</span>
              </div>
            </div>

            {/* Right details */}
            <div className="space-y-3 flex-1 text-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-[#56007e] inline-block"></span>
                    <span className="font-bold text-slate-800">UGI-1 São Paulo</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">65% (R$ 83.473)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-[#8cc63f] inline-block"></span>
                    <span className="font-bold text-slate-800">UGI-2 São Paulo</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">35% (R$ 44.947)</span>
                </div>
              </div>

              {/* Base card */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500">Base Ativa sob Cobrança</span>
                  <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">Patrimônio</span>
                </div>
                <span className="font-bold font-mono text-sm text-slate-900 block mt-0.5">
                  R$ 128.420,00
                </span>
                <span className="text-[9px] text-slate-400">
                  Total de contratos ativos e em amortização
                </span>
              </div>

              {/* Total Consolidado Auditável */}
              <div className="bg-[#56007e] p-2.5 rounded-lg text-white">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-purple-200 uppercase font-bold">
                    GERAÇÃO LÍQUIDA DIÁRIA
                  </span>
                  <span className="text-[9px] bg-[#8cc63f] text-slate-950 font-black px-1.5 py-0.5 rounded">
                    LIVRE
                  </span>
                </div>
                <span className="font-black font-mono text-sm block mt-0.5">
                  R$ {formatCurrency(resultadoReal)}
                </span>
                <span className="text-[9px] text-purple-300">
                  Cálculo Real: {formatCurrency(inputRecaudos)} - {formatCurrency(inputVendas)} - {formatCurrency(inputGastos)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* =========================================================================
          COMUNICAÇÃO ESSENCIAL: COBRANÇA ATIVA & SEMÁFORO DE RISCO (WHATSAPP)
          Adicionado acima da sessão do mapa / telemetria conforme solicitado
          ========================================================================= */}
      <CobrancaAtivaWhatsAppSection />



      {/* =========================================================================
          SETOR 6: ALERTA CRÍTICO DE PÂNICO & CENTRAL GPS & TELEMETRIA EM CAMPO
          (SETOR DE SEGURANÇA OPERACIONAL & LOGÍSTICA DE COBRANÇA)
          ========================================================================= */}
      <div id="central-telemetria-gps" className="space-y-3 pt-2">
        {/* Red Panic Banner */}
        {!isPanicResolved && (
          <div className="bg-[#b91c1c] text-white p-3 sm:p-4 rounded-xl shadow-lg flex items-center justify-between flex-wrap gap-3 animate-pulse border-2 border-red-400">
            <div className="flex items-center space-x-2.5">
              <AlertTriangle className="w-6 h-6 text-white shrink-0 animate-bounce" />
              <div>
                <span className="font-bold text-xs sm:text-sm block">
                  ALERTA CRÍTICO DE PÂNICO EM ROTA: Cobrador Carlos Oliveira (UGI 01) acionou emergência às 10:48 na Av. Rangel Pestana.
                </span>
                <span className="text-[11px] text-red-200">
                  Setor Responsável: Segurança Operacional & Supervisão Regional • Protocolo de apoio ativado.
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedAgentId('carlos');
                  alert('Foco fixado no agente Carlos Oliveira (UGI 01) no grid de satélite!');
                }}
                className="px-3 py-1.5 rounded-full bg-white text-[#b91c1c] hover:bg-slate-100 font-black text-xs flex items-center space-x-1 cursor-pointer shadow"
              >
                <MapPin className="w-3.5 h-3.5 text-[#b91c1c]" />
                <span>Localizar no Radar</span>
              </button>
              <button
                onClick={() => setIsPanicResolved(true)}
                className="p-1 rounded-full hover:bg-red-800 text-white cursor-pointer"
                title="Fechar aviso temporário"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dark Tactical Operations Container matching tactical interface */}
        <div className="bg-[#050b14] text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
                  SETOR 6: SEGURANÇA & LOGÍSTICA
                </span>
                <h3 className="font-black text-lg text-white">
                  Central GPS & Telemetria em Campo
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase tracking-wider flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
                  <span>Live Satélite</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Rastreamento de cobradores em rota física, cerca eletrônica, velocidade e monitoramento de integridade do trabalhador.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setTelemetriaFilter('todos')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  telemetriaFilter === 'todos'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Todos (5)
              </button>
              <button
                onClick={() => setTelemetriaFilter('em_rota')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  telemetriaFilter === 'em_rota'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Em Rota (3)
              </button>
              <button
                onClick={() => setTelemetriaFilter('cobrando')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  telemetriaFilter === 'cobrando'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cobrando (1)
              </button>
              <button
                onClick={() => setTelemetriaFilter('panico')}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  telemetriaFilter === 'panico'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                Pânico (1)
              </button>
            </div>
          </div>

          {/* 2-Column Tactical Body: Map (Left) + Dossier (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Interactive Radar Map Canvas (Col 1-8) */}
            <div className="lg:col-span-8 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                <span className="font-mono text-[11px] text-slate-300">
                  Grid Metropolitano de São Paulo & Grande SP | Telemetria Ativa
                </span>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showRastro}
                      onChange={() => setShowRastro(!showRastro)}
                      className="rounded border-slate-700 text-sky-500 accent-sky-500"
                    />
                    <span>Exibir Trilha de Rastro</span>
                  </label>
                  <button
                    onClick={() => alert('Pings de telemetria sincronizados com todas as 5 rotas!')}
                    className="flex items-center space-x-1 text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Atualizar Pings</span>
                  </button>
                </div>
              </div>

              {/* Tactical Satellite Canvas */}
              <div className="relative w-full h-[380px] bg-[#030712] rounded-xl border border-slate-800/90 overflow-hidden select-none">
                {/* Radial and Grid Lines */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                ></div>

                {/* Region Zones Labels */}
                <div className="absolute top-4 left-6 text-[10px] font-mono tracking-widest text-slate-600 font-bold uppercase">
                  ZONA NORTE / SANTANA & GUARULHOS
                </div>
                <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest text-slate-600 font-bold uppercase">
                  ZONA LESTE / TATUAPÉ & MOOCA
                </div>
                <div className="absolute bottom-8 left-1/3 text-[10px] font-mono tracking-widest text-slate-600 font-bold uppercase">
                  CENTRO HISTÓRICO / SÉ & BRÁS
                </div>

                {/* Trails / Polyline between agents */}
                {showRastro && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path
                      d="M 160 120 L 260 210 L 480 180"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-40"
                    />
                    <path
                      d="M 260 210 L 320 310 L 580 340"
                      fill="none"
                      stroke="#b91c1c"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      className="opacity-70 animate-pulse"
                    />
                  </svg>
                )}

                {/* Agent 1: Fernanda UGI 04 */}
                <div
                  onClick={() => setSelectedAgentId('fernanda')}
                  className="absolute top-24 left-32 flex items-center space-x-1.5 cursor-pointer group"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 group-hover:scale-125 transition"></span>
                  <div className="bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200">
                    Fernanda <span className="text-cyan-400 font-mono">UGI 04</span>
                  </div>
                </div>

                {/* Agent 2: Roberto UGI 02 */}
                <div
                  onClick={() => setSelectedAgentId('roberto')}
                  className="absolute top-36 right-48 flex items-center space-x-1.5 cursor-pointer group"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 group-hover:scale-125 transition"></span>
                  <div className="bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200">
                    Roberto <span className="text-cyan-400 font-mono">UGI 02</span>
                  </div>
                </div>

                {/* Agent 3: Marcos UGI 03 */}
                <div
                  onClick={() => setSelectedAgentId('marcos')}
                  className="absolute bottom-20 left-60 flex items-center space-x-1.5 cursor-pointer group"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 group-hover:scale-125 transition"></span>
                  <div className="bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200">
                    Marcos <span className="text-emerald-400 font-mono">UGI 03</span>
                  </div>
                </div>

                {/* Agent 4: Lucas UGI 05 */}
                <div
                  onClick={() => setSelectedAgentId('lucas')}
                  className="absolute bottom-12 right-36 flex items-center space-x-1.5 cursor-pointer group"
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20 group-hover:scale-125 transition"></span>
                  <div className="bg-slate-900/90 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200">
                    Lucas <span className="text-cyan-400 font-mono">UGI 05</span>
                  </div>
                </div>

                {/* Agent 5: Carlos UGI 01 (EM PÂNICO / PULSING RED RADAR) */}
                <div
                  onClick={() => setSelectedAgentId('carlos')}
                  className="absolute top-44 left-56 flex items-center space-x-2 cursor-pointer z-20"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-12 h-12 rounded-full bg-rose-600/40 animate-ping"></span>
                    <span className="absolute w-8 h-8 rounded-full bg-rose-600/60 animate-pulse"></span>
                    <span className="w-5 h-5 rounded-full bg-rose-600 ring-4 ring-rose-600/50 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                      !
                    </span>
                  </div>
                  <div className="bg-rose-950/90 border border-rose-600 px-2.5 py-1 rounded-lg text-[11px] font-black text-white shadow-xl flex flex-col">
                    <span>Carlos Oliveira</span>
                    <span className="text-[9px] text-rose-300 font-mono">UGI 01 • PÂNICO ATIVADO</span>
                  </div>
                </div>
              </div>

              {/* Map Legend */}
              <div className="flex items-center space-x-6 text-xs text-slate-400 pt-1 flex-wrap gap-y-2">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                  <span>Em Movimento / Rota</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                  <span>Cobrando em Loja / Amortizando</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block animate-pulse"></span>
                  <span className="text-rose-400 font-bold">Pânico / Emergência SOS</span>
                </span>
              </div>
            </div>

            {/* Right Column: Dossiê do Cobrador (Col 9-12) */}
            <div className="lg:col-span-4 p-4 sm:p-6 space-y-4 bg-slate-950/40">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                    DOSSIÊ DO TRABALHADOR DE ROTA
                  </span>
                  <h4 className="text-lg font-black text-white leading-tight">
                    Carlos Oliveira
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    UGI 01 • Rota Centro Histórico
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-rose-600/30 text-rose-400 border border-rose-600/50 text-[10px] font-black uppercase tracking-wider animate-pulse">
                  EMERGÊNCIA
                </span>
              </div>

              {/* Info Box 1: Location & Coordinates */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Última Localização GPS Confirmada:</span>
                </div>
                <p className="font-bold text-white text-sm">
                  Av. Rangel Pestana, 412 - Brás, São Paulo
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Coord: -23.5489, -46.6388</span>
                  <span className="text-sky-400 font-semibold">Há 12 segundos</span>
                </div>
              </div>

              {/* Info Box 2: Speed & Battery */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-400 block mb-1">
                    Velocidade Atual:
                  </span>
                  <span className="font-mono text-lg font-bold text-white">
                    0 km/h (Parado)
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-slate-400">Bateria Smartphone:</span>
                    <Battery className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                  <span className="font-mono text-lg font-bold text-rose-400">
                    18% (Alerta)
                  </span>
                </div>
              </div>

              {/* Info Box 3: Route Progress & Cash In Hand */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Progresso da Rota Diária:</span>
                  <span className="font-bold text-sky-400 font-mono">19 de 22 clientes (86%)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-sky-400 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Dinheiro Físico em Custódia:</span>
                  <span className="font-mono font-bold text-emerald-400">R$ 11.459,70</span>
                </div>
              </div>

              {/* Info Box 4: Device & Security Locking */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Aparelho Corporativo:</span>
                  <span className="font-bold text-slate-200">Samsung Galaxy A34 5G</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Trava IMEI Remota:</span>
                  <span className="font-mono text-emerald-400">Pronta para Bloqueio</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert('Disparando ligação para Carlos Oliveira: (11) 98765-4321...')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-sky-400" />
                    <span>Ligar para Agente</span>
                  </button>

                  <button
                    onClick={() => alert('Sinal de ping de satélite forçado enviado ao dispositivo!')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Forçar Ping GPS</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    setIsPanicResolved(true);
                    alert('Alerta de Pânico de Carlos Oliveira desativado e arquivado com sucesso no livro de ocorrências!');
                  }}
                  className="w-full py-3 rounded-xl bg-[#8cc63f] hover:bg-[#7cb342] text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow-lg"
                >
                  <Shield className="w-4 h-4 text-slate-950" />
                  <span>Desativar / Resolver Alerta de Pânico</span>
                </button>

                <button
                  onClick={() => setSelectedDossieEmployee(INITIAL_EMPLOYEE_PERFORMANCE[0])}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#50007d] to-[#390054] hover:from-[#600096] hover:to-[#4a006c] text-white font-black text-xs flex items-center justify-center space-x-2 transition cursor-pointer shadow border border-purple-400/30"
                >
                  <Eye className="w-3.5 h-3.5 text-[#8cc63f]" />
                  <span>Ver Dossiê Completo (Auditoria 360°)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: DETALHES DE AUDITORIA DA UNIDADE (ROW CLICK)
          ========================================================================= */}
      {selectedUnitForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#50007d] to-[#390054] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8cc63f] bg-[#8cc63f]/20 px-2 py-0.5 rounded">
                  SETOR DE AUDITORIA & FECHAMENTO DE CAIXA
                </span>
                <h3 className="font-bold text-base flex items-center space-x-2 mt-1">
                  <span>Conferência de Caixa — {selectedUnitForModal.name}</span>
                </h3>
                <p className="text-xs text-purple-200">
                  {selectedUnitForModal.cnName} • Cobrador Responsável: {selectedUnitForModal.collectorName}
                </p>
              </div>
              <button
                onClick={() => setSelectedUnitForModal(null)}
                className="w-8 h-8 rounded-full bg-purple-900/60 hover:bg-purple-900 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <span className="text-xs font-semibold text-purple-700 block mb-1">
                    Caixa Final / Atual
                  </span>
                  <div className="text-2xl font-black text-[#50007d] font-mono">
                    R$ {formatCurrency(selectedUnitForModal.finalCash)}
                  </div>
                  <span className="text-[11px] text-purple-600 mt-1 block">
                    Caixa #{selectedUnitForModal.cashRegisterNumber} • {selectedUnitForModal.cashDate}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-semibold text-emerald-800 block mb-1">
                    Arrecadação Líquida (Delta)
                  </span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">
                    R$ {formatCurrency(selectedUnitForModal.finalCash - selectedUnitForModal.initialCash)}
                  </div>
                  <span className="text-[11px] text-emerald-700 mt-1 block font-medium">
                    Caixa Final - Caixa Inicial
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-xs font-semibold text-amber-800 block mb-1">
                    Progresso da Rota
                  </span>
                  <div className="text-2xl font-black text-amber-700 font-mono">
                    {selectedUnitForModal.progressPercent}%
                  </div>
                  <span className="text-[11px] text-amber-700 mt-1 block">
                    {selectedUnitForModal.status === 'Cerrada' ? 'Caixa já encerrado' : 'Rota em andamento'}
                  </span>
                </div>
              </div>

              {/* Indicadores Detalhados de Auditoria */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3 text-xs">
                <h4 className="font-bold text-slate-800 flex items-center justify-between">
                  <span>Memória de Cálculo da Unidade</span>
                  <span className="text-xs text-slate-500 font-mono">{selectedUnitForModal.pin}</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">1. Abertura</span>
                    <span className="font-bold font-mono">R$ {formatCurrency(selectedUnitForModal.initialCash)}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-emerald-700 block uppercase font-bold">2. Entradas</span>
                    <span className="font-bold font-mono text-emerald-700">+R$ {formatCurrency((selectedUnitForModal.finalCash - selectedUnitForModal.initialCash) + 320)}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-rose-600 block uppercase font-bold">3. Opex Rota</span>
                    <span className="font-bold font-mono text-rose-600">-R$ 320,00</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-purple-700 block uppercase font-bold">4. Saldo em Mãos</span>
                    <span className="font-bold font-mono text-slate-900">R$ {formatCurrency(selectedUnitForModal.finalCash)}</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 text-slate-600 space-y-1">
                  <span className="font-bold text-slate-900 block">Auditoria de Segurança:</span>
                  <p className="text-[11px] leading-relaxed">
                    Sincronização realizada com sucesso às <b>{selectedUnitForModal.lastSync || 'Hoje'}</b> via aplicativo mobile autenticado.
                    Todas as cobranças possuem geolocalização e recibo digital emitido.
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedUnitForModal(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    alert(`Comprovante de Auditoria do Caixa #${selectedUnitForModal.cashRegisterNumber} gerado com sucesso!`);
                    setSelectedUnitForModal(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#50007d] hover:bg-[#400066] text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#8cc63f]" />
                  <span>Emitir Extrato de Fechamento</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: MANUAL DIDÁTICO DAS FÓRMULAS E SETORES DA PÁGINA INICIAL
          ========================================================================= */}
      {isFormulaExplainerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#8cc63f]" />
                <h3 className="font-bold text-base">
                  Manual de Cálculos, Fórmulas & Funções dos Setores
                </h3>
              </div>
              <button
                onClick={() => setIsFormulaExplainerOpen(false)}
                className="w-8 h-8 rounded-full bg-purple-900/60 hover:bg-purple-900 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                <h4 className="font-bold text-sm text-[#50007d] flex items-center space-x-1.5">
                  <Calculator className="w-4 h-4" />
                  <span>1. A Fórmula Central: Recaudos - Vendas - Gastos = Resultado Real</span>
                </h4>
                <p>
                  No modelo de microcrédito e cobrança de rotas diárias, a apuração de fluxo de caixa precisa ser imediata e sem distorções:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>
                    <b>Recaudos (+):</b> É o dinheiro vivo que entra no caixa pelo pagamento das parcelas de contratos já ativos. Recupera capital e juros.
                  </li>
                  <li>
                    <b>Total de Vendas (-):</b> É o capital que sai do caixa no dia para entregar aos tomadores de crédito em novos contratos ou renovações.
                  </li>
                  <li>
                    <b>Total de Gastos (-):</b> Despesas operacionais do cobrador na rua (combustível, refeições, taxas, manutenção da moto).
                  </li>
                  <li>
                    <b>Resultado Real (=):</b> O valor líquido que sobrou livre após cobrir os novos empréstimos e os custos de rota. Se positivo, gerou caixa para a tesouraria; se negativo, a empresa injetou capital para crescer a carteira.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900">
                  2. As 6 Áreas Operacionais & Designação dos Setores
                </h4>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                  <span className="font-bold text-[#50007d]">Setor 1 — Auditoria de Unidades (UGIs):</span>
                  <p className="text-slate-600 text-[11px]">
                    Responsável por conferir o Caixa Inicial e o Caixa Final de cada cobrador. Calcula o Delta de arrecadação em espécie e audita o fechamento diário.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                  <span className="font-bold text-[#50007d]">Setor 2 — Tesouraria & Risco:</span>
                  <p className="text-slate-600 text-[11px]">
                    Controla o dinheiro físico sob custódia imediata dos cobradores e monitora a exposição total do capital emprestado em rua (Carteira Ativa).
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                  <span className="font-bold text-[#50007d]">Setor 3 — Controladoria & Fluxo de Caixa:</span>
                  <p className="text-slate-600 text-[11px]">
                    Executa a simulação de cenários (Otimista, Conservador, Expansão, Estresse) e calcula a Margem Operacional Líquida, Taxa de Reinvestimento e Ponto de Equilíbrio.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                  <span className="font-bold text-[#50007d]">Setor 4 — Inteligência de Risco & Score 2.0:</span>
                  <p className="text-slate-600 text-[11px]">
                    Classifica a pontualidade e o comportamento de pagamento dos clientes em critérios ponderados (A, B, C) e acompanha o ciclo semanal (Seg-Sáb).
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                  <span className="font-bold text-[#50007d]">Setor 5 — Alocação de Capital & Expansão:</span>
                  <p className="text-slate-600 text-[11px]">
                    Mapeia a distribuição percentual do volume emprestado entre as rotas para evitar concentração de risco em bairros específicos.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                  <span className="font-bold text-[#50007d]">Setor 6 — Logística & Segurança Operacional do Trabalhador:</span>
                  <p className="text-slate-600 text-[11px]">
                    Acompanha a telemetria GPS, pings de satélite, nível de bateria e acionamento de alertas de pânico (SOS), garantindo a proteção física do cobrador e do patrimônio.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsFormulaExplainerOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#50007d] hover:bg-[#3f0063] text-white font-bold text-xs cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CONFIGURAR PONTUAÇÃO / SCORE 2.0 (BUTTON CLICK)
          ========================================================================= */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-[#50007d] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Hexagon className="w-5 h-5 text-[#8cc63f]" />
                <h3 className="font-bold text-base">
                  Configuração de Pontuação & Score 2.0
                </h3>
              </div>
              <button
                onClick={() => setIsScoreModalOpen(false)}
                className="w-8 h-8 rounded-full bg-purple-900/60 hover:bg-purple-900 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500">
                Configure o peso percentual ponderado para a classificação das unidades (A, B, C, D). A soma deve totalizar exatamente 100%.
              </p>

              <div className="space-y-3">
                {/* Criterio A */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">
                      Critério A: Pontualidade de Parcelas vs Caixas
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Proporção de parcelas amortizadas vs dias transcorridos
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={criterioA}
                      onChange={(e) => setCriterioA(parseInt(e.target.value) || 0)}
                      className="w-16 bg-white border border-slate-300 rounded-lg p-1.5 text-center font-bold text-xs font-mono text-slate-900"
                    />
                    <span className="font-bold text-slate-500 text-xs">%</span>
                  </div>
                </div>

                {/* Criterio B */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">
                      Critério B: Regularidade & Frequência de Pagamentos
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Consistência de visitação e redução de inadimplência
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={criterioB}
                      onChange={(e) => setCriterioB(parseInt(e.target.value) || 0)}
                      className="w-16 bg-white border border-slate-300 rounded-lg p-1.5 text-center font-bold text-xs font-mono text-slate-900"
                    />
                    <span className="font-bold text-slate-500 text-xs">%</span>
                  </div>
                </div>

                {/* Criterio C */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">
                      Critério C: Amortização Média & Recaudos Adicionais
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Capacidade de amortização antecipada de saldos devedores
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      value={criterioC}
                      onChange={(e) => setCriterioC(parseInt(e.target.value) || 0)}
                      className="w-16 bg-white border border-slate-300 rounded-lg p-1.5 text-center font-bold text-xs font-mono text-slate-900"
                    />
                    <span className="font-bold text-slate-500 text-xs">%</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-200 text-xs font-bold">
                  <span className="text-purple-900">Soma Total dos Pesos:</span>
                  <span
                    className={`font-mono text-sm ${
                      criterioA + criterioB + criterioC === 100
                        ? 'text-emerald-700'
                        : 'text-rose-600'
                    }`}
                  >
                    {criterioA + criterioB + criterioC}%{' '}
                    {criterioA + criterioB + criterioC === 100 ? '✓' : '(Deve somar 100%)'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsScoreModalOpen(false);
                    onOpenScoreConfig();
                  }}
                  className="text-xs text-[#50007d] hover:underline font-semibold cursor-pointer"
                >
                  Abrir no Painel de Administração →
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsScoreModalOpen(false)}
                    className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      if (criterioA + criterioB + criterioC !== 100) {
                        alert('A soma dos critérios deve ser exatamente 100%!');
                        return;
                      }
                      setIsScoreSaved(true);
                      setTimeout(() => {
                        setIsScoreSaved(false);
                        setIsScoreModalOpen(false);
                      }, 1000);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold text-xs transition cursor-pointer"
                  >
                    {isScoreSaved ? '✓ Salvo!' : 'Salvar Pontuação'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: DOSSIÊ COMPLETO OPERACIONAL (AUDITORIA 360°)
          ========================================================================= */}
      {selectedDossieEmployee && (
        <DossieCompletoModal
          employee={selectedDossieEmployee}
          allEmployees={INITIAL_EMPLOYEE_PERFORMANCE}
          onSelectEmployee={(emp) => setSelectedDossieEmployee(emp)}
          onClose={() => setSelectedDossieEmployee(null)}
          onLocateOnRadar={(agentId) => {
            setSelectedAgentId(agentId as any);
            const radarElem = document.getElementById('central-telemetria-gps');
            if (radarElem) {
              radarElem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}

      {/* =========================================================================
          MODAIS DAS NOVIDADES SOLICITADAS PELO CLIENTE (WHATSAPP)
          ========================================================================= */}
      {/* 1. Modal de Disparo em Massa via WhatsApp */}
      <DisparoEmMassaModal
        isOpen={isDisparoEmMassaOpen}
        onClose={() => setIsDisparoEmMassaOpen(false)}
        totalClientsCount={contracts.length || 48}
      />

      {/* 2. Modal de Gerar Link de Pagamento Oficial PIX / Cartão */}
      <PaymentLinkModal
        isOpen={isPaymentLinkOpen}
        onClose={() => setIsPaymentLinkOpen(false)}
        clientName="Anielo Gomes Corvino"
        contractId="1003161"
        defaultAmount={120}
      />

      {/* 3. Modal de Calculadora Multi-Funções % Mais Controle */}
      <CalculadoraMultiFuncaoModal
        isOpen={isMultiCalcOpen}
        onClose={() => setIsMultiCalcOpen(false)}
        initialTab="juros"
        onApplyCalculatedValues={(vals) => {
          if (vals.valorBase) {
            setInputVendas(vals.valorBase);
          }
        }}
      />
    </div>
  );
};
