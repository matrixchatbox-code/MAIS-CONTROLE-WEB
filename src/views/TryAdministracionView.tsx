import React, { useState } from 'react';
import {
  SubViewSection,
  Language,
  UnitSummaryItem,
  DeviceItem,
  SocioTreeNode,
  InterSocietyLoan,
  ClientProfile,
} from '../types';
import {
  Layers,
  Users,
  Smartphone,
  Shield,
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  Check,
  X,
  Lock,
  Unlock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Hexagon,
  DollarSign,
  FileSpreadsheet
} from 'lucide-react';

interface TryAdministracionViewProps {
  subView: SubViewSection;
  onNavigateSubView: (sub: SubViewSection) => void;
  units: UnitSummaryItem[];
  devices: DeviceItem[];
  socioTree: SocioTreeNode[];
  loans: InterSocietyLoan[];
  clients: ClientProfile[];
  language: Language;
  onToggleDevice: (id: string) => void;
  onWipeDevice: (id: string) => void;
}

export const TryAdministracionView: React.FC<TryAdministracionViewProps> = ({
  subView,
  onNavigateSubView,
  units,
  devices,
  socioTree,
  loans,
  clients,
  language,
  onToggleDevice,
  onWipeDevice,
}) => {
  const [unitSearch, setUnitSearch] = useState('');
  const [loanTab, setLoanTab] = useState<'cobrar' | 'pagar'>('cobrar');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('all');
  
  // Score configuration state matching PDF slide 6
  const [criterioA, setCriterioA] = useState(30);
  const [criterioB, setCriterioB] = useState(50);
  const [criterioC, setCriterioC] = useState(20);
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  const isPt = language === 'pt';

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-4">
      {/* Sub navigation bar for Administracion module */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-2 flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => onNavigateSubView('admin_unidades')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            subView === 'admin_unidades'
              ? 'bg-[#8cc63f] text-slate-900 shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isPt ? 'Lista de Unidades' : 'Lista unidades'}
        </button>

        <button
          onClick={() => onNavigateSubView('admin_arbol_socios')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-bold transition ${
            subView === 'admin_arbol_socios'
              ? 'bg-[#50007d] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5 text-[#8cc63f]" />
          <span>{isPt ? 'Árvore de Sócios' : 'Árbol de socios'}</span>
        </button>

        <button
          onClick={() => onNavigateSubView('admin_score')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-bold transition ${
            subView === 'admin_score'
              ? 'bg-[#8cc63f] text-slate-900 shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Hexagon className="w-3.5 h-3.5" />
          <span>{isPt ? 'Configuração de Score' : 'Configurar Score'}</span>
        </button>

        <button
          onClick={() => onNavigateSubView('admin_prestamos_sociedades')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-bold transition ${
            subView === 'admin_prestamos_sociedades'
              ? 'bg-[#50007d] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-[#8cc63f]" />
          <span>{isPt ? 'Empréstimos entre Sociedades (Fondeo)' : 'Préstamos entre Sociedades'}</span>
        </button>

        <button
          onClick={() => onNavigateSubView('admin_dispositivos')}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg font-bold transition ${
            subView === 'admin_dispositivos'
              ? 'bg-[#8cc63f] text-slate-900 shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{isPt ? 'Dispositivos & Trava IMEI' : 'Dispositivos'}</span>
        </button>
      </div>

      {/* 1. LISTA UNIDADES (UGIs) matching screenshot screencapture-trycontroller-co-Application-Index-2026-10-08-20_13_43.png */}
      {subView === 'admin_unidades' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="px-3.5 py-1.5 rounded-lg font-bold text-xs bg-[#8cc63f] text-slate-900 flex items-center space-x-1.5">
              <Layers className="w-4 h-4" />
              <span>{isPt ? 'Lista de Unidades' : 'Lista unidades'}</span>
            </span>
          </div>

          {/* Filter Bar with Search, Plus, Download matching screenshot */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 max-w-md relative flex items-center">
              <input
                type="text"
                placeholder={isPt ? 'Ex: Nº Unidade ou Nome da unidade' : 'Ejem: N° Unidad o Nombre de unidad'}
                value={unitSearch}
                onChange={(e) => setUnitSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-l-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#76b82a]"
              />
              <button className="h-full px-3.5 py-2 bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 rounded-r-lg font-bold">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => alert(isPt ? 'Formulário de criação de nova UGI aberto!' : 'Nueva UGI')}
              className="w-8 h-8 rounded-lg bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 flex items-center justify-center font-bold"
              title="Adicionar Unidade"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => alert(isPt ? 'Lista de unidades exportada para Excel!' : 'Exportado a Excel')}
              className="w-8 h-8 rounded-lg bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 flex items-center justify-center font-bold"
              title="Baixar lista"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Table matching screenshot */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Ação' : 'Acción'}</th>
                  <th className="px-3 py-2.5">Nº</th>
                  <th className="px-4 py-2.5">{isPt ? 'Unidade' : 'Unidad'}</th>
                  <th className="px-3 py-2.5">Rol</th>
                  <th className="px-3 py-2.5">{isPt ? 'Tipo de Unidade' : 'Tipo de unidad'}</th>
                  <th className="px-3 py-2.5">Tipo</th>
                  <th className="px-4 py-2.5">{isPt ? 'Data Criação' : 'Fecha'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Status' : 'Estado'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'PIN Dispositivo' : 'Pin dispositivo'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Versão App' : 'Versión App'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {units.map((u, i) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="px-3 py-3 text-center">
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-600">
                        <Edit2 className="w-3.5 h-3.5 text-[#50007d]" />
                      </button>
                    </td>
                    <td className="px-3 py-3 font-mono font-bold text-slate-800">{i + 1}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{u.name}</td>
                    <td className="px-3 py-3 text-slate-600">Vendas / Rota</td>
                    <td className="px-3 py-3 text-slate-600">Móvel</td>
                    <td className="px-3 py-3 text-slate-600">Mista</td>
                    <td className="px-4 py-3 text-slate-600">{u.cashDate}</td>
                    <td className="px-3 py-3 text-center">
                      <div className="inline-flex items-center p-0.5 rounded-full bg-emerald-500 text-white w-9 h-5 cursor-pointer">
                        <span className="w-4 h-4 rounded-full bg-white shadow-xs ml-auto"></span>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-mono text-slate-500">{u.pin}</td>
                    <td className="px-3 py-3 font-mono text-slate-500">{u.appVersion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. ÁRVORE DE SÓCIOS (Árbol de Socios) matching PDF slides */}
      {subView === 'admin_arbol_socios' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-[#50007d]" />
                <span>{isPt ? 'Árvore de Sócios & Participações Societárias' : 'Árbol de socios'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isPt
                  ? 'Hierarquia com limite de até 10 sócios, controle de participação nos lucros e vinculação a UGIs.'
                  : 'Nodos con unidades asociadas, muestran su cantidad total. Límite de 10 socios en su jerarquía.'}
              </p>
            </div>

            {/* Country filter matching PDF slide 5 */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-slate-500">{isPt ? 'Filtrar por País:' : 'País:'}</span>
              <select
                value={selectedCountryFilter}
                onChange={(e) => setSelectedCountryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-medium text-xs text-slate-800"
              >
                <option value="all">{isPt ? 'Todos os países' : 'Todos los países'}</option>
                <option value="brazil">🇧🇷 Brasil</option>
                <option value="colombia">🇨🇴 Colômbia</option>
                <option value="mexico">🇲🇽 México</option>
              </select>
            </div>
          </div>

          {/* Tree hierarchy cards matching PDF slides */}
          <div className="space-y-3">
            {socioTree.map((root) => (
              <div key={root.id} className="border border-purple-200 rounded-xl bg-purple-50/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 rounded-full bg-[#50007d] text-white flex items-center justify-center font-bold text-xs">
                      {root.associatedUnitsCount}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#50007d]">{root.alias}</h4>
                      <p className="text-xs text-slate-600">{root.fullName} • {root.country}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#8cc63f] text-slate-900 font-black text-xs">
                    {root.participationPercent}% {isPt ? 'Participação' : 'Participación'}
                  </span>
                </div>

                {/* Sub nodes matching screenshot */}
                {root.subNodes && (
                  <div className="pl-6 border-l-2 border-purple-300 space-y-2 mt-3">
                    {root.subNodes.map((sub) => (
                      <div key={sub.id} className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-full bg-[#8cc63f] text-slate-900 font-bold text-xs flex items-center justify-center">
                            {sub.associatedUnitsCount}
                          </span>
                          <div>
                            <div className="font-bold text-xs text-slate-900">{sub.alias}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Unidades: {sub.units.join(', ')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-xs text-purple-900">
                            {sub.participationPercent}%
                          </span>
                          <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CONFIGURAÇÃO DE SCORE 2.0 matching PDF slide 6 */}
      {subView === 'admin_score' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6 max-w-2xl">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Hexagon className="w-5 h-5 text-[#8cc63f]" />
              <span>{isPt ? 'Sistema de Classificação de Créditos e Score' : 'Configuración Sistema de Calificación de Créditos'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isPt
                ? 'Configure o peso percentual de cada critério. A soma dos critérios DEVE totalizar exatamente 100%.'
                : 'Configure el peso porcentual de cada criterio. La suma no debe superar el 100%.'}
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Criterio A */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-slate-900">
                  {isPt ? 'Critério A: Parcelas vs Caixas do Crédito' : 'Criterio A: Cuotas vs Cajas del crédito'}
                </h5>
                <p className="text-slate-500 text-[11px]">
                  {isPt ? 'Mede a quantidade de parcelas pagas em relação aos caixas transcorridos' : 'Mide la cantidad de cuotas pagadas vs las cajas del crédito'}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={criterioA}
                  onChange={(e) => setCriterioA(parseInt(e.target.value) || 0)}
                  className="w-16 bg-white border border-slate-300 rounded-lg p-2 text-center font-bold text-sm font-mono text-slate-900"
                />
                <span className="font-bold text-slate-500">%</span>
              </div>
            </div>

            {/* Criterio B */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-slate-900">
                  {isPt ? 'Critério B: Quantidade de Movimentos de Pagamento vs Caixas' : 'Criterio B: Cantidad de Movimientos de PAGO vs Cajas'}
                </h5>
                <p className="text-slate-500 text-[11px]">
                  {isPt ? 'Mede a frequência e regularidade de pagamentos' : 'Mide la frecuencia de pagos en relación a las cajas totales'}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={criterioB}
                  onChange={(e) => setCriterioB(parseInt(e.target.value) || 0)}
                  className="w-16 bg-white border border-slate-300 rounded-lg p-2 text-center font-bold text-sm font-mono text-slate-900"
                />
                <span className="font-bold text-slate-500">%</span>
              </div>
            </div>

            {/* Criterio C */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-slate-900">
                  {isPt ? 'Critério C: Média de Parcelas Pagas vs Caixas' : 'Criterio C: Promedio cuotas pagadas vs Cajas'}
                </h5>
                <p className="text-slate-500 text-[11px]">
                  {isPt ? 'Mede o valor médio amortizado por movimento' : 'Mide el valor promedio de cuotas pagadas por movimiento'}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={criterioC}
                  onChange={(e) => setCriterioC(parseInt(e.target.value) || 0)}
                  className="w-16 bg-white border border-slate-300 rounded-lg p-2 text-center font-bold text-sm font-mono text-slate-900"
                />
                <span className="font-bold text-slate-500">%</span>
              </div>
            </div>

            {/* Total Indicator */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-200 font-bold">
              <span className="text-purple-900">{isPt ? 'Total Ponderado:' : 'Total:'}</span>
              <span className={`font-mono text-base ${criterioA + criterioB + criterioC === 100 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {criterioA + criterioB + criterioC}% {criterioA + criterioB + criterioC === 100 ? '✓' : '(Deve somar 100%)'}
              </span>
            </div>

            <button
              onClick={() => {
                if (criterioA + criterioB + criterioC !== 100) {
                  alert(isPt ? 'A soma dos critérios deve ser exatamente 100%!' : '¡La suma debe ser 100%!');
                  return;
                }
                setIsScoreSaved(true);
                setTimeout(() => setIsScoreSaved(false), 3000);
              }}
              className="w-full py-2.5 rounded-lg bg-[#76b82a] hover:bg-[#6aa822] text-white font-bold text-xs transition"
            >
              {isScoreSaved ? (isPt ? '✓ Configuração Salva com Sucesso!' : '✓ Guardado') : (isPt ? 'Salvar Configuração de Score' : 'Guardar Configuración')}
            </button>
          </div>
        </div>
      )}

      {/* 4. EMPRÉSTIMOS ENTRE SOCIEDADES / FONDEO matching PDF slides 5/6/7 */}
      {subView === 'admin_prestamos_sociedades' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-[#50007d]" />
                <span>{isPt ? 'Módulo de Fondeo & Empréstimos entre Sociedades' : 'Préstamos entre Sociedades'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {isPt ? 'Transferência e custódia de capital corporativo entre Centros de Negócios.' : 'Gestión de préstamos corporativos.'}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLoanTab('cobrar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  loanTab === 'cobrar'
                    ? 'bg-[#2e86ab] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isPt ? 'Contas a Receber' : 'Cuentas por cobrar'}
              </button>
              <button
                onClick={() => setLoanTab('pagar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  loanTab === 'pagar'
                    ? 'bg-[#50007d] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isPt ? 'Contas a Pagar' : 'Cuentas por pagar'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-3 py-2.5">ID</th>
                  <th className="px-4 py-2.5">{isPt ? 'Origem CN' : 'Origen'}</th>
                  <th className="px-4 py-2.5">{isPt ? 'Destino CN' : 'Destino'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Valor Empréstimo' : 'Valor'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Juros' : 'Interés'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Parcelas' : 'Cuotas'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Saldo Atual' : 'Saldo'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Status' : 'Estado'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Ações' : 'Acciones'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-mono font-bold text-[#50007d]">{loan.loanNumber}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{loan.originCn}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{loan.destinationCn}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">
                      R$ {formatCurrency(loan.amount)}
                    </td>
                    <td className="px-3 py-3 text-center font-mono">{loan.interestRate}%</td>
                    <td className="px-3 py-3 text-center font-mono">{loan.installmentsCount}</td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-rose-700">
                      R$ {formatCurrency(loan.pendingBalance)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800">
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => alert(`Extrato do Fondeo #${loan.loanNumber} gerado!`)}
                        className="px-2 py-1 rounded bg-[#50007d] text-white font-bold text-[10px]"
                      >
                        {isPt ? 'Movimentos' : 'Movimientos'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. DISPOSITIVOS HARDWARE & TRAVA IMEI */}
      {subView === 'admin_dispositivos' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4">
          <div className="border-b pb-3 flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-[#8cc63f]" />
              <span>{isPt ? 'Dispositivos Autorizados & Segurança Antifurto' : 'Dispositivos'}</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">MDM Tracker Ativo</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-3 py-2.5">{isPt ? 'Trabalhador' : 'Trabajador'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Unidade' : 'Unidad'}</th>
                  <th className="px-3 py-2.5 font-mono">IMEI</th>
                  <th className="px-3 py-2.5">{isPt ? 'Modelo' : 'Modelo'}</th>
                  <th className="px-3 py-2.5 font-mono">PIN</th>
                  <th className="px-3 py-2.5">{isPt ? 'Status' : 'Estado'}</th>
                  <th className="px-4 py-2.5 text-center">{isPt ? 'Ações de Segurança' : 'Acciones'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devices.map((dev) => (
                  <tr key={dev.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-semibold text-slate-900">{dev.agentName}</td>
                    <td className="px-3 py-3 text-slate-600">{dev.unit}</td>
                    <td className="px-3 py-3 font-mono text-slate-600">{dev.imei}</td>
                    <td className="px-3 py-3 text-slate-700">{dev.model}</td>
                    <td className="px-3 py-3 font-mono text-slate-500">{dev.pin}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dev.status === 'activo'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {dev.status === 'activo' ? (isPt ? 'Autorizado' : 'Activo') : (isPt ? 'BLOQUEADO' : 'Bloqueado')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onToggleDevice(dev.id)}
                          className="px-2 py-1 rounded border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-[10px]"
                        >
                          {dev.status === 'activo' ? (isPt ? 'Bloquear' : 'Bloquear') : (isPt ? 'Desbloquear' : 'Desbloquear')}
                        </button>
                        <button
                          onClick={() => onWipeDevice(dev.id)}
                          className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px]"
                          title="Formatar dados remotamente"
                        >
                          Wipe Remoto
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
