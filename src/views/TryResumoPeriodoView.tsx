import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Calendar,
  Search,
  CheckSquare,
  Square,
  TrendingDown,
  DollarSign,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Info,
  CheckCircle2,
  Receipt,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

export interface UnitPeriodData {
  id: string;
  code: string;
  name: string;
  fechamentos: number;
  periodo: string;
  clientesNovosRenovacoes: number;
  saldoInvestimentoInicial: number;
  caixaInicial: number;
  recebimentoTotal: number;
  recebimentoPct: string;
  recebimentoUnidade: number;
  recebimentoUnidadePct: string;
  recebimentoExtra?: number;
  recebimentoExtraQtd?: number;
  recebimentoPretendido: number;
  vendasQtd: number;
  vendasTotal: number;
  vendasNovasQtd: number;
  vendasNovasValor: number;
  renovacoesQtd: number;
  renovacoesValor: number;
  rentabilidadePrevista: number;
  rentabilidadeJurosPct: string;
  mediaCobranca: number;
  mediaCobrancaPct: string;
  despesas: number;
  retiradas: number;
  ingressos: number;
  notaDebito: number;
  notaCredito: number;
  caixaAtual: number;
  saldoInvestimentoFinal: number;
}

export interface DespesaItem {
  id: string;
  unidad: string;
  descripcion: string;
  obs: string;
  valor: number;
  fecha: string;
}

export const INITIAL_UNIT_PERIOD_DATA: UnitPeriodData[] = [
  {
    id: 'u-0293',
    code: '0293',
    name: 'CUCA/FABIO/BELEZURA',
    fechamentos: 7,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 9,
    saldoInvestimentoInicial: 106682,
    caixaInicial: -11383,
    recebimentoTotal: 11201,
    recebimentoPct: '35,95%',
    recebimentoUnidade: 6501,
    recebimentoUnidadePct: '20,86%',
    recebimentoPretendido: 31161,
    vendasQtd: 9,
    vendasTotal: 10670,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 9,
    renovacoesValor: 10670,
    rentabilidadePrevista: 4328,
    rentabilidadeJurosPct: '37%',
    mediaCobranca: 1600,
    mediaCobrancaPct: '1,46%',
    despesas: 1190,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -12042,
    saldoInvestimentoFinal: 110479,
  },
  {
    id: 'u-0321',
    code: '0321',
    name: 'BELEZURA/FABIO/PAOLO',
    fechamentos: 6,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 4,
    saldoInvestimentoInicial: 50682,
    caixaInicial: 1066,
    recebimentoTotal: 5302,
    recebimentoPct: '27,38%',
    recebimentoUnidade: 4252,
    recebimentoUnidadePct: '21,96%',
    recebimentoPretendido: 19368,
    vendasQtd: 4,
    vendasTotal: 8500,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 4,
    renovacoesValor: 8500,
    rentabilidadePrevista: 1700,
    rentabilidadeJurosPct: '20%',
    mediaCobranca: 884,
    mediaCobrancaPct: '1,64%',
    despesas: 1230,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -3362,
    saldoInvestimentoFinal: 55580,
  },
  {
    id: 'u-0342',
    code: '0342',
    name: 'FELIPE/FABIO/BELEZURA',
    fechamentos: 6,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 9,
    saldoInvestimentoInicial: 69235,
    caixaInicial: -27284,
    recebimentoTotal: 5699,
    recebimentoPct: '24,85%',
    recebimentoUnidade: 3768,
    recebimentoUnidadePct: '16,43%',
    recebimentoPretendido: 22931,
    vendasQtd: 9,
    vendasTotal: 5700,
    vendasNovasQtd: 2,
    vendasNovasValor: 1000,
    renovacoesQtd: 7,
    renovacoesValor: 4700,
    rentabilidadePrevista: 1350,
    rentabilidadeJurosPct: '23%',
    mediaCobranca: 950,
    mediaCobrancaPct: '1,34%',
    despesas: 740,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -28025,
    saldoInvestimentoFinal: 70586,
  },
  {
    id: 'u-0364',
    code: '0364',
    name: 'BELEZURA/FABIO/JOHN',
    fechamentos: 1,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 1,
    saldoInvestimentoInicial: 57112,
    caixaInicial: -4189,
    recebimentoTotal: 290,
    recebimentoPct: '10,98%',
    recebimentoUnidade: 250,
    recebimentoUnidadePct: '9,46%',
    recebimentoExtra: 33,
    recebimentoExtraQtd: 1,
    recebimentoPretendido: 2642,
    vendasQtd: 1,
    vendasTotal: 500,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 1,
    renovacoesValor: 500,
    rentabilidadePrevista: 150,
    rentabilidadeJurosPct: '30%',
    mediaCobranca: 290,
    mediaCobrancaPct: '0,50%',
    despesas: 100,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -4499,
    saldoInvestimentoFinal: 57472,
  },
  {
    id: 'u-0424',
    code: '0424',
    name: 'BELEZURA/PAOLO/DENIS',
    fechamentos: 6,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 5,
    saldoInvestimentoInicial: 88134,
    caixaInicial: -11689,
    recebimentoTotal: 12986,
    recebimentoPct: '19,04%',
    recebimentoUnidade: 10812,
    recebimentoUnidadePct: '15,86%',
    recebimentoPretendido: 68188,
    vendasQtd: 5,
    vendasTotal: 6200,
    vendasNovasQtd: 1,
    vendasNovasValor: 2500,
    renovacoesQtd: 4,
    renovacoesValor: 3700,
    rentabilidadePrevista: 1660,
    rentabilidadeJurosPct: '28%',
    mediaCobranca: 2164,
    mediaCobrancaPct: '2,48%',
    despesas: 1726,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -6629,
    saldoInvestimentoFinal: 83008,
  },
  {
    id: 'u-0452',
    code: '0452',
    name: 'BOLOTA/FABIO/BELEZURA',
    fechamentos: 4,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 0,
    saldoInvestimentoInicial: 51457,
    caixaInicial: -17641,
    recebimentoTotal: 790,
    recebimentoPct: '5,71%',
    recebimentoUnidade: 433,
    recebimentoUnidadePct: '3,13%',
    recebimentoPretendido: 13836,
    vendasQtd: 0,
    vendasTotal: 0,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 0,
    renovacoesValor: 0,
    rentabilidadePrevista: 0,
    rentabilidadeJurosPct: '0%',
    mediaCobranca: 198,
    mediaCobrancaPct: '0,38%',
    despesas: 650,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -17501,
    saldoInvestimentoFinal: 50667,
  },
  {
    id: 'u-0474',
    code: '0474',
    name: 'FABIO/BELEZURA',
    fechamentos: 1,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 0,
    saldoInvestimentoInicial: 55123,
    caixaInicial: -30203,
    recebimentoTotal: 306,
    recebimentoPct: '7,51%',
    recebimentoUnidade: 181,
    recebimentoUnidadePct: '4,44%',
    recebimentoPretendido: 4073,
    vendasQtd: 0,
    vendasTotal: 0,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 0,
    renovacoesValor: 0,
    rentabilidadePrevista: 0,
    rentabilidadeJurosPct: '0%',
    mediaCobranca: 306,
    mediaCobrancaPct: '0,55%',
    despesas: 0,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -29897,
    saldoInvestimentoFinal: 54817,
  },
  {
    id: 'u-0541',
    code: '0541',
    name: 'BELEZURA',
    fechamentos: 7,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 1,
    saldoInvestimentoInicial: 11341,
    caixaInicial: 8430,
    recebimentoTotal: 3542,
    recebimentoPct: '35,98%',
    recebimentoUnidade: 2843,
    recebimentoUnidadePct: '28,88%',
    recebimentoExtra: 77,
    recebimentoExtraQtd: 1,
    recebimentoPretendido: 9844,
    vendasQtd: 1,
    vendasTotal: 1500,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 1,
    renovacoesValor: 1500,
    rentabilidadePrevista: 450,
    rentabilidadeJurosPct: '30%',
    mediaCobranca: 506,
    mediaCobrancaPct: '4,66%',
    despesas: 870,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: 9602,
    saldoInvestimentoFinal: 9749,
  },
  {
    id: 'u-0547',
    code: '0547',
    name: 'BELEZURA/FABIO',
    fechamentos: 6,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 2,
    saldoInvestimentoInicial: 57428,
    caixaInicial: -6353,
    recebimentoTotal: 2290,
    recebimentoPct: '12,41%',
    recebimentoUnidade: 1805,
    recebimentoUnidadePct: '9,78%',
    recebimentoPretendido: 18455,
    vendasQtd: 2,
    vendasTotal: 1000,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 2,
    renovacoesValor: 1000,
    rentabilidadePrevista: 320,
    rentabilidadeJurosPct: '30%',
    mediaCobranca: 382,
    mediaCobrancaPct: '0,66%',
    despesas: 620,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -5683,
    saldoInvestimentoFinal: 56458,
  },
  {
    id: 'u-0626',
    code: '0626',
    name: 'NEGÃO/FABIO/BELEZURA',
    fechamentos: 6,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 6,
    saldoInvestimentoInicial: 146199,
    caixaInicial: 35232,
    recebimentoTotal: 21180,
    recebimentoPct: '72,03%',
    recebimentoUnidade: 8432,
    recebimentoUnidadePct: '28,68%',
    recebimentoPretendido: 29404,
    vendasQtd: 6,
    vendasTotal: 14500,
    vendasNovasQtd: 1,
    vendasNovasValor: 700,
    renovacoesQtd: 5,
    renovacoesValor: 13800,
    rentabilidadePrevista: 3150,
    rentabilidadeJurosPct: '25%',
    mediaCobranca: 3530,
    mediaCobrancaPct: '2,47%',
    despesas: 1360,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: 40552,
    saldoInvestimentoFinal: 142669,
  },
  {
    id: 'u-0879',
    code: '0879',
    name: 'FABIO/PAOLO/BELEZURA/OESTE',
    fechamentos: 5,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 2,
    saldoInvestimentoInicial: 50054,
    caixaInicial: 6052,
    recebimentoTotal: 4000,
    recebimentoPct: '28,36%',
    recebimentoUnidade: 2747,
    recebimentoUnidadePct: '19,48%',
    recebimentoExtra: 80,
    recebimentoExtraQtd: 1,
    recebimentoPretendido: 14105,
    vendasQtd: 2,
    vendasTotal: 3500,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 2,
    renovacoesValor: 3500,
    rentabilidadePrevista: 700,
    rentabilidadeJurosPct: '20%',
    mediaCobranca: 800,
    mediaCobrancaPct: '1,63%',
    despesas: 670,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: 5882,
    saldoInvestimentoFinal: 50254,
  },
  {
    id: 'u-1118',
    code: '1118',
    name: 'BELEZURA/PAOLO/PEPAS',
    fechamentos: 1,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 0,
    saldoInvestimentoInicial: 72442,
    caixaInicial: -53503,
    recebimentoTotal: 0,
    recebimentoPct: '0,00%',
    recebimentoUnidade: 0,
    recebimentoUnidadePct: '0,00%',
    recebimentoPretendido: 1923,
    vendasQtd: 0,
    vendasTotal: 0,
    vendasNovasQtd: 0,
    vendasNovasValor: 0,
    renovacoesQtd: 0,
    renovacoesValor: 0,
    rentabilidadePrevista: 0,
    rentabilidadeJurosPct: '0%',
    mediaCobranca: 0,
    mediaCobrancaPct: '0,00%',
    despesas: 0,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -53503,
    saldoInvestimentoFinal: 72442,
  },
  {
    id: 'u-2023',
    code: '2023',
    name: 'FABIO/BANGA/NEGÃO/BELEZURA',
    fechamentos: 6,
    periodo: '2026-oct.-08 / 2026-oct.-15',
    clientesNovosRenovacoes: 12,
    saldoInvestimentoInicial: 41337,
    caixaInicial: -2171,
    recebimentoTotal: 8012,
    recebimentoPct: '44,08%',
    recebimentoUnidade: 6554,
    recebimentoUnidadePct: '36,06%',
    recebimentoPretendido: 18177,
    vendasQtd: 12,
    vendasTotal: 9100,
    vendasNovasQtd: 7,
    vendasNovasValor: 2600,
    renovacoesQtd: 5,
    renovacoesValor: 6500,
    rentabilidadePrevista: 2460,
    rentabilidadeJurosPct: '34%',
    mediaCobranca: 1335,
    mediaCobrancaPct: '2,94%',
    despesas: 900,
    retiradas: 0,
    ingressos: 0,
    notaDebito: 0,
    notaCredito: 0,
    caixaAtual: -4159,
    saldoInvestimentoFinal: 44885,
  },
];

export const INITIAL_DESPESAS: DespesaItem[] = [
  { id: 'd-1', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 20, fecha: '2026-10-08' },
  { id: 'd-2', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 30, fecha: '2026-10-08' },
  { id: 'd-3', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 20, fecha: '2026-10-09' },
  { id: 'd-4', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 30, fecha: '2026-10-09' },
  { id: 'd-5', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Varios', obs: 'pm', valor: 200, fecha: '2026-10-09' },
  { id: 'd-6', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 20, fecha: '2026-10-10' },
  { id: 'd-7', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 30, fecha: '2026-10-10' },
  { id: 'd-8', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Comisión', obs: '', valor: 500, fecha: '2026-10-10' },
  { id: 'd-9', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 20, fecha: '2026-10-13' },
  { id: 'd-10', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 30, fecha: '2026-10-13' },
  { id: 'd-11', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Manutenção Moto', obs: 'óleo', valor: 150, fecha: '2026-10-14' },
  { id: 'd-12', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 20, fecha: '2026-10-14' },
  { id: 'd-13', unidad: '0293 - CUCA/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 30, fecha: '2026-10-15' },
  { id: 'd-14', unidad: '0321 - BELEZURA/FABIO/PAOLO', descripcion: 'Gastos: Alimentación', obs: '', valor: 35, fecha: '2026-10-08' },
  { id: 'd-15', unidad: '0321 - BELEZURA/FABIO/PAOLO', descripcion: 'Gastos: Gasolina', obs: 'rota centro', valor: 45, fecha: '2026-10-09' },
  { id: 'd-16', unidad: '0321 - BELEZURA/FABIO/PAOLO', descripcion: 'Gastos: Alimentación', obs: '', valor: 25, fecha: '2026-10-10' },
  { id: 'd-17', unidad: '0321 - BELEZURA/FABIO/PAOLO', descripcion: 'Gastos: Gasolina', obs: '', valor: 40, fecha: '2026-10-11' },
  { id: 'd-18', unidad: '0321 - BELEZURA/FABIO/PAOLO', descripcion: 'Gastos: Comissão Operacional', obs: 'meta batida', valor: 600, fecha: '2026-10-12' },
  { id: 'd-19', unidad: '0342 - FELIPE/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 30, fecha: '2026-10-08' },
  { id: 'd-20', unidad: '0342 - FELIPE/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 40, fecha: '2026-10-09' },
  { id: 'd-21', unidad: '0342 - FELIPE/FABIO/BELEZURA', descripcion: 'Gastos: Peças Moto', obs: '', valor: 120, fecha: '2026-10-10' },
  { id: 'd-22', unidad: '0424 - BELEZURA/PAOLO/DENIS', descripcion: 'Gastos: Alimentación', obs: '', valor: 40, fecha: '2026-10-08' },
  { id: 'd-23', unidad: '0424 - BELEZURA/PAOLO/DENIS', descripcion: 'Gastos: Gasolina', obs: '', valor: 60, fecha: '2026-10-09' },
  { id: 'd-24', unidad: '0424 - BELEZURA/PAOLO/DENIS', descripcion: 'Gastos: Comissão Equipe', obs: '', valor: 850, fecha: '2026-10-12' },
  { id: 'd-25', unidad: '0541 - BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 50, fecha: '2026-10-09' },
  { id: 'd-26', unidad: '0541 - BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 30, fecha: '2026-10-10' },
  { id: 'd-27', unidad: '0626 - NEGÃO/FABIO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 80, fecha: '2026-10-08' },
  { id: 'd-28', unidad: '0626 - NEGÃO/FABIO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 50, fecha: '2026-10-09' },
  { id: 'd-29', unidad: '0626 - NEGÃO/FABIO/BELEZURA', descripcion: 'Gastos: Manutenção', obs: '', valor: 250, fecha: '2026-10-11' },
  { id: 'd-30', unidad: '2023 - FABIO/BANGA/NEGÃO/BELEZURA', descripcion: 'Gastos: Gasolina', obs: '', valor: 60, fecha: '2026-10-08' },
  { id: 'd-31', unidad: '2023 - FABIO/BANGA/NEGÃO/BELEZURA', descripcion: 'Gastos: Alimentación', obs: '', valor: 40, fecha: '2026-10-09' },
];

export const ALL_UNITS_CHECKLIST = [
  { code: '01118', name: 'BELEZURA/PAOLO/PEPAS' },
  { code: '02023', name: 'FABIO/BANGA/NEGÃO/BELEZURA' },
  { code: '00293', name: 'CUCA/FABIO/BELEZURA' },
  { code: '00321', name: 'BELEZURA/FABIO/PAOLO' },
  { code: '00342', name: 'FELIPE/FABIO/BELEZURA' },
  { code: '00364', name: 'BELEZURA/FABIO/JOHN' },
  { code: '00424', name: 'BELEZURA/PAOLO/DENIS' },
  { code: '00452', name: 'BOLOTA/FABIO/BELEZURA' },
  { code: '00474', name: 'FABIO/BELEZURA' },
  { code: '00541', name: 'BELEZURA' },
  { code: '00547', name: 'BELEZURA/FABIO' },
  { code: '00626', name: 'NEGÃO/FABIO/BELEZURA' },
  { code: '00879', name: 'FABIO/PAOLO/BELEZURA/OESTE' },
  { code: '00912', name: 'BELEZURA/CENTRO' },
  { code: '00955', name: 'BELEZURA/LESTE' },
  { code: '01040', name: 'BELEZURA/SUL' },
];

interface TryResumoPeriodoViewProps {
  language?: Language;
  onBackToVentas?: () => void;
}

export const TryResumoPeriodoView: React.FC<TryResumoPeriodoViewProps> = ({
  language = 'pt',
  onBackToVentas,
}) => {
  const [selectedUnits, setSelectedUnits] = useState<string[]>(ALL_UNITS_CHECKLIST.map((u) => u.code));
  const [dateStart, setDateStart] = useState('08/10/2026');
  const [dateEnd, setDateEnd] = useState('15/10/2026');
  const [organizarPor, setOrganizarPor] = useState<'data' | 'unidade'>('unidade');
  const [detalhadoPorUnidade, setDetalhadoPorUnidade] = useState(true);
  const [ativarTrm, setAtivarTrm] = useState(false);
  const [despesaSearch, setDespesaSearch] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const formatNumber = (num: number) => {
    return (num || 0).toLocaleString('pt-BR');
  };

  const isAllSelected = selectedUnits.length === ALL_UNITS_CHECKLIST.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUnits([]);
    } else {
      setSelectedUnits(ALL_UNITS_CHECKLIST.map((u) => u.code));
    }
  };

  const toggleUnit = (code: string) => {
    if (selectedUnits.includes(code)) {
      setSelectedUnits(selectedUnits.filter((c) => c !== code));
    } else {
      setSelectedUnits([...selectedUnits, code]);
    }
  };

  const handleConsultar = () => {
    setFeedbackMsg(`Consulta atualizada para o período ${dateStart} até ${dateEnd} com ${selectedUnits.length} unidade(s) selecionada(s).`);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleExportExcel = () => {
    let csv = `SUPERCONTROLE - RESUMO POR PERIODO (SOMENTE CAIXAS FECHADAS)\n`;
    csv += `Periodo: ${dateStart} a ${dateEnd}\n`;
    csv += `Unidades Selecionadas: ${selectedUnits.length} de ${ALL_UNITS_CHECKLIST.length}\n\n`;
    csv += `TOTAL CONSOLIDADO\n`;
    csv += `Recebimento Total,R$ 75.598\n`;
    csv += `Vendas Total,R$ 61.170\n`;
    csv += `Despesas Total,R$ 10.056\n`;
    csv += `Caixa Atual Consolidado,R$ -109.264\n`;
    csv += `Saldo Investimento Final,R$ 859.066\n\n`;

    csv += `RESUMO POR UNIDADE\n`;
    csv += `Codigo,Unidade,Fechamentos,Caixa Inicial,Recebimento,Vendas,Despesas,Caixa Atual,Saldo Final\n`;
    INITIAL_UNIT_PERIOD_DATA.forEach((u) => {
      csv += `${u.code},"${u.name}",${u.fechamentos},${u.caixaInicial},${u.recebimentoTotal},${u.vendasTotal},${u.despesas},${u.caixaAtual},${u.saldoInvestimentoFinal}\n`;
    });

    csv += `\nDESPESAS DETALHADAS (91)\n`;
    csv += `Unidade,Descricao,Obs,Valor,Data\n`;
    INITIAL_DESPESAS.forEach((d) => {
      csv += `"${d.unidad}","${d.descripcion}","${d.obs}",${d.valor},${d.fecha}\n`;
    });

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `resumo_periodo_supercontrole_${dateStart.replace(/\//g, '')}_${dateEnd.replace(/\//g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setFeedbackMsg('Relatório do Resumo por Período exportado para Excel com sucesso!');
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const filteredDespesas = useMemo(() => {
    if (!despesaSearch) return INITIAL_DESPESAS;
    const q = despesaSearch.toLowerCase();
    return INITIAL_DESPESAS.filter(
      (d) =>
        d.unidad.toLowerCase().includes(q) ||
        d.descripcion.toLowerCase().includes(q) ||
        d.obs.toLowerCase().includes(q) ||
        d.fecha.includes(q)
    );
  }, [despesaSearch]);

  return (
    <div className="space-y-4 font-sans text-slate-800 animate-in fade-in duration-200">
      {/* Feedback Toast */}
      {feedbackMsg && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-400 text-emerald-950 font-bold text-xs rounded-xl flex items-center space-x-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb & Title Matching Screenshot screencapture-app-supercontrole-co-MainContent-aspx-2026-10-16-02_47_21.png */}
      <div className="bg-white border border-slate-300 rounded-xl p-3 sm:p-4 shadow-2xs">
        <div className="text-xs text-blue-600 font-semibold mb-1 flex items-center space-x-1 flex-wrap">
          <span className="hover:underline cursor-pointer" onClick={onBackToVentas}>
            Principal
          </span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-700 font-bold truncate">Resumo por período (somente Caixas fechadas)</span>
        </div>
        <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
          Resumo por período (somente Caixas fechadas)
        </h1>
      </div>

      {/* Filter Box with Selection of Units, Dates & Action Buttons */}
      <div className="bg-white border border-slate-300 rounded-xl p-3 sm:p-4 shadow-2xs space-y-3">
        {/* Checkbox Group Container */}
        <div className="border border-blue-400/80 rounded-lg p-2.5 sm:p-3 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2 border-b border-slate-200 gap-2">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="flex items-center space-x-2 text-xs font-black text-blue-800 hover:text-blue-950 cursor-pointer"
            >
              {isAllSelected ? (
                <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
              ) : (
                <Square className="w-4 h-4 text-blue-600" />
              )}
              <span>SELECIONAR TODOS ({ALL_UNITS_CHECKLIST.length})</span>
            </button>
            <span className="text-[11px] text-slate-500 font-medium">
              {selectedUnits.length} de {ALL_UNITS_CHECKLIST.length} unidades selecionadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs max-h-56 sm:max-h-64 overflow-y-auto pr-1">
            {ALL_UNITS_CHECKLIST.map((unit) => {
              const isChecked = selectedUnits.includes(unit.code);
              return (
                <label
                  key={unit.code}
                  className="flex items-center space-x-2 text-slate-700 hover:text-slate-950 cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleUnit(unit.code)}
                    className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                  />
                  <span className="font-mono text-slate-900 font-bold shrink-0">{unit.code}</span>
                  <span className="text-slate-400">-</span>
                  <span className="truncate" title={unit.name}>{unit.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Date Filters & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs w-full lg:w-auto">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-slate-700">De:</span>
              <div className="relative">
                <input
                  type="text"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="border border-slate-300 rounded px-2 py-1 text-xs w-24 sm:w-26 bg-slate-50 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-slate-700">Até:</span>
              <div className="relative">
                <input
                  type="text"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="border border-slate-300 rounded px-2 py-1 text-xs w-24 sm:w-26 bg-slate-50 font-medium"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleConsultar}
              className="px-4 py-1.5 rounded-md bg-[#50007d] hover:bg-[#3f0063] text-white font-black text-xs transition cursor-pointer shadow-xs w-full sm:w-auto text-center"
            >
              Consultar
            </button>

            <div className="flex items-center space-x-2 pl-0 sm:pl-2 border-t sm:border-t-0 sm:border-l border-slate-300 pt-2 sm:pt-0 w-full sm:w-auto">
              <span className="font-bold text-slate-700">Organizar Por:</span>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="organizarPor"
                  checked={organizarPor === 'data'}
                  onChange={() => setOrganizarPor('data')}
                  className="cursor-pointer"
                />
                <span>Data</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="organizarPor"
                  checked={organizarPor === 'unidade'}
                  onChange={() => setOrganizarPor('unidade')}
                  className="cursor-pointer"
                />
                <span className="font-bold">Unidade</span>
              </label>
            </div>

            <label className="flex items-center space-x-1.5 cursor-pointer pl-0 sm:pl-2 border-t sm:border-t-0 sm:border-l border-slate-300 pt-2 sm:pt-0 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={detalhadoPorUnidade}
                onChange={(e) => setDetalhadoPorUnidade(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 cursor-pointer"
              />
              <span className="font-bold text-slate-800">Detalhado por Unidade</span>
            </label>
          </div>

          {/* Export to Excel Icon */}
          <div className="flex items-center space-x-2 self-start lg:self-center">
            <button
              onClick={handleExportExcel}
              className="p-1 rounded hover:bg-slate-100 transition cursor-pointer flex items-center space-x-1.5 text-xs text-emerald-800 font-bold"
              title="Exportar Resumo por Período para Planilha Excel"
            >
              <div className="w-7 h-7 bg-emerald-700 hover:bg-emerald-800 text-white rounded flex items-center justify-center shadow-xs">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <span className="sm:hidden">Exportar Excel</span>
            </button>
          </div>
        </div>

        {/* TRM Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] pt-1 text-slate-600 gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-blue-600 hover:underline cursor-pointer">
              Insira ou calcule um valor, para gerar o relatório com TRM
            </span>
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="checkbox"
                checked={ativarTrm}
                onChange={(e) => setAtivarTrm(e.target.checked)}
                className="cursor-pointer"
              />
              <span>Ativar Conversão TRM</span>
            </label>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center py-1">
        <h2 className="text-sm font-black text-slate-800 tracking-tight">
          Resumo por período (somente Caixas fechadas) : <span className="text-blue-600">($)</span>
        </h2>
      </div>

      {/* Fórmula Automática do Resumo Conforme Solicitado no WhatsApp */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-[#8cc63f]/60 rounded-xl p-3 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-lg bg-[#8cc63f] text-slate-950 flex items-center justify-center font-black text-xs">
            =
          </span>
          <div>
            <span className="font-bold text-[11px] text-purple-200 block">
              Cálculo Automático do Resumo Consolidado:
            </span>
            <span className="font-mono text-xs text-[#8cc63f] font-bold">
              Coleção (75.598) — Vendas Totais (61.170) — Gastos/Despesas (10.056) = Geração Líquida (+4.372)
            </span>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#8cc63f] text-slate-950 uppercase shrink-0">
          Cálculo Automático Ativo
        </span>
      </div>

      {/* =========================================================================
          1. CARTÃO CONSOLIDADO: TOTAL UNIDADE(S) (Conforme Imagem do Cliente)
          ========================================================================= */}
      <div className="bg-[#0f172a] rounded-xl text-white overflow-hidden shadow-lg border border-slate-800">
        {/* Navy Header with Title and Pill Badge */}
        <div className="p-3 bg-[#0a0f1d] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-black text-xs tracking-wider text-white uppercase">
              TOTAL UNIDADE(S)
            </h3>
          </div>
          <span className="bg-blue-600/80 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-2xs">
            62 fechamentos
          </span>
        </div>

        {/* 4 Big KPI Blocks in Top Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border-b border-slate-800 bg-slate-900/40 text-center py-2.5">
          <div className="px-2 sm:px-3 py-1.5 sm:py-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase block tracking-wider truncate">
              RECEBIMENTO 29,75%
            </span>
            <span className="text-base sm:text-lg font-black text-white font-mono">
              75.598
            </span>
          </div>
          <div className="px-2 sm:px-3 py-1.5 sm:py-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-blue-400 uppercase block tracking-wider truncate">
              VENDAS 51
            </span>
            <span className="text-base sm:text-lg font-black text-white font-mono">
              61.170
            </span>
          </div>
          <div className="px-2 sm:px-3 py-1.5 sm:py-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block tracking-wider truncate">
              DESPESAS + RETIRADAS
            </span>
            <span className="text-base sm:text-lg font-black text-white font-mono">
              10.056
            </span>
          </div>
          <div className="px-2 sm:px-3 py-1.5 sm:py-0">
            <span className="text-[9px] sm:text-[10px] font-bold text-purple-300 uppercase block tracking-wider truncate">
              CAIXA ATUAL
            </span>
            <span className="text-base sm:text-lg font-black text-white font-mono">
              -109.264
            </span>
          </div>
        </div>

        {/* Detailed Financial Breakdown Table inside Total Card */}
        <div className="p-3 sm:p-4 bg-white text-slate-900 text-xs space-y-1.5 divide-y divide-slate-100 font-medium">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-0.5 sm:gap-2">
            <span className="text-slate-600">Período :</span>
            <span className="font-mono text-slate-900 font-semibold">2026-oct.-08 / 2026-oct.-15</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-0.5 sm:gap-2">
            <span className="text-slate-600">Quantidade Unidades :</span>
            <span className="font-mono text-slate-900 font-bold">16</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-0.5 sm:gap-2">
            <span className="text-slate-600">Quantidade Fechamentos :</span>
            <span className="font-mono text-slate-900 font-bold">62</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-0.5 sm:gap-2">
            <span className="text-slate-600">Clientes Novos / Renovações :</span>
            <span className="font-mono text-slate-900 font-bold">51</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-0.5 sm:gap-2">
            <span className="text-slate-600">Saldo Unidade Investimento Inicial (2026-10-08) :</span>
            <span className="font-mono text-slate-900 font-bold">857.226</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-0.5 sm:gap-2">
            <span className="text-slate-800 font-bold">A. Caixa Inicial :</span>
            <span className="font-mono text-slate-900 font-black">-113.636</span>
          </div>

          <div className="py-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-800 font-bold">B. Recebimento: Total (29,75%) :</span>
              <span className="font-mono text-slate-900 font-black">75.598</span>
            </div>
            <div className="pl-3 sm:pl-4 text-[10px] sm:text-[11px] text-slate-600 space-y-0.5 mt-0.5">
              <div className="flex justify-between">
                <span>Unidade (19,12%) :</span>
                <span className="font-mono">48.580</span>
              </div>
              <div className="flex justify-between">
                <span>Extra (3) :</span>
                <span className="font-mono">190</span>
              </div>
              <div className="flex justify-between">
                <span>Recebimento Pretendido (100%) :</span>
                <span className="font-mono">254.107</span>
              </div>
            </div>
          </div>

          <div className="py-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
              <span className="text-slate-800 font-bold">C. Vendas (51) :</span>
              <span className="font-mono text-slate-900 font-black">61.170</span>
            </div>
            <div className="pl-3 sm:pl-4 text-[10px] sm:text-[11px] text-slate-600 space-y-0.5 mt-0.5">
              <div className="flex justify-between">
                <span>Vendas novas (11) :</span>
                <span className="font-mono">6.800</span>
              </div>
              <div className="flex justify-between">
                <span>Renovações (40) :</span>
                <span className="font-mono">54.370</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Rent. Prevista: Méd.Juros 29% :</span>
                <span className="font-mono">$ 16.268</span>
              </div>
              <div className="flex justify-between text-blue-600 font-bold pt-0.5">
                <span>Média de Cobrança :</span>
                <span>$ 1.219 (1,98%)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-600">D. Despesas :</span>
            <span className="font-mono text-slate-900 font-bold">10.056</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-600">D. Retiradas :</span>
            <span className="font-mono text-slate-900 font-bold">0</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-600">E. Ingressos :</span>
            <span className="font-mono text-slate-900 font-bold">0</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-600">F. Nota Débito (0) :</span>
            <span className="font-mono text-slate-900 font-bold">0</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-600">G. Nota Crédito (0) :</span>
            <span className="font-mono text-slate-900 font-bold">0</span>
          </div>

          {/* Caixa Atual Full Purple Bar */}
          <div className="py-2 sm:py-2.5 px-3 bg-[#4c1d95] text-white rounded-lg flex flex-col sm:flex-row sm:items-center justify-between my-1 gap-1">
            <span className="font-bold text-xs uppercase tracking-wide">
              Caixa Atual (A+B+E-C-D+(G-F)) :
            </span>
            <span className="font-mono text-base font-black">
              -109.264
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5 font-bold">
            <span className="text-slate-700">Unidade Saldo Investimento Final :</span>
            <span className="font-mono text-slate-950 font-black text-sm">859.066</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SEÇÃO: RESUMO POR UNIDADE (Grid com Todas as Unidades da Imagem)
          ========================================================================= */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-5 bg-blue-600 rounded-full" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
            RESUMO POR UNIDADE
          </h2>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 on desktop, 4 on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {INITIAL_UNIT_PERIOD_DATA.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Card Header (Navy Blue) */}
              <div className="p-2.5 bg-[#0a0f1d] text-white flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs uppercase tracking-tight text-white">
                    {unit.code} -
                  </h4>
                  <p className="text-[11px] font-bold text-slate-200 truncate max-w-[200px]">
                    {unit.name}
                  </p>
                </div>
                <span className="bg-blue-600/90 text-white font-bold text-[9px] px-2 py-0.5 rounded-full">
                  {unit.fechamentos} fechamentos
                </span>
              </div>

              {/* Card Content Table */}
              <div className="p-3 text-[11px] text-slate-800 space-y-1 divide-y divide-slate-100 flex-1">
                <div className="flex justify-between py-0.5 text-slate-500">
                  <span>Período :</span>
                  <span className="font-mono font-medium">{unit.periodo}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">Quantidade Fechamentos :</span>
                  <span className="font-mono font-bold text-slate-900">{unit.fechamentos}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">Clientes Novos / Renovações :</span>
                  <span className="font-mono font-bold text-slate-900">{unit.clientesNovosRenovacoes}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">Saldo Unidade Investimento Inicial (2026-10-08) :</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(unit.saldoInvestimentoInicial)}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-700 font-bold">A. Caixa Inicial :</span>
                  <span className={`font-mono font-black ${unit.caixaInicial < 0 ? 'text-slate-900' : 'text-slate-900'}`}>
                    {formatNumber(unit.caixaInicial)}
                  </span>
                </div>

                <div className="py-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>B. Recebimento: Total ({unit.recebimentoPct}) :</span>
                    <span className="font-mono font-black">{formatNumber(unit.recebimentoTotal)}</span>
                  </div>
                  <div className="pl-3 text-[10px] text-slate-500 space-y-0.5 mt-0.5">
                    <div className="flex justify-between">
                      <span>Unidade ({unit.recebimentoUnidadePct}) :</span>
                      <span className="font-mono">{formatNumber(unit.recebimentoUnidade)}</span>
                    </div>
                    {unit.recebimentoExtra !== undefined && (
                      <div className="flex justify-between">
                        <span>Extra ({unit.recebimentoExtraQtd || 1}) :</span>
                        <span className="font-mono">{unit.recebimentoExtra}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Recebimento Pretendido (100%) :</span>
                      <span className="font-mono">{formatNumber(unit.recebimentoPretendido)}</span>
                    </div>
                  </div>
                </div>

                <div className="py-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>C. Vendas ({unit.vendasQtd}) :</span>
                    <span className="font-mono font-black">{formatNumber(unit.vendasTotal)}</span>
                  </div>
                  <div className="pl-3 text-[10px] text-slate-500 space-y-0.5 mt-0.5">
                    <div className="flex justify-between">
                      <span>Vendas novas ({unit.vendasNovasQtd}) :</span>
                      <span className="font-mono">{formatNumber(unit.vendasNovasValor)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renovações ({unit.renovacoesQtd}) :</span>
                      <span className="font-mono">{formatNumber(unit.renovacoesValor)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rent. Prevista: Méd.Juros {unit.rentabilidadeJurosPct} :</span>
                      <span className="font-mono">$ {formatNumber(unit.rentabilidadePrevista)}</span>
                    </div>
                    <div className="flex justify-between text-blue-600 font-bold pt-0.5">
                      <span>Média de Cobrança :</span>
                      <span>$ {formatNumber(unit.mediaCobranca)} ({unit.mediaCobrancaPct})</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">D. Despesas :</span>
                  <span className="font-mono font-bold text-slate-900">{formatNumber(unit.despesas)}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">D. Retiradas :</span>
                  <span className="font-mono text-slate-900">{unit.retiradas}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">E. Ingressos :</span>
                  <span className="font-mono text-slate-900">{unit.ingressos}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">F. Nota Débito (0) :</span>
                  <span className="font-mono text-slate-900">{unit.notaDebito}</span>
                </div>

                <div className="flex justify-between py-0.5">
                  <span className="text-slate-600">G. Nota Crédito (0) :</span>
                  <span className="font-mono text-slate-900">{unit.notaCredito}</span>
                </div>
              </div>

              {/* Purple Caixa Atual Bar at bottom of card */}
              <div className="p-2.5 bg-[#4c1d95] text-white flex items-center justify-between text-[11px] font-bold">
                <span className="uppercase">Caixa Atual (A+B+E-C-D+(G-F)):</span>
                <span className="font-mono font-black text-xs">
                  {formatNumber(unit.caixaAtual)}
                </span>
              </div>

              {/* Final Saldo */}
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-[11px] flex items-center justify-between">
                <span className="text-slate-600 font-bold">Unidade Saldo Investimento Final :</span>
                <span className="font-mono font-black text-slate-900">
                  {formatNumber(unit.saldoInvestimentoFinal)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. TABELA DE DESPESAS (91) (Conforme Imagem screencapture-app-supercontrole-co-MainContent-aspx-2026-10-16-02_48_15.png)
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-2xs space-y-2 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-5 bg-rose-600 rounded-full" />
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
              Despesas (91)
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Buscar despesa por unidade, descrição..."
              value={despesaSearch}
              onChange={(e) => setDespesaSearch(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:border-[#50007d]"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto max-h-80 overflow-y-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse min-w-[520px]">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold sticky top-0 border-b border-slate-200">
              <tr>
                <th className="p-2.5">UNIDAD</th>
                <th className="p-2.5">DESCRIPCIÓN</th>
                <th className="p-2.5">OBS</th>
                <th className="p-2.5 text-right">VALOR</th>
                <th className="p-2.5 text-center">FECHA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDespesas.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-2.5 font-bold text-slate-900 whitespace-nowrap">
                    {item.unidad}
                  </td>
                  <td className="p-2.5 font-medium">{item.descripcion}</td>
                  <td className="p-2.5 text-slate-500 font-mono text-[11px]">{item.obs || '-'}</td>
                  <td className="p-2.5 text-right font-mono font-bold text-rose-700">
                    {item.valor}
                  </td>
                  <td className="p-2.5 text-center font-mono text-slate-500 text-[11px]">
                    {item.fecha}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1">
          <span>Mostrando registros auditados de despesas operacionais da rota.</span>
          <span className="font-bold text-slate-700">Total Despesas no Período: R$ 10.056</span>
        </div>
      </div>

      {/* =========================================================================
          4. TABELA DE RETIRADAS (0)
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-2xs space-y-2 p-3 sm:p-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
          <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
            Retiradas (0)
          </h2>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse min-w-[520px]">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">UNIDAD</th>
                <th className="p-2.5">DESCRIPCIÓN</th>
                <th className="p-2.5">OBS</th>
                <th className="p-2.5 text-right">VALOR</th>
                <th className="p-2.5 text-center">FECHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-400 italic font-medium">
                  Sin Datos.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          5. TABELA DE INGRESSOS (0)
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-2xs space-y-2 p-3 sm:p-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
          <div className="w-1.5 h-5 bg-emerald-600 rounded-full" />
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
            Ingressos (0)
          </h2>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs border-collapse min-w-[520px]">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">UNIDAD</th>
                <th className="p-2.5">DESCRIPCIÓN</th>
                <th className="p-2.5">OBS</th>
                <th className="p-2.5 text-right">VALOR</th>
                <th className="p-2.5 text-center">FECHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-400 italic font-medium">
                  Sin Datos.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
