// Storage and Real-time Synchronization Engine for MAIS CONTROLE
import {
  UnitSummaryItem,
  ClientProfile,
  SaleContract,
  CashMovement,
  ApprovalRequestItem,
  SocioTreeNode,
  InterSocietyLoan,
  DeviceItem,
  AuditLogItem,
  Language,
  ViewMode,
} from '../types';
import {
  INITIAL_UNITS,
  INITIAL_CLIENTS,
  INITIAL_CONTRACTS,
  INITIAL_MOVEMENTS,
  INITIAL_APPROVALS,
  INITIAL_SOCIO_TREE,
  INITIAL_LOANS,
  INITIAL_DEVICES,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';

const STORAGE_KEYS = {
  UNITS: 'mc_units_v1',
  CLIENTS: 'mc_clients_v1',
  CONTRACTS: 'mc_contracts_v1',
  MOVEMENTS: 'mc_movements_v1',
  APPROVALS: 'mc_approvals_v1',
  SOCIO_TREE: 'mc_socio_tree_v1',
  LOANS: 'mc_loans_v1',
  DEVICES: 'mc_devices_v1',
  LOGS: 'mc_logs_v1',
  LANGUAGE: 'mc_language_v1',
  BRAND_VARIANT: 'mc_brand_variant_v1',
  LAST_SYNC: 'mc_last_sync_timestamp',
  SYNC_EVENT: 'mc_sync_event_channel',
};

// Safe JSON parser with fallback
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`Failed to parse localStorage key ${key}`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());
  } catch (err) {
    console.warn(`Failed to save to localStorage key ${key}`, err);
  }
}

// Broadcast event to other windows/tabs
export function broadcastSync(source: 'web' | 'app', action: string, details?: any) {
  try {
    const payload = {
      source,
      action,
      details,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.SYNC_EVENT, JSON.stringify(payload));
    // Trigger custom event for same-window listeners
    window.dispatchEvent(new CustomEvent('mc-sync', { detail: payload }));
  } catch (e) {
    console.error('Error broadcasting sync:', e);
  }
}

export const StorageService = {
  getUnits: (): UnitSummaryItem[] => safeGet(STORAGE_KEYS.UNITS, INITIAL_UNITS),
  setUnits: (data: UnitSummaryItem[]) => safeSet(STORAGE_KEYS.UNITS, data),

  getClients: (): ClientProfile[] => safeGet(STORAGE_KEYS.CLIENTS, INITIAL_CLIENTS),
  setClients: (data: ClientProfile[]) => safeSet(STORAGE_KEYS.CLIENTS, data),

  getContracts: (): SaleContract[] => safeGet(STORAGE_KEYS.CONTRACTS, INITIAL_CONTRACTS),
  setContracts: (data: SaleContract[]) => safeSet(STORAGE_KEYS.CONTRACTS, data),

  getMovements: (): CashMovement[] => safeGet(STORAGE_KEYS.MOVEMENTS, INITIAL_MOVEMENTS),
  setMovements: (data: CashMovement[]) => safeSet(STORAGE_KEYS.MOVEMENTS, data),

  getApprovals: (): ApprovalRequestItem[] => safeGet(STORAGE_KEYS.APPROVALS, INITIAL_APPROVALS),
  setApprovals: (data: ApprovalRequestItem[]) => safeSet(STORAGE_KEYS.APPROVALS, data),

  getSocioTree: (): SocioTreeNode[] => safeGet(STORAGE_KEYS.SOCIO_TREE, INITIAL_SOCIO_TREE),
  setSocioTree: (data: SocioTreeNode[]) => safeSet(STORAGE_KEYS.SOCIO_TREE, data),

  getLoans: (): InterSocietyLoan[] => safeGet(STORAGE_KEYS.LOANS, INITIAL_LOANS),
  setLoans: (data: InterSocietyLoan[]) => safeSet(STORAGE_KEYS.LOANS, data),

  getDevices: (): DeviceItem[] => safeGet(STORAGE_KEYS.DEVICES, INITIAL_DEVICES),
  setDevices: (data: DeviceItem[]) => safeSet(STORAGE_KEYS.DEVICES, data),

  getLogs: (): AuditLogItem[] => safeGet(STORAGE_KEYS.LOGS, INITIAL_AUDIT_LOGS),
  setLogs: (data: AuditLogItem[]) => safeSet(STORAGE_KEYS.LOGS, data),

  getLanguage: (): Language => safeGet(STORAGE_KEYS.LANGUAGE, 'pt'),
  setLanguage: (lang: Language) => safeSet(STORAGE_KEYS.LANGUAGE, lang),

  getBrandVariant: (): 'maiscontrole' | 'trycontroller' =>
    safeGet(STORAGE_KEYS.BRAND_VARIANT, 'maiscontrole'),
  setBrandVariant: (variant: 'maiscontrole' | 'trycontroller') =>
    safeSet(STORAGE_KEYS.BRAND_VARIANT, variant),

  getLastSync: (): number => {
    const ts = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    return ts ? parseInt(ts, 10) : Date.now();
  },

  resetAllToDefault: () => {
    localStorage.removeItem(STORAGE_KEYS.UNITS);
    localStorage.removeItem(STORAGE_KEYS.CLIENTS);
    localStorage.removeItem(STORAGE_KEYS.CONTRACTS);
    localStorage.removeItem(STORAGE_KEYS.MOVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.APPROVALS);
    localStorage.removeItem(STORAGE_KEYS.SOCIO_TREE);
    localStorage.removeItem(STORAGE_KEYS.LOANS);
    localStorage.removeItem(STORAGE_KEYS.DEVICES);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, Date.now().toString());
    broadcastSync('web', 'reset_defaults');
  },
};
