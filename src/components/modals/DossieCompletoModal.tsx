import React, { useState, useMemo } from 'react';
import {
  Users,
  Smartphone,
  Building2,
  DollarSign,
  Award,
  CheckCircle2,
  Clock,
  Battery,
  Wifi,
  ShieldCheck,
  AlertCircle,
  Search,
  Filter,
  BarChart3,
  FileText,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  MapPin,
  Eye,
  Calendar,
  Play,
  Zap,
  X,
  Send,
  Lock,
  Unlock,
  Check,
  AlertTriangle,
  Printer,
  Download,
  Phone,
  MessageSquare,
  FileSpreadsheet,
  Layers,
  TrendingUp,
  Receipt,
  UserX,
  UserCheck,
  ArrowDownRight,
  ArrowUpRight,
  Wallet,
  ShoppingBag,
  TrendingDown,
  Calculator,
  Box,
  Percent
} from 'lucide-react';
import { EmployeePerformanceData } from '../DesempenhoFuncionarioSection';
import { TryResumoPeriodoView } from '../../views/TryResumoPeriodoView';

export interface VendaContrato {
  id: string;
  cliente: string;
  documento: string;
  endereco: string;
  valorTotal: number;
  valorParcela: number;
  parcelasPagas: number;
  parcelasTotal: number;
  saldoDevedor: number;
  vencimento: string;
  status: 'ativo' | 'em_dia' | 'atencao' | 'liquidado';
}

export interface PagamentoItem {
  recibo: string;
  hora: string;
  cliente: string;
  valor: number;
  metodo: 'Efectivo' | 'Pix';
  parcela: string;
  saldoRestante: number;
  statusBaixa: 'Confirmada' | 'Conciliada' | 'Em Análise';
}

export interface SemPagamentoItem {
  id: string;
  cliente: string;
  endereco: string;
  hora: string;
  motivo: string;
  observacao: string;
  gpsValidado: boolean;
  reagendamento: string;
}

export interface ClientePendenteItem {
  ordem: number;
  cliente: string;
  endereco: string;
  bairro: string;
  telefone: string;
  parcelaPrevista: number;
  saldoDevedor: number;
  status: 'Proximo' | 'Pendente' | 'Revisita';
}

export interface DespesaRotaItem {
  id: string;
  hora: string;
  categoria: 'Combustível' | 'Alimentação' | 'Manutenção' | 'Pedágio' | 'Outros';
  descricao: string;
  valor: number;
  comprovante: string;
  status: 'Aprovado' | 'Pendente';
}

export interface RenovacaoItem {
  id: string;
  cliente: string;
  creditoAnterior: number;
  novoCredito: number;
  saldoAnteriorAbatido: number;
  valorLiquidoEntregue: number;
  parcelas: number;
  taxa: number;
  scoreCliente: number;
}

export interface FechamentoCaixaData {
  saldoInicial: number;
  dinheiroEspecie: number;
  pixRecebido: number;
  novasVendasDinheiro: number;
  despesasRota: number;
  sangrias: number;
  saldoFinalFisico: number;
  diferenca: number;
}

export interface TelemetriaPontoItem {
  hora: string;
  ponto: string;
  coordenadas: string;
  velocidade: string;
  bateria: number;
  tempoParadaMin: number;
  emPerimetro: boolean;
}

export interface DossieCompletoData {
  vendas: VendaContrato[];
  pagamentos: PagamentoItem[];
  semPagamentos: SemPagamentoItem[];
  clientesPendentes: ClientePendenteItem[];
  despesas: DespesaRotaItem[];
  renovacoes: RenovacaoItem[];
  fechamentoCaixa: FechamentoCaixaData;
  auditoriaGps: TelemetriaPontoItem[];
  unidadeDetalhe: {
    supervisor: string;
    telefoneBase: string;
    enderecoBase: string;
    aberturaLote: string;
    metaGlobal: number;
    cobradoresAtivos: number;
  };
}

// Complete mock dataset for employees
const DOSSIE_MOCK_REGISTRY: Record<string, DossieCompletoData> = {
  'emp-carlos': {
    unidadeDetalhe: {
      supervisor: 'Marcos Vinicius (Gerente Operacional Regional)',
      telefoneBase: '(11) 3322-8800',
      enderecoBase: 'Rua Monsenhor Andrade, 820 - Brás, São Paulo - SP',
      aberturaLote: '15/10/2026 às 06:45:12',
      metaGlobal: 85000.0,
      cobradoresAtivos: 6,
    },
    vendas: [
      {
        id: 'VEN-1052824',
        cliente: 'Elias Silveira Santos',
        documento: '973.781.848-20',
        endereco: 'Rua do Gasômetro, 310 - Brás',
        valorTotal: 18000.0,
        valorParcela: 600.0,
        parcelasPagas: 24,
        parcelasTotal: 30,
        saldoDevedor: 3600.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-1005654',
        cliente: 'Carmela Sánchez Hernández',
        documento: '839.201.948-21',
        endereco: 'Av. Rangel Pestana, 1200 - Brás',
        valorTotal: 7200.0,
        valorParcela: 360.0,
        parcelasPagas: 12,
        parcelasTotal: 20,
        saldoDevedor: 2880.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-1089201',
        cliente: 'Mercado Bom Preço Mooca Ltda',
        documento: '12.839.401/0001-44',
        endereco: 'Rua da Mooca, 1850 - Mooca',
        valorTotal: 24000.0,
        valorParcela: 1200.0,
        parcelasPagas: 18,
        parcelasTotal: 24,
        saldoDevedor: 6000.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-1094022',
        cliente: 'Auto Peças Rangel ME',
        documento: '34.920.194/0001-12',
        endereco: 'Av. Celso Garcia, 840 - Belém',
        valorTotal: 17000.0,
        valorParcela: 850.0,
        parcelasPagas: 14,
        parcelasTotal: 20,
        saldoDevedor: 5100.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-1049281',
        cliente: 'Panificadora do Belém Ltda',
        documento: '09.382.716/0001-89',
        endereco: 'Rua Belém, 420 - Belém',
        valorTotal: 9000.0,
        valorParcela: 450.0,
        parcelasPagas: 16,
        parcelasTotal: 20,
        saldoDevedor: 1800.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-1038291',
        cliente: 'Restaurante Sabor Mineiro',
        documento: '58.291.847/0001-50',
        endereco: 'Largo da Concórdia, 44 - Brás',
        valorTotal: 15000.0,
        valorParcela: 750.0,
        parcelasPagas: 17,
        parcelasTotal: 20,
        saldoDevedor: 2250.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-1029184',
        cliente: 'Floricultura & Presentes Sakura',
        documento: '281.938.471-02',
        endereco: 'Rua Oriente, 580 - Brás',
        valorTotal: 6000.0,
        valorParcela: 300.0,
        parcelasPagas: 15,
        parcelasTotal: 20,
        saldoDevedor: 1500.0,
        vencimento: '15/10/2026',
        status: 'atencao',
      },
    ],
    pagamentos: [
      {
        recibo: 'REC-2026-9481',
        hora: '14:10',
        cliente: 'Carmela Sánchez Hernández',
        valor: 360.0,
        metodo: 'Efectivo',
        parcela: '12 / 20',
        saldoRestante: 2880.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-9480',
        hora: '13:45',
        cliente: 'Mercado Bom Preço Mooca Ltda',
        valor: 1200.0,
        metodo: 'Pix',
        parcela: '18 / 24',
        saldoRestante: 6000.0,
        statusBaixa: 'Conciliada',
      },
      {
        recibo: 'REC-2026-9479',
        hora: '12:20',
        cliente: 'Auto Peças Rangel ME',
        valor: 850.0,
        metodo: 'Efectivo',
        parcela: '14 / 20',
        saldoRestante: 5100.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-9478',
        hora: '11:15',
        cliente: 'Panificadora do Belém Ltda',
        valor: 450.0,
        metodo: 'Efectivo',
        parcela: '16 / 20',
        saldoRestante: 1800.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-9477',
        hora: '10:30',
        cliente: 'Restaurante Sabor Mineiro',
        valor: 750.0,
        metodo: 'Pix',
        parcela: '17 / 20',
        saldoRestante: 2250.0,
        statusBaixa: 'Conciliada',
      },
      {
        recibo: 'REC-2026-9476',
        hora: '09:40',
        cliente: 'Elias Silveira Santos',
        valor: 600.0,
        metodo: 'Efectivo',
        parcela: '24 / 30',
        saldoRestante: 3600.0,
        statusBaixa: 'Confirmada',
      },
    ],
    semPagamentos: [
      {
        id: 'NPG-001',
        cliente: 'Floricultura & Presentes Sakura',
        endereco: 'Rua Oriente, 580 - Brás',
        hora: '11:45',
        motivo: 'Comércio fechado temporariamente para almoço',
        observacao: 'Proprietária solicitou retorno às 16:30 para acerto em dinheiro.',
        gpsValidado: true,
        reagendamento: 'Hoje - 16:30',
      },
      {
        id: 'NPG-002',
        cliente: 'Marcos Vinicius Serralheria',
        endereco: 'Rua Bresser, 910 - Mooca',
        hora: '13:00',
        motivo: 'Aguardando compensação de recebível próprio',
        observacao: 'Fez promessa de pagamento via Pix até às 18:00.',
        gpsValidado: true,
        reagendamento: 'Hoje - 18:00 (Pix)',
      },
    ],
    clientesPendentes: [
      {
        ordem: 1,
        cliente: 'Floricultura & Presentes Sakura (Revisita)',
        endereco: 'Rua Oriente, 580',
        bairro: 'Brás',
        telefone: '(11) 98765-1122',
        parcelaPrevista: 300.0,
        saldoDevedor: 1500.0,
        status: 'Proximo',
      },
      {
        ordem: 2,
        cliente: 'Confecções Silva & Filhos',
        endereco: 'Rua Maria Marcolina, 740',
        bairro: 'Brás',
        telefone: '(11) 97654-2233',
        parcelaPrevista: 550.0,
        saldoDevedor: 2200.0,
        status: 'Pendente',
      },
      {
        ordem: 3,
        cliente: 'Lanchonete Central do Brás',
        endereco: 'Rua Miller, 120',
        bairro: 'Brás',
        telefone: '(11) 96543-3344',
        parcelaPrevista: 400.0,
        saldoDevedor: 1200.0,
        status: 'Pendente',
      },
    ],
    despesas: [
      {
        id: 'DSP-8401',
        hora: '08:15',
        categoria: 'Combustível',
        descricao: 'Abastecimento Moto Honda Bros (Posto Ipiranga Rangel)',
        valor: 75.0,
        comprovante: 'NF-e 883921',
        status: 'Aprovado',
      },
      {
        id: 'DSP-8402',
        hora: '12:05',
        categoria: 'Alimentação',
        descricao: 'Almoço em Rota (Restaurante Popular Mooca)',
        valor: 35.0,
        comprovante: 'Cupom SAT 091823',
        status: 'Aprovado',
      },
      {
        id: 'DSP-8403',
        hora: '14:30',
        categoria: 'Manutenção',
        descricao: 'Reparo de pneu furado na borracharia Celso Garcia',
        valor: 40.0,
        comprovante: 'Recibo Avulso 102',
        status: 'Aprovado',
      },
    ],
    renovacoes: [
      {
        id: 'REN-401',
        cliente: 'Elias Silveira Santos',
        creditoAnterior: 18000.0,
        novoCredito: 22000.0,
        saldoAnteriorAbatido: 3600.0,
        valorLiquidoEntregue: 18400.0,
        parcelas: 30,
        taxa: 1.15,
        scoreCliente: 96,
      },
      {
        id: 'REN-402',
        cliente: 'Panificadora do Belém Ltda',
        creditoAnterior: 9000.0,
        novoCredito: 12000.0,
        saldoAnteriorAbatido: 1800.0,
        valorLiquidoEntregue: 10200.0,
        parcelas: 24,
        taxa: 1.15,
        scoreCliente: 92,
      },
    ],
    fechamentoCaixa: {
      saldoInicial: 1500.0,
      dinheiroEspecie: 21800.0,
      pixRecebido: 12400.0,
      novasVendasDinheiro: 6000.0,
      despesasRota: 150.0,
      sangrias: 2300.0,
      saldoFinalFisico: 14850.0,
      diferenca: 0.0,
    },
    auditoriaGps: [
      {
        hora: '07:30',
        ponto: 'Base UGI São Paulo (Check-in & Retirada de Caixa)',
        coordenadas: '-23.5432, -46.6190',
        velocidade: '0 km/h',
        bateria: 100,
        tempoParadaMin: 20,
        emPerimetro: true,
      },
      {
        hora: '08:45',
        ponto: 'Rua do Gasômetro, 310 (Elias Silveira Santos)',
        coordenadas: '-23.5461, -46.6215',
        velocidade: '0 km/h',
        bateria: 97,
        tempoParadaMin: 12,
        emPerimetro: true,
      },
      {
        hora: '10:30',
        ponto: 'Largo da Concórdia, 44 (Sabor Mineiro)',
        coordenadas: '-23.5448, -46.6152',
        velocidade: '0 km/h',
        bateria: 94,
        tempoParadaMin: 15,
        emPerimetro: true,
      },
      {
        hora: '12:20',
        ponto: 'Av. Celso Garcia, 840 (Auto Peças Rangel)',
        coordenadas: '-23.5398, -46.5982',
        velocidade: '0 km/h',
        bateria: 93,
        tempoParadaMin: 18,
        emPerimetro: true,
      },
      {
        hora: '14:10',
        ponto: 'Av. Rangel Pestana, 1200 (Carmela Sánchez)',
        coordenadas: '-23.5489, -46.6388',
        velocidade: '0 km/h',
        bateria: 92,
        tempoParadaMin: 14,
        emPerimetro: true,
      },
    ],
  },
  'emp-roberto': {
    unidadeDetalhe: {
      supervisor: 'Juliana Duarte (Coordenadora de Cobrança Leste)',
      telefoneBase: '(11) 2091-4400',
      enderecoBase: 'Av. Celso Garcia, 2100 - Tatuapé, São Paulo - SP',
      aberturaLote: '15/10/2026 às 07:05:00',
      metaGlobal: 68000.0,
      cobradoresAtivos: 5,
    },
    vendas: [
      {
        id: 'VEN-2018491',
        cliente: 'William Abella Souza',
        documento: '392.019.482-71',
        endereco: 'Rua Tuiuti, 1420 - Tatuapé',
        valorTotal: 12000.0,
        valorParcela: 600.0,
        parcelasPagas: 19,
        parcelasTotal: 20,
        saldoDevedor: 600.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-2039102',
        cliente: 'Lanchonete Penha Central ME',
        documento: '21.092.837/0001-30',
        endereco: 'Av. Penha de França, 380 - Penha',
        valorTotal: 13000.0,
        valorParcela: 650.0,
        parcelasPagas: 12,
        parcelasTotal: 20,
        saldoDevedor: 5200.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-2048190',
        cliente: 'Drogaria Itaquera Popular Ltda',
        documento: '44.920.183/0001-92',
        endereco: 'Rua Dr. Aureliano Barreiros, 150 - Itaquera',
        valorTotal: 18400.0,
        valorParcela: 920.0,
        parcelasPagas: 10,
        parcelasTotal: 20,
        saldoDevedor: 9200.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
    ],
    pagamentos: [
      {
        recibo: 'REC-2026-8812',
        hora: '15:45',
        cliente: 'William Abella Souza',
        valor: 180.0,
        metodo: 'Pix',
        parcela: '19 / 20',
        saldoRestante: 600.0,
        statusBaixa: 'Conciliada',
      },
      {
        recibo: 'REC-2026-8811',
        hora: '14:50',
        cliente: 'Lanchonete Penha Central ME',
        valor: 650.0,
        metodo: 'Efectivo',
        parcela: '12 / 20',
        saldoRestante: 5200.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-8810',
        hora: '13:30',
        cliente: 'Drogaria Itaquera Popular Ltda',
        valor: 920.0,
        metodo: 'Pix',
        parcela: '10 / 20',
        saldoRestante: 9200.0,
        statusBaixa: 'Conciliada',
      },
    ],
    semPagamentos: [
      {
        id: 'NPG-201',
        cliente: 'Sapataria Estrela da Penha',
        endereco: 'Rua Padre João, 202 - Penha',
        hora: '11:10',
        motivo: 'Titular em consulta médica',
        observacao: 'Esposa informou que ele retornará amanhã cedo.',
        gpsValidado: true,
        reagendamento: 'Amanhã - 09:00',
      },
    ],
    clientesPendentes: [
      {
        ordem: 1,
        cliente: 'Oficina Mecânica São Jorge',
        endereco: 'Rua Melo Freire, 800',
        bairro: 'Tatuapé',
        telefone: '(11) 98822-7711',
        parcelaPrevista: 700.0,
        saldoDevedor: 3500.0,
        status: 'Proximo',
      },
      {
        ordem: 2,
        cliente: 'Boutique Donna Tatuapé',
        endereco: 'Rua Itapura, 920',
        bairro: 'Tatuapé',
        telefone: '(11) 97711-4455',
        parcelaPrevista: 850.0,
        saldoDevedor: 4250.0,
        status: 'Pendente',
      },
    ],
    despesas: [
      {
        id: 'DSP-7901',
        hora: '08:30',
        categoria: 'Combustível',
        descricao: 'Abastecimento Moto Yamaha Fazer (Posto Shell Radial)',
        valor: 65.0,
        comprovante: 'NF-e 449102',
        status: 'Aprovado',
      },
      {
        id: 'DSP-7902',
        hora: '12:15',
        categoria: 'Alimentação',
        descricao: 'Almoço Tatuapé Refeições',
        valor: 32.0,
        comprovante: 'SAT 881923',
        status: 'Aprovado',
      },
    ],
    renovacoes: [
      {
        id: 'REN-201',
        cliente: 'Drogaria Itaquera Popular Ltda',
        creditoAnterior: 18400.0,
        novoCredito: 25000.0,
        saldoAnteriorAbatido: 4600.0,
        valorLiquidoEntregue: 20400.0,
        parcelas: 24,
        taxa: 1.15,
        scoreCliente: 94,
      },
    ],
    fechamentoCaixa: {
      saldoInicial: 1200.0,
      dinheiroEspecie: 14380.0,
      pixRecebido: 9800.0,
      novasVendasDinheiro: 4000.0,
      despesasRota: 97.0,
      sangrias: 253.0,
      saldoFinalFisico: 11230.0,
      diferenca: 0.0,
    },
    auditoriaGps: [
      {
        hora: '07:45',
        ponto: 'Base UGI Zona Leste (Tatuapé)',
        coordenadas: '-23.5380, -46.5740',
        velocidade: '0 km/h',
        bateria: 100,
        tempoParadaMin: 15,
        emPerimetro: true,
      },
      {
        hora: '10:20',
        ponto: 'Av. Penha de França, 380',
        coordenadas: '-23.5250, -46.5490',
        velocidade: '0 km/h',
        bateria: 89,
        tempoParadaMin: 18,
        emPerimetro: true,
      },
      {
        hora: '13:30',
        ponto: 'Rua Dr. Aureliano Barreiros, 150 (Itaquera)',
        coordenadas: '-23.5410, -46.4520',
        velocidade: '0 km/h',
        bateria: 82,
        tempoParadaMin: 22,
        emPerimetro: true,
      },
      {
        hora: '15:45',
        ponto: 'Rua Tuiuti, 1420 (Tatuapé)',
        coordenadas: '-23.5412, -46.5765',
        velocidade: '0 km/h',
        bateria: 78,
        tempoParadaMin: 16,
        emPerimetro: true,
      },
    ],
  },
  'emp-fernanda': {
    unidadeDetalhe: {
      supervisor: 'Renato Siqueira (Gerente Regional Campinas)',
      telefoneBase: '(19) 3234-9900',
      enderecoBase: 'Av. Francisco Glicério, 1420 - Centro, Campinas - SP',
      aberturaLote: '15/10/2026 às 06:40:00',
      metaGlobal: 72000.0,
      cobradoresAtivos: 6,
    },
    vendas: [
      {
        id: 'VEN-3019284',
        cliente: 'Ótica Estilo Cambuí Ltda',
        documento: '28.192.837/0001-44',
        endereco: 'Rua Coronel Quirino, 880 - Cambuí',
        valorTotal: 15600.0,
        valorParcela: 780.0,
        parcelasPagas: 18,
        parcelasTotal: 20,
        saldoDevedor: 1560.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-3028192',
        cliente: 'Padaria Campineira Taquaral',
        documento: '19.482.716/0001-82',
        endereco: 'Av. Barão de Itapura, 2100 - Taquaral',
        valorTotal: 10800.0,
        valorParcela: 540.0,
        parcelasPagas: 15,
        parcelasTotal: 20,
        saldoDevedor: 2700.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-3039182',
        cliente: 'Boutique Moderna Ltda',
        documento: '33.829.184/0001-50',
        endereco: 'Rua Conceição, 410 - Centro',
        valorTotal: 22000.0,
        valorParcela: 1100.0,
        parcelasPagas: 19,
        parcelasTotal: 20,
        saldoDevedor: 1100.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
    ],
    pagamentos: [
      {
        recibo: 'REC-2026-7714',
        hora: '15:10',
        cliente: 'Ótica Estilo Cambuí Ltda',
        valor: 780.0,
        metodo: 'Pix',
        parcela: '18 / 20',
        saldoRestante: 1560.0,
        statusBaixa: 'Conciliada',
      },
      {
        recibo: 'REC-2026-7713',
        hora: '14:20',
        cliente: 'Padaria Campineira Taquaral',
        valor: 540.0,
        metodo: 'Efectivo',
        parcela: '15 / 20',
        saldoRestante: 2700.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-7712',
        hora: '13:05',
        cliente: 'Boutique Moderna Ltda',
        valor: 1100.0,
        metodo: 'Pix',
        parcela: '19 / 20',
        saldoRestante: 1100.0,
        statusBaixa: 'Conciliada',
      },
    ],
    semPagamentos: [
      {
        id: 'NPG-301',
        cliente: 'Cafeteria do Centro Campinas',
        endereco: 'Rua Barão de Jaguara, 712 - Centro',
        hora: '11:40',
        motivo: 'Aguardando fechamento do caixa do almoço',
        observacao: 'Fez PIX direto às 12:30 após abertura bancária.',
        gpsValidado: true,
        reagendamento: 'Liquidado via Pix',
      },
    ],
    clientesPendentes: [
      {
        ordem: 1,
        cliente: 'Studio de Beleza Cambuí',
        endereco: 'Rua Maria Monteiro, 510',
        bairro: 'Cambuí',
        telefone: '(19) 99881-2233',
        parcelaPrevista: 660.0,
        saldoDevedor: 1980.0,
        status: 'Proximo',
      },
    ],
    despesas: [
      {
        id: 'DSP-6801',
        hora: '08:00',
        categoria: 'Combustível',
        descricao: 'Abastecimento Viatura Operacional (Posto Shell Barão)',
        valor: 70.0,
        comprovante: 'NF-e 881920',
        status: 'Aprovado',
      },
    ],
    renovacoes: [
      {
        id: 'REN-301',
        cliente: 'Boutique Moderna Ltda',
        creditoAnterior: 22000.0,
        novoCredito: 28000.0,
        saldoAnteriorAbatido: 1100.0,
        valorLiquidoEntregue: 26900.0,
        parcelas: 24,
        taxa: 1.14,
        scoreCliente: 99,
      },
    ],
    fechamentoCaixa: {
      saldoInicial: 1000.0,
      dinheiroEspecie: 10140.0,
      pixRecebido: 11200.0,
      novasVendasDinheiro: 1200.0,
      despesasRota: 70.0,
      sangrias: 0.0,
      saldoFinalFisico: 9870.0,
      diferenca: 0.0,
    },
    auditoriaGps: [
      {
        hora: '07:15',
        ponto: 'Base UGI Campinas (Centro)',
        coordenadas: '-22.9056, -47.0608',
        velocidade: '0 km/h',
        bateria: 100,
        tempoParadaMin: 20,
        emPerimetro: true,
      },
      {
        hora: '13:05',
        ponto: 'Rua Conceição, 410 (Boutique Moderna)',
        coordenadas: '-22.9030, -47.0580',
        velocidade: '0 km/h',
        bateria: 92,
        tempoParadaMin: 15,
        emPerimetro: true,
      },
      {
        hora: '14:20',
        ponto: 'Av. Barão de Itapura, 2100 (Taquaral)',
        coordenadas: '-22.8870, -47.0510',
        velocidade: '0 km/h',
        bateria: 90,
        tempoParadaMin: 18,
        emPerimetro: true,
      },
      {
        hora: '15:10',
        ponto: 'Rua Coronel Quirino, 880 (Cambuí)',
        coordenadas: '-22.8980, -47.0490',
        velocidade: '0 km/h',
        bateria: 88,
        tempoParadaMin: 14,
        emPerimetro: true,
      },
    ],
  },
  'emp-marcos': {
    unidadeDetalhe: {
      supervisor: 'Carlos Eduardo (Supervisor Regional Oeste)',
      telefoneBase: '(11) 3140-5500',
      enderecoBase: 'Rua da Consolação, 2400 - Consolação, São Paulo - SP',
      aberturaLote: '15/10/2026 às 07:20:00',
      metaGlobal: 55000.0,
      cobradoresAtivos: 4,
    },
    vendas: [
      {
        id: 'VEN-4018291',
        cliente: 'Maria Pastelaria & Caldo de Cana',
        documento: '49.182.716/0001-92',
        endereco: 'Rua Augusta, 1420 - Consolação',
        valorTotal: 13200.0,
        valorParcela: 660.0,
        parcelasPagas: 14,
        parcelasTotal: 20,
        saldoDevedor: 3960.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-4029184',
        cliente: 'Papelaria & Bazar Augusta ME',
        documento: '18.291.847/0001-30',
        endereco: 'Rua Augusta, 850 - Consolação',
        valorTotal: 7600.0,
        valorParcela: 380.0,
        parcelasPagas: 11,
        parcelasTotal: 20,
        saldoDevedor: 3420.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
    ],
    pagamentos: [
      {
        recibo: 'REC-2026-6612',
        hora: '12:45',
        cliente: 'Maria Pastelaria & Caldo de Cana',
        valor: 660.0,
        metodo: 'Efectivo',
        parcela: '14 / 20',
        saldoRestante: 3960.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-6611',
        hora: '11:50',
        cliente: 'Papelaria & Bazar Augusta ME',
        valor: 380.0,
        metodo: 'Pix',
        parcela: '11 / 20',
        saldoRestante: 3420.0,
        statusBaixa: 'Conciliada',
      },
    ],
    semPagamentos: [
      {
        id: 'NPG-401',
        cliente: 'Sebo & Livraria dos Jardins',
        endereco: 'Rua Oscar Freire, 110 - Jardins',
        hora: '10:40',
        motivo: 'Atraso na abertura matinal da loja',
        observacao: 'Gerente combinou de receber às 16:00.',
        gpsValidado: true,
        reagendamento: 'Hoje - 16:00',
      },
    ],
    clientesPendentes: [
      {
        ordem: 1,
        cliente: 'Sebo & Livraria dos Jardins (Revisita)',
        endereco: 'Rua Oscar Freire, 110',
        bairro: 'Jardins',
        telefone: '(11) 98112-9988',
        parcelaPrevista: 450.0,
        saldoDevedor: 2250.0,
        status: 'Proximo',
      },
      {
        ordem: 2,
        cliente: 'Restaurante Vegano Augusta',
        endereco: 'Rua Bela Cintra, 712',
        bairro: 'Consolação',
        telefone: '(11) 97223-1122',
        parcelaPrevista: 600.0,
        saldoDevedor: 3000.0,
        status: 'Pendente',
      },
    ],
    despesas: [
      {
        id: 'DSP-5501',
        hora: '08:30',
        categoria: 'Combustível',
        descricao: 'Abastecimento Moto Honda CG (Posto Ipiranga Augusta)',
        valor: 55.0,
        comprovante: 'NF-e 392817',
        status: 'Aprovado',
      },
      {
        id: 'DSP-5502',
        hora: '12:00',
        categoria: 'Alimentação',
        descricao: 'Almoço em Rota (Restaurante Augusta)',
        valor: 30.0,
        comprovante: 'SAT 491823',
        status: 'Aprovado',
      },
    ],
    renovacoes: [],
    fechamentoCaixa: {
      saldoInicial: 1000.0,
      dinheiroEspecie: 9360.0,
      pixRecebido: 5400.0,
      novasVendasDinheiro: 1355.0,
      despesasRota: 85.0,
      sangrias: 0.0,
      saldoFinalFisico: 8920.0,
      diferenca: 0.0,
    },
    auditoriaGps: [
      {
        hora: '08:00',
        ponto: 'Base UGI Centro Expandido (Consolação)',
        coordenadas: '-23.5550, -46.6620',
        velocidade: '0 km/h',
        bateria: 100,
        tempoParadaMin: 15,
        emPerimetro: true,
      },
      {
        hora: '11:50',
        ponto: 'Rua Augusta, 850 (Papelaria Augusta)',
        coordenadas: '-23.5510, -46.6540',
        velocidade: '0 km/h',
        bateria: 75,
        tempoParadaMin: 12,
        emPerimetro: true,
      },
      {
        hora: '12:45',
        ponto: 'Rua Augusta, 1420 (Maria Pastelaria)',
        coordenadas: '-23.5580, -46.6610',
        velocidade: '0 km/h',
        bateria: 68,
        tempoParadaMin: 20,
        emPerimetro: true,
      },
    ],
  },
  'emp-lucas': {
    unidadeDetalhe: {
      supervisor: 'Thiago Nogueira (Supervisor Baixada Fluminense)',
      telefoneBase: '(21) 2671-8800',
      enderecoBase: 'Av. Brigadeiro Lima e Silva, 1100 - Centro, Duque de Caxias - RJ',
      aberturaLote: '15/10/2026 às 07:30:00',
      metaGlobal: 62000.0,
      cobradoresAtivos: 4,
    },
    vendas: [
      {
        id: 'VEN-5018291',
        cliente: 'Mercearia Central Baixada ME',
        documento: '58.291.847/0001-10',
        endereco: 'Rua Dr. Plínio Casado, 420 - Duque de Caxias',
        valorTotal: 9000.0,
        valorParcela: 450.0,
        parcelasPagas: 8,
        parcelasTotal: 20,
        saldoDevedor: 5400.0,
        vencimento: '15/10/2026',
        status: 'em_dia',
      },
      {
        id: 'VEN-5029184',
        cliente: 'Borracharia & Pneus Caxias',
        documento: '39.182.746/0001-84',
        endereco: 'Av. Governador Leonel de Moura Brizola, 1850',
        valorTotal: 17800.0,
        valorParcela: 890.0,
        parcelasPagas: 9,
        parcelasTotal: 20,
        saldoDevedor: 9790.0,
        vencimento: '15/10/2026',
        status: 'atencao',
      },
    ],
    pagamentos: [
      {
        recibo: 'REC-2026-5514',
        hora: '13:10',
        cliente: 'Mercearia Central Baixada ME',
        valor: 450.0,
        metodo: 'Efectivo',
        parcela: '8 / 20',
        saldoRestante: 5400.0,
        statusBaixa: 'Confirmada',
      },
      {
        recibo: 'REC-2026-5513',
        hora: '11:30',
        cliente: 'Borracharia & Pneus Caxias',
        valor: 890.0,
        metodo: 'Efectivo',
        parcela: '9 / 20',
        saldoRestante: 9790.0,
        statusBaixa: 'Confirmada',
      },
    ],
    semPagamentos: [
      {
        id: 'NPG-501',
        cliente: 'Depósito de Materiais São João',
        endereco: 'Rua General Dionísio, 310 - 25 de Agosto',
        hora: '10:15',
        motivo: 'Falta de troco em caixa matinal',
        observacao: 'Cliente pediu retorno às 16:30.',
        gpsValidado: true,
        reagendamento: 'Hoje - 16:30',
      },
      {
        id: 'NPG-502',
        cliente: 'Bar e Restaurante Estrela do Norte',
        endereco: 'Av. Nilo Peçanha, 950 - Centro',
        hora: '12:00',
        motivo: 'Proprietário em viagem',
        observacao: 'Esposa sem autorização de pagamento.',
        gpsValidado: true,
        reagendamento: 'Amanhã - 10:00',
      },
    ],
    clientesPendentes: [
      {
        ordem: 1,
        cliente: 'Depósito de Materiais São João (Revisita)',
        endereco: 'Rua General Dionísio, 310',
        bairro: '25 de Agosto',
        telefone: '(21) 98844-3322',
        parcelaPrevista: 600.0,
        saldoDevedor: 3600.0,
        status: 'Proximo',
      },
      {
        ordem: 2,
        cliente: 'Mercadinho Nova Iguaçu',
        endereco: 'Av. Getúlio de Moura, 810',
        bairro: 'Juscelino',
        telefone: '(21) 97733-1100',
        parcelaPrevista: 750.0,
        saldoDevedor: 4500.0,
        status: 'Pendente',
      },
    ],
    despesas: [
      {
        id: 'DSP-4401',
        hora: '08:40',
        categoria: 'Combustível',
        descricao: 'Abastecimento Viatura Caxias (Posto BR Brizola)',
        valor: 60.0,
        comprovante: 'NF-e 192837',
        status: 'Aprovado',
      },
      {
        id: 'DSP-4402',
        hora: '12:30',
        categoria: 'Alimentação',
        descricao: 'Almoço Baixada Lanches',
        valor: 28.0,
        comprovante: 'Cupom SAT 928371',
        status: 'Aprovado',
      },
    ],
    renovacoes: [],
    fechamentoCaixa: {
      saldoInicial: 800.0,
      dinheiroEspecie: 12720.0,
      pixRecebido: 4800.0,
      novasVendasDinheiro: 4300.0,
      despesasRota: 80.0,
      sangrias: 0.0,
      saldoFinalFisico: 9140.0,
      diferenca: 0.0,
    },
    auditoriaGps: [
      {
        hora: '08:15',
        ponto: 'Base UGI Rio Baixada (Caxias)',
        coordenadas: '-22.7850, -43.3080',
        velocidade: '0 km/h',
        bateria: 100,
        tempoParadaMin: 20,
        emPerimetro: true,
      },
      {
        hora: '11:30',
        ponto: 'Av. Gov. Leonel Brizola, 1850 (Borracharia)',
        coordenadas: '-22.7910, -43.3120',
        velocidade: '0 km/h',
        bateria: 65,
        tempoParadaMin: 18,
        emPerimetro: true,
      },
      {
        hora: '13:10',
        ponto: 'Rua Dr. Plínio Casado, 420 (Mercearia Central)',
        coordenadas: '-22.7980, -43.3190',
        velocidade: '0 km/h',
        bateria: 52,
        tempoParadaMin: 25,
        emPerimetro: true,
      },
    ],
  },
};

interface DossieCompletoModalProps {
  employee: EmployeePerformanceData;
  allEmployees: EmployeePerformanceData[];
  onSelectEmployee: (emp: EmployeePerformanceData) => void;
  onClose: () => void;
  onLocateOnRadar?: (agentId: string) => void;
}

export const DossieCompletoModal: React.FC<DossieCompletoModalProps> = ({
  employee,
  allEmployees,
  onSelectEmployee,
  onClose,
  onLocateOnRadar,
}) => {
  // Active primary tab inside Dossier
  const [activeTab, setActiveTab] = useState<
    'todos' | 'pilares' | 'vendas' | 'pagamentos' | 'sem_pagamentos' | 'pendentes' | 'despesas' | 'renovacoes' | 'fechamento' | 'gps'
  >('todos');

  // Sub-tab inside the "Informação" 4 Pillars blue card
  const [infoSubTab, setInfoSubTab] = useState<'unidade' | 'dispositivo' | 'usuarios' | 'cobranca'>('unidade');

  // Search filter inside Dossier tables
  const [tableSearch, setTableSearch] = useState('');

  // Expand/collapse states for all 8 sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    vendas: true,
    pagamentos: true,
    sem_pagamentos: true,
    pendentes: true,
    despesas: true,
    renovacoes: true,
    fechamento: true,
    gps: true,
  });

  // Action status feedbacks
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(employee.deviceStatus === 'bloqueado');

  // Seletor de Período & Descarga (Conforme Imagem na Área Representada pelo Retângulo)
  const [filterStartDateInput, setFilterStartDateInput] = useState<string>('09/10/2026');
  const [filterEndDateInput, setFilterEndDateInput] = useState<string>('16/10/2026');
  const [isPeriodFilterActive, setIsPeriodFilterActive] = useState<boolean>(true);
  const [isDescargaModalOpen, setIsDescargaModalOpen] = useState<boolean>(false);
  const [isResumoPeriodoModalOpen, setIsResumoPeriodoModalOpen] = useState<boolean>(false);
  const [descargaProtocol, setDescargaProtocol] = useState<string>('AUT-20261016-TRY-9841');

  const showFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleAcionarFiltro = () => {
    setIsPeriodFilterActive(true);
    showFeedback(`✓ Filtro Acionado: Período ${filterStartDateInput} até ${filterEndDateInput} habilitado! Métricas e auditoria recalculadas.`);
  };

  const handleDescarga = () => {
    const proto = `AUT-${Date.now().toString().slice(-6)}-TRY-${Math.floor(1000 + Math.random() * 9000)}`;
    setDescargaProtocol(proto);
    setIsDescargaModalOpen(true);

    // Gerar download automático do arquivo oficial da descarga
    let csv = `COMPROVANTE OFICIAL DE DESCARGA OPERACIONAL - TRYCONTROLLER PRO\n`;
    csv += `Chave de Autenticação: ${proto}\n`;
    csv += `Data e Hora de Emissão: ${new Date().toLocaleString('pt-BR')}\n`;
    csv += `Colaborador: ${employee.name} (${employee.role})\n`;
    csv += `Unidade: ${employee.unitName} - CN: ${employee.cnCode}\n`;
    csv += `Dispositivo: ${employee.deviceModel} - IMEI: ${employee.deviceImei}\n`;
    csv += `Período da Descarga: ${filterStartDateInput} a ${filterEndDateInput}\n\n`;
    csv += `--- DEMONSTRATIVO CONSOLIDADO DO PERÍODO ---\n`;
    csv += `Recaudos (+) - Total de Arrecadação,R$ 48.920,00\n`;
    csv += `Total de Vendas (-) - Desembolsos no Período,R$ 18.500,00\n`;
    csv += `Total de Gastos (-) - Despesas Operacionais de Rota,R$ 2.450,00\n`;
    csv += `Resultado Real Líquido (=) R - V - G,R$ 27.970,00\n`;
    csv += `Saldo Físico em Mãos (Custódia do Cobrador),R$ 14.850,00\n`;
    csv += `Carteira Ativa em Rua,R$ 128.420,00\n\n`;
    csv += `--- REGISTROS AUDITADOS DO PERÍODO ---\n`;
    csv += `Recibo,Data/Hora,Cliente,Valor,Método,Status\n`;
    dossieData.pagamentos.forEach((p) => {
      csv += `${p.recibo},${filterEndDateInput} ${p.hora},"${p.cliente}",${p.valor},${p.metodo},${p.statusBaixa}\n`;
    });

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `descarga_${employee.name.replace(/\s+/g, '_')}_${filterStartDateInput.replace(/\//g, '')}_${filterEndDateInput.replace(/\//g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showFeedback(`✓ Descarga Operacional do período ${filterStartDateInput} a ${filterEndDateInput} realizada com sucesso!`);
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setExpandedSections({
      vendas: true,
      pagamentos: true,
      sem_pagamentos: true,
      pendentes: true,
      despesas: true,
      renovacoes: true,
      fechamento: true,
      gps: true,
    });
  };

  const collapseAll = () => {
    setExpandedSections({
      vendas: false,
      pagamentos: false,
      sem_pagamentos: false,
      pendentes: false,
      despesas: false,
      renovacoes: false,
      fechamento: false,
      gps: false,
    });
  };

  const formatCurrency = (val: number) => {
    return (val || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Get active employee details from registry or fallback to Carlos
  const dossieData = DOSSIE_MOCK_REGISTRY[employee.id] || DOSSIE_MOCK_REGISTRY['emp-carlos'];

  // =========================================================================
  // FÓRMULA DE CÁLCULO OPERACIONAL (SETOR DE CONTROLADORIA E TESOURARIA: CALC.PNG)
  // R - V - G: Recaudos (+) - Total de Vendas (-) - Total de Gastos (-)
  // =========================================================================
  const calcCarteiraAtiva = 128420.0;
  const calcCaixaDisponivel = dossieData.fechamentoCaixa.saldoFinalFisico || employee.unitCashOnHand || 14850.0;
  const calcRecaudos = dossieData.fechamentoCaixa.dinheiroEspecie;
  const calcVendas = dossieData.fechamentoCaixa.novasVendasDinheiro;
  const calcGastos = dossieData.fechamentoCaixa.despesasRota;
  const calcResultadoReal = calcRecaudos - calcVendas - calcGastos;
  const calcMargemLiquida = calcRecaudos > 0 ? ((calcResultadoReal / calcRecaudos) * 100).toFixed(2) : '0,00';
  const calcTaxaReinvestimento = calcRecaudos > 0 ? ((calcVendas / calcRecaudos) * 100).toFixed(2) : '0,00';
  const calcIndiceOpex = calcRecaudos > 0 ? ((calcGastos / calcRecaudos) * 100).toFixed(2) : '0,00';

  // Filtered lists based on search
  const filteredVendas = useMemo(() => {
    if (!tableSearch) return dossieData.vendas;
    const q = tableSearch.toLowerCase();
    return dossieData.vendas.filter(
      (v) =>
        v.cliente.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        v.documento.includes(q) ||
        v.endereco.toLowerCase().includes(q)
    );
  }, [dossieData.vendas, tableSearch]);

  const filteredPagamentos = useMemo(() => {
    if (!tableSearch) return dossieData.pagamentos;
    const q = tableSearch.toLowerCase();
    return dossieData.pagamentos.filter(
      (p) =>
        p.cliente.toLowerCase().includes(q) ||
        p.recibo.toLowerCase().includes(q) ||
        p.metodo.toLowerCase().includes(q)
    );
  }, [dossieData.pagamentos, tableSearch]);

  const filteredSemPagamentos = useMemo(() => {
    if (!tableSearch) return dossieData.semPagamentos;
    const q = tableSearch.toLowerCase();
    return dossieData.semPagamentos.filter(
      (s) =>
        s.cliente.toLowerCase().includes(q) ||
        s.motivo.toLowerCase().includes(q) ||
        s.endereco.toLowerCase().includes(q)
    );
  }, [dossieData.semPagamentos, tableSearch]);

  const filteredPendentes = useMemo(() => {
    if (!tableSearch) return dossieData.clientesPendentes;
    const q = tableSearch.toLowerCase();
    return dossieData.clientesPendentes.filter(
      (c) =>
        c.cliente.toLowerCase().includes(q) ||
        c.bairro.toLowerCase().includes(q) ||
        c.endereco.toLowerCase().includes(q)
    );
  }, [dossieData.clientesPendentes, tableSearch]);

  // Handle Export CSV
  const handleExportCSV = () => {
    let csv = `DOSSIE OPERACIONAL COMPLETO - TRYCONTROLLER\n`;
    csv += `Colaborador: ${employee.name} (${employee.role})\n`;
    csv += `Unidade: ${employee.unitName} - CN: ${employee.cnCode}\n`;
    csv += `Dispositivo: ${employee.deviceModel} - IMEI: ${employee.deviceImei}\n`;
    csv += `Arrecadado Hoje: R$ ${formatCurrency(employee.collectedAmount)} / Meta: R$ ${formatCurrency(employee.dailyTarget)}\n\n`;

    csv += `--- VENDAS / CREDITOS ---\nID,Cliente,Documento,Valor Total,Saldo Devedor,Status\n`;
    dossieData.vendas.forEach((v) => {
      csv += `${v.id},"${v.cliente}",${v.documento},${v.valorTotal},${v.saldoDevedor},${v.status}\n`;
    });

    csv += `\n--- PAGAMENTOS DO DIA ---\nRecibo,Hora,Cliente,Valor,Metodo,Status\n`;
    dossieData.pagamentos.forEach((p) => {
      csv += `${p.recibo},${p.hora},"${p.cliente}",${p.valor},${p.metodo},${p.statusBaixa}\n`;
    });

    csv += `\n--- SEM PAGAMENTO ---\nID,Cliente,Hora,Motivo,Reagendamento\n`;
    dossieData.semPagamentos.forEach((s) => {
      csv += `${s.id},"${s.cliente}",${s.hora},"${s.motivo}","${s.reagendamento}"\n`;
    });

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dossie_${employee.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showFeedback('Exportação de Dossiê em CSV concluída com sucesso!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-50 rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-300 overflow-hidden my-4 sm:my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* =====================================================================
            1. HEADER EXECUTIVO DO DOSSIÊ (TRYCONTROLLER PRO)
            ===================================================================== */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-[#180a2b] to-[#50007d] text-white shrink-0 border-b border-purple-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Left: Employee Badge and Info */}
            <div className="flex items-center space-x-3.5">
              <div
                className={`w-13 h-13 rounded-2xl ${employee.avatarBg} text-white font-black text-xl flex items-center justify-center shadow-lg ring-2 ring-white/20 shrink-0`}
              >
                {employee.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#8cc63f] text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                    DOSSIÊ COMPLETO 360°
                  </span>
                  <span className="text-xs font-mono text-purple-200 font-bold">
                    Score {employee.score} pts ({employee.scoreGrade})
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{employee.statusLabel}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-3 mt-1">
                  <h2 className="text-xl font-black text-white leading-none tracking-tight">
                    {employee.name}
                  </h2>
                  {/* Quick Employee Switcher Dropdown */}
                  <select
                    value={employee.id}
                    onChange={(e) => {
                      const found = allEmployees.find((emp) => emp.id === e.target.value);
                      if (found) onSelectEmployee(found);
                    }}
                    className="bg-white/10 hover:bg-white/20 text-purple-100 text-xs rounded-lg px-2 py-1 font-semibold border border-white/20 focus:outline-none cursor-pointer"
                  >
                    {allEmployees.map((emp) => (
                      <option key={emp.id} value={emp.id} className="text-slate-900">
                        Trocar para: {emp.name} ({emp.unitName.split(' ')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                <p className="text-xs text-purple-200/90 mt-0.5">
                  {employee.role} • <strong className="text-white">{employee.unitName}</strong> • CN: {employee.cnCode} • Rota: {employee.routeArea}
                </p>
              </div>
            </div>

            {/* Right: Quick Actions & Seletor de Período [ 09/10/2026 ] - [ 16/10/2026 ] [ Acionar ] [ Descarga ] (Área Representada pelo Retângulo) */}
            <div className="flex items-center flex-wrap gap-2 w-full lg:w-auto justify-start sm:justify-end mt-2 lg:mt-0">
              {/* Barra de Período e Ações Conforme Imagem (Área Representada pelo Retângulo) */}
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
                    onClick={handleDescarga}
                    className="flex-1 sm:flex-none justify-center px-2.5 sm:px-3 py-1 rounded-lg border-2 border-[#8cc63f] bg-[#8cc63f]/10 text-[#8cc63f] hover:bg-[#8cc63f] hover:text-slate-950 font-black text-xs transition cursor-pointer shadow-xs uppercase tracking-wider flex items-center space-x-1"
                    title="Gerar e efetuar descarga operacional deste período"
                  >
                    <Download className="w-3 h-3" />
                    <span>Descarga</span>
                  </button>

                  {/* Botão Resumo Geral por Período */}
                  <button
                    type="button"
                    onClick={() => setIsResumoPeriodoModalOpen(true)}
                    className="flex-1 sm:flex-none justify-center px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white font-bold text-xs transition cursor-pointer border border-purple-400/50 flex items-center space-x-1"
                    title="Abrir tela de Resumo por Período Consolidado (Todas as Unidades)"
                  >
                    <Layers className="w-3 h-3 text-[#8cc63f]" />
                    <span className="hidden sm:inline">Resumo Período</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                <button
                  onClick={handleExportCSV}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer border border-white/10"
                  title="Exportar dossiê completo para planilha Excel/CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#8cc63f]" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer border border-white/10"
                  title="Imprimir dossiê completo"
                >
                  <Printer className="w-3.5 h-3.5 text-purple-200" />
                  <span className="hidden sm:inline">Imprimir</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onLocateOnRadar) {
                      onLocateOnRadar(employee.id.replace('emp-', ''));
                    } else {
                      const el = document.getElementById('central-telemetria-gps');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#8cc63f] hover:bg-[#7db734] text-slate-950 text-xs font-black transition flex items-center space-x-1.5 cursor-pointer shadow"
                  title="Localizar posição no mapa radar em tempo real"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-950" />
                  <span>Radar GPS</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white transition cursor-pointer ml-1"
                  title="Fechar Dossiê"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Alert Bar */}
          {actionFeedback && (
            <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center space-x-2 animate-in fade-in duration-200">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Active Period Indicator Bar (Conforme Acionamento do Período) */}
          {isPeriodFilterActive && (
            <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-black/30 border border-[#8cc63f]/50 text-white text-xs flex items-center justify-between flex-wrap gap-2 animate-in fade-in duration-150">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#8cc63f] animate-pulse" />
                <span className="font-semibold text-purple-200">
                  Período Operacional Ativo: <strong className="text-[#8cc63f] font-mono">{filterStartDateInput}</strong> até <strong className="text-[#8cc63f] font-mono">{filterEndDateInput}</strong>
                </span>
                <span className="bg-[#8cc63f] text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wide">
                  ✓ Habilitado
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-purple-200/90">
                <span>Auditoria e fechamento conciliados para o intervalo.</span>
                <button
                  onClick={() => {
                    setFilterStartDateInput('09/10/2026');
                    setFilterEndDateInput('16/10/2026');
                    showFeedback('Período restabelecido para 09/10/2026 a 16/10/2026.');
                  }}
                  className="text-[#8cc63f] hover:underline font-bold cursor-pointer"
                >
                  Padrão
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================================
            2. BARRA DE NAVEGAÇÃO DE SESSÕES DO DOSSIÊ & BUSCA
            ===================================================================== */}
        <div className="p-3 bg-white border-b border-slate-200 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Section Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'todos'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas as Sessões (Visão Completa)</span>
            </button>

            <button
              onClick={() => setActiveTab('pilares')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'pilares'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#8cc63f]" />
              <span>Os 4 Pilares</span>
            </button>

            <button
              onClick={() => setActiveTab('vendas')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'vendas'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
              <span>Vendas ({dossieData.vendas.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pagamentos')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'pagamentos'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Receipt className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pagamentos ({dossieData.pagamentos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('sem_pagamentos')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'sem_pagamentos'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <UserX className="w-3.5 h-3.5 text-rose-600" />
              <span>Sem Pagamentos ({dossieData.semPagamentos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('pendentes')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'pendentes'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pendentes ({dossieData.clientesPendentes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('fechamento')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'fechamento'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-purple-600" />
              <span>Fórmula & Fechamento</span>
            </button>

            <button
              onClick={() => setActiveTab('gps')}
              className={`px-2.5 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                activeTab === 'gps'
                  ? 'bg-[#50007d] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              <span>Auditoria GPS</span>
            </button>
          </div>

          {/* Quick Search & Expand All */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filtrar dados no dossiê..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:border-[#50007d]"
              />
            </div>

            <button
              onClick={expandAll}
              className="px-2 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md hover:bg-slate-100 cursor-pointer whitespace-nowrap"
              title="Expandir todas as seções"
            >
              Expandir
            </button>
            <button
              onClick={collapseAll}
              className="px-2 py-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md hover:bg-slate-100 cursor-pointer whitespace-nowrap"
              title="Recolher todas as seções"
            >
              Recolher
            </button>
          </div>
        </div>

        {/* =====================================================================
            3. CORPO PRINCIPAL COM TODAS AS SESSÕES SOLICITADAS NAS IMAGENS
            ===================================================================== */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* -----------------------------------------------------------------
              SESSÃO AZUL DESTACADA: "INFORMAÇÃO" (OS 4 PILARES INTEGRADOS)
              Conforme exigido pelo cliente e exibido nas capturas de tela
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'pilares') && (
            <div className="rounded-2xl border border-sky-300/80 bg-gradient-to-br from-sky-50 via-blue-50/70 to-indigo-50/60 shadow-xs overflow-hidden">
              {/* Blue Card Header with 4 Sub-Tabs */}
              <div className="p-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black">
                    ℹ️
                  </div>
                  <div>
                    <h3 className="font-black text-sm uppercase tracking-wide text-white">
                      Informação Operacional & Auditoria dos 4 Pilares
                    </h3>
                    <p className="text-[11px] text-blue-100">
                      Unidade • Dispositivo • Usuários • Cobrança
                    </p>
                  </div>
                </div>

                {/* 4 Pillars Sub-Tabs */}
                <div className="flex items-center space-x-1 bg-black/25 p-1 rounded-xl self-start sm:self-auto text-xs">
                  <button
                    onClick={() => setInfoSubTab('unidade')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                      infoSubTab === 'unidade'
                        ? 'bg-[#8cc63f] text-slate-950 font-black shadow-xs'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Unidade</span>
                  </button>

                  <button
                    onClick={() => setInfoSubTab('dispositivo')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                      infoSubTab === 'dispositivo'
                        ? 'bg-[#8cc63f] text-slate-950 font-black shadow-xs'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Dispositivo</span>
                  </button>

                  <button
                    onClick={() => setInfoSubTab('usuarios')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                      infoSubTab === 'usuarios'
                        ? 'bg-[#8cc63f] text-slate-950 font-black shadow-xs'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Usuários</span>
                  </button>

                  <button
                    onClick={() => setInfoSubTab('cobranca')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                      infoSubTab === 'cobranca'
                        ? 'bg-[#8cc63f] text-slate-950 font-black shadow-xs'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Cobrança</span>
                  </button>
                </div>
              </div>

              {/* Blue Card Content by Sub-Tab */}
              <div className="p-4 sm:p-5 text-xs text-slate-700">
                {/* 1. Sub-Tab: UNIDADE */}
                {infoSubTab === 'unidade' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-150">
                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Unidade / UGI Designada
                      </span>
                      <span className="font-black text-slate-900 text-sm block">
                        {employee.unitName}
                      </span>
                      <span className="text-[11px] text-blue-700 font-mono font-bold block">
                        Centro de Negócios: {employee.cnCode}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Caixa da Unidade em Mãos
                      </span>
                      <span className="font-mono font-black text-slate-900 text-base block text-emerald-700">
                        R$ {formatCurrency(employee.unitCashOnHand)}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Meta Global: R$ {formatCurrency(dossieData.unidadeDetalhe.metaGlobal)}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Supervisão Direta da Base
                      </span>
                      <span className="font-bold text-slate-800 text-xs block">
                        {dossieData.unidadeDetalhe.supervisor}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Telefone Base: {dossieData.unidadeDetalhe.telefoneBase}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Abertura de Lote / Turno
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-xs block">
                        {dossieData.unidadeDetalhe.aberturaLote}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold block">
                        ✓ Lote Validado & Ativo ({dossieData.unidadeDetalhe.cobradoresAtivos} cobradores em campo)
                      </span>
                    </div>

                    <div className="sm:col-span-2 md:col-span-4 bg-white/80 p-3 rounded-xl border border-sky-100 flex items-center justify-between flex-wrap gap-2 text-[11px]">
                      <div>
                        <strong className="text-slate-800">Endereço da Base Operacional: </strong>
                        <span className="text-slate-600">{dossieData.unidadeDetalhe.enderecoBase}</span>
                      </div>
                      <div className="text-slate-500 font-mono">
                        Região Coberta: <strong>{employee.location}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Sub-Tab: DISPOSITIVO */}
                {infoSubTab === 'dispositivo' && (
                  <div className="space-y-3 animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Modelo Aparelho</span>
                        <span className="font-bold text-slate-900 text-xs block mt-0.5">{employee.deviceModel}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">IMEI Registrado</span>
                        <span className="font-mono font-bold text-purple-900 text-xs block mt-0.5">{employee.deviceImei}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">PIN Desbloqueio</span>
                        <span className="font-mono font-black text-emerald-700 text-xs block mt-0.5">{employee.devicePin}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Bateria / Nível</span>
                        <div className="flex items-center space-x-1.5 mt-0.5">
                          <Battery className="w-4 h-4 text-emerald-600" />
                          <span className="font-mono font-bold text-slate-900 text-xs">{employee.deviceBattery}%</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Sinal / Operadora</span>
                        <span className="font-bold text-slate-900 text-xs block mt-0.5">
                          {employee.deviceOperator} ({employee.deviceSignal})
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-sky-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Versão do App</span>
                        <span className="font-mono font-bold text-slate-800 text-xs block mt-0.5">{employee.deviceAppVersion}</span>
                      </div>
                    </div>

                    {/* MDM Security & Device Lock Control */}
                    <div className="bg-white p-3.5 rounded-xl border border-sky-200 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center space-x-2.5">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">
                            Auditoria MDM (Mobile Device Management) & Segurança Antifraude
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            Criptografia AES-256 ativa • Rastreamento GPS obrigatório • Modo Root/Dev Bloqueado • Sincronizado {employee.deviceLastSync}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            showFeedback(`Ping de satélite enviado com sucesso para ${employee.deviceModel}!`);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Enviar Ping</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsLocked(!isLocked);
                            showFeedback(
                              !isLocked
                                ? `Trava remota MDM acionada! O dispositivo ${employee.deviceModel} foi bloqueado imediatamente.`
                                : `Dispositivo ${employee.deviceModel} desbloqueado e liberado para operação.`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer ${
                            isLocked
                              ? 'bg-rose-600 text-white hover:bg-rose-700'
                              : 'bg-slate-800 hover:bg-slate-900 text-white'
                          }`}
                        >
                          {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          <span>{isLocked ? 'Desbloquear Aparelho' : 'Trava Remota IMEI'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Sub-Tab: USUÁRIOS */}
                {infoSubTab === 'usuarios' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-150">
                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Jornada de Trabalho</span>
                      <span className="font-bold text-slate-900 text-xs block">
                        Início: {employee.startTime} • Concluído: {employee.hoursWorked}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        Pontualidade: {employee.punctualityPercent}% (Assiduidade exemplar)
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Classificação de Rendimento</span>
                      <span className="font-black text-purple-900 text-sm block">
                        Score {employee.score} pts (Grau {employee.scoreGrade})
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        Eficiência entre os Top 10% da operação
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Status Operacional</span>
                      <span className="font-bold text-slate-900 text-xs block">{employee.statusLabel}</span>
                      <span className="text-[10px] text-slate-500 block">
                        Pausa CLT: 45 min regulares cumpridos
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Setor de Rota Ativo</span>
                      <span className="font-bold text-slate-900 text-xs block">{employee.routeArea}</span>
                      <span className="text-[10px] text-blue-700 font-medium block">
                        {employee.visitedClients}/{employee.plannedClients} pontos percorridos
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. Sub-Tab: COBRANÇA */}
                {infoSubTab === 'cobranca' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 animate-in fade-in duration-150">
                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Meta Diária Fixada</span>
                      <span className="font-mono font-black text-slate-900 text-sm block">
                        R$ {formatCurrency(employee.dailyTarget)}
                      </span>
                      <span className="text-[10px] text-slate-500">Valor estipulado pelo plano</span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Arrecadado Hoje</span>
                      <span className="font-mono font-black text-[#50007d] text-base block">
                        R$ {formatCurrency(employee.collectedAmount)}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        {employee.progressPercent.toFixed(1)}% atingido
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Dinheiro Físico vs Pix</span>
                      <span className="font-mono font-bold text-slate-800 text-xs block">
                        Espécie: R$ {formatCurrency(employee.cashCollected)}
                      </span>
                      <span className="font-mono font-bold text-emerald-700 text-xs block">
                        Pix: R$ {formatCurrency(employee.pixCollected)}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-sky-100 shadow-2xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Ticket Médio / Mora</span>
                      <span className="font-mono font-bold text-slate-900 text-xs block">
                        R$ {formatCurrency(employee.averageTicket)} / cliente
                      </span>
                      <span className="text-[10px] text-rose-700 font-bold block">
                        Inadimplência Rota: {employee.delinquencyPercent}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 1: VENDAS (CRÉDITOS DA CARTEIRA / ATIVOS)
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'vendas') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('vendas')}
                className="p-3.5 bg-slate-100 hover:bg-slate-200/80 transition flex items-center justify-between cursor-pointer border-b border-slate-200"
              >
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="w-4 h-4 text-blue-700" />
                  <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                    1. Vendas & Créditos Concedidos na Rota ({filteredVendas.length} Registros)
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    Total: R$ {formatCurrency(filteredVendas.reduce((acc, v) => acc + v.valorTotal, 0))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 font-bold">
                  <span>Saldo Devedor: R$ {formatCurrency(filteredVendas.reduce((acc, v) => acc + v.saldoDevedor, 0))}</span>
                  {expandedSections.vendas ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.vendas && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">ID VENDA</th>
                        <th className="px-3 py-2.5">CLIENTE / TITULAR</th>
                        <th className="px-3 py-2.5">DOCUMENTO (CPF/CNPJ)</th>
                        <th className="px-3 py-2.5">ENDEREÇO</th>
                        <th className="px-3 py-2.5 text-right">VALOR TOTAL</th>
                        <th className="px-3 py-2.5 text-right">PARCELA</th>
                        <th className="px-3 py-2.5 text-center">PARCELAS</th>
                        <th className="px-3 py-2.5 text-right">SALDO DEVEDOR</th>
                        <th className="px-3 py-2.5 text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredVendas.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="px-4 py-4 text-center text-slate-400">
                            Nenhuma venda localizada para o filtro informado.
                          </td>
                        </tr>
                      ) : (
                        filteredVendas.map((v) => (
                          <tr key={v.id} className="hover:bg-slate-50/80 transition">
                            <td className="px-3 py-2 font-mono font-bold text-purple-900">{v.id}</td>
                            <td className="px-3 py-2 font-bold text-slate-900">{v.cliente}</td>
                            <td className="px-3 py-2 font-mono text-slate-500 text-[11px]">{v.documento}</td>
                            <td className="px-3 py-2 text-slate-600 text-[11px] truncate max-w-xs">{v.endereco}</td>
                            <td className="px-3 py-2 text-right font-mono font-semibold">R$ {formatCurrency(v.valorTotal)}</td>
                            <td className="px-3 py-2 text-right font-mono">R$ {formatCurrency(v.valorParcela)}</td>
                            <td className="px-3 py-2 text-center font-mono">
                              <span className="font-bold text-blue-700">{v.parcelasPagas}</span> / {v.parcelasTotal}
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-slate-900">
                              R$ {formatCurrency(v.saldoDevedor)}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  v.status === 'em_dia'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {v.status === 'em_dia' ? 'Em Dia' : 'Atenção'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 2: PAGAMENTOS / RECAUDOS RECEBIDOS HOJE
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'pagamentos') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('pagamentos')}
                className="p-3.5 bg-emerald-50/70 hover:bg-emerald-100/70 transition flex items-center justify-between cursor-pointer border-b border-emerald-200"
              >
                <div className="flex items-center space-x-2">
                  <Receipt className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-black text-xs text-emerald-950 uppercase tracking-wider">
                    2. Pagamentos & Recaudos Realizados Hoje ({filteredPagamentos.length} Baixas Confirmadas)
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono">
                    Total: R$ {formatCurrency(filteredPagamentos.reduce((acc, p) => acc + p.valor, 0))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-emerald-800 font-bold">
                  <span>Conciliação 100% OK</span>
                  {expandedSections.pagamentos ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.pagamentos && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">Nº RECIBO</th>
                        <th className="px-3 py-2.5">HORA</th>
                        <th className="px-3 py-2.5">CLIENTE</th>
                        <th className="px-3 py-2.5 text-right">VALOR RECEBIDO</th>
                        <th className="px-3 py-2.5 text-center">FORMA DE PAGAMENTO</th>
                        <th className="px-3 py-2.5 text-center">PARCELA</th>
                        <th className="px-3 py-2.5 text-right">SALDO RESTANTE</th>
                        <th className="px-3 py-2.5 text-center">BAIXA / STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPagamentos.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-4 text-center text-slate-400">
                            Nenhum pagamento localizado.
                          </td>
                        </tr>
                      ) : (
                        filteredPagamentos.map((p) => (
                          <tr key={p.recibo} className="hover:bg-slate-50/80 transition">
                            <td className="px-3 py-2 font-mono font-bold text-slate-800">{p.recibo}</td>
                            <td className="px-3 py-2 text-slate-500 font-mono">{p.hora}</td>
                            <td className="px-3 py-2 font-bold text-slate-900">{p.cliente}</td>
                            <td className="px-3 py-2 text-right font-mono font-black text-emerald-700">
                              R$ {formatCurrency(p.valor)}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  p.metodo === 'Pix'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {p.metodo === 'Pix' ? '⚡ Pix Instantâneo' : '💵 Dinheiro Espécie'}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-center font-mono text-slate-600">{p.parcela}</td>
                            <td className="px-3 py-2 text-right font-mono text-slate-700">
                              R$ {formatCurrency(p.saldoRestante)}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                ✓ {p.statusBaixa}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 3: SEM PAGAMENTOS (VISITAS SEM COBRANÇA & JUSTIFICATIVAS)
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'sem_pagamentos') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('sem_pagamentos')}
                className="p-3.5 bg-rose-50/70 hover:bg-rose-100/70 transition flex items-center justify-between cursor-pointer border-b border-rose-200"
              >
                <div className="flex items-center space-x-2">
                  <UserX className="w-4 h-4 text-rose-700" />
                  <h4 className="font-black text-xs text-rose-950 uppercase tracking-wider">
                    3. Sem Pagamentos / Visitas Sem Cobrança ({filteredSemPagamentos.length} Ocorrências Justificadas)
                  </h4>
                </div>
                <div className="flex items-center space-x-2 text-xs text-rose-800 font-bold">
                  <span>Auditoria de Presença por GPS</span>
                  {expandedSections.sem_pagamentos ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.sem_pagamentos && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">ID REGISTRO</th>
                        <th className="px-3 py-2.5">CLIENTE</th>
                        <th className="px-3 py-2.5">ENDEREÇO</th>
                        <th className="px-3 py-2.5">HORA VISITA</th>
                        <th className="px-3 py-2.5">MOTIVO DECLARADO</th>
                        <th className="px-3 py-2.5">OBSERVAÇÃO DO COBRADOR</th>
                        <th className="px-3 py-2.5 text-center">GPS VALIDADO</th>
                        <th className="px-3 py-2.5">REAGENDAMENTO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredSemPagamentos.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-4 text-center text-slate-400">
                            Nenhum registro de não pagamento na rota.
                          </td>
                        </tr>
                      ) : (
                        filteredSemPagamentos.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition">
                            <td className="px-3 py-2 font-mono font-bold text-slate-800">{s.id}</td>
                            <td className="px-3 py-2 font-bold text-slate-900">{s.cliente}</td>
                            <td className="px-3 py-2 text-slate-600 text-[11px]">{s.endereco}</td>
                            <td className="px-3 py-2 font-mono text-slate-500">{s.hora}</td>
                            <td className="px-3 py-2 font-semibold text-rose-700">{s.motivo}</td>
                            <td className="px-3 py-2 text-slate-600 text-[11px] italic">{s.observacao}</td>
                            <td className="px-3 py-2 text-center">
                              {s.gpsValidado ? (
                                <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  <span>No Local</span>
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                                  Pendente
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2 font-bold text-purple-900 text-[11px]">{s.reagendamento}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 4: CLIENTES PENDENTES DE VISITA (EM ABERTO NA ROTA)
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'pendentes') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('pendentes')}
                className="p-3.5 bg-amber-50/70 hover:bg-amber-100/70 transition flex items-center justify-between cursor-pointer border-b border-amber-200"
              >
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <h4 className="font-black text-xs text-amber-950 uppercase tracking-wider">
                    4. Clientes Pendentes de Visita na Rota ({filteredPendentes.length} Clientes Restantes)
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-mono">
                    Previsão a Cobrar: R$ {formatCurrency(filteredPendentes.reduce((acc, c) => acc + c.parcelaPrevista, 0))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-amber-800 font-bold">
                  {expandedSections.pendentes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.pendentes && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5 text-center">ORDEM</th>
                        <th className="px-3 py-2.5">CLIENTE</th>
                        <th className="px-3 py-2.5">ENDEREÇO</th>
                        <th className="px-3 py-2.5">BAIRRO</th>
                        <th className="px-3 py-2.5">TELEFONE / WHATSAPP</th>
                        <th className="px-3 py-2.5 text-right">PARCELA PREVISTA</th>
                        <th className="px-3 py-2.5 text-right">SALDO DEVEDOR</th>
                        <th className="px-3 py-2.5 text-center">AÇÃO RÁPIDA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPendentes.map((c) => (
                        <tr key={c.ordem} className="hover:bg-slate-50/80 transition">
                          <td className="px-3 py-2 text-center font-bold text-slate-800">#{c.ordem}</td>
                          <td className="px-3 py-2 font-bold text-slate-900">{c.cliente}</td>
                          <td className="px-3 py-2 text-slate-600 text-[11px]">{c.endereco}</td>
                          <td className="px-3 py-2 text-slate-500 font-semibold">{c.bairro}</td>
                          <td className="px-3 py-2 font-mono text-slate-600">{c.telefone}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-amber-700">
                            R$ {formatCurrency(c.parcelaPrevista)}
                          </td>
                          <td className="px-3 py-2 text-right font-mono text-slate-700">
                            R$ {formatCurrency(c.saldoDevedor)}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <button
                              onClick={() => {
                                showFeedback(`Aviso de visita e chave Pix enviado via WhatsApp para ${c.cliente}!`);
                              }}
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center space-x-1 mx-auto transition cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Cobrar WhatsApp</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 5: DESPESAS OPERACIONAIS & SANGRIAS DA ROTA
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'despesas') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('despesas')}
                className="p-3.5 bg-slate-100 hover:bg-slate-200/80 transition flex items-center justify-between cursor-pointer border-b border-slate-200"
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-slate-700" />
                  <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                    5. Despesas Operacionais & Sangrias de Rota ({dossieData.despesas.length} Registros)
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono">
                    Total Gastos: R$ {formatCurrency(dossieData.despesas.reduce((acc, d) => acc + d.valor, 0))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-bold">
                  {expandedSections.despesas ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.despesas && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">ID DESPESA</th>
                        <th className="px-3 py-2.5">HORA</th>
                        <th className="px-3 py-2.5">CATEGORIA</th>
                        <th className="px-3 py-2.5">DESCRIÇÃO DETALHADA</th>
                        <th className="px-3 py-2.5 text-right">VALOR DEDUZIDO</th>
                        <th className="px-3 py-2.5 text-center">COMPROVANTE / NF-e</th>
                        <th className="px-3 py-2.5 text-center">STATUS DE APROVAÇÃO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dossieData.despesas.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/80 transition">
                          <td className="px-3 py-2 font-mono font-bold text-slate-800">{d.id}</td>
                          <td className="px-3 py-2 font-mono text-slate-500">{d.hora}</td>
                          <td className="px-3 py-2 font-bold text-slate-900">{d.categoria}</td>
                          <td className="px-3 py-2 text-slate-600 text-[11px]">{d.descricao}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold text-rose-700">
                            - R$ {formatCurrency(d.valor)}
                          </td>
                          <td className="px-3 py-2 text-center font-mono text-slate-500 text-[11px]">
                            {d.comprovante}
                          </td>
                          <td className="px-3 py-2 text-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              ✓ {d.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 6: RENOVAÇÕES & NOVOS CRÉDITOS NA ROTA
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'renovacoes') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('renovacoes')}
                className="p-3.5 bg-purple-50/70 hover:bg-purple-100/70 transition flex items-center justify-between cursor-pointer border-b border-purple-200"
              >
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-purple-700" />
                  <h4 className="font-black text-xs text-purple-950 uppercase tracking-wider">
                    6. Renovações & Novos Créditos Aprovados ({dossieData.renovacoes.length} Operações)
                  </h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-900 font-mono">
                    Líquido Entregue: R$ {formatCurrency(dossieData.renovacoes.reduce((acc, r) => acc + r.valorLiquidoEntregue, 0))}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-purple-800 font-bold">
                  {expandedSections.renovacoes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.renovacoes && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">ID RENOVAÇÃO</th>
                        <th className="px-3 py-2.5">CLIENTE</th>
                        <th className="px-3 py-2.5 text-right">CRÉDITO ANTERIOR</th>
                        <th className="px-3 py-2.5 text-right">NOVO LIMITE</th>
                        <th className="px-3 py-2.5 text-right">SALDO ABATIDO</th>
                        <th className="px-3 py-2.5 text-right">LÍQUIDO ENTREGUE</th>
                        <th className="px-3 py-2.5 text-center">PARCELAS</th>
                        <th className="px-3 py-2.5 text-center">SCORE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dossieData.renovacoes.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-4 text-center text-slate-400">
                            Nenhuma renovação registrada para este colaborador hoje.
                          </td>
                        </tr>
                      ) : (
                        dossieData.renovacoes.map((r) => (
                          <tr key={r.id} className="hover:bg-slate-50/80 transition">
                            <td className="px-3 py-2 font-mono font-bold text-purple-900">{r.id}</td>
                            <td className="px-3 py-2 font-bold text-slate-900">{r.cliente}</td>
                            <td className="px-3 py-2 text-right font-mono text-slate-600">
                              R$ {formatCurrency(r.creditoAnterior)}
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-emerald-700">
                              R$ {formatCurrency(r.novoCredito)}
                            </td>
                            <td className="px-3 py-2 text-right font-mono text-rose-700">
                              - R$ {formatCurrency(r.saldoAnteriorAbatido)}
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-black text-slate-900">
                              R$ {formatCurrency(r.valorLiquidoEntregue)}
                            </td>
                            <td className="px-3 py-2 text-center font-mono">{r.parcelas}x</td>
                            <td className="px-3 py-2 text-center">
                              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                Score {r.scoreCliente}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 7: FÓRMULA DE CÁLCULO OPERACIONAL & FECHAMENTO DE CAIXA (CALC.PNG)
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'fechamento') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('fechamento')}
                className="p-3.5 bg-gradient-to-r from-purple-900 via-[#50007d] to-[#3b005c] text-white transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Calculator className="w-4 h-4 text-[#8cc63f]" />
                  <h4 className="font-black text-xs uppercase tracking-wider text-white">
                    7. Fórmula de Cálculo Operacional & Fechamento de Caixa (Controladoria da Rota)
                  </h4>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-purple-200">
                  <span className="hidden sm:inline bg-purple-800/80 px-2 py-0.5 rounded border border-purple-600/50 text-[11px] font-mono">
                    R - V - G: {calcResultadoReal >= 0 ? '+' : ''}R$ {formatCurrency(calcResultadoReal)}
                  </span>
                  <span className="text-[#8cc63f] font-mono">✓ 100% Batido</span>
                  {expandedSections.fechamento ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.fechamento && (
                <div className="p-4 sm:p-5 text-xs text-slate-700 space-y-4">
                  {/* Grid das 6 Cartelas com a Fórmula de Cálculo (Conforme Imagem calc.png) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                    {/* Card 1: CARTEIRA ATIVA EM RUA */}
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
                          R$ {formatCurrency(calcCarteiraAtiva)}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-purple-700">Setor: Crédito</span>
                        <span>Total Emprestado</span>
                      </div>
                    </div>

                    {/* Card 2: CAIXA DISPONÍVEL EM MÃOS */}
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
                          R$ {formatCurrency(calcCaixaDisponivel)}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span className="font-semibold text-emerald-700">Setor: Tesouraria</span>
                        <span>Custódia dos Cobradores</span>
                      </div>
                    </div>

                    {/* Card 3: RECAUDOS DO DIA */}
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
                          R$ {formatCurrency(calcRecaudos)}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-emerald-700">Setor: Cobrança</span>
                        <span>Entrada em Espécie (+)</span>
                      </div>
                    </div>

                    {/* Card 4: TOTAL DE VENDAS */}
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
                          R$ {formatCurrency(calcVendas)}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-amber-700">Setor: Comercial</span>
                        <span>Novos Empréstimos (-)</span>
                      </div>
                    </div>

                    {/* Card 5: TOTAL DE GASTOS */}
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
                          R$ {formatCurrency(calcGastos)}
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-semibold text-rose-600">Setor: Logística</span>
                        <span>Despesas Opex de Rota (-)</span>
                      </div>
                    </div>

                    {/* Card 6: TOTAL (RESULTADO REAL) */}
                    <div
                      onClick={() => {
                        showFeedback(
                          `Demonstrativo Analítico (Fórmula R - V - G):\n` +
                          `(+) Recaudos Cobrados: R$ ${formatCurrency(calcRecaudos)}\n` +
                          `(-) Novos Empréstimos: R$ ${formatCurrency(calcVendas)}\n` +
                          `(-) Gastos Operacionais: R$ ${formatCurrency(calcGastos)}\n` +
                          `(=) TOTAL LÍQUIDO DO DIA: R$ ${formatCurrency(calcResultadoReal)}\n` +
                          `Margem Líquida Operacional: ${calcMargemLiquida}%\n` +
                          `Status: ${calcResultadoReal >= 0 ? 'Superávit Livre de Caixa' : 'Consumo de Capital'}`
                        );
                      }}
                      className="bg-gradient-to-br from-[#50007d] via-[#43006a] to-[#2b0042] text-white rounded-xl p-4 border border-purple-500/50 shadow-md relative overflow-hidden flex flex-col justify-between hover:border-[#8cc63f] hover:shadow-xl transition-all cursor-pointer group"
                      title="Clique para ver o demonstrativo analítico da fórmula R - V - G"
                    >
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
                          {calcResultadoReal >= 0 ? '+' : ''}R$ {formatCurrency(calcResultadoReal)}
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

                  {/* Detalhamento Complementar: Indicadores Derivados da Fórmula */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase font-bold block">
                        Margem Operacional Líquida
                      </span>
                      <span className="text-sm font-black font-mono text-emerald-700 block">
                        {calcMargemLiquida}%
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
                        {calcTaxaReinvestimento}%
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
                        {calcIndiceOpex}%
                      </span>
                      <span className="text-[9px] text-slate-400">
                        (Total Gastos / Recaudos)
                      </span>
                    </div>
                  </div>

                  {/* Summary bar */}
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
                        {calcResultadoReal >= 0 ? '+' : ''}R$ {formatCurrency(calcResultadoReal)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                        ✓ Fórmula Auditada & Saldo Conciliado
                      </span>
                      <button
                        onClick={() => showFeedback('Fórmula e fechamento chancelados com sucesso pela Controladoria!')}
                        className="px-3 py-1.5 rounded-lg bg-[#8cc63f] hover:bg-[#7db734] text-slate-950 font-black text-xs transition cursor-pointer flex items-center space-x-1"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Chancelar Cálculo</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* -----------------------------------------------------------------
              SESSÃO 8: AUDITORIA DE TELEMETRIA GPS & LINHA DO TEMPO DA ROTA
              ----------------------------------------------------------------- */}
          {(activeTab === 'todos' || activeTab === 'gps') && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
              <div
                onClick={() => toggleSection('gps')}
                className="p-3.5 bg-slate-100 hover:bg-slate-200/80 transition flex items-center justify-between cursor-pointer border-b border-slate-200"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                    8. Auditoria de Rota GPS & Telemetria em Campo ({dossieData.auditoriaGps.length} Checkpoints)
                  </h4>
                </div>
                <div className="flex items-center space-x-2 text-xs text-cyan-700 font-bold">
                  <span>Conformidade Geográfica 100%</span>
                  {expandedSections.gps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {expandedSections.gps && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2.5">HORÁRIO</th>
                        <th className="px-3 py-2.5">CHECKPOINT / CLIENTE</th>
                        <th className="px-3 py-2.5 font-mono">COORDENADAS GPS</th>
                        <th className="px-3 py-2.5 text-center">VELOCIDADE</th>
                        <th className="px-3 py-2.5 text-center">BATERIA</th>
                        <th className="px-3 py-2.5 text-center">TEMPO DE PARADA</th>
                        <th className="px-3 py-2.5 text-center">PERÍMETRO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dossieData.auditoriaGps.map((g, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/80 transition">
                          <td className="px-3 py-2 font-mono font-bold text-slate-900">{g.hora}</td>
                          <td className="px-3 py-2 font-bold text-slate-800">{g.ponto}</td>
                          <td className="px-3 py-2 font-mono text-cyan-700 text-[11px]">{g.coordenadas}</td>
                          <td className="px-3 py-2 text-center font-mono text-slate-600">{g.velocidade}</td>
                          <td className="px-3 py-2 text-center font-mono font-bold text-emerald-700">
                            {g.bateria}%
                          </td>
                          <td className="px-3 py-2 text-center font-mono text-slate-600">{g.tempoParadaMin} min</td>
                          <td className="px-3 py-2 text-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              ✓ Autorizado
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =====================================================================
            4. RODAPÉ DO DOSSIÊ
            ===================================================================== */}
        <div className="p-3.5 bg-slate-100 border-t border-slate-300 shrink-0 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Dossiê emitido em tempo real com certificação criptográfica TryController Core.
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-white text-slate-700 font-bold transition cursor-pointer"
            >
              Baixar Relatório Completo
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#50007d] hover:bg-[#400064] text-white font-bold transition cursor-pointer shadow-xs"
            >
              Fechar Dossiê
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MODAL DE COMPROVANTE OFICIAL DE DESCARGA OPERACIONAL
          (Acionado pelo Botão "Descarga" no Seletor de Período)
          ===================================================================== */}
      {isDescargaModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-[#180a2b] to-[#50007d] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#8cc63f] text-slate-950 flex items-center justify-center font-black">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wide">
                    Comprovante de Descarga Operacional
                  </h3>
                  <p className="text-[11px] text-purple-200">
                    Autenticação TryController Pro • Protocolo: {descargaProtocol}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDescargaModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                title="Fechar Comprovante"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">
                    Descarga Validada & Sincronizada com Sucesso!
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                  EMITIDO
                </span>
              </div>

              {/* Colaborador & Dispositivo */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Colaborador / Rota</span>
                  <strong className="text-slate-900 text-xs">{employee.name}</strong> ({employee.role})
                  <div className="text-[11px] text-slate-500 mt-0.5">{employee.unitName} • CN: {employee.cnCode}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Intervalo da Descarga</span>
                  <strong className="text-[#50007d] font-mono text-xs">{filterStartDateInput} até {filterEndDateInput}</strong>
                  <div className="text-[11px] text-slate-500 mt-0.5">IMEI: {employee.deviceImei}</div>
                </div>
              </div>

              {/* Balanço Financeiro da Descarga */}
              <div className="space-y-1.5 border border-slate-200 rounded-xl p-3 bg-slate-50/50">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">
                  Demonstrativo da Descarga (Fórmula R - V - G)
                </span>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Recaudos (+) - Total Cobrado em Rota:</span>
                  <strong className="font-mono text-emerald-700 font-black">R$ 48.920,00</strong>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Total de Vendas (-) - Desembolsos Realizados:</span>
                  <strong className="font-mono text-rose-700 font-black">R$ 18.500,00</strong>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Total de Gastos (-) - Despesas Operacionais:</span>
                  <strong className="font-mono text-amber-700 font-black">R$ 2.450,00</strong>
                </div>
                <div className="flex items-center justify-between py-1.5 bg-purple-50 px-2 rounded-lg border border-purple-200 mt-1">
                  <span className="font-bold text-[#50007d]">Resultado Real Líquido da Descarga:</span>
                  <strong className="font-mono text-sm font-black text-[#50007d]">R$ 27.970,00</strong>
                </div>
                <div className="flex items-center justify-between pt-1 px-2 text-[11px] text-slate-600">
                  <span>Saldo Físico em Espécie Custodiado:</span>
                  <span className="font-mono font-bold text-slate-900">R$ 14.850,00</span>
                </div>
              </div>

              {/* Digital Hash */}
              <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 font-mono text-[10px] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Chave de Auditoria SHA-256</span>
                  <span className="text-[#8cc63f] truncate block max-w-sm">
                    {descargaProtocol}-94b3c21a88df01e29
                  </span>
                </div>
                <span className="text-emerald-400 font-bold shrink-0">✓ ASSINADO</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-purple-700" />
                <span>Imprimir Comprovante</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDescargaModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#50007d] hover:bg-[#400064] text-white font-bold text-xs transition cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL DE RESUMO POR PERÍODO CONSOLIDADO (SUPERCONTROLE PRO)
          ===================================================================== */}
      {isResumoPeriodoModalOpen && (
        <div className="fixed inset-0 z-70 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-slate-50 rounded-2xl max-w-6xl w-full shadow-2xl border border-slate-300 overflow-hidden my-4 max-h-[92vh] flex flex-col">
            <div className="p-4 bg-gradient-to-r from-slate-900 via-[#180a2b] to-[#50007d] text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase tracking-wider bg-[#8cc63f] text-slate-950 px-2 py-0.5 rounded shadow-2xs">
                  SUPERCONTROLE
                </span>
                <h3 className="font-bold text-sm text-white">
                  Resumo por Período (Somente Caixas Fechadas)
                </h3>
              </div>
              <button
                onClick={() => setIsResumoPeriodoModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600 text-white cursor-pointer"
                title="Fechar Resumo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <TryResumoPeriodoView language="pt" onBackToVentas={() => setIsResumoPeriodoModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
