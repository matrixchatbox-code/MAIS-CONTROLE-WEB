import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  BarChart2,
  DollarSign,
  Info,
  Settings,
  FileText,
  Zap,
  User,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  X,
  Globe,
  Smartphone,
  Monitor,
  LogOut,
  Sliders,
  CheckCircle2,
  ShieldAlert,
  Bell
} from 'lucide-react';
import { MainNavTab, SubViewSection, Language, ViewMode } from '../types';
import { BrandLogo } from './BrandLogo';

interface TryTopNavigationProps {
  currentTab: MainNavTab;
  currentSubView: SubViewSection;
  onNavigate: (tab: MainNavTab, subView?: SubViewSection) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  brandVariant: 'maiscontrole' | 'trycontroller';
  onToggleBrandVariant: () => void;
  pendingApprovalsCount: number;
}

export const TryTopNavigation: React.FC<TryTopNavigationProps> = ({
  currentTab,
  currentSubView,
  onNavigate,
  language,
  onToggleLanguage,
  viewMode,
  onChangeViewMode,
  brandVariant,
  onToggleBrandVariant,
  pendingApprovalsCount,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isPt = language === 'pt';

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection(mobileExpandedSection === section ? null : section);
  };

  const handleMobileNavigate = (tab: MainNavTab, subView?: SubViewSection) => {
    setIsMobileMenuOpen(false);
    setMobileExpandedSection(null);
    onNavigate(tab, subView);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#50007d] text-white shadow-md border-b border-[#3f0063] w-full max-w-full" ref={navRef}>
      {/* Main Nav Bar */}
      <div className="px-3 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Nav Tabs */}
        <div className="flex items-center space-x-2 md:space-x-5">
          {/* Hamburger Menu Toggle (Mobile & Tablet: < xl) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8cc63f] transition cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            title="Menu Mais Controle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#8cc63f]" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Brand Logo - 100% Mais Controle */}
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('inicio', 'inicio_unidades');
            }}
            className="cursor-pointer py-1 pr-2 sm:pr-4 border-r border-purple-800/80 mr-1"
            title="Mais Controle | Início"
          >
            <BrandLogo variant="maiscontrole" inverted={true} showSubtitle={true} />
          </div>

          {/* Desktop Navigation Links (Visible on desktop: xl and above) */}
          <nav className="hidden xl:flex items-center space-x-0.5 md:space-x-1 text-sm font-medium">
            {/* 1. Começar (Início) */}
            <button
              onClick={() => {
                setOpenDropdown(null);
                onNavigate('inicio', 'inicio_unidades');
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-t-md transition cursor-pointer ${
                currentTab === 'inicio'
                  ? 'bg-white/10 text-white font-bold border-b-2 border-[#8cc63f]'
                  : 'text-purple-100 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 text-purple-200" />
              <span>{isPt ? 'Começar' : 'Inicio'}</span>
            </button>

            {/* 2. Estadísticas */}
            <button
              onClick={() => {
                setOpenDropdown(null);
                onNavigate('estadisticas', 'estadisticas_dashboard');
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-t-md transition cursor-pointer ${
                currentTab === 'estadisticas'
                  ? 'bg-white/10 text-white font-bold border-b-2 border-[#8cc63f]'
                  : 'text-purple-100 hover:bg-white/5 hover:text-white'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-purple-200" />
              <span>{isPt ? 'Estatísticas' : 'Estadísticas'}</span>
            </button>

            {/* 3. Ventas (Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'ventas' ? null : 'ventas')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-t-md transition cursor-pointer ${
                  currentTab === 'ventas'
                    ? 'bg-[#76b82a] text-white font-bold'
                    : 'text-purple-100 hover:bg-white/5 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{isPt ? 'Vendas' : 'Ventas'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'ventas' && (
                <div className="absolute left-0 mt-1 w-64 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    {isPt ? 'Movimentos de Caixa & Vendas' : 'Movimientos y Caja'}
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_ingresos');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium flex items-center justify-between"
                  >
                    <span>{isPt ? 'Entradas / Ingressos' : 'Ingresos'}</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">+R$</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_gastos');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium flex items-center justify-between"
                  >
                    <span>{isPt ? 'Despesas / Gastos' : 'Gastos'}</span>
                    <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-mono">-R$</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_lista');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Vendas & Carnês' : 'Ventas'}
                  </button>
                  <div className="my-1 border-t border-slate-100"></div>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_caja_abrir_cerrar');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium flex items-center justify-between"
                  >
                    <span>{isPt ? 'Gestão de Caixa: Abrir e Fechar' : 'Gestión de caja: Abrir y cerrar'}</span>
                    <span className="text-slate-400 font-bold">&gt;</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_resumen_caja');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Resumo de Caixa do Dia' : 'Resumen'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_crear_llave');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium text-amber-700"
                  >
                    {isPt ? 'Criar Chave (Llave)' : 'Crear llave'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_limpieza_cobro');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Limpeza de Cobrança' : 'Limpieza de cobro'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_resumen_periodo');
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs transition flex items-center justify-between ${
                      currentSubView === 'ventas_resumen_periodo'
                        ? 'bg-purple-100 text-[#50007d] font-black'
                        : 'text-[#50007d] bg-purple-50/70 hover:bg-purple-100 font-bold'
                    }`}
                  >
                    <span>{isPt ? 'Resumo por Período' : 'Resumen por periodo'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#50007d]" />
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_apertura_masiva');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Abertura Massiva de Caixas' : 'Apertura masiva de cajas'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('ventas', 'ventas_transferencia_masiva');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Transferência Massiva de Vendas' : 'Transferencia masiva de ventas'}
                  </button>
                </div>
              )}
            </div>

            {/* 4. General (Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'general' ? null : 'general')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-t-md transition ${
                  currentTab === 'general'
                    ? 'bg-white/10 text-white font-bold border-b-2 border-[#8cc63f]'
                    : 'text-purple-100 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Info className="w-4 h-4 text-purple-200" />
                <span>{isPt ? 'Em geral' : 'En general'}</span>
                {pendingApprovalsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                )}
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'general' && (
                <div className="absolute left-0 mt-1 w-56 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => {
                      onNavigate('general', 'general_mapa');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium flex items-center justify-between"
                  >
                    <span>{isPt ? 'Mapa em Tempo Real' : 'Mapa'}</span>
                    <span className="text-[10px] text-cyan-600 bg-cyan-50 px-1 rounded">GPS</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('general', 'general_facturacion');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Faturamento & Licenças' : 'Facturación'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('general', 'general_aprobaciones');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium flex items-center justify-between"
                  >
                    <span>{isPt ? 'Central de Aprovações' : 'Aprobaciones'}</span>
                    {pendingApprovalsCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-bold">
                        {pendingApprovalsCount}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('general', 'general_seguros');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium flex items-center justify-between"
                  >
                    <span>{isPt ? 'Seguros & Repatriação' : 'Seguros'}</span>
                    <span className="bg-[#50007d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      + Ver más
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Administración (Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'administracion' ? null : 'administracion')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-t-md transition ${
                  currentTab === 'administracion'
                    ? 'bg-white/10 text-white font-bold border-b-2 border-[#8cc63f]'
                    : 'text-purple-100 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 text-purple-200" />
                <span>{isPt ? 'Administração' : 'Administración'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'administracion' && (
                <div className="absolute left-0 mt-1 w-64 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    {isPt ? 'Gestão de Plataforma' : 'Gestión de Plataforma'}
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_unidades');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Lista de Unidades (UGIs)' : 'Unidades'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_trabajadores');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Trabalhadores / Cobradores' : 'Trabajadores'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_tipos_movimientos');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Tipos de Movimentos' : 'Tipos de movimientos'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_dispositivos');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Dispositivos & Trava IMEI' : 'Dispositivos'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_liquidacion');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Liquidação do Trabalhador' : 'Liquidación del trabajador'}
                  </button>
                  <div className="my-1 border-t border-slate-100"></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                    {isPt ? 'Governança & Clientes' : 'Usuarios y Clientes'}
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_clientes');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Gestão de Clientes & Dossiê' : 'Gestión de Clientes'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_arbol_socios');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium text-[#50007d] font-semibold flex items-center justify-between"
                  >
                    <span>{isPt ? 'Árvore de Sócios' : 'Árbol de Socios'}</span>
                    <span className="text-[10px] bg-purple-100 text-[#50007d] px-1.5 py-0.2 rounded font-bold">Novo</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_score');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Configuração de Score 2.0' : 'Configurar Score'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'admin_prestamos_sociedades');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-medium"
                  >
                    {isPt ? 'Fondeo / Empréstimos Sociedades' : 'Préstamos entre Sociedades'}
                  </button>
                </div>
              )}
            </div>

            {/* 6. Reportes (Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'reportes' ? null : 'reportes')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-t-md transition ${
                  currentTab === 'reportes'
                    ? 'bg-white/10 text-white font-bold border-b-2 border-[#8cc63f]'
                    : 'text-purple-100 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-purple-200" />
                <span>{isPt ? 'Relatórios' : 'Reportes'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'reportes' && (
                <div className="absolute left-0 mt-1 w-64 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] hover:text-[#50007d] font-bold text-[#50007d]"
                  >
                    {isPt ? 'Central de Relatórios Completa' : 'Catálogo de Reportes'}
                  </button>
                  <div className="my-1 border-t border-slate-100"></div>
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] font-medium"
                  >
                    {isPt ? 'Créditos Diários' : 'Créditos diarios'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] font-medium"
                  >
                    {isPt ? 'Seguimento de Pagamento por Cliente' : 'Seguimiento pago por cliente'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] font-medium"
                  >
                    {isPt ? 'Desempenho Resumo' : 'Desempeño resumen'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] font-medium"
                  >
                    {isPt ? 'Movimentos por Centro de Negócios' : 'Movimientos por CN'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] font-medium"
                  >
                    {isPt ? 'Log Móvel & Sincronização' : 'Log Móvil'}
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('reportes', 'reportes_central');
                      setOpenDropdown(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs hover:bg-[#eaf5dc] font-medium"
                  >
                    {isPt ? 'Histórico de Alertas de Pânico' : 'Histórico de alertas de pánico'}
                  </button>
                </div>
              )}
            </div>

            {/* 7. Novos Recursos (Signature Green Button) */}
            <button
              onClick={() => {
                setOpenDropdown(null);
                onNavigate('novedades', 'novedades_slides');
              }}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs shadow transition ml-1 cursor-pointer ${
                currentTab === 'novedades'
                  ? 'bg-white text-[#50007d]'
                  : 'bg-[#4f9b17] hover:bg-[#438713] text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>{isPt ? 'Novos recursos' : 'Nuevos recursos'}</span>
            </button>
          </nav>
        </div>

        {/* Right Actions: Alerta, Notifications Bell, EV Avatar, Mobile App Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Alerta Button matching screenshot */}
          <button
            onClick={() => {
              onNavigate('inicio');
              const elem = document.getElementById('central-telemetria-gps');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#4f9b17] hover:bg-[#438713] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            title="Alerta de Pânico em Rota Ativo"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>Alerta</span>
          </button>

          {/* Notifications Bell with badge 3 */}
          <button
            onClick={() => onNavigate('general', 'general_aprobaciones')}
            className="relative p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-full transition cursor-pointer"
            title={isPt ? `3 notificações de segurança e aprovações` : `3 notificaciones`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Mobile App Toggle / Tester */}
          <button
            onClick={() => onChangeViewMode(viewMode === 'mobile_app' ? 'admin' : 'mobile_app')}
            className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer ${
              viewMode === 'mobile_app'
                ? 'bg-[#8cc63f] text-slate-950 ring-2 ring-white/60 font-black'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-white border border-emerald-400/40'
            }`}
            title={isPt ? 'Alternar para o App Mobile do Trabalhador' : 'Probar App Móvil'}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#8cc63f]" />
            <span>{viewMode === 'mobile_app' ? (isPt ? 'Painel Web' : 'Panel Web') : 'App'}</span>
          </button>

          {/* User Profile Avatar Circle with initials EV matching screenshot */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full bg-white text-[#50007d] flex items-center justify-center font-black text-xs shadow-xs hover:bg-purple-100 transition cursor-pointer"
              aria-label="Perfil do usuário - Ericson Vicente"
              title="Ericson Vicente (EV)"
            >
              EV
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              {/* Profile Card Header matching screenshot */}
              <div className="p-4 bg-[#f4ecf8] border-b border-purple-100 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#50007d] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  EA
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#50007d] uppercase tracking-wide">
                    ERICSON APARECIDO
                  </h4>
                  <p className="text-xs text-slate-600 font-mono">Ericknois99@gmail.com</p>
                  <button
                    onClick={() => {
                      onNavigate('administracion', 'mi_perfil');
                      setIsProfileOpen(false);
                    }}
                    className="text-xs text-[#76b82a] font-bold hover:underline mt-0.5 inline-block"
                  >
                    {isPt ? 'Meu Perfil' : 'Mi Perfil'}
                  </button>
                </div>
              </div>

              {/* Platform selector matching screenshot */}
              <div className="p-4 space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                    {isPt ? 'Selecionar Plataforma' : 'Seleccionar Plataforma'}
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#50007d]">
                    <option value="c3999">c3999 - Plataforma Central Brasil</option>
                    <option value="c4001">c4001 - Expansão Sudeste</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    onNavigate('administracion', 'admin_unidades');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isPt ? 'Configuração Plataforma' : 'Configuración plataforma'}</span>
                </button>

                <button
                  onClick={() => {
                    onChangeViewMode('login');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isPt ? 'Encerrar Sessão' : 'Cerrar Sesión'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* =========================================================================
          MOBILE HAMBURGER MENU DRAWER (< xl)
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#50007d] text-white flex flex-col shadow-2xl z-50 border-r border-[#3f0063] animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-purple-800/80 flex items-center justify-between bg-[#420067]">
              <div
                onClick={() => handleMobileNavigate('inicio', 'inicio_unidades')}
                className="cursor-pointer"
              >
                <BrandLogo variant="maiscontrole" inverted={true} showSubtitle={true} />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-purple-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Info Bar */}
            <div className="px-4 py-3 bg-[#390059] border-b border-purple-900 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-[#50007d] font-black text-xs flex items-center justify-center shadow-xs">
                  EV
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">ERICSON VICENTE</div>
                  <div className="text-[10px] text-purple-300 font-mono">c3999 • Plataforma Central</div>
                </div>
              </div>
              <span className="text-[10px] bg-[#8cc63f] text-slate-950 font-bold px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>

            {/* Quick Actions Shortcuts inside Drawer */}
            <div className="p-3 bg-purple-950/40 border-b border-purple-800/60 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onChangeViewMode(viewMode === 'mobile_app' ? 'admin' : 'mobile_app');
                }}
                className="flex items-center justify-center space-x-1.5 px-2.5 py-2 rounded-lg bg-[#8cc63f] hover:bg-[#7db536] text-slate-950 text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{viewMode === 'mobile_app' ? 'Painel Web' : 'App Mobile'}</span>
              </button>

              <button
                onClick={() => {
                  handleMobileNavigate('inicio', 'inicio_unidades');
                  const elem = document.getElementById('central-telemetria-gps');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center space-x-1 px-2.5 py-2 rounded-lg bg-[#4f9b17] hover:bg-[#438713] text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping mr-1"></span>
                <span>Alerta Pânico</span>
              </button>
            </div>

            {/* Scrollable Navigation Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs select-none">
              <div className="text-[10px] uppercase tracking-wider text-purple-300/80 font-bold px-2 pt-1 pb-0.5">
                {isPt ? 'Navegação Principal' : 'Navegación'}
              </div>

              {/* 1. Começar (Início) */}
              <button
                onClick={() => handleMobileNavigate('inicio', 'inicio_unidades')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition font-medium cursor-pointer ${
                  currentTab === 'inicio'
                    ? 'bg-white/15 text-white font-bold border-l-4 border-[#8cc63f]'
                    : 'text-purple-100 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Home className="w-4 h-4 text-[#8cc63f]" />
                  <span>{isPt ? 'Começar (Início)' : 'Inicio'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* 2. Estatísticas */}
              <button
                onClick={() => handleMobileNavigate('estadisticas', 'estadisticas_dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition font-medium cursor-pointer ${
                  currentTab === 'estadisticas'
                    ? 'bg-white/15 text-white font-bold border-l-4 border-[#8cc63f]'
                    : 'text-purple-100 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <BarChart2 className="w-4 h-4 text-[#8cc63f]" />
                  <span>{isPt ? 'Estatísticas & Gráficos' : 'Estadísticas'}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* 3. Vendas (Accordion) */}
              <div className="rounded-lg overflow-hidden bg-white/5">
                <button
                  onClick={() => toggleMobileSection('ventas')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition font-medium cursor-pointer ${
                    currentTab === 'ventas' ? 'bg-[#76b82a] text-white font-bold' : 'text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <DollarSign className="w-4 h-4" />
                    <span>{isPt ? 'Vendas & Cobrança' : 'Ventas'}</span>
                  </div>
                  {mobileExpandedSection === 'ventas' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 opacity-80" />
                  )}
                </button>

                {mobileExpandedSection === 'ventas' && (
                  <div className="p-2 space-y-1 bg-black/20 border-t border-purple-800/40">
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_ingresos')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100 flex items-center justify-between"
                    >
                      <span>Entradas / Ingressos</span>
                      <span className="text-[10px] text-emerald-400 font-mono">+R$</span>
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_gastos')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100 flex items-center justify-between"
                    >
                      <span>Despesas / Gastos</span>
                      <span className="text-[10px] text-rose-400 font-mono">-R$</span>
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_lista')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Vendas & Carnês
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_caja_abrir_cerrar')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Gestão de Caixa: Abrir e Fechar
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_resumen_caja')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Resumo de Caixa do Dia
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_crear_llave')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-amber-300"
                    >
                      Criar Chave (Llave)
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_limpieza_cobro')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Limpeza de Cobrança
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_resumen_periodo')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Resumo por Período
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_apertura_masiva')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Abertura Massiva de Caixas
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('ventas', 'ventas_transferencia_masiva')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Transferência Massiva de Vendas
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Em Geral (Accordion) */}
              <div className="rounded-lg overflow-hidden bg-white/5">
                <button
                  onClick={() => toggleMobileSection('general')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition font-medium cursor-pointer ${
                    currentTab === 'general' ? 'bg-white/15 text-white font-bold border-l-4 border-[#8cc63f]' : 'text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Info className="w-4 h-4 text-purple-200" />
                    <span>{isPt ? 'Em geral' : 'En general'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {pendingApprovalsCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                    )}
                    {mobileExpandedSection === 'general' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 opacity-80" />
                    )}
                  </div>
                </button>

                {mobileExpandedSection === 'general' && (
                  <div className="p-2 space-y-1 bg-black/20 border-t border-purple-800/40">
                    <button
                      onClick={() => handleMobileNavigate('general', 'general_mapa')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100 flex items-center justify-between"
                    >
                      <span>Mapa em Tempo Real</span>
                      <span className="text-[10px] text-cyan-300 bg-cyan-900/60 px-1 rounded">GPS</span>
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('general', 'general_facturacion')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Faturamento & Licenças
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('general', 'general_aprobaciones')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100 flex items-center justify-between"
                    >
                      <span>Central de Aprovações</span>
                      {pendingApprovalsCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-bold">
                          {pendingApprovalsCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('general', 'general_seguros')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Seguros & Repatriação
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Administração (Accordion) */}
              <div className="rounded-lg overflow-hidden bg-white/5">
                <button
                  onClick={() => toggleMobileSection('administracion')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition font-medium cursor-pointer ${
                    currentTab === 'administracion' ? 'bg-white/15 text-white font-bold border-l-4 border-[#8cc63f]' : 'text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Settings className="w-4 h-4 text-purple-200" />
                    <span>{isPt ? 'Administração' : 'Administración'}</span>
                  </div>
                  {mobileExpandedSection === 'administracion' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 opacity-80" />
                  )}
                </button>

                {mobileExpandedSection === 'administracion' && (
                  <div className="p-2 space-y-1 bg-black/20 border-t border-purple-800/40">
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_unidades')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Lista de Unidades (UGIs)
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_trabajadores')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Trabalhadores / Cobradores
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_tipos_movimientos')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Tipos de Movimentos
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_dispositivos')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Dispositivos & Trava IMEI
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_liquidacion')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Liquidação do Trabalhador
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_clientes')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Gestão de Clientes & Dossiê
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_arbol_socios')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100 flex items-center justify-between"
                    >
                      <span>Árvore de Sócios</span>
                      <span className="text-[9px] bg-[#8cc63f] text-slate-950 font-bold px-1 rounded">Novo</span>
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_score')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Configuração de Score 2.0
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'admin_prestamos_sociedades')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Fondeo / Empréstimos Sociedades
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('administracion', 'mi_perfil')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-[#8cc63f] font-bold"
                    >
                      Meu Perfil
                    </button>
                  </div>
                )}
              </div>

              {/* 6. Relatórios (Accordion) */}
              <div className="rounded-lg overflow-hidden bg-white/5">
                <button
                  onClick={() => toggleMobileSection('reportes')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 transition font-medium cursor-pointer ${
                    currentTab === 'reportes' ? 'bg-white/15 text-white font-bold border-l-4 border-[#8cc63f]' : 'text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-purple-200" />
                    <span>{isPt ? 'Relatórios' : 'Reportes'}</span>
                  </div>
                  {mobileExpandedSection === 'reportes' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 opacity-80" />
                  )}
                </button>

                {mobileExpandedSection === 'reportes' && (
                  <div className="p-2 space-y-1 bg-black/20 border-t border-purple-800/40">
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-[#8cc63f] font-bold"
                    >
                      Central de Relatórios Completa
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Créditos Diários
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Seguimento de Pagamento por Cliente
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Desempenho Resumo
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Movimentos por Centro de Negócios
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Log Móvel & Sincronização
                    </button>
                    <button
                      onClick={() => handleMobileNavigate('reportes', 'reportes_central')}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-white/10 text-purple-100"
                    >
                      Histórico de Alertas de Pânico
                    </button>
                  </div>
                )}
              </div>

              {/* 7. Novos Recursos */}
              <button
                onClick={() => handleMobileNavigate('novedades', 'novedades_slides')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#4f9b17] hover:bg-[#438713] text-white font-bold transition shadow-xs cursor-pointer mt-2"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span>{isPt ? 'Novos recursos' : 'Nuevos recursos'}</span>
                </div>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-black">2026</span>
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-[#390059] border-t border-purple-900 space-y-2 text-xs">
              {/* Language Switch */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] text-purple-300 flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Idioma / Lenguaje:</span>
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onToggleLanguage('pt')}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      isPt ? 'bg-[#8cc63f] text-slate-950' : 'text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    PT
                  </button>
                  <button
                    onClick={() => onToggleLanguage('es')}
                    className={`px-2 py-1 rounded text-[10px] font-bold ${
                      !isPt ? 'bg-[#8cc63f] text-slate-950' : 'text-purple-200 hover:bg-white/10'
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onChangeViewMode('login');
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg border border-rose-300/40 text-rose-200 hover:bg-rose-500/20 font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isPt ? 'Encerrar Sessão' : 'Cerrar Sesión'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
