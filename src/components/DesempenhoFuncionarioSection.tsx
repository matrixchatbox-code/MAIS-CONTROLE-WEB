import React, { useState, useMemo } from 'react';
import {
  UnitSummaryItem,
  DeviceItem,
  Language,
} from '../types';
import { DossieCompletoModal } from './modals/DossieCompletoModal';
import {
  Users,
  UserCheck,
  Smartphone,
  Building2,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  Battery,
  Wifi,
  ShieldCheck,
  AlertCircle,
  Search,
  Filter,
  ArrowUpRight,
  BarChart3,
  FileText,
  ChevronRight,
  RefreshCw,
  MapPin,
  Eye,
  Percent,
  Calendar,
  Zap,
  X,
  Send,
  Lock,
  Unlock,
  Sliders,
  Check,
  AlertTriangle
} from 'lucide-react';

export type DesempenhoViewMode = 'resumo' | 'detalhes';
export type DesempenhoPillarFilter = 'todos' | 'unidade' | 'dispositivo' | 'usuarios' | 'cobranca';

export interface EmployeePerformanceData {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  // Pilar 1: Unidade
  unitId: string;
  unitName: string;
  cnCode: string;
  location: string;
  unitCashOnHand: number;
  // Pilar 2: Dispositivo
  deviceModel: string;
  deviceImei: string;
  devicePin: string;
  deviceBattery: number;
  deviceSignal: '5G' | '4.5G' | '4G';
  deviceOperator: string;
  deviceAppVersion: string;
  deviceLastSync: string;
  deviceStatus: 'autorizado' | 'bloqueado';
  // Pilar 3: Usuários / Jornada
  startTime: string;
  hoursWorked: string;
  score: number;
  scoreGrade: 'A+' | 'A' | 'B' | 'C';
  punctualityPercent: number;
  status: 'em_rota' | 'pausa' | 'alerta_ritmo' | 'finalizado';
  statusLabel: string;
  routeArea: string;
  // Pilar 4: Cobrança
  dailyTarget: number;
  collectedAmount: number;
  progressPercent: number;
  visitedClients: number;
  plannedClients: number;
  visitsPercent: number;
  delinquencyPercent: number;
  averageTicket: number;
  cashCollected: number;
  pixCollected: number;
  // Recent receipts for dossier
  recentPayments: {
    client: string;
    value: number;
    time: string;
    method: 'Efectivo' | 'Pix';
  }[];
}

export const INITIAL_EMPLOYEE_PERFORMANCE: EmployeePerformanceData[] = [
  {
    id: 'emp-carlos',
    name: 'Carlos Oliveira',
    role: 'Cobrador Sênior de Rota',
    avatarBg: 'bg-purple-600',
    unitId: 'ugi-1',
    unitName: '1 - UGI-1 São Paulo',
    cnCode: '/1/',
    location: 'São Paulo (Brás / Mooca / Belém)',
    unitCashOnHand: 14850.0,
    deviceModel: 'Samsung Galaxy A34 5G',
    deviceImei: '864291048291024',
    devicePin: 'E4224059',
    deviceBattery: 92,
    deviceSignal: '5G',
    deviceOperator: 'Vivo',
    deviceAppVersion: '5.6.0.1',
    deviceLastSync: 'Há 4 min',
    deviceStatus: 'autorizado',
    startTime: '07:30',
    hoursWorked: '6h 18m',
    score: 98,
    scoreGrade: 'A',
    punctualityPercent: 100,
    status: 'em_rota',
    statusLabel: 'Em Rota Ativa',
    routeArea: 'Av. Rangel Pestana / Celso Garcia',
    dailyTarget: 38000.0,
    collectedAmount: 34200.0,
    progressPercent: 90.0,
    visitedClients: 42,
    plannedClients: 45,
    visitsPercent: 93.3,
    delinquencyPercent: 3.2,
    averageTicket: 814.28,
    cashCollected: 21800.0,
    pixCollected: 12400.0,
    recentPayments: [
      { client: 'Carmela Sánchez Hernández', value: 360.0, time: '14:10', method: 'Efectivo' },
      { client: 'Mercado Bom Preço Mooca', value: 1200.0, time: '13:45', method: 'Pix' },
      { client: 'Auto Peças Rangel ME', value: 850.0, time: '12:20', method: 'Efectivo' },
      { client: 'Panificadora do Belém', value: 450.0, time: '11:15', method: 'Efectivo' },
    ],
  },
  {
    id: 'emp-roberto',
    name: 'Roberto Mendes',
    role: 'Cobrador Pleno de Rota',
    avatarBg: 'bg-blue-600',
    unitId: 'ugi-2',
    unitName: '2 - UGI-2 Zona Leste',
    cnCode: '/1/',
    location: 'São Paulo (Tatuapé / Penha / Itaquera)',
    unitCashOnHand: 11230.0,
    deviceModel: 'Motorola Moto G84 5G',
    deviceImei: '863920194827104',
    devicePin: '0A5173AA',
    deviceBattery: 78,
    deviceSignal: '4.5G',
    deviceOperator: 'Claro',
    deviceAppVersion: '5.6.0.1',
    deviceLastSync: 'Há 6 min',
    deviceStatus: 'autorizado',
    startTime: '07:45',
    hoursWorked: '6h 02m',
    score: 92,
    scoreGrade: 'A',
    punctualityPercent: 96,
    status: 'em_rota',
    statusLabel: 'Em Rota Ativa',
    routeArea: 'Radial Leste / Av. Celso Garcia',
    dailyTarget: 26000.0,
    collectedAmount: 24180.0,
    progressPercent: 93.0,
    visitedClients: 38,
    plannedClients: 40,
    visitsPercent: 95.0,
    delinquencyPercent: 4.1,
    averageTicket: 636.31,
    cashCollected: 14380.0,
    pixCollected: 9800.0,
    recentPayments: [
      { client: 'William Abella Souza', value: 180.0, time: '15:45', method: 'Pix' },
      { client: 'Lanchonete Penha Central', value: 650.0, time: '14:50', method: 'Efectivo' },
      { client: 'Drogaria Itaquera Popular', value: 920.0, time: '13:30', method: 'Pix' },
    ],
  },
  {
    id: 'emp-fernanda',
    name: 'Fernanda Rocha',
    role: 'Supervisora de Rota & Cobradora',
    avatarBg: 'bg-emerald-600',
    unitId: 'ugi-4',
    unitName: '4 - UGI Campinas Rapi Crédito',
    cnCode: '/2/',
    location: 'Campinas (Centro / Cambuí / Taquaral)',
    unitCashOnHand: 9870.0,
    deviceModel: 'Samsung Galaxy S21 FE',
    deviceImei: '864190283746190',
    devicePin: '192849CA',
    deviceBattery: 88,
    deviceSignal: '5G',
    deviceOperator: 'Vivo',
    deviceAppVersion: '5.6.0.1',
    deviceLastSync: 'Há 12 min',
    deviceStatus: 'autorizado',
    startTime: '07:15',
    hoursWorked: '6h 35m',
    score: 99,
    scoreGrade: 'A+',
    punctualityPercent: 100,
    status: 'em_rota',
    statusLabel: 'Em Rota Ativa',
    routeArea: 'Av. Francisco Glicério / Av. Barão de Itapura',
    dailyTarget: 22000.0,
    collectedAmount: 21340.0,
    progressPercent: 97.0,
    visitedClients: 33,
    plannedClients: 34,
    visitsPercent: 97.1,
    delinquencyPercent: 2.1,
    averageTicket: 646.66,
    cashCollected: 10140.0,
    pixCollected: 11200.0,
    recentPayments: [
      { client: 'Ótica Estilo Cambuí', value: 780.0, time: '15:10', method: 'Pix' },
      { client: 'Padaria Campineira Taquaral', value: 540.0, time: '14:20', method: 'Efectivo' },
      { client: 'Boutique Moderna Ltda', value: 1100.0, time: '13:05', method: 'Pix' },
    ],
  },
  {
    id: 'emp-marcos',
    name: 'Marcos Silveira',
    role: 'Cobrador Júnior de Rota',
    avatarBg: 'bg-amber-600',
    unitId: 'ugi-3',
    unitName: '3 - UGI Centro Expandido',
    cnCode: '/1/',
    location: 'São Paulo (Consolação / Pinheiros / Jardins)',
    unitCashOnHand: 8920.0,
    deviceModel: 'Xiaomi Redmi Note 13',
    deviceImei: '869281726354819',
    devicePin: '4877325C',
    deviceBattery: 64,
    deviceSignal: '4G',
    deviceOperator: 'Tim',
    deviceAppVersion: '5.6.0.1',
    deviceLastSync: 'Há 8 min',
    deviceStatus: 'autorizado',
    startTime: '08:00',
    hoursWorked: '5h 45m',
    score: 85,
    scoreGrade: 'B',
    punctualityPercent: 91,
    status: 'pausa',
    statusLabel: 'Pausa Almoço Autorizada',
    routeArea: 'Rua Augusta / Rua da Consolação',
    dailyTarget: 18000.0,
    collectedAmount: 14760.0,
    progressPercent: 82.0,
    visitedClients: 27,
    plannedClients: 35,
    visitsPercent: 77.1,
    delinquencyPercent: 6.8,
    averageTicket: 546.66,
    cashCollected: 9360.0,
    pixCollected: 5400.0,
    recentPayments: [
      { client: 'Maria Pastelaria', value: 660.0, time: '12:45', method: 'Efectivo' },
      { client: 'Papelaria & Bazar Augusta', value: 380.0, time: '11:50', method: 'Pix' },
    ],
  },
  {
    id: 'emp-lucas',
    name: 'Lucas Barreto',
    role: 'Cobrador Pleno de Rota',
    avatarBg: 'bg-rose-600',
    unitId: 'ugi-5',
    unitName: '5 - UGI Rio Baixada',
    cnCode: '/3/',
    location: 'Rio de Janeiro (Duque de Caxias / N. Iguaçu)',
    unitCashOnHand: 9140.0,
    deviceModel: 'Motorola Moto Edge 40',
    deviceImei: '868301928374619',
    devicePin: '994012RJ',
    deviceBattery: 45,
    deviceSignal: '4G',
    deviceOperator: 'Claro',
    deviceAppVersion: '5.6.0.1',
    deviceLastSync: 'Há 18 min',
    deviceStatus: 'autorizado',
    startTime: '08:15',
    hoursWorked: '5h 30m',
    score: 79,
    scoreGrade: 'C',
    punctualityPercent: 84,
    status: 'alerta_ritmo',
    statusLabel: 'Ritmo Abaixo da Meta (Atenção)',
    routeArea: 'Av. Brigadeiro Lima e Silva / Centro Caxias',
    dailyTarget: 24000.0,
    collectedAmount: 17520.0,
    progressPercent: 73.0,
    visitedClients: 22,
    plannedClients: 38,
    visitsPercent: 57.9,
    delinquencyPercent: 8.4,
    averageTicket: 796.36,
    cashCollected: 12720.0,
    pixCollected: 4800.0,
    recentPayments: [
      { client: 'Mercearia Central Baixada', value: 450.0, time: '13:10', method: 'Efectivo' },
      { client: 'Borracharia & Pneus Caxias', value: 890.0, time: '11:30', method: 'Efectivo' },
    ],
  },
];

interface DesempenhoFuncionarioSectionProps {
  units?: UnitSummaryItem[];
  devices?: DeviceItem[];
  language?: Language;
  onNavigateTab?: (tab: any, subView?: any) => void;
  onLocateOnRadar?: (agentId: string) => void;
}

export const DesempenhoFuncionarioSection: React.FC<DesempenhoFuncionarioSectionProps> = ({
  units = [],
  devices = [],
  language = 'pt',
  onNavigateTab,
  onLocateOnRadar,
}) => {
  // Primary view toggle: Resumo vs Detalhes
  const [viewMode, setViewMode] = useState<DesempenhoViewMode>('resumo');

  // Pillar filter: Todos, Unidade, Dispositivo, Usuários, Cobrança
  const [pillarFilter, setPillarFilter] = useState<DesempenhoPillarFilter>('todos');

  // Search query & status filter for Detalhes view
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'em_rota' | 'pausa' | 'alerta_ritmo'>('todos');

  // Selected employee for detailed dossier modal
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeePerformanceData | null>(null);

  // Quick feedback state for device ping/sync
  const [pingedId, setPingedId] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Consolidated KPIs across the 4 pillars
  const consolidatedMetrics = useMemo(() => {
    const totalTarget = INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.dailyTarget, 0);
    const totalCollected = INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.collectedAmount, 0);
    const overallProgress = totalTarget > 0 ? (totalCollected / totalTarget) * 100 : 0;

    const totalPlannedVisits = INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.plannedClients, 0);
    const totalVisited = INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.visitedClients, 0);
    const overallVisitCoverage = totalPlannedVisits > 0 ? (totalVisited / totalPlannedVisits) * 100 : 0;

    const avgScore =
      INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.score, 0) / INITIAL_EMPLOYEE_PERFORMANCE.length;

    const totalCashOnHand = INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.unitCashOnHand, 0);
    const avgBattery =
      INITIAL_EMPLOYEE_PERFORMANCE.reduce((acc, e) => acc + e.deviceBattery, 0) / INITIAL_EMPLOYEE_PERFORMANCE.length;

    const activeInRoute = INITIAL_EMPLOYEE_PERFORMANCE.filter((e) => e.status === 'em_rota').length;
    const attentionCount = INITIAL_EMPLOYEE_PERFORMANCE.filter((e) => e.status === 'alerta_ritmo').length;

    return {
      totalTarget,
      totalCollected,
      overallProgress: overallProgress.toFixed(1),
      totalPlannedVisits,
      totalVisited,
      overallVisitCoverage: overallVisitCoverage.toFixed(1),
      avgScore: avgScore.toFixed(0),
      totalCashOnHand,
      avgBattery: avgBattery.toFixed(0),
      activeInRoute,
      attentionCount,
      totalEmployees: INITIAL_EMPLOYEE_PERFORMANCE.length,
    };
  }, []);

  // Filtered list for Detalhes table
  const filteredEmployees = useMemo(() => {
    return INITIAL_EMPLOYEE_PERFORMANCE.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.deviceModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.deviceImei.includes(searchQuery) ||
        emp.routeArea.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'todos' ? true : emp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Handler for pinging device
  const handlePingDevice = (employeeId: string, employeeName: string) => {
    setPingedId(employeeId);
    setTimeout(() => {
      setPingedId(null);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden space-y-0 transition-all">
      {/* =========================================================================
          CABEÇALHO DA SEÇÃO COM IDENTIDADE VISUAL EXECUTIVA & CONTROLES PRINCIPAIS
          ========================================================================= */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#180a2b] to-[#50007d] text-white relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#8cc63f]/15 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#8cc63f] text-slate-950 flex items-center space-x-1">
                <Award className="w-3 h-3 text-slate-950" />
                <span>Supervisão 360°</span>
              </span>
              <span className="text-purple-200 text-xs font-semibold">
                Matriz Integrada: Unidade • Dispositivo • Usuários • Cobrança
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2.5">
              <span>Resumo Executivo de Desempenho</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-purple-200 font-mono font-normal">
                {consolidatedMetrics.totalEmployees} colaboradores ativos
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/90 max-w-3xl leading-relaxed">
              Painel de rendimento operacional, cumprimento de metas diárias de arrecadação, conformidade técnica de
              dispositivos móveis e auditoria de presença em rota.
            </p>
          </div>

          {/* Action Controls: Mode Switcher (Resumo vs Detalhes) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Resumo / Detalhes Toggle */}
            <div className="p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md flex items-center space-x-1">
              <button
                onClick={() => setViewMode('resumo')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
                  viewMode === 'resumo'
                    ? 'bg-[#8cc63f] text-slate-950 shadow-md scale-[1.02]'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Resumo</span>
              </button>

              <button
                onClick={() => setViewMode('detalhes')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition flex items-center space-x-2 cursor-pointer ${
                  viewMode === 'detalhes'
                    ? 'bg-[#8cc63f] text-slate-950 shadow-md scale-[1.02]'
                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Detalhes</span>
              </button>

              <button
                onClick={() => setSelectedEmployee(INITIAL_EMPLOYEE_PERFORMANCE[0])}
                className="px-3.5 py-2 rounded-lg text-xs font-black transition flex items-center space-x-1.5 cursor-pointer bg-[#50007d] hover:bg-[#6800a0] text-white border border-purple-400/40 shadow-xs ml-1"
                title="Acessar Dossiê Completo com todas as 8 seções e auditoria dos 4 pilares"
              >
                <Eye className="w-3.5 h-3.5 text-[#8cc63f]" />
                <span>Dossiê Completo</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Filter Navigation Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            <span className="text-[11px] font-bold text-purple-300 mr-2 uppercase tracking-wider hidden sm:inline">
              Filtrar Pilar:
            </span>

            <button
              onClick={() => setPillarFilter('todos')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                pillarFilter === 'todos'
                  ? 'bg-white text-slate-900 shadow-sm font-black'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <span>Todos os Pilares</span>
            </button>

            <button
              onClick={() => setPillarFilter('unidade')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                pillarFilter === 'unidade'
                  ? 'bg-[#8cc63f] text-slate-950 shadow-sm font-black'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Unidade</span>
            </button>

            <button
              onClick={() => setPillarFilter('dispositivo')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                pillarFilter === 'dispositivo'
                  ? 'bg-[#8cc63f] text-slate-950 shadow-sm font-black'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Dispositivo</span>
            </button>

            <button
              onClick={() => setPillarFilter('usuarios')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                pillarFilter === 'usuarios'
                  ? 'bg-[#8cc63f] text-slate-950 shadow-sm font-black'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Usuários</span>
            </button>

            <button
              onClick={() => setPillarFilter('cobranca')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${
                pillarFilter === 'cobranca'
                  ? 'bg-[#8cc63f] text-slate-950 shadow-sm font-black'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Cobrança</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-purple-200">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Telemetria em tempo real • Atualizado a cada 60s</span>
          </div>
        </div>
      </div>



      {/* =========================================================================
          MODO 1: VISUALIZAÇÃO "RESUMO"
          (Leaderboard executivo, pódio de desempenho, cartões dos colaboradores e 4 pilares)
          ========================================================================= */}
      {viewMode === 'resumo' && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Section Subtitle */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center space-x-2">
                <span>Resumo Executivo de Desempenho</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-[#50007d]">
                  Classificação por Eficiência
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Acompanhamento individual e coletivo dos 4 pilares operacionais (Unidade, Dispositivo, Usuários e Cobrança).
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('detalhes')}
                className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-[#50007d] text-slate-700 hover:text-[#50007d] text-xs font-bold transition flex items-center space-x-1 cursor-pointer bg-white"
              >
                <span>Ver Grade Completa em Detalhes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Cards dos Colaboradores com os 4 Pilares Explícitos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INITIAL_EMPLOYEE_PERFORMANCE.map((emp, index) => {
              const isPinged = pingedId === emp.id;
              const isGold = index === 0;
              const isSilver = index === 1;
              const isBronze = index === 2;

              return (
                <div
                  key={emp.id}
                  className={`bg-white rounded-xl border transition-all shadow-xs hover:shadow-md overflow-hidden flex flex-col justify-between ${
                    emp.status === 'alerta_ritmo'
                      ? 'border-amber-300 hover:border-amber-400'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {/* Top Employee Identity Header */}
                  <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-11 h-11 rounded-xl ${emp.avatarBg} text-white font-black text-base flex items-center justify-center shadow-xs shrink-0 relative`}
                        >
                          {emp.name.slice(0, 2).toUpperCase()}
                          {/* Rank badge */}
                          <span
                            className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-slate-900 shadow-xs ${
                              isGold
                                ? 'bg-amber-400'
                                : isSilver
                                ? 'bg-slate-300'
                                : isBronze
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-200'
                            }`}
                          >
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-slate-900 leading-tight flex items-center space-x-1.5">
                            <span>{emp.name}</span>
                          </h4>
                          <span className="text-[11px] text-slate-500 font-medium block">{emp.role}</span>
                          <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                            Score {emp.score} pts ({emp.scoreGrade})
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {emp.status === 'em_rota' && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Em Rota</span>
                          </span>
                        )}
                        {emp.status === 'pausa' && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Pausa Almoço</span>
                          </span>
                        )}
                        {emp.status === 'alerta_ritmo' && (
                          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>Abaixo da Meta</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body: Os 4 Pilares em Evidência */}
                  <div className="p-4 space-y-3.5 text-xs flex-1">
                    {/* Pilar 1: Unidade */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Pilar 1: Unidade
                          </span>
                          <span className="font-bold text-slate-800 text-[11px]">{emp.unitName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Caixa em Mãos</span>
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          R$ {formatCurrency(emp.unitCashOnHand)}
                        </span>
                      </div>
                    </div>

                    {/* Pilar 2: Dispositivo */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Pilar 2: Dispositivo
                          </span>
                          <span className="font-semibold text-slate-800 text-[11px]">{emp.deviceModel}</span>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-1.5">
                        <div className="flex items-center space-x-1 text-slate-700 font-mono text-[11px]">
                          <Battery
                            className={`w-3.5 h-3.5 ${
                              emp.deviceBattery > 60
                                ? 'text-emerald-600'
                                : emp.deviceBattery > 30
                                ? 'text-amber-500'
                                : 'text-rose-600'
                            }`}
                          />
                          <span className="font-bold">{emp.deviceBattery}%</span>
                        </div>
                        <span className="text-[10px] font-bold px-1 rounded bg-slate-200 text-slate-700">
                          {emp.deviceSignal}
                        </span>
                      </div>
                    </div>

                    {/* Pilar 3: Usuários (Jornada & Rota) */}
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                            Pilar 3: Usuários (Jornada)
                          </span>
                          <span className="text-[11px] text-slate-700 font-medium">Início: {emp.startTime} ({emp.hoursWorked})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Pontualidade</span>
                        <span className="font-mono font-bold text-emerald-700 text-xs">
                          {emp.punctualityPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Pilar 4: Cobrança (Meta vs Realizado) */}
                    <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 flex items-center space-x-1">
                          <DollarSign className="w-3 h-3 text-[#50007d]" />
                          <span>Pilar 4: Cobrança do Dia</span>
                        </span>
                        <span className="font-mono font-black text-xs text-[#50007d]">
                          {emp.progressPercent.toFixed(1)}%
                        </span>
                      </div>

                      {/* Financial Numbers */}
                      <div className="flex justify-between items-baseline">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Arrecadado:</span>
                          <span className="text-sm font-black font-mono text-slate-900">
                            R$ {formatCurrency(emp.collectedAmount)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Meta:</span>
                          <span className="text-xs font-semibold font-mono text-slate-600">
                            R$ {formatCurrency(emp.dailyTarget)}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            emp.progressPercent >= 90
                              ? 'bg-[#8cc63f]'
                              : emp.progressPercent >= 80
                              ? 'bg-blue-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(emp.progressPercent, 100)}%` }}
                        />
                      </div>

                      {/* Extra metrics */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                        <span>{emp.visitedClients}/{emp.plannedClients} visitas concluídas</span>
                        <span>Mora: {emp.delinquencyPercent}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedEmployee(emp)}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 hover:border-[#50007d] text-slate-700 hover:text-[#50007d] font-bold text-xs transition flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-700" />
                      <span>Ver Dossiê</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onLocateOnRadar) {
                          onLocateOnRadar(emp.id.replace('emp-', ''));
                        } else {
                          const radarElem = document.getElementById('central-telemetria-gps');
                          if (radarElem) {
                            radarElem.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }}
                      className="py-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-900 font-bold text-xs transition flex items-center space-x-1 cursor-pointer"
                      title="Localizar no Radar de GPS da Central"
                    >
                      <MapPin className="w-3.5 h-3.5 text-purple-700" />
                      <span className="hidden sm:inline">Radar</span>
                    </button>

                    <button
                      onClick={() => handlePingDevice(emp.id, emp.name)}
                      className={`py-1.5 px-2.5 rounded-lg font-bold text-xs transition flex items-center space-x-1 cursor-pointer ${
                        isPinged
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'
                      }`}
                      title="Enviar sinal de teste para o smartphone do trabalhador"
                    >
                      {isPinged ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 text-emerald-600" />}
                      <span className="hidden sm:inline">{isPinged ? 'Ping OK' : 'Ping'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 2: VISUALIZAÇÃO "DETALHES"
          (Grade auditável minuciosa com todas as colunas de Unidade, Dispositivo, Usuários e Cobrança)
          ========================================================================= */}
      {viewMode === 'detalhes' && (
        <div className="p-5 sm:p-6 space-y-4">
          {/* Detailed View Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar por colaborador, unidade, IMEI ou rota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#50007d]"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Status:</span>
              <button
                onClick={() => setStatusFilter('todos')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'todos'
                    ? 'bg-[#50007d] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Todos ({INITIAL_EMPLOYEE_PERFORMANCE.length})
              </button>
              <button
                onClick={() => setStatusFilter('em_rota')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'em_rota'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Em Rota ({INITIAL_EMPLOYEE_PERFORMANCE.filter((e) => e.status === 'em_rota').length})
              </button>
              <button
                onClick={() => setStatusFilter('pausa')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'pausa'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Pausa ({INITIAL_EMPLOYEE_PERFORMANCE.filter((e) => e.status === 'pausa').length})
              </button>
              <button
                onClick={() => setStatusFilter('alerta_ritmo')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                  statusFilter === 'alerta_ritmo'
                    ? 'bg-rose-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Atenção ({INITIAL_EMPLOYEE_PERFORMANCE.filter((e) => e.status === 'alerta_ritmo').length})
              </button>
            </div>
          </div>

          {/* Detailed Full-Data Table with the 4 pillars */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-950 font-bold uppercase tracking-wider text-[11px] select-none">
                <tr>
                  <th scope="col" className="px-3.5 py-3">COLABORADOR (USUÁRIOS)</th>
                  <th scope="col" className="px-3 py-3">UNIDADE (UGI)</th>
                  <th scope="col" className="px-3.5 py-3">DISPOSITIVO & MDM</th>
                  <th scope="col" className="px-3 py-3 text-center">BATERIA / SINAL</th>
                  <th scope="col" className="px-3 py-3 text-right">META DIÁRIA</th>
                  <th scope="col" className="px-3 py-3 text-right">ARRECADADO (R$)</th>
                  <th scope="col" className="px-3 py-3 text-center">% CONCLUSÃO</th>
                  <th scope="col" className="px-3 py-3 text-center">VISITAS</th>
                  <th scope="col" className="px-3 py-3 text-center">STATUS</th>
                  <th scope="col" className="px-3.5 py-3 text-center">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                      Nenhum colaborador encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp, idx) => {
                    const isPinged = pingedId === emp.id;
                    return (
                      <tr
                        key={emp.id}
                        onClick={() => setSelectedEmployee(emp)}
                        className={`hover:bg-purple-50/50 cursor-pointer transition ${
                          idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'
                        }`}
                        title="Clique para abrir o dossiê detalhado"
                      >
                        {/* Colaborador / Usuários */}
                        <td className="px-3.5 py-3.5">
                          <div className="flex items-center space-x-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg ${emp.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                            >
                              {emp.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{emp.name}</div>
                              <div className="text-[10px] text-slate-500">{emp.role}</div>
                              <div className="text-[10px] text-purple-700 font-bold font-mono">
                                Score: {emp.score} pts ({emp.scoreGrade})
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Unidade */}
                        <td className="px-3 py-3.5">
                          <div className="font-semibold text-slate-800">{emp.unitName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">CN: {emp.cnCode}</div>
                          <div className="text-[10px] text-slate-400">{emp.location.split('(')[0]}</div>
                        </td>

                        {/* Dispositivo */}
                        <td className="px-3.5 py-3.5">
                          <div className="font-semibold text-slate-800">{emp.deviceModel}</div>
                          <div className="text-[10px] font-mono text-slate-500">IMEI: {emp.deviceImei}</div>
                          <div className="text-[10px] text-emerald-700 font-mono">
                            PIN: {emp.devicePin} • App {emp.deviceAppVersion}
                          </div>
                        </td>

                        {/* Bateria & Sinal */}
                        <td className="px-3 py-3.5 text-center">
                          <div className="inline-flex flex-col items-center">
                            <span
                              className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                                emp.deviceBattery > 60
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : emp.deviceBattery > 30
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {emp.deviceBattery}% bat
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                              {emp.deviceSignal} ({emp.deviceOperator})
                            </span>
                          </div>
                        </td>

                        {/* Meta Diária */}
                        <td className="px-3 py-3.5 text-right font-mono text-slate-600 font-semibold">
                          R$ {formatCurrency(emp.dailyTarget)}
                        </td>

                        {/* Arrecadado */}
                        <td className="px-3 py-3.5 text-right font-mono font-bold text-slate-900">
                          R$ {formatCurrency(emp.collectedAmount)}
                        </td>

                        {/* % Conclusão */}
                        <td className="px-3 py-3.5 text-center">
                          <span
                            className={`font-mono font-black text-xs px-2 py-0.5 rounded-full ${
                              emp.progressPercent >= 90
                                ? 'bg-emerald-100 text-emerald-800'
                                : emp.progressPercent >= 80
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {emp.progressPercent.toFixed(1)}%
                          </span>
                        </td>

                        {/* Visitas */}
                        <td className="px-3 py-3.5 text-center font-mono">
                          <span className="font-bold text-slate-800">{emp.visitedClients}</span>
                          <span className="text-slate-400">/{emp.plannedClients}</span>
                          <div className="text-[10px] text-slate-500 font-sans">
                            ({emp.visitsPercent.toFixed(0)}%)
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-3 py-3.5 text-center">
                          {emp.status === 'em_rota' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Em Rota
                            </span>
                          )}
                          {emp.status === 'pausa' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              Pausa
                            </span>
                          )}
                          {emp.status === 'alerta_ritmo' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                              Atenção
                            </span>
                          )}
                        </td>

                        {/* Ações */}
                        <td
                          className="px-3.5 py-3.5 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-center space-x-1.5">
                            <button
                              onClick={() => setSelectedEmployee(emp)}
                              className="p-1.5 rounded-md hover:bg-purple-100 text-purple-700 transition cursor-pointer"
                              title="Ver Dossiê Completo"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handlePingDevice(emp.id, emp.name)}
                              className={`p-1.5 rounded-md transition cursor-pointer ${
                                isPinged ? 'bg-emerald-600 text-white' : 'hover:bg-emerald-100 text-emerald-700'
                              }`}
                              title="Enviar Ping de Conexão"
                            >
                              <Zap className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
              {/* Table Totalizer */}
              <tfoot className="bg-slate-100 text-slate-900 font-bold border-t border-slate-200">
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-right uppercase text-[11px] text-slate-600">
                    Total Consolidado ({filteredEmployees.length} Colaboradores):
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-xs">
                    R$ {formatCurrency(filteredEmployees.reduce((acc, e) => acc + e.dailyTarget, 0))}
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-xs text-[#50007d] font-black">
                    R$ {formatCurrency(filteredEmployees.reduce((acc, e) => acc + e.collectedAmount, 0))}
                  </td>
                  <td className="px-3 py-3 text-center font-mono text-xs text-emerald-800">
                    {(
                      (filteredEmployees.reduce((acc, e) => acc + e.collectedAmount, 0) /
                        (filteredEmployees.reduce((acc, e) => acc + e.dailyTarget, 0) || 1)) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                  <td className="px-3 py-3 text-center font-mono text-xs">
                    {filteredEmployees.reduce((acc, e) => acc + e.visitedClients, 0)}/
                    {filteredEmployees.reduce((acc, e) => acc + e.plannedClients, 0)}
                  </td>
                  <td colSpan={2} className="px-3.5 py-3 text-left text-[11px] text-slate-500 font-normal">
                    Conformidade operacional do time
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: DOSSIÊ OPERACIONAL COMPLETO DO FUNCIONÁRIO (AUDITORIA 360°)
          ========================================================================= */}
      {selectedEmployee && (
        <DossieCompletoModal
          employee={selectedEmployee}
          allEmployees={INITIAL_EMPLOYEE_PERFORMANCE}
          onSelectEmployee={(emp) => setSelectedEmployee(emp)}
          onClose={() => setSelectedEmployee(null)}
          onLocateOnRadar={onLocateOnRadar}
        />
      )}
    </div>
  );
};
