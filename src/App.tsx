import React, { useState, useEffect, useCallback } from 'react';
import {
  Language,
  MainNavTab,
  SubViewSection,
  UnitSummaryItem,
  ClientProfile,
  SaleContract,
  CashMovement,
  ApprovalRequestItem,
  SocioTreeNode,
  InterSocietyLoan,
  DeviceItem,
  AuditLogItem,
} from './types';
import { StorageService } from './utils/storage';

import { TryTopNavigation } from './components/TryTopNavigation';
import { TryFilterBar } from './components/TryFilterBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CierreMasivoModal } from './components/modals/CierreMasivoModal';
import { NovaVendaModal } from './components/modals/NovaVendaModal';

import { TryInicioView } from './views/TryInicioView';
import { TryEstadisticasView } from './views/TryEstadisticasView';
import { TryVentasView } from './views/TryVentasView';
import { TryGeneralView } from './views/TryGeneralView';
import { TryAdministracionView } from './views/TryAdministracionView';
import { TryReportesView } from './views/TryReportesView';
import { TryNovedadesView } from './views/TryNovedadesView';
import { TryPerfilView } from './views/TryPerfilView';
import { TryMobileAppSimulator } from './views/TryMobileAppSimulator';
import { ViewMode } from './types';
import { Smartphone } from 'lucide-react';

export default function App() {
  // Language State
  const [language, setLanguageState] = useState<Language>(() => StorageService.getLanguage());

  // View Mode: Web Administrator vs Mobile App
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (
        hash.includes('app') ||
        hash.includes('mobile') ||
        search.includes('view=mobile') ||
        search.includes('view=app')
      ) {
        return 'mobile_app';
      }
    }
    return 'admin';
  });

  // Web Navigation
  const [currentTab, setCurrentTab] = useState<MainNavTab>('inicio');
  const [currentSubView, setCurrentSubView] = useState<SubViewSection>('inicio_unidades');

  // Filter Bar state
  const [selectedCn, setSelectedCn] = useState<string>('/1/');
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [viewAllUnits, setViewAllUnits] = useState<boolean>(false);

  // Entities Data State (persisted & live)
  const [units, setUnits] = useState<UnitSummaryItem[]>(() => StorageService.getUnits());
  const [clients, setClients] = useState<ClientProfile[]>(() => StorageService.getClients());
  const [contracts, setContracts] = useState<SaleContract[]>(() => StorageService.getContracts());
  const [movements, setMovements] = useState<CashMovement[]>(() => StorageService.getMovements());
  const [approvals, setApprovals] = useState<ApprovalRequestItem[]>(() => StorageService.getApprovals());
  const [socioTree, setSocioTree] = useState<SocioTreeNode[]>(() => StorageService.getSocioTree());
  const [loans, setLoans] = useState<InterSocietyLoan[]>(() => StorageService.getLoans());
  const [devices, setDevices] = useState<DeviceItem[]>(() => StorageService.getDevices());
  const [logs, setLogs] = useState<AuditLogItem[]>(() => StorageService.getLogs());

  // Modals
  const [isCierreMasivoOpen, setIsCierreMasivoOpen] = useState(false);
  const [isNovaVendaOpen, setIsNovaVendaOpen] = useState(false);

  // Helper to sync Language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    StorageService.setLanguage(lang);
  };

  // URL Hash Navigation for clean deep linking between tabs and views
  const parseHashRoute = useCallback(() => {
    const rawHash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
    if (!rawHash) return;

    if (rawHash === 'app' || rawHash === 'mobile' || rawHash.startsWith('mobile')) {
      setViewMode('mobile_app');
      return;
    }

    if (rawHash.startsWith('admin')) {
      setViewMode('admin');
    }

    const parts = rawHash.split('/');
    const tab = parts[0] === 'admin' && parts[1] ? parts[1] : parts[0];

    const validTabs: MainNavTab[] = [
      'inicio',
      'estadisticas',
      'ventas',
      'general',
      'administracion',
      'reportes',
      'novedades',
    ];
    if (validTabs.includes(tab as MainNavTab)) {
      setCurrentTab(tab as MainNavTab);
    }
  }, []);

  const updateRouteHash = useCallback((tab: MainNavTab) => {
    const targetHash = `/admin/${tab}`;
    if (window.location.hash !== `#${targetHash}`) {
      window.location.hash = targetHash;
    }
  }, []);

  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'mobile_app') {
      window.location.hash = '#/app';
    } else if (mode === 'admin') {
      window.location.hash = `#/admin/${currentTab}`;
    }
  };

  useEffect(() => {
    parseHashRoute();
    const handleHashChange = () => parseHashRoute();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [parseHashRoute]);

  const handleNavigate = (tab: MainNavTab, subView?: SubViewSection) => {
    setViewMode('admin');
    setCurrentTab(tab);
    updateRouteHash(tab);
    if (subView) {
      setCurrentSubView(subView);
    } else {
      if (tab === 'inicio') setCurrentSubView('inicio_unidades');
      else if (tab === 'estadisticas') setCurrentSubView('estadisticas_dashboard');
      else if (tab === 'ventas') setCurrentSubView('ventas_lista');
      else if (tab === 'general') setCurrentSubView('general_mapa');
      else if (tab === 'administracion') setCurrentSubView('admin_unidades');
      else if (tab === 'reportes') setCurrentSubView('reportes_central');
      else if (tab === 'novedades') setCurrentSubView('novedades_slides');
    }
  };

  // Pending Approvals count for notifications and badges
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pendiente').length;

  // Actions
  const handleAddMovement = (mov: CashMovement) => {
    const updated = [mov, ...movements];
    setMovements(updated);
    StorageService.setMovements(updated);
  };

  const handleAddSale = (contract: SaleContract) => {
    const updated = [contract, ...contracts];
    setContracts(updated);
    StorageService.setContracts(updated);
  };

  const handleApprove = (id: string, notes: string) => {
    const updated = approvals.map((a) =>
      a.id === id ? { ...a, status: 'aprobada' as const } : a
    );
    setApprovals(updated);
    StorageService.setApprovals(updated);
  };

  const handleReject = (id: string, reason: string) => {
    const updated = approvals.map((a) =>
      a.id === id ? { ...a, status: 'rechazada' as const } : a
    );
    setApprovals(updated);
    StorageService.setApprovals(updated);
  };

  const handleToggleDevice = (id: string) => {
    const updated: DeviceItem[] = devices.map((d): DeviceItem =>
      d.id === id
        ? { ...d, status: d.status === 'activo' ? ('bloqueado' as const) : ('activo' as const) }
        : d
    );
    setDevices(updated);
    StorageService.setDevices(updated);
  };

  const handleWipeDevice = (id: string) => {
    const updated: DeviceItem[] = devices.map((d): DeviceItem =>
      d.id === id ? { ...d, status: 'bloqueado' as const, pin: 'WIPE REALIZADO' } : d
    );
    setDevices(updated);
    StorageService.setDevices(updated);
    alert(
      language === 'pt'
        ? 'Comando de formatação remota enviado para o dispositivo!'
        : 'Wipe ejecutado'
    );
  };

  const handleExecuteCierreMasivo = () => {
    const updated = units.map((u) => ({ ...u, status: 'Cerrada' as const, progressPercent: 100 }));
    setUnits(updated);
    StorageService.setUnits(updated);
  };

  const handleAddClientFromMobile = (newClient: ClientProfile) => {
    const updated = [newClient, ...clients];
    setClients(updated);
    StorageService.setClients(updated);
  };

  const handleRecordPayment = (
    contractId: string,
    amount: number,
    method: string,
    additional: number
  ) => {
    const foundContract = contracts.find((c) => c.id === contractId || c.saleId === contractId);
    const updatedContracts = contracts.map((c) => {
      if (c.id === contractId || c.saleId === contractId) {
        const newPaid = c.paidInstallments + 1;
        const newBalance = Math.max(0, c.pendingBalance - amount);
        const newStatus: 'Activa' | 'Al día' | 'Liquidada' | 'Mora' =
          newBalance <= 0 ? 'Liquidada' : 'Al día';
        return {
          ...c,
          paidInstallments: newPaid,
          pendingBalance: newBalance,
          additionalCollected: (c.additionalCollected || 0) + additional,
          status: newStatus,
        };
      }
      return c;
    });
    setContracts(updatedContracts);
    StorageService.setContracts(updatedContracts);

    // Also register cash movement in real time
    const newMovement: CashMovement = {
      id: `mov-${Date.now()}`,
      unitId: foundContract?.unitId || 'ugi-15',
      unitName: foundContract?.unitName || '15 - UGI Guarulhos',
      workerName: 'Carlos Oliveira',
      date: new Date().toISOString().split('T')[0],
      type: 'Ingreso',
      category: 'Abono de Cuota',
      description: `Cobrança Mobile - ${foundContract?.clientAlias || 'Cliente'} (${method.toUpperCase()})`,
      comments: `Recebimento mobile registrado via app. Adicional: R$ ${additional.toFixed(2)}`,
      value: amount + additional,
      paymentMethod: method === 'dinheiro' ? 'Efectivo' : 'Transferencia',
      approved: true,
      clientId: foundContract?.clientId,
      clientName: foundContract?.clientName,
      saleId: foundContract?.saleId,
    };
    handleAddMovement(newMovement);
  };

  // If in Mobile App Mode, display the high-fidelity simulator with phone frame or fullscreen
  if (viewMode === 'mobile_app') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col font-sans selection:bg-[#8cc63f] selection:text-slate-900">
        <TryMobileAppSimulator
          clients={clients}
          contracts={contracts}
          devices={devices}
          language={language}
          brandVariant="maiscontrole"
          onBackToWeb={() => handleChangeViewMode('admin')}
          onAddClient={handleAddClientFromMobile}
          onAddMovement={handleAddMovement}
          onRecordPayment={handleRecordPayment}
        />
        <FloatingWhatsApp />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans selection:bg-[#8cc63f] selection:text-slate-900 w-full max-w-full overflow-x-hidden">
      {/* Top TryController Signature Purple Navigation */}
      <TryTopNavigation
        currentTab={currentTab}
        currentSubView={currentSubView}
        onNavigate={handleNavigate}
        language={language}
        onToggleLanguage={setLanguage}
        viewMode={viewMode}
        onChangeViewMode={handleChangeViewMode}
        brandVariant="maiscontrole"
        onToggleBrandVariant={() => {}}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Filter Bar with Business Center, Units & Quick Action Buttons */}
      <TryFilterBar
        selectedCn={selectedCn}
        onSelectCn={setSelectedCn}
        selectedUnit={selectedUnit}
        onSelectUnit={setSelectedUnit}
        viewAllUnits={viewAllUnits}
        onToggleViewAllUnits={() => setViewAllUnits(!viewAllUnits)}
        language={language}
        onOpenNovaVenda={() => setIsNovaVendaOpen(true)}
        onOpenCierreMasivo={() => setIsCierreMasivoOpen(true)}
      />

      {/* Main Content Area - Presentation Web Administrator */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-3 sm:p-6 pb-20 overflow-x-hidden">
        {/* 1. INÍCIO (Cards das Unidades / UGIs com barras de progresso e métricas) */}
        {currentTab === 'inicio' && (
          <TryInicioView
            units={units}
            contracts={contracts}
            clients={clients}
            movements={movements}
            devices={devices}
            language={language}
            onOpenScoreConfig={() => {
              setCurrentTab('administracion');
              setCurrentSubView('admin_score');
            }}
            onNavigateTab={handleNavigate}
          />
        )}

        {/* 2. ESTATÍSTICAS (Dashboard 2x2 com filtros de data e gráficos) */}
        {currentTab === 'estadisticas' && (
          <TryEstadisticasView language={language} />
        )}

        {/* 3. VENDAS (Entradas, Saídas, Extratos, Contratos e Movimentos) */}
        {currentTab === 'ventas' && (
          <TryVentasView
            movements={movements}
            contracts={contracts}
            clients={clients}
            language={language}
            onAddMovement={handleAddMovement}
            onAddSale={handleAddSale}
            subView={currentSubView}
            onNavigateSubView={setCurrentSubView}
          />
        )}

        {/* 4. GERAL (Mapa GPS em Tempo Real, Aprovações com Badges, Faturamento e Seguros) */}
        {currentTab === 'general' && (
          <TryGeneralView
            subView={currentSubView}
            onNavigateSubView={setCurrentSubView}
            approvals={approvals}
            onApprove={handleApprove}
            onReject={handleReject}
            language={language}
          />
        )}

        {/* 5. ADMINISTRAÇÃO (UGIs, Cobradores, Dispositivos com Trava IMEI, Árvore de Sócios, Score 2.0, Empréstimos) */}
        {currentTab === 'administracion' && (
          <>
            {currentSubView === 'mi_perfil' ? (
              <TryPerfilView language={language} />
            ) : (
              <TryAdministracionView
                subView={currentSubView}
                onNavigateSubView={setCurrentSubView}
                units={units}
                devices={devices}
                socioTree={socioTree}
                loans={loans}
                clients={clients}
                language={language}
                onToggleDevice={handleToggleDevice}
                onWipeDevice={handleWipeDevice}
              />
            )}
          </>
        )}

        {/* 6. RELATÓRIOS (Central de 25+ Relatórios com menu lateral e exportação CSV) */}
        {currentTab === 'reportes' && (
          <TryReportesView language={language} />
        )}

        {/* 7. NOVIDADES (Apresentação interativa dos manuais dos updates) */}
        {currentTab === 'novedades' && (
          <TryNovedadesView language={language} />
        )}
      </main>

      {/* Floating WhatsApp Bubble */}
      <FloatingWhatsApp />

      {/* Floating Shortcut to Open Mobile App Simulator */}
      <div className="fixed bottom-6 right-20 z-40">
        <button
          onClick={() => handleChangeViewMode('mobile_app')}
          className="flex items-center space-x-2 bg-[#50007d] hover:bg-[#3b005c] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-[#8cc63f] font-bold text-xs transition transform hover:scale-105 active:scale-95"
          title="Abrir e Testar App Mobile Mais Controle"
        >
          <Smartphone className="w-4 h-4 text-[#8cc63f]" />
          <span className="hidden sm:inline">Testar App Mobile</span>
          <span className="sm:hidden">App</span>
          <span className="bg-[#8cc63f] text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">
            CLIENTE
          </span>
        </button>
      </div>

      {/* Modal: Fechamento Massivo de Caixas */}
      <CierreMasivoModal
        isOpen={isCierreMasivoOpen}
        onClose={() => setIsCierreMasivoOpen(false)}
        onExecuteCierre={handleExecuteCierreMasivo}
      />

      {/* Modal: Nova Venda / Contrato */}
      <NovaVendaModal
        isOpen={isNovaVendaOpen}
        onClose={() => setIsNovaVendaOpen(false)}
        clients={clients}
        onAddSale={handleAddSale}
        language={language}
      />
    </div>
  );
}
