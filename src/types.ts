export type Language = 'pt' | 'es';

export type ViewMode = 'admin' | 'mobile_app' | 'login';

export type MainNavTab = 
  | 'inicio'
  | 'estadisticas'
  | 'ventas'
  | 'general'
  | 'administracion'
  | 'reportes'
  | 'novedades';

export type SubViewSection =
  | 'inicio_unidades'
  | 'estadisticas_dashboard'
  // Ventas
  | 'ventas_ingresos'
  | 'ventas_gastos'
  | 'ventas_lista'
  | 'ventas_caja_abrir_cerrar'
  | 'ventas_resumen_caja'
  | 'ventas_crear_llave'
  | 'ventas_limpieza_cobro'
  | 'ventas_resumen_periodo'
  | 'ventas_apertura_masiva'
  | 'ventas_transferencia_masiva'
  // General
  | 'general_mapa'
  | 'general_facturacion'
  | 'general_aprobaciones'
  | 'general_seguros'
  // Administracion
  | 'admin_unidades'
  | 'admin_trabajadores'
  | 'admin_tipos_movimientos'
  | 'admin_dispositivos'
  | 'admin_liquidacion'
  | 'admin_usuarios'
  | 'admin_clientes'
  | 'admin_arbol_socios'
  | 'admin_score'
  | 'admin_prestamos_sociedades'
  // Reportes
  | 'reportes_central'
  // Novedades
  | 'novedades_slides'
  // Perfil
  | 'mi_perfil';

export interface UnitSummaryItem {
  id: string;
  name: string;
  code: string;
  cnCode: string;
  cnName: string;
  location: string;
  country: string;
  status: 'Abierta' | 'Cerrada';
  cashRegisterNumber: number;
  cashDate: string;
  initialCash: number;
  finalCash: number;
  progressPercent: number;
  lastSync: string;
  pin: string;
  appVersion: string;
  score: 'A' | 'B' | 'C' | 'D' | 'N';
  collectorName: string;
  totalRecaudado?: number;
  clientesVisitados?: number;
  metaCobro?: number;
}

export interface ClientProfile {
  id: string;
  alias: string;
  fullName: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  phone2?: string;
  address: string;
  neighborhood: string;
  city: string;
  country: string;
  economicActivity: string;
  score: 'A' | 'B' | 'C' | 'D' | 'R';
  scoreDetails?: string;
  status: 'Activo' | 'Inactivo';
  activeSalesCount: number;
  totalDebt: number;
  lastPaymentDate: string;
  overdueDays: number;
  firstInstallmentDate?: string;
  collectionDay?: string;
  references: {
    name: string;
    phone: string;
    relationship: string;
    address: string;
  }[];
  photos: string[];
}

export interface SaleContract {
  id: string;
  saleId: string;
  clientId: string;
  clientName: string;
  clientAlias: string;
  clientPhone?: string;
  unitId: string;
  unitName: string;
  saleDate: string;
  amount: number;
  interestRate: number;
  finalAmount: number;
  installmentsCount: number;
  paidInstallments: number;
  installmentValue: number;
  frequency: 'Diario' | 'Semanal Interés' | 'Semanal Cuota Fija' | 'Quincenal' | 'Mensual';
  collectionDay: string;
  firstPaymentDate: string;
  status: 'Activa' | 'Al día' | 'Mora' | 'Liquidada';
  pendingBalance: number;
  additionalCollected: number;
  extraCollected: number;
  paymentTypeLast?: 'Efectivo' | 'Transacción Electrónica' | 'Pago Mixto';
}

export interface CashMovement {
  id: string;
  unitId: string;
  unitName: string;
  workerName: string;
  type: 'Ingreso' | 'Gasto' | 'Retiro' | 'Venta' | 'Cobro' | 'Transferencia';
  category: string;
  value: number;
  paymentMethod: 'Efectivo' | 'Transferencia' | 'Mixto';
  saleId?: string;
  clientId?: string;
  clientName?: string;
  date: string;
  description: string;
  comments: string;
  receiptPhoto?: string;
  approved: boolean;
  isPreExpense?: boolean;
}

export interface ApprovalRequestItem {
  id: string;
  module: 'transferencias' | 'preventas' | 'pregastos' | 'llaves';
  date: string;
  boxId: string;
  unitName: string;
  businessCenter: string;
  clientId?: string;
  clientName?: string;
  movementType: string;
  description: string;
  value: number;
  installments?: number;
  requestedBy: string;
  status: 'pendiente' | 'aprobada' | 'rechazada';
  justification?: string;
}

export interface SocioTreeNode {
  id: string;
  alias: string;
  fullName: string;
  country: string;
  businessCenter: string;
  participationPercent: number;
  associatedUnitsCount: number;
  units: string[];
  subNodes?: SocioTreeNode[];
}

export interface InterSocietyLoan {
  id: string;
  loanNumber: string;
  originCn: string;
  originBox: string;
  destinationCn: string;
  destinationBox: string;
  country: string;
  currency: string;
  trm: number;
  amount: number;
  interestRate: number;
  installmentsCount: number;
  gracePeriodDate: string;
  cutoffDay: number;
  creationDate: string;
  status: 'Pendiente' | 'Aprobado' | 'Liquidado';
  pendingBalance: number;
  notes: string;
}

export interface DeviceItem {
  id: string;
  agentName: string;
  unit: string;
  imei: string;
  model: string;
  status: 'activo' | 'bloqueado';
  pin: string;
  appVersion: string;
  lastSync: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userName: string;
  role: string;
  module: string;
  action: string;
  previousValue: string;
  newValue: string;
  ip: string;
  imei: string;
  hash: string;
  severity: 'info' | 'warning' | 'critical';
}
