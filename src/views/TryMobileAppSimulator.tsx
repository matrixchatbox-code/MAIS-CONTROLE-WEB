import React, { useState } from 'react';
import {
  ClientProfile,
  SaleContract,
  CashMovement,
  DeviceItem,
  Language,
} from '../types';
import { BrandLogo } from '../components/BrandLogo';
import {
  Smartphone,
  Search,
  DollarSign,
  Camera,
  Share2,
  FileText,
  Calculator,
  Lock,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
  Plus,
  Sliders,
  MoreVertical,
  Check,
  User,
  Users,
  Image as ImageIcon,
  Key,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Calendar,
  ChevronDown,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface TryMobileAppSimulatorProps {
  clients: ClientProfile[];
  contracts: SaleContract[];
  language?: Language;
  onRecordPayment?: (contractId: string, amount: number, method: string, additional: number) => void;
  brandVariant?: 'maiscontrole' | 'trycontroller';
  devices?: DeviceItem[];
  onBackToWeb?: () => void;
  onAddClient?: (newClient: ClientProfile) => void;
  onAddMovement?: (movement: CashMovement) => void;
}

export type MobileScreen =
  | 'login'
  | 'route_list'
  | 'payment_form'
  | 'receipt'
  | 'cierre_caja'
  | 'calculadora'
  | 'perfil_trabalhador'
  | 'seguros'
  | 'imagens'
  | 'movimentos'
  | 'pre_vendas'
  | 'pre_despesas'
  | 'vendas_temporais'
  | 'historico_chaves'
  | 'configuracao'
  | 'cliente_novo'
  | 'clientes_cadastrados';

// Validação e Máscara Oficial de CPF Brasileiro (Obrigatório)
export const formatCpf = (val: string): string => {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
};

export const isValidCpf = (cpfStr: string): boolean => {
  const clean = cpfStr.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  // Rejeita sequências de dígitos iguais comuns (ex: 11111111111)
  if (/^(\d)\1{10}$/.test(clean)) return false;
  return true;
};

export const TryMobileAppSimulator: React.FC<TryMobileAppSimulatorProps> = ({
  clients = [],
  contracts = [],
  language = 'pt',
  onRecordPayment,
  brandVariant = 'maiscontrole',
  devices = [],
  onBackToWeb,
  onAddClient,
  onAddMovement,
}) => {
  const isDeviceLocked = devices.some((d) => d.id === 'dev-1' && d.status === 'bloqueado');

  // Navegação do App
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('route_list');
  const [mobileTab, setMobileTab] = useState<'vendas' | 'colecao'>('colecao');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<SaleContract>(contracts[0] || ({} as SaleContract));

  // Modo de exibição: Moldura de Celular vs. Tela Cheia Nativa
  const [displayMode, setDisplayMode] = useState<'smartphone' | 'fullscreen'>('smartphone');
  const [linkCopied, setLinkCopied] = useState(false);

  // Filtros de Cobrança
  const [filterPaymentState, setFilterPaymentState] = useState<'pendentes' | 'pagamentos' | 'sem_pagamentos'>('pendentes');
  const [filterFrequency, setFilterFrequency] = useState<'diario' | 'semanal' | 'quinzenal' | 'mensal'>('diario');

  // Tela de Movimentos
  const [movTab, setMovTab] = useState<'registrar' | 'movimentos'>('registrar');
  const [movTypeSegment, setMovTypeSegment] = useState<'Gasto' | 'Retirada' | 'Entrada'>('Gasto');
  const [movDescOption, setMovDescOption] = useState('Gastos: Azulejos');
  const [movDescDropdownOpen, setMovDescDropdownOpen] = useState(false);
  const [movValueInput, setMovValueInput] = useState('');
  const [movCommentsInput, setMovCommentsInput] = useState('');

  // Formulário de Cliente Novo (COM CPF OBRIGATÓRIO)
  const [doc1Type, setDoc1Type] = useState('CPF');
  const [doc1DropdownOpen, setDoc1DropdownOpen] = useState(false);
  const [doc1Cpf, setDoc1Cpf] = useState('');
  const [cpfError, setCpfError] = useState<string | null>(null);

  const [doc2Type, setDoc2Type] = useState('RG');
  const [doc2Num, setDoc2Num] = useState('');
  const [clientApelido, setClientApelido] = useState('');
  const [clientPrimeiroNome, setClientPrimeiroNome] = useState('');
  const [clientNomeMeio, setClientNomeMeio] = useState('');
  const [clientPrimeiroSobrenome, setClientPrimeiroSobrenome] = useState('');
  const [clientSegundoSobrenome, setClientSegundoSobrenome] = useState('');
  const [clientNascimento, setClientNascimento] = useState('');

  const [clientCidade, setClientCidade] = useState('Guarulhos');
  const [clientCidadeDropdownOpen, setClientCidadeDropdownOpen] = useState(false);
  const [clientEndereco, setClientEndereco] = useState('');
  const [clientBairro, setClientBairro] = useState('');

  const [clientCelular, setClientCelular] = useState('11 98451-2290');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAtividade, setClientAtividade] = useState('Comércio / Varejo');
  const [clientNotas, setClientNotas] = useState('');
  const [clientSuccessMsg, setClientSuccessMsg] = useState(false);

  // Pagamento
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Transacción electrónica' | 'Pago mixto'>('Efectivo');
  const [installmentsToPay, setInstallmentsToPay] = useState(1);
  const [additionalAmount, setAdditionalAmount] = useState('0.00');
  const [hasReceiptPhoto, setHasReceiptPhoto] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState(false);

  // Configurações
  const [panicButtonToggle, setPanicButtonToggle] = useState(false);
  const [downloadValidationToggle, setDownloadValidationToggle] = useState(true);

  // Login
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Calculadora
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcMemory, setCalcMemory] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);

  // Busca
  const [searchMobile, setSearchMobile] = useState('');

  // Formatação de CPF ao digitar
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value);
    setDoc1Cpf(formatted);
    if (cpfError) setCpfError(null);
  };

  // Submissão do Cliente Novo com Validação Rígida de CPF
  const handleSaveClient = () => {
    // Validação estrita do CPF
    if (!doc1Cpf.trim()) {
      setCpfError('O preenchimento do CPF é OBRIGATÓRIO para cadastrar o cliente!');
      return;
    }

    if (!isValidCpf(doc1Cpf)) {
      setCpfError('CPF inválido! Digite os 11 números completos do CPF.');
      return;
    }

    if (!clientPrimeiroNome.trim() && !clientApelido.trim()) {
      alert('Por favor, preencha o Nome ou Apelido do cliente.');
      return;
    }

    const newClientObj: ClientProfile = {
      id: String(Math.floor(1000000 + Math.random() * 900000)),
      alias: clientApelido || clientPrimeiroNome,
      fullName: `${clientPrimeiroNome} ${clientNomeMeio} ${clientPrimeiroSobrenome}`.trim() || clientApelido,
      documentType: 'CPF',
      documentNumber: doc1Cpf,
      phone: `+55 ${clientCelular}`,
      address: clientEndereco || 'Endereço Comercial',
      neighborhood: clientBairro || 'Centro',
      city: clientCidade,
      country: 'Brasil',
      economicActivity: clientAtividade,
      score: 'A',
      status: 'Activo',
      activeSalesCount: 1,
      totalDebt: 1200,
      lastPaymentDate: new Date().toLocaleDateString('pt-BR'),
      overdueDays: 0,
      collectionDay: 'Diário',
      references: [],
      photos: [],
    };

    if (onAddClient) {
      onAddClient(newClientObj);
    }

    setClientSuccessMsg(true);
    setCpfError(null);

    setTimeout(() => {
      setClientSuccessMsg(false);
      setCurrentScreen('clientes_cadastrados');
    }, 1200);
  };

  const handleCopyClientLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#/app`;
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const handleCalcBtn = (char: string) => {
    if (char === 'C') {
      setCalcDisplay('0');
      setCalcMemory(null);
      setCalcOp(null);
      return;
    }
    if (char === '+' || char === '-' || char === '×' || char === '÷') {
      setCalcMemory(parseFloat(calcDisplay));
      setCalcOp(char);
      setCalcDisplay('0');
      return;
    }
    if (char === '=') {
      if (calcMemory !== null && calcOp) {
        const cur = parseFloat(calcDisplay);
        let res = cur;
        if (calcOp === '+') res = calcMemory + cur;
        if (calcOp === '-') res = calcMemory - cur;
        if (calcOp === '×') res = calcMemory * cur;
        if (calcOp === '÷') res = cur !== 0 ? calcMemory / cur : 0;
        setCalcDisplay(String(Math.round(res * 100) / 100));
        setCalcMemory(null);
        setCalcOp(null);
      }
      return;
    }
    if (calcDisplay === '0') {
      setCalcDisplay(char);
    } else {
      setCalcDisplay(calcDisplay + char);
    }
  };

  const handleConfirmPayment = () => {
    const total = (selectedContract.installmentValue || 120) * installmentsToPay + (parseFloat(additionalAmount) || 0);
    if (onRecordPayment && selectedContract.id) {
      onRecordPayment(selectedContract.id, total, paymentMethod, parseFloat(additionalAmount) || 0);
    }
    setPaymentSuccessMsg(true);
    setTimeout(() => {
      setPaymentSuccessMsg(false);
      setCurrentScreen('receipt');
    }, 800);
  };

  // Telas internas do App Mobile
  const renderAppContent = () => (
    <div className="flex-1 bg-white overflow-hidden flex flex-col relative text-slate-800 font-sans select-none text-xs">
      
      {/* 1. Android Status Bar (com relógio e indicadores de sinal) */}
      <div className="h-6.5 bg-[#50007d] text-white px-4 pt-1 flex items-center justify-between text-[11px] font-mono z-30 shrink-0">
        <span>23:01</span>
        <div className="flex items-center space-x-1.5 text-[10px]">
          <span className="text-[9px]">43,1 KB/s</span>
          <span>VoLTE</span>
          <span className="font-bold">5G</span>
          <span className="w-4 h-2.5 rounded-xs border border-white inline-flex items-center justify-center text-[7px] font-bold">
            92
          </span>
        </div>
      </div>

      {/* Alerta de Bloqueio Remoto IMEI comandado via Web */}
      {isDeviceLocked && (
        <div className="bg-red-600 text-white px-3 py-2 text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-md z-40 animate-pulse border-b border-red-700 shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>DISPOSITIVO BLOQUEADO REMOTAMENTE VIA WEB (IMEI: 864920048192031)</span>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 1. LOGIN DO TRABALHADOR (Captura 23:21:38 com Marca MAIS CONTROLE)
          ========================================================================= */}
      {currentScreen === 'login' && (
        <div className="flex-1 flex flex-col justify-between p-5 bg-[#50007d] text-white overflow-y-auto custom-scrollbar">
          {/* Logo Oficial Mais Controle no Topo */}
          <div className="text-center pt-2 flex flex-col items-center">
            <BrandLogo variant="maiscontrole" inverted={true} showSubtitle={false} size="lg" />
            <div className="text-[10px] text-cyan-200 font-mono tracking-widest uppercase mt-1">
              Aplicativo do Trabalhador
            </div>
          </div>

          {/* Card Branco de Login */}
          <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-2xl space-y-3.5 border border-purple-200">
            <h3 className="text-center text-lg font-black text-[#50007d]">
              Bem-vindo
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-0.5">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  📱 Unidade:
                </span>
                <span className="font-bold font-mono text-slate-900 text-sm">15</span>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  🏪 Caixa:
                </span>
                <span className="font-bold font-mono text-slate-900">
                  (1002325): 2026/10/04
                </span>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  💲 Limite de vendas:
                </span>
                <span className="font-bold font-mono text-slate-900">$0</span>
              </div>

              <div className="flex items-center justify-between py-0.5">
                <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                  💸 Limite de despesas:
                </span>
                <span className="font-bold font-mono text-slate-900">$0</span>
              </div>
            </div>

            {/* Input de Senha */}
            <div className="relative pt-1">
              <input
                type={showLoginPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Senha*"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#50007d]"
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700"
              >
                {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Botão Acessar Verde Vibrante */}
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="w-full py-2.5 rounded-xl bg-[#8cc63f] hover:bg-[#7cb342] text-slate-950 font-black text-xs shadow-md transition active:scale-98"
            >
              Acessar
            </button>
          </div>

          {/* Rodapé Informativo: PIN e Banner Oficial Mais Controle */}
          <div className="space-y-3 text-center">
            <div className="text-[11px] font-mono text-purple-200">
              PIN de Dispositivo: <b className="text-white">641D7E04</b>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-2.5 border border-purple-400/30 text-left text-[10px] space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.5 rounded bg-purple-700 text-white font-bold text-[9px]">
                  AO VIVO
                </span>
                <span className="text-cyan-300 font-bold">MAIS CONTROLE</span>
              </div>
              <p className="font-bold text-white text-[10px] leading-tight">
                Torne-se um especialista no controle do seu dinheiro
              </p>
              <p className="text-purple-300 text-[9px]">
                Tema do Mês: Configuração da Ordenação Manual e Cobrança
              </p>
            </div>

            <div className="text-[10px] text-purple-300 font-mono">
              Versão 6.7.0.4 • Mais Controle Oficial
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOP BAR FIXA (Para todas as telas operacionais: 2326 / 15 / 1002325)
          ========================================================================= */}
      {currentScreen !== 'login' && (
        <div className="bg-[#50007d] text-white px-3 py-2 shadow-xs z-30 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-1 hover:bg-white/10 rounded-md"
                aria-label="Abrir Menu"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div>
                <h3 className="font-bold text-sm tracking-tight leading-none text-white flex items-center gap-1.5">
                  <span>MAIS CONTROLE</span>
                </h3>
                <div className="text-[10px] text-purple-200 font-mono mt-0.5 flex items-center gap-1">
                  <span>📋 2326 / 15 / 1002325</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Badge Alerta de Status */}
              <div className="w-6 h-6 rounded-md bg-[#8cc63f] text-slate-900 flex items-center justify-center font-black text-xs shadow-xs">
                !
              </div>
              {/* Botão Sincronizar */}
              <button
                onClick={() => alert('Aplicativo sincronizado com o servidor central Mais Controle!')}
                className="p-1 hover:bg-white/10 rounded-md"
                title="Sincronizar"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Abas Superiores: Vendas vs Coleção */}
          {(currentScreen === 'route_list' || currentScreen === 'pre_vendas') && (
            <div className="grid grid-cols-2 mt-2 pt-1 border-t border-purple-800 text-center font-bold text-xs">
              <button
                onClick={() => {
                  setMobileTab('vendas');
                  setCurrentScreen('route_list');
                }}
                className={`py-1.5 transition ${
                  mobileTab === 'vendas'
                    ? 'text-white border-b-2 border-[#8cc63f]'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Vendas
              </button>
              <button
                onClick={() => {
                  setMobileTab('colecao');
                  setCurrentScreen('route_list');
                }}
                className={`py-1.5 transition ${
                  mobileTab === 'colecao'
                    ? 'text-white border-b-2 border-[#8cc63f]'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Coleção
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SCREEN: 2. LISTA DE COBRANÇA / ROTA (Capturas 23:00:54 & 23:01:16)
          ========================================================================= */}
      {currentScreen === 'route_list' && (
        <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden relative">
          {/* Barra de Pesquisa e Filtros */}
          <div className="p-2.5 bg-white border-b border-slate-200 flex items-center space-x-2 shrink-0">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Procure a venda por: ID de vendas, ID do cli..."
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-[11px] text-slate-800 focus:outline-none focus:border-[#76b82a]"
              />
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-[#50007d]"
              title="Filtros"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de Contratos / Clientes da Rota */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2.5 space-y-2.5">
            {/* Card 1: 1003161 Du Surf (Anielo Corvino) - Captura 23:00:54 */}
            <div
              onClick={() => {
                setSelectedContract(contracts[0] || ({} as SaleContract));
                setIsActionModalOpen(true);
              }}
              className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#76b82a] cursor-pointer transition relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-full border-2 border-emerald-600 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    D
                  </span>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 leading-tight">
                      1003161 Du Surf
                    </h4>
                    <p className="text-xs text-slate-700 font-medium">
                      Anielo Corvino
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      CPF: 489.102.394-01
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContract(contracts[0] || ({} as SaleContract));
                      setCurrentScreen('payment_form');
                    }}
                    className="p-1 text-[#50007d] hover:bg-purple-50 rounded"
                    title="Receber Pagamento"
                  >
                    <DollarSign className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Informações de Parcelas */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-500 block">Vr. Parcela</span>
                  <span className="font-black font-mono text-slate-900">$120</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Pendentes</span>
                  <span className="font-bold font-mono text-slate-800">10.0 / 10.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Pagamento</span>
                  <span className="font-mono text-slate-400 font-bold">-</span>
                </div>
              </div>

              {/* Barra inferior do Card */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-slate-100 text-emerald-700">
                    <Camera className="w-4 h-4" />
                  </span>
                  <span className="p-1 rounded bg-slate-100 text-slate-500">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-700 text-white font-mono font-bold text-[10px]">
                    0
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase block font-semibold">
                    Saldo devedor
                  </span>
                  <span className="font-black font-mono text-slate-900 text-xs">
                    $1,200
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: 1003177 Matrix (Levson Levson) - Captura 23:01:16 */}
            <div
              onClick={() => {
                setSelectedContract(contracts[1] || contracts[0] || ({} as SaleContract));
                setIsActionModalOpen(true);
              }}
              className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-[#76b82a] cursor-pointer transition relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <span className="w-6 h-6 rounded-full border-2 border-emerald-600 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    Q
                  </span>
                  <div>
                    <h4 className="font-black text-sm text-slate-900 leading-tight">
                      1003177 Matrix
                    </h4>
                    <p className="text-xs text-slate-700 font-medium">
                      Levson Levson
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      CPF: 302.948.182-90
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedContract(contracts[1] || contracts[0] || ({} as SaleContract));
                    setCurrentScreen('payment_form');
                  }}
                  className="p-1 text-[#50007d] hover:bg-purple-50 rounded"
                  title="Receber Pagamento"
                >
                  <DollarSign className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-500 block">Vr. Parcela</span>
                  <span className="font-black font-mono text-slate-900">$240</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Parcelas</span>
                  <span className="font-bold font-mono text-slate-800">29</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Pagamento</span>
                  <span className="font-mono text-slate-400 font-bold">-</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="p-1 rounded bg-slate-100 text-slate-500">
                    <FileText className="w-3.5 h-3.5" />
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-700 text-white font-mono font-bold text-[10px]">
                    0
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase block font-semibold">
                    Valor de venda
                  </span>
                  <span className="font-black font-mono text-slate-900 text-xs">
                    $6,960
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Menu (FAB) Speed Dial - Captura 23:04:38 */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end space-y-2">
            {isFabMenuOpen && (
              <div className="flex flex-col items-end space-y-2 mb-1 animate-in fade-in slide-in-from-bottom-2">
                <button
                  onClick={() => {
                    setIsFabMenuOpen(false);
                    setCurrentScreen('cliente_novo');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#50007d] text-white font-bold text-xs shadow-xl hover:bg-[#400066] active:scale-95 transition"
                >
                  <span>Cliente Novo</span>
                  <User className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsFabMenuOpen(false);
                    setCurrentScreen('clientes_cadastrados');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#50007d] text-white font-bold text-xs shadow-xl hover:bg-[#400066] active:scale-95 transition"
                >
                  <span>Cliente Cadastrado</span>
                  <Users className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsFabMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#50007d] text-white font-bold text-xs shadow-xl hover:bg-[#400066] active:scale-95 transition"
                >
                  <span>para retornar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
              className="w-13 h-13 rounded-full bg-[#50007d] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition border-2 border-white/80"
              aria-label="Ações Rápidas"
            >
              <Plus className="w-7 h-7 stroke-[3]" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 3. MENU DE AÇÕES DA VENDA (Capturas 23:01:03 & 23:01:10)
          ========================================================================= */}
      {isActionModalOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs z-50 flex items-center justify-center p-3 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden border border-slate-200">
            {/* Header Roxo */}
            <div className="bg-[#50007d] text-white px-4 py-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs leading-tight">
                  {selectedContract.clientName || 'Anielo Corvino'}
                </h4>
                <p className="text-[10px] text-purple-200 font-mono">
                  {selectedContract.saleId || '1003161'}
                </p>
              </div>
              <button onClick={() => setIsActionModalOpen(false)}>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Lista das 11 Opções da Captura */}
            <div className="p-2 space-y-0.5 text-xs text-slate-800 max-h-96 overflow-y-auto custom-scrollbar">
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert('Formulário de Renovação aberto para esta venda!');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Editar / Renovar
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  setCurrentScreen('receipt');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-bold text-[#50007d]"
              >
                Compartilhar o extrato de pagamento
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  setCurrentScreen('payment_form');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium text-emerald-700"
              >
                Pagamento suplementar
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert(`Detalhes da venda #${selectedContract.saleId || '1003161'} exibidos`);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Ver detalhe
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  setCurrentScreen('clientes_cadastrados');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Veja informação do cliente
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert('Gerando relatório de vendas do cliente...');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Relatório de vendas
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert('Gerando relatório de pagamentos da rota...');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Relatório de pagamentos
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert('Modo de Ordenação da Unidade ativado!');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Ordenar Unidade
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert('Alarme programado com sucesso no dispositivo!');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Programar Alarme
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  setCurrentScreen('imagens');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Veja as fotos
              </button>
              <button
                onClick={() => {
                  setIsActionModalOpen(false);
                  alert('Câmera aberta para anexar nova foto da venda!');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
              >
                Anexar fotos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 4. MODAL DE FILTROS (Captura 23:00:58)
          ========================================================================= */}
      {isFilterModalOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-[#50007d] text-white px-4 py-3 flex items-center justify-between">
              <h4 className="font-bold text-sm">Filtros</h4>
              <button onClick={() => setIsFilterModalOpen(false)}>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="p-4 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-2">
                  Estado do pagamento ⌃
                </span>
                <div className="space-y-2 pl-1">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterPaymentState === 'pendentes'}
                      onChange={() => setFilterPaymentState('pendentes')}
                      className="w-4 h-4 text-[#8cc63f] rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Pendentes (1)</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterPaymentState === 'pagamentos'}
                      onChange={() => setFilterPaymentState('pagamentos')}
                      className="w-4 h-4 rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Pagamentos (0)</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterPaymentState === 'sem_pagamentos'}
                      onChange={() => setFilterPaymentState('sem_pagamentos')}
                      className="w-4 h-4 rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Sem pagamentos (0)</span>
                  </label>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-2">
                  Freqüência do pagamento ⌃
                </span>
                <div className="space-y-2 pl-1">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterFrequency === 'diario'}
                      onChange={() => setFilterFrequency('diario')}
                      className="w-4 h-4 rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Diário (1)</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterFrequency === 'semanal'}
                      onChange={() => setFilterFrequency('semanal')}
                      className="w-4 h-4 rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Semanal (0)</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterFrequency === 'quinzenal'}
                      onChange={() => setFilterFrequency('quinzenal')}
                      className="w-4 h-4 rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Quinzenal (0)</span>
                  </label>
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterFrequency === 'mensal'}
                      onChange={() => setFilterFrequency('mensal')}
                      className="w-4 h-4 rounded accent-[#76b82a]"
                    />
                    <span className="font-medium text-slate-700">Mensal (0)</span>
                  </label>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-[#50007d] font-bold hover:underline"
                >
                  Ver todos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 5. FECHAMENTO DE CAIXA (Capturas 23:02:00 & 23:02:12)
          ========================================================================= */}
      {currentScreen === 'cierre_caja' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentScreen('route_list')}
                className="p-1 rounded hover:bg-slate-200"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Fechamento de caixa</h4>
                <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
              </div>
            </div>
            <button
              onClick={() => alert('Compartilhando resumo de fechamento de caixa...')}
              className="p-1 text-[#50007d]"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center text-xs font-semibold text-slate-600">
            qui. 8 de outubro 2026
          </div>

          {/* Card Caixa Atual */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-semibold block">caixa atual</span>
              <span className="text-xl font-black font-mono text-slate-900">-6,800</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-right">
              <span className="text-[10px] text-slate-500 block">caixa inicial</span>
              <span className="font-black font-mono text-slate-800 text-sm">-1,000</span>
            </div>
          </div>

          {/* Grade de Métricas com Marcadores Roxos */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Renda / Complementar
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Despesas
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Coleção Dinheiro
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Coleção Transação eletrônica
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Coleção extra total
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Coletado total
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                Vendas novas
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$5,800 / 1</span>
            </div>
            <div>
              <span className="text-slate-600 text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#50007d] shrink-0"></span>
                saques
              </span>
              <span className="font-bold font-mono text-slate-900 block pl-3.5">$0</span>
            </div>
          </div>

          {/* Barras de Progresso de Coleção e Clientes */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Coleção</span>
                <span>0%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-[#50007d] h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Clientes visitados</span>
                <span>0 de 1</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-[#50007d] h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>

            <div className="flex justify-between text-xs pt-1 border-t border-slate-100 text-slate-600">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block">pré-venda a aprovar</span>
                <span className="font-bold text-sm">0</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 block">Pré-despesas a aprovar</span>
                <span className="font-bold text-sm">0</span>
              </div>
            </div>
          </div>

          {/* Campo Valor e Botão Fechar Caixa */}
          <div className="space-y-2 pt-1">
            <input
              type="text"
              placeholder="Valor*"
              defaultValue="-6,800"
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#50007d]"
            />

            <button
              onClick={() => {
                alert('Caixa encerrado com sucesso! Dados sincronizados com o painel web.');
                setCurrentScreen('route_list');
              }}
              className="w-full py-3 rounded-xl bg-[#50007d] hover:bg-[#400066] text-white font-bold text-xs shadow-md transition active:scale-98"
            >
              Fechar a caixa
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 6. REGISTRO DE MOVIMENTOS (Capturas 23:03 & 23:04)
          ========================================================================= */}
      {currentScreen === 'movimentos' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3 space-y-3">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Registro de Movimentos</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          {/* Abas Registrar vs Movimentos */}
          <div className="grid grid-cols-2 text-center text-xs font-bold border-b border-purple-200">
            <button
              onClick={() => setMovTab('registrar')}
              className={`py-2 ${
                movTab === 'registrar'
                  ? 'text-[#50007d] border-b-2 border-[#8cc63f]'
                  : 'text-slate-500'
              }`}
            >
              Registrar
            </button>
            <button
              onClick={() => setMovTab('movimentos')}
              className={`py-2 ${
                movTab === 'movimentos'
                  ? 'text-[#50007d] border-b-2 border-[#8cc63f]'
                  : 'text-slate-500'
              }`}
            >
              Movimentos
            </button>
          </div>

          {movTab === 'registrar' ? (
            <>
              {/* Seletor Segmentado: Gasto | Retiro | Entrada */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">
                  Selecione um tipo de movimento
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => {
                      setMovTypeSegment('Gasto');
                      setMovDescOption('Gastos: Azulejos');
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition ${
                      movTypeSegment === 'Gasto'
                        ? 'bg-[#eaf5dc] text-[#50007d] border-[#76b82a]'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <span>💸 Gasto</span>
                  </button>
                  <button
                    onClick={() => {
                      setMovTypeSegment('Retirada');
                      setMovDescOption('Retiros: Varios');
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition ${
                      movTypeSegment === 'Retirada'
                        ? 'bg-[#eaf5dc] text-[#50007d] border-[#76b82a]'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <span>🏧 Retiro</span>
                  </button>
                  <button
                    onClick={() => {
                      setMovTypeSegment('Entrada');
                      setMovDescOption('Inversión');
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border transition ${
                      movTypeSegment === 'Entrada'
                        ? 'bg-[#eaf5dc] text-[#50007d] border-[#76b82a]'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    <span>➔💲 Entrada</span>
                  </button>
                </div>
              </div>

              {/* Descrição Dropdown Exato */}
              <div className="relative">
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                  Descrição*
                </label>
                <div
                  onClick={() => setMovDescDropdownOpen(!movDescDropdownOpen)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium flex items-center justify-between cursor-pointer"
                >
                  <span>{movDescOption}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </div>

                {movDescDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 max-h-48 overflow-y-auto text-xs">
                    {movTypeSegment === 'Gasto' &&
                      [
                        'Gastos: Azulejos',
                        'Gastos: Comisión',
                        'Gastos: Sueldo Ayudante',
                        'Gastos: Sueldo Revisor',
                        'Gastos: Varios',
                        'Gastos: Oficina',
                        'Gastos: Transporte',
                        'Gastos: Mto. Moto',
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setMovDescOption(opt);
                            setMovDescDropdownOpen(false);
                          }}
                          className="px-3.5 py-2 hover:bg-purple-50 cursor-pointer font-medium"
                        >
                          {opt}
                        </div>
                      ))}

                    {movTypeSegment === 'Retirada' &&
                      [
                        'Retiros: Varios',
                        'Retiros: Retiro de Caja',
                        'Retiros: Socios',
                        'Retiros: Para otros Cobros',
                        'Retiros: Cadenas',
                        'Retiros: Intereses',
                        'Retiros: Compra Moto',
                        'Retiros: Prestamos',
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setMovDescOption(opt);
                            setMovDescDropdownOpen(false);
                          }}
                          className="px-3.5 py-2 hover:bg-purple-50 cursor-pointer font-medium"
                        >
                          {opt}
                        </div>
                      ))}

                    {movTypeSegment === 'Entrada' &&
                      [
                        'Inversión',
                        'Otros',
                        'Ingreso de Caja',
                        'Ajuste de Caja',
                        'Ajuste x Sistema (Pagos Clientes)',
                      ].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setMovDescOption(opt);
                            setMovDescDropdownOpen(false);
                          }}
                          className="px-3.5 py-2 hover:bg-purple-50 cursor-pointer font-medium"
                        >
                          {opt}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Valor Input */}
              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                  Valor*
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={movValueInput}
                  onChange={(e) => setMovValueInput(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
                />
              </div>

              {/* Adicionar foto */}
              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                  Adicionar foto
                </label>
                <div
                  onClick={() => alert('Câmera aberta para fotografar comprovante')}
                  className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-300"
                >
                  <Camera className="w-6 h-6" />
                </div>
              </div>

              {/* Comentários */}
              <div>
                <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                  Comentários
                </label>
                <input
                  type="text"
                  value={movCommentsInput}
                  onChange={(e) => setMovCommentsInput(e.target.value)}
                  placeholder="Observação opcional"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div className="text-xs font-semibold text-slate-700 flex justify-between pt-1">
                <span>Valor total das {movTypeSegment.toLowerCase()}s:</span>
                <span className="font-mono font-bold text-slate-900">${movValueInput || '0'}</span>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    const amountNum = parseFloat(movValueInput) || 0;
                    if (onAddMovement) {
                      onAddMovement({
                        id: `mov-${Date.now()}`,
                        type: movTypeSegment === 'Gasto' ? 'Gasto' : movTypeSegment === 'Retirada' ? 'Retiro' : 'Ingreso',
                        category: movDescOption,
                        description: movDescOption,
                        value: amountNum,
                        date: new Date().toISOString().split('T')[0],
                        unitId: 'ugi-15',
                        unitName: '15 - UGI Guarulhos',
                        workerName: 'Carlos Oliveira',
                        comments: movCommentsInput,
                        paymentMethod: 'Efectivo',
                        approved: true,
                      });
                    }
                    alert('Movimento registrado com sucesso!');
                    setCurrentScreen('route_list');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#50007d] hover:bg-[#400066] text-white font-bold text-xs shadow-md"
                >
                  Salvar a o movimento
                </button>

                <button
                  onClick={() => {
                    alert('Movimento enviado para análise e aprovação no painel Web!');
                    setCurrentScreen('route_list');
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#50007d] text-[#50007d] font-bold text-xs hover:bg-purple-50"
                >
                  Enviar para análisis
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-slate-400 space-y-2">
              <Clock className="w-8 h-8 mx-auto text-slate-300" />
              <p className="font-medium">Nenhum movimento registrado na sessão atual.</p>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SCREEN: 7. CLIENTE NOVO (COM CPF OBRIGATÓRIO - Conforme exigido pelo usuário)
          Capturas 23:04:47, 55, 59 & 23:05:03, 10, 16, 23
          ========================================================================= */}
      {currentScreen === 'cliente_novo' && (
        <div className="flex-1 flex flex-col bg-white overflow-y-auto custom-scrollbar p-3.5 space-y-3.5 text-xs">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Cliente Novo</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          {/* Feedback de Erro ou Sucesso */}
          {cpfError && (
            <div className="bg-red-50 border border-red-300 text-red-800 p-3 rounded-xl flex items-start gap-2 shadow-xs animate-shake">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="font-semibold text-xs leading-tight">{cpfError}</div>
            </div>
          )}

          {clientSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="font-semibold text-xs">Cliente salvo com sucesso com CPF validado!</div>
            </div>
          )}

          {/* Seção 1: Informação pessoal */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <User className="w-4 h-4 text-[#50007d]" />
              <span>Informação pessoal</span>
            </h5>

            {/* Tipo de Documento 1 (CPF) */}
            <div className="relative">
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Tipo de documento 1*
              </label>
              <div
                onClick={() => setDoc1DropdownOpen(!doc1DropdownOpen)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs flex justify-between items-center cursor-pointer font-bold text-[#50007d]"
              >
                <span>{doc1Type} (Documento Principal)</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
              {doc1DropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 text-xs">
                  {['CPF', 'RNG', 'SIN TIPO DE DOCUMENTO'].map((t) => (
                    <div
                      key={t}
                      onClick={() => {
                        setDoc1Type(t);
                        setDoc1DropdownOpen(false);
                      }}
                      className="p-2 hover:bg-purple-50 cursor-pointer font-semibold"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* NÚMERO DO CPF OBRIGATÓRIO */}
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label className="text-[10px] font-black text-slate-800 block">
                  Número do CPF* <span className="text-red-600 font-bold">(OBRIGATÓRIO)</span>
                </label>
                <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold uppercase">
                  Obrigatório
                </span>
              </div>
              <input
                type="text"
                value={doc1Cpf}
                onChange={handleCpfChange}
                maxLength={14}
                placeholder="000.000.000-00"
                className={`w-full bg-slate-50 border rounded-lg p-2.5 text-xs font-mono font-bold tracking-wider ${
                  cpfError
                    ? 'border-red-500 ring-2 ring-red-200 bg-red-50/50'
                    : 'border-slate-300 focus:border-[#50007d] focus:ring-1 focus:ring-[#50007d]'
                }`}
              />
              <span className="text-[9px] text-slate-500 mt-0.5 block">
                O preenchimento do CPF é exigido para validação do cadastro no Mais Controle.
              </span>
            </div>

            {/* Documento 2 (RG Opcional) */}
            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Tipo de documento 2
              </label>
              <input
                type="text"
                value={doc2Num}
                onChange={(e) => setDoc2Num(e.target.value)}
                placeholder="Número do RG / Segundo Documento"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Apelido*
              </label>
              <input
                type="text"
                value={clientApelido}
                onChange={(e) => setClientApelido(e.target.value)}
                placeholder="Ex: Du Surf / Matrix / Loja Centro"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Primeiro nome*
              </label>
              <input
                type="text"
                value={clientPrimeiroNome}
                onChange={(e) => setClientPrimeiroNome(e.target.value)}
                placeholder="Primeiro nome"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Nome do meio
              </label>
              <input
                type="text"
                value={clientNomeMeio}
                onChange={(e) => setClientNomeMeio(e.target.value)}
                placeholder="Nome do meio"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Primeiro sobrenome*
              </label>
              <input
                type="text"
                value={clientPrimeiroSobrenome}
                onChange={(e) => setClientPrimeiroSobrenome(e.target.value)}
                placeholder="Primeiro sobrenome"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Segundo sobrenome
              </label>
              <input
                type="text"
                value={clientSegundoSobrenome}
                onChange={(e) => setClientSegundoSobrenome(e.target.value)}
                placeholder="Segundo sobrenome"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Data de nascimento
              </label>
              <input
                type="date"
                value={clientNascimento}
                onChange={(e) => setClientNascimento(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>
          </div>

          {/* Seção 2: Localização */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-[#50007d]" />
              <span>Localização</span>
            </h5>

            <div className="relative">
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Cidade
              </label>
              <div
                onClick={() => setClientCidadeDropdownOpen(!clientCidadeDropdownOpen)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs flex justify-between items-center cursor-pointer font-medium"
              >
                <span>{clientCidade}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </div>
              {clientCidadeDropdownOpen && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 max-h-40 overflow-y-auto text-xs">
                  {[
                    'Guarulhos',
                    'São Paulo',
                    'BRAGANCA',
                    'AMERICANA',
                    'ARARAQUARA',
                    'ARARAS',
                    'ARAÇATUBA',
                    'ASSIS',
                    'ATIBAIA',
                    'Campinas',
                    'Sorocaba',
                    'Santos',
                  ].map((c) => (
                    <div
                      key={c}
                      onClick={() => {
                        setClientCidade(c);
                        setClientCidadeDropdownOpen(false);
                      }}
                      className="p-2 hover:bg-purple-50 cursor-pointer"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Endereço*
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={clientEndereco}
                  onChange={(e) => setClientEndereco(e.target.value)}
                  placeholder="Rua, número, complemento"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 pr-8 text-xs"
                />
                <button
                  type="button"
                  onClick={() => alert('GPS capturado: Latitude -23.4628, Longitude -46.5333')}
                  className="absolute right-2 top-2 text-[#50007d] hover:text-purple-900"
                  title="Capturar GPS Atual"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Bairro
              </label>
              <input
                type="text"
                value={clientBairro}
                onChange={(e) => setClientBairro(e.target.value)}
                placeholder="Bairro"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>
          </div>

          {/* Seção 3: Dados de contato */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Phone className="w-4 h-4 text-[#50007d]" />
              <span>Dados de contato</span>
            </h5>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Celular*
              </label>
              <div className="flex">
                <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg px-2.5 py-2 font-mono text-slate-600 font-bold">
                  +55
                </span>
                <input
                  type="text"
                  value={clientCelular}
                  onChange={(e) => setClientCelular(e.target.value)}
                  placeholder="11 98451-2290"
                  className="w-full bg-slate-50 border border-slate-300 rounded-r-lg p-2 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                E-mail
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="cliente@email.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Atividade econômica
              </label>
              <select
                value={clientAtividade}
                onChange={(e) => setClientAtividade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              >
                <option value="Comércio / Varejo">Comércio / Varejo</option>
                <option value="Confecções e Moda">Confecções e Moda</option>
                <option value="Alimentação / Restaurante">Alimentação / Restaurante</option>
                <option value="Serviços Gerais">Serviços Gerais</option>
                <option value="Oficina Mecânica">Oficina Mecânica</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Notas
              </label>
              <input
                type="text"
                value={clientNotas}
                onChange={(e) => setClientNotas(e.target.value)}
                placeholder="Observações adicionais"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs"
              />
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">
                Anexar foto do cliente / documento
              </label>
              <div
                onClick={() => alert('Câmera aberta para fotografar documento/cliente')}
                className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-300"
              >
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveClient}
            className="w-full py-3 rounded-xl bg-[#50007d] hover:bg-[#400066] text-white font-bold text-xs shadow-md mt-2 transition active:scale-98"
          >
            Salvar cliente
          </button>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 8. CLIENTES CADASTRADOS (Captura 23:05:38)
          ========================================================================= */}
      {currentScreen === 'clientes_cadastrados' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3 space-y-3">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Clientes Cadastrados</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Pesquisar por: ID, alias, documento ou nome"
            className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#50007d]"
          />

          <h5 className="font-bold text-xs text-slate-800 pt-1">
            Selecione um cliente
          </h5>

          <div className="space-y-2">
            {/* Cliente 1: Du Surf */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <h6 className="font-bold text-xs text-slate-900">Du Surf</h6>
                <p className="text-[11px] text-slate-600">Anielo Gomes Corvino</p>
                <span className="text-[10px] text-[#50007d] font-mono font-bold block">
                  CPF: 489.102.394-01
                </span>
              </div>
              <button
                onClick={() => alert('Dossiê e histórico completo do cliente Du Surf')}
                className="px-3 py-1.5 rounded-lg border border-[#76b82a] text-[#50007d] font-bold text-[11px] hover:bg-[#eaf5dc]"
              >
                Ver Info
              </button>
            </div>

            {/* Cliente 2: Matrix */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between shadow-2xs">
              <div>
                <h6 className="font-bold text-xs text-slate-900">Matrix</h6>
                <p className="text-[11px] text-slate-600">Levson Levson</p>
                <span className="text-[10px] text-[#50007d] font-mono font-bold block">
                  CPF: 302.948.182-90
                </span>
              </div>
              <button
                onClick={() => alert('Dossiê e histórico completo do cliente Matrix')}
                className="px-3 py-1.5 rounded-lg border border-[#76b82a] text-[#50007d] font-bold text-[11px] hover:bg-[#eaf5dc]"
              >
                Ver Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 9. PERFIL DO TRABALHADOR (Captura 23:01:35)
          ========================================================================= */}
      {currentScreen === 'perfil_trabalhador' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3.5 space-y-3">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h4 className="font-bold text-xs text-slate-900">perfil do trabalhador</h4>
          </div>

          <div className="text-center py-1">
            <span className="text-xs font-mono font-bold text-[#50007d]">
              PIN: TC002326MIAP9780
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 text-xs">
            <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#50007d]" />
              <span>Informação pessoal</span>
            </h5>

            <div>
              <span className="text-[10px] text-slate-400 block">Nomes</span>
              <input
                type="text"
                defaultValue="Blz blz"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block">Sobrenomes</span>
              <input
                type="text"
                defaultValue="Blz"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-700 font-bold">Documento CPF (Obrigatório)</span>
                <span className="text-[8px] bg-purple-100 text-[#50007d] px-1 rounded font-bold">Obrigatório</span>
              </div>
              <input
                type="text"
                defaultValue="000.000.003-88"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block">Apelido</span>
              <input
                type="text"
                defaultValue="Blz"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block">Teléfono Telefone</span>
              <input
                type="text"
                defaultValue="88888"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono font-medium"
              />
            </div>

            <div>
              <span className="text-[10px] text-slate-400 block">E-mail</span>
              <input
                type="text"
                defaultValue="operador@maiscontrolecrm.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
              />
            </div>
          </div>

          <button
            onClick={() => alert('Modal para alterar senha aberto')}
            className="w-full py-2.5 rounded-xl border border-[#50007d] text-[#50007d] font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-purple-50"
          >
            <Key className="w-4 h-4" />
            <span>alterar a senha</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 10. SEGUROS (Captura 23:02:04)
          ========================================================================= */}
      {currentScreen === 'seguros' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3.5 space-y-3.5 text-xs">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Seguros</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h5 className="font-bold text-rose-900 text-xs">No estás asegurado.</h5>
              <p className="text-[11px] text-rose-700 mt-0.5">
                Conheça os benefícios de estar segurado com Mais Controle
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0 ml-2">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          <h5 className="font-bold text-slate-800 text-xs pt-1">
            Escolha o melhor seguro para você
          </h5>

          <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 to-[#50007d] text-white p-4 space-y-3 shadow-md">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">
              Um valor agregado que faz a diferença
            </span>
            <div>
              <h6 className="font-black text-sm">Seguro de Repatriação para América Latina</h6>
              <span className="text-xl font-black font-mono mt-1 block">$0</span>
            </div>
            <button
              onClick={() => alert('Solicitação de Seguro de Repatriação enviada!')}
              className="px-4 py-2 rounded-xl bg-[#8cc63f] hover:bg-[#7cb342] text-slate-950 font-black text-xs"
            >
              Solicitar
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 11. IMAGENS (Captura 23:03:00)
          ========================================================================= */}
      {currentScreen === 'imagens' && (
        <div className="flex-1 flex flex-col bg-white p-4">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Imagens</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-xs">Não há conteúdo para mostrar, deslize para atualizar</p>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 12. PRÉ VENDAS (Captura 23:05:57)
          ========================================================================= */}
      {currentScreen === 'pre_vendas' && (
        <div className="flex-1 flex flex-col bg-slate-50 p-3 space-y-3">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Pre Vendas</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex">
            <div className="w-7 bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              A
            </div>
            <div className="p-3 flex-1 space-y-1">
              <h5 className="font-bold text-xs text-slate-900">1003177 Matrix</h5>
              <p className="text-[11px] text-slate-600">Levson Levson</p>
              <span className="text-[9px] text-slate-500 font-mono block">CPF: 302.948.182-90</span>
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                <div>
                  <span className="text-slate-400 block">Vr. Parcela</span>
                  <span className="font-bold text-slate-900">$240</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Equilíbrio</span>
                  <span className="font-bold text-slate-900">$6,960</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Parcelas</span>
                  <span className="font-bold text-slate-900">29</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 13. PRÉ DESPESAS & VENDAS TEMPORAIS (Capturas 23:18 & 23:19)
          ========================================================================= */}
      {currentScreen === 'pre_despesas' && (
        <div className="flex-1 flex flex-col bg-white p-4">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Pré despesas</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
            Sem pré despesas para mostrar.
          </div>
        </div>
      )}

      {currentScreen === 'vendas_temporais' && (
        <div className="flex-1 flex flex-col bg-white p-4">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Vendas temporais</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
            Não há promoções temporárias para exibir.
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 14. HISTÓRICO DE CHAVES (Capturas 23:19:08 & 23:19:11)
          ========================================================================= */}
      {currentScreen === 'historico_chaves' && (
        <div className="flex-1 flex flex-col bg-white p-3 space-y-3">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Histórico de chaves</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Buscar"
              className="flex-1 border border-slate-300 rounded-lg p-2 text-xs"
            />
            <button
              onClick={() => alert('Filtros: Aprovado, Pendentes, Rejeitado')}
              className="p-2 border border-slate-300 rounded-lg text-[#50007d]"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
            Nenhuma chave solicitada hoje
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 15. CONFIGURAÇÃO (Capturas 23:19:21, 25, 27)
          ========================================================================= */}
      {currentScreen === 'configuracao' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3.5 space-y-3.5 text-xs">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Configuração</h4>
              <p className="text-[10px] text-slate-400 font-mono">2326 / 15 / 1002325</p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-900 block text-xs">Baixar</span>

            <button
              onClick={() => alert('Todas as informações da Unidade baixadas!')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <Download className="w-4 h-4 text-[#50007d]" />
              <span>Baixe todas as informações da Unidade</span>
            </button>

            <button
              onClick={() => alert('Configuração do servidor Mais Controle baixada!')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <Shield className="w-4 h-4 text-[#50007d]" />
              <span>Baixar configuração</span>
            </button>

            <button
              onClick={() => alert('Clientes da UGI baixados com sucesso!')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <Users className="w-4 h-4 text-[#50007d]" />
              <span>Baixar clientes da UGI</span>
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200">
            <span className="font-bold text-slate-900 block text-xs">Outras opções</span>

            <button
              onClick={() => alert('Aplicativo sincronizado!')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <Smartphone className="w-4 h-4 text-[#50007d]" />
              <span>Sincronizar aplicativo</span>
            </button>

            <button
              onClick={() => alert('Novas chaves geradas!')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <Key className="w-4 h-4 text-[#50007d]" />
              <span>Gerar novas chaves</span>
            </button>

            <button
              onClick={() => alert('Cópia de segurança criada!')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4 text-[#50007d]" />
              <span>Gerar copia de segurança</span>
            </button>

            <button
              onClick={() => alert('Dados reiniciados com sucesso')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4 text-[#50007d]" />
              <span>Reiniciar dados</span>
            </button>

            <button
              onClick={() => alert('Mais Controle Mobile App Oficial v6.7.0.4')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4 text-[#50007d]" />
              <span>Acerca de</span>
            </button>

            <button
              onClick={() => alert('Central de Ajuda Mais Controle')}
              className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3 text-left font-medium text-slate-800 hover:bg-slate-50"
            >
              <HelpCircle className="w-4 h-4 text-[#50007d]" />
              <span>Ajuda</span>
            </button>

            {/* Switches de Segurança */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="flex items-center space-x-2 font-medium text-slate-800">
                <span className="text-rose-600 font-bold">!</span>
                <span>Botão de pânico</span>
              </span>
              <input
                type="checkbox"
                checked={panicButtonToggle}
                onChange={() => setPanicButtonToggle(!panicButtonToggle)}
                className="w-4 h-4 rounded text-rose-600 accent-rose-600"
              />
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="flex items-center space-x-2 font-medium text-slate-800">
                <Download className="w-4 h-4 text-[#50007d]" />
                <span>Validação do download</span>
              </span>
              <input
                type="checkbox"
                checked={downloadValidationToggle}
                onChange={() => setDownloadValidationToggle(!downloadValidationToggle)}
                className="w-4 h-4 rounded text-[#50007d] accent-[#50007d]"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 16. EXTRATO / COMPROVANTE DE PAGAMENTO
          ========================================================================= */}
      {currentScreen === 'receipt' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3.5 space-y-3">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h4 className="font-bold text-xs text-slate-900">Extrato de Pagamento</h4>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5 font-mono text-[11px]">
            <div className="text-center border-b pb-2">
              <BrandLogo variant="maiscontrole" inverted={false} size="sm" className="justify-center mb-1" />
              <div className="text-[10px] text-slate-500 font-sans">Comprovante de Pagamento Oficial</div>
              <div className="text-[9px] text-slate-400">UGI: 15 • Caixa (1002325)</div>
            </div>

            <div className="space-y-1 text-slate-700">
              <div>Cliente: <b>{selectedContract.clientName || 'Anielo Corvino'}</b></div>
              <div>ID Venda: <b>#{selectedContract.saleId || '1003161'}</b></div>
              <div>Data: <b>08/10/2026 23:01</b></div>
              <div>Valor Pago: <b className="text-emerald-700 font-bold">$120,00</b></div>
              <div>Saldo Devedor: <b className="text-rose-600 font-bold">$1.080,00</b></div>
            </div>

            <div className="p-2 bg-slate-100 rounded text-center text-[9px] font-sans text-slate-600">
              Obrigado pela pontualidade no pagamento!
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => alert('PDF do comprovante baixado')}
              className="py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ENVIAR PDF</span>
            </button>

            <button
              onClick={() => alert('Comprovante enviado para o WhatsApp do cliente!')}
              className="py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center space-x-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            onClick={() => setCurrentScreen('route_list')}
            className="w-full py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs hover:bg-slate-100"
          >
            Voltar para Rota
          </button>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 17. GESTOR DE PAGAMENTOS
          ========================================================================= */}
      {currentScreen === 'payment_form' && (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto custom-scrollbar p-3.5 space-y-3 text-xs">
          <div className="flex items-center space-x-2 border-b pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <div>
              <h4 className="font-bold text-xs text-slate-900">Gestor de Pagamentos</h4>
              <p className="text-[10px] text-slate-500">{selectedContract.clientName || 'Anielo Corvino'}</p>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Saldo Atual:</span>
              <span className="font-bold font-mono text-slate-900">$1,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Valor da Parcela:</span>
              <span className="font-bold font-mono text-[#50007d]">$120</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-600 uppercase">Método de pagamento</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Efectivo', 'Transacción electrónica', 'Pago mixto'] as const).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`p-1.5 rounded-lg text-center font-bold text-[10px] border transition ${
                    paymentMethod === method
                      ? 'bg-[#50007d] text-white border-[#50007d]'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {method === 'Efectivo' ? 'Dinheiro' : method === 'Transacción electrónica' ? 'Pix / Trans.' : 'Misto'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Parcelas a pagar:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setInstallmentsToPay(Math.max(1, installmentsToPay - 1))}
                  className="w-7 h-7 rounded bg-slate-200 font-black text-slate-800"
                >
                  -
                </button>
                <span className="font-bold font-mono text-sm px-2">{installmentsToPay}</span>
                <button
                  onClick={() => setInstallmentsToPay(installmentsToPay + 1)}
                  className="w-7 h-7 rounded bg-slate-200 font-black text-slate-800"
                >
                  +
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="text-[10px] font-semibold text-slate-600 block mb-1">
                Recaudo adicional ($):
              </label>
              <input
                type="number"
                value={additionalAmount}
                onChange={(e) => setAdditionalAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono font-bold text-xs"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-700 block text-[11px]">Foto comprovante</span>
              <span className="text-[10px] text-slate-400">{hasReceiptPhoto ? '✓ Foto anexada' : 'Opcional'}</span>
            </div>
            <button
              onClick={() => setHasReceiptPhoto(!hasReceiptPhoto)}
              className={`p-2 rounded-lg ${hasReceiptPhoto ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleConfirmPayment}
            className="w-full py-3 rounded-xl bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 font-black text-xs transition shadow-md active:scale-98"
          >
            {paymentSuccessMsg ? '✓ REGISTRADO COM SUCESSO!' : 'REGISTRAR PAGAMENTO'}
          </button>
        </div>
      )}

      {/* =========================================================================
          SCREEN: 18. CALCULADORA DE ROTA
          ========================================================================= */}
      {currentScreen === 'calculadora' && (
        <div className="flex-1 flex flex-col bg-slate-100 p-3.5 justify-between">
          <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setCurrentScreen('route_list')}
              className="p-1 rounded hover:bg-slate-200"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h4 className="font-bold text-xs text-slate-900">Calculadora de Rota</h4>
          </div>

          <div className="bg-white rounded-2xl p-4 text-right border border-slate-300 shadow-inner">
            <div className="text-[10px] text-slate-400 font-mono h-4">
              {calcMemory !== null ? `${calcMemory} ${calcOp}` : ''}
            </div>
            <div className="text-2xl font-black font-mono text-slate-900 truncate">
              {calcDisplay}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {['C', 'DEL', '÷', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((key) => {
              const isOp = ['÷', '×', '-', '+', '='].includes(key);
              const isClear = key === 'C' || key === 'DEL';
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'DEL') setCalcDisplay(calcDisplay.length > 1 ? calcDisplay.slice(0, -1) : '0');
                    else handleCalcBtn(key);
                  }}
                  className={`h-11 rounded-xl font-black text-sm transition active:scale-95 flex items-center justify-center shadow-2xs ${
                    isOp
                      ? 'bg-[#2e86ab] text-white'
                      : isClear
                      ? 'bg-slate-300 text-slate-700'
                      : 'bg-white text-slate-800 border border-slate-200'
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentScreen('route_list')}
            className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
          >
            Concluir
          </button>
        </div>
      )}

      {/* =========================================================================
          DRAWER LATERAL (Captura 23:01:35 - Com Logotipo Oficial Mais Controle)
          ========================================================================= */}
      {isMenuOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex animate-in fade-in duration-200">
          <div className="w-[300px] bg-white text-slate-900 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200 overflow-y-auto custom-scrollbar">
            <div>
              {/* Header Roxo com Logo Oficial Mais Controle */}
              <div className="bg-[#50007d] p-4 text-white relative">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white"
                  aria-label="Fechar Menu"
                >
                  <X className="w-5 h-5" />
                </button>

                <BrandLogo variant="maiscontrole" inverted={true} size="md" />
                <div className="text-[10px] text-purple-200 mt-1 font-mono">
                  Versão 6.7.0.4 • Oficial
                </div>

                {/* 3 Cartões Grandes de Atalho */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <button
                    onClick={() => {
                      setCurrentScreen('perfil_trabalhador');
                      setIsMenuOpen(false);
                    }}
                    className="bg-white text-slate-800 p-2.5 rounded-xl shadow-md hover:bg-slate-50 transition flex flex-col items-center justify-center"
                  >
                    <User className="w-5 h-5 text-[#50007d] mb-1" />
                    <span className="text-[10px] font-bold leading-tight">Meu perfil</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('cierre_caja');
                      setIsMenuOpen(false);
                    }}
                    className="bg-white text-slate-800 p-2.5 rounded-xl shadow-md hover:bg-slate-50 transition flex flex-col items-center justify-center"
                  >
                    <Lock className="w-5 h-5 text-[#50007d] mb-1" />
                    <span className="text-[10px] font-bold leading-tight">Fechamento de Caixa</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('seguros');
                      setIsMenuOpen(false);
                    }}
                    className="bg-white text-slate-800 p-2.5 rounded-xl shadow-md hover:bg-slate-50 transition flex flex-col items-center justify-center"
                  >
                    <Shield className="w-5 h-5 text-[#50007d] mb-1" />
                    <span className="text-[10px] font-bold leading-tight">Seguro</span>
                  </button>
                </div>
              </div>

              {/* Lista Vertical de Opções */}
              <div className="p-3 space-y-0.5 text-xs text-slate-800 font-medium">
                <button
                  onClick={() => {
                    setCurrentScreen('clientes_cadastrados');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <Users className="w-4 h-4 text-[#50007d]" />
                  <span>Veja os clientes da caixa</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('imagens');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <ImageIcon className="w-4 h-4 text-[#50007d]" />
                  <span>Imagens</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('movimentos');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 font-bold text-[#50007d]"
                >
                  <DollarSign className="w-4 h-4 text-[#50007d]" />
                  <span>Despesas ou rendas</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('pre_vendas');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <FileText className="w-4 h-4 text-[#50007d]" />
                  <span>Pre vendas</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('pre_despesas');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <FileText className="w-4 h-4 text-[#50007d]" />
                  <span>Pré despesas</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('vendas_temporais');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <Clock className="w-4 h-4 text-[#50007d]" />
                  <span>Vendas temporais</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('historico_chaves');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <Key className="w-4 h-4 text-[#50007d]" />
                  <span>Histórico de chaves</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('calculadora');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <Calculator className="w-4 h-4 text-[#50007d]" />
                  <span>Calculadora de rota</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('configuracao');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-purple-50"
                >
                  <Settings className="w-4 h-4 text-[#50007d]" />
                  <span>Configuração</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-rose-600 font-bold hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior Android (Três Botões de Navegação) */}
      <div className="h-5 bg-white flex items-center justify-around px-8 border-t border-slate-100 shrink-0">
        <button
          onClick={() => setCurrentScreen('route_list')}
          className="w-3.5 h-3.5 border-2 border-slate-400 rotate-45 inline-block hover:border-slate-700"
          title="Voltar"
        ></button>
        <button
          onClick={() => setCurrentScreen('route_list')}
          className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 inline-block hover:border-slate-700"
          title="Início"
        ></button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-3.5 h-3.5 rounded-2xs border-2 border-slate-400 inline-block hover:border-slate-700"
          title="Aplicativos Recentes"
        ></button>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4">
      
      {/* Barra Superior de Controle para Testes do Cliente */}
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <BrandLogo variant="maiscontrole" size="sm" />
          <div className="border-l pl-3 border-slate-200 hidden sm:block">
            <span className="text-xs font-bold text-[#50007d] block leading-tight">
              Ambiente de Avaliação & Testes do Cliente
            </span>
            <span className="text-[10px] text-slate-500">
              App Mobile do Trabalhador • Português (Brasil)
            </span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Alternar Modo Moldura / Tela Cheia */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center space-x-1">
            <button
              onClick={() => setDisplayMode('smartphone')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center space-x-1 transition ${
                displayMode === 'smartphone'
                  ? 'bg-white text-[#50007d] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Moldura</span>
            </button>
            <button
              onClick={() => setDisplayMode('fullscreen')}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center space-x-1 transition ${
                displayMode === 'fullscreen'
                  ? 'bg-white text-[#50007d] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Tela Cheia</span>
            </button>
          </div>

          {/* Copiar Link Direto do App para Enviar ao Cliente */}
          <button
            onClick={handleCopyClientLink}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] flex items-center space-x-1.5 transition active:scale-95 shadow-xs"
            title="Copiar Link para Teste do Cliente"
          >
            {linkCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Link p/ Cliente</span>
              </>
            )}
          </button>

          {/* Voltar ao Painel Web */}
          {onBackToWeb && (
            <button
              onClick={onBackToWeb}
              className="px-3 py-1.5 rounded-xl border border-[#50007d] text-[#50007d] hover:bg-purple-50 font-bold text-[11px] transition"
            >
              Ir para Painel Web
            </button>
          )}
        </div>
      </div>

      {/* Atalhos Rápidos para Navegação pelas 15+ Telas */}
      <div className="w-full max-w-4xl bg-purple-50/70 border border-purple-200/80 rounded-xl p-2.5 mb-4 flex items-center gap-1.5 overflow-x-auto custom-scrollbar text-xs">
        <span className="font-bold text-[#50007d] text-[11px] shrink-0 mr-1 flex items-center gap-1">
          <span>Telas:</span>
        </span>
        {[
          { id: 'login', label: 'Login' },
          { id: 'route_list', label: 'Rota / Vendas' },
          { id: 'cliente_novo', label: 'Cliente Novo (CPF Obrigatório)' },
          { id: 'clientes_cadastrados', label: 'Clientes Cadastrados' },
          { id: 'movimentos', label: 'Despesas / Rendas' },
          { id: 'cierre_caja', label: 'Fechamento de Caixa' },
          { id: 'perfil_trabalhador', label: 'Perfil Trabalhador' },
          { id: 'pre_vendas', label: 'Pre Vendas' },
          { id: 'seguros', label: 'Seguros' },
          { id: 'configuracao', label: 'Configurações' },
        ].map((screen) => (
          <button
            key={screen.id}
            onClick={() => setCurrentScreen(screen.id as MobileScreen)}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] shrink-0 transition ${
              currentScreen === screen.id
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-purple-100/50'
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Renderização Condicional: Smartphone Frame vs. Fullscreen */}
      {displayMode === 'smartphone' ? (
        <div className="relative w-[370px] h-[785px] bg-slate-950 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 ring-2 ring-slate-900 flex flex-col overflow-hidden">
          {/* Alto-falante e Câmera Frontal */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-black rounded-full z-40 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-2.5 border border-slate-800"></div>
          </div>

          <div className="flex-1 rounded-[38px] overflow-hidden flex flex-col">
            {renderAppContent()}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md h-[780px] bg-white rounded-2xl shadow-xl border border-slate-300 flex flex-col overflow-hidden">
          {renderAppContent()}
        </div>
      )}
    </div>
  );
};
