import React, { useState } from 'react';
import {
  ApprovalRequestItem,
  Language,
  SubViewSection,
} from '../types';
import {
  MapPin,
  CheckCircle,
  XCircle,
  Shield,
  CreditCard,
  FileCheck,
  AlertCircle,
  Eye,
  Check,
  X,
  Search,
  Filter,
  Users
} from 'lucide-react';

interface TryGeneralViewProps {
  subView: SubViewSection;
  onNavigateSubView: (sub: SubViewSection) => void;
  approvals: ApprovalRequestItem[];
  onApprove: (id: string, notes: string) => void;
  onReject: (id: string, reason: string) => void;
  language: Language;
}

export const TryGeneralView: React.FC<TryGeneralViewProps> = ({
  subView,
  onNavigateSubView,
  approvals,
  onApprove,
  onReject,
  language,
}) => {
  const [approvalTab, setApprovalTab] = useState<'transferencias' | 'preventas' | 'pregastos' | 'llaves'>('transferencias');
  
  // Layer toggles for Map
  const [layers, setLayers] = useState({
    ventas: true,
    ingresos: true,
    pagoVentas: true,
    egresos: true,
  });

  const [selectedAgentOnMap, setSelectedAgentOnMap] = useState<string | null>('agent-1');

  const isPt = language === 'pt';

  const formatCurrency = (val: number) => {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Approval bubble counts matching PDF slide 5
  const countTransferencias = approvals.filter((a) => a.module === 'transferencias' && a.status === 'pendiente').length;
  const countPreVentas = approvals.filter((a) => a.module === 'preventas' && a.status === 'pendiente').length;
  const countPreGastos = approvals.filter((a) => a.module === 'pregastos' && a.status === 'pendiente').length;
  const countLlaves = approvals.filter((a) => a.module === 'llaves' && a.status === 'pendiente').length;

  const currentModuleApprovals = approvals.filter((a) => a.module === approvalTab);

  return (
    <div className="space-y-4">
      {/* Sub Tabs for General: Mapa, Facturación, Aprobaciones, Seguros */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-2 flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={() => onNavigateSubView('general_mapa')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
            subView === 'general_mapa'
              ? 'bg-[#50007d] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <MapPin className="w-4 h-4 text-[#8cc63f]" />
          <span>{isPt ? 'Mapa em Tempo Real' : 'Mapa'}</span>
        </button>

        <button
          onClick={() => onNavigateSubView('general_aprobaciones')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
            subView === 'general_aprobaciones'
              ? 'bg-[#50007d] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4 text-[#8cc63f]" />
          <span>{isPt ? 'Central de Aprovações' : 'Aprobaciones'}</span>
          {(countTransferencias + countPreVentas + countPreGastos + countLlaves) > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-black">
              {countTransferencias + countPreVentas + countPreGastos + countLlaves}
            </span>
          )}
        </button>

        <button
          onClick={() => onNavigateSubView('general_facturacion')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
            subView === 'general_facturacion'
              ? 'bg-[#50007d] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4 text-[#8cc63f]" />
          <span>{isPt ? 'Faturamento & Licenças' : 'Facturación'}</span>
        </button>

        <button
          onClick={() => onNavigateSubView('general_seguros')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg font-bold transition ${
            subView === 'general_seguros'
              ? 'bg-[#50007d] text-white shadow-xs'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4 text-[#8cc63f]" />
          <span>{isPt ? 'Seguros & Repatriação' : 'Seguros'}</span>
        </button>
      </div>

      {/* VIEW 1: MAPA EM TEMPO REAL matching screenshot */}
      {subView === 'general_mapa' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          {/* Top Filter and Layer Checkboxes matching screenshot */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  {isPt ? 'Data de Consulta *' : 'Desde *'}
                </span>
                <input
                  type="date"
                  defaultValue="2026-10-08"
                  className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-medium text-xs text-slate-800"
                />
              </div>
            </div>

            {/* Layer Checkboxes matching TryController screenshot */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={layers.ventas}
                  onChange={() => setLayers({ ...layers, ventas: !layers.ventas })}
                  className="w-4 h-4 rounded text-[#76b82a] border-slate-300"
                />
                <span className="font-semibold text-purple-900 flex items-center gap-1">
                  💲 {isPt ? 'Vendas' : 'Ventas'}
                </span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={layers.pagoVentas}
                  onChange={() => setLayers({ ...layers, pagoVentas: !layers.pagoVentas })}
                  className="w-4 h-4 rounded text-[#76b82a] border-slate-300"
                />
                <span className="font-semibold text-indigo-900 flex items-center gap-1">
                  📈 {isPt ? 'Pagamentos' : 'Pago Ventas'}
                </span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={layers.ingresos}
                  onChange={() => setLayers({ ...layers, ingresos: !layers.ingresos })}
                  className="w-4 h-4 rounded text-[#76b82a] border-slate-300"
                />
                <span className="font-semibold text-emerald-900 flex items-center gap-1">
                  ➔💲 {isPt ? 'Entradas' : 'Ingresos'}
                </span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={layers.egresos}
                  onChange={() => setLayers({ ...layers, egresos: !layers.egresos })}
                  className="w-4 h-4 rounded text-[#76b82a] border-slate-300"
                />
                <span className="font-semibold text-rose-900 flex items-center gap-1">
                  ➔💲 {isPt ? 'Saídas / Gastos' : 'Egresos'}
                </span>
              </label>
            </div>
          </div>

          {/* Interactive Map Visual Area */}
          <div className="relative w-full h-[540px] rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
            {/* Map Canvas Background (Simulating Google Map view seen in screenshot) */}
            <div className="absolute inset-0 bg-[#e5e3df] bg-[radial-gradient(#d4d0c8_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Simulated Map Streets & Highways */}
              <svg className="w-full h-full opacity-40" viewBox="0 0 1000 600">
                <path d="M 50 150 Q 300 200 600 120 T 950 250" fill="none" stroke="#ffffff" strokeWidth="14" />
                <path d="M 120 500 Q 400 450 700 480 T 980 400" fill="none" stroke="#ffffff" strokeWidth="12" />
                <path d="M 280 20 L 290 580" fill="none" stroke="#ffebc2" strokeWidth="8" />
                <path d="M 680 40 L 670 560" fill="none" stroke="#ffebc2" strokeWidth="8" />
                {/* Secondary streets */}
                <path d="M 100 280 L 900 310" fill="none" stroke="#ffffff" strokeWidth="6" />
                <path d="M 450 50 L 460 550" fill="none" stroke="#ffffff" strokeWidth="6" />
              </svg>
            </div>

            {/* Map Legend Banner matching TryController PDF slide */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-lg px-3 py-2 shadow-md border border-slate-200 text-[11px] flex items-center space-x-4 z-10">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
                <span className="font-medium text-slate-700">{isPt ? 'Trabalhador Vinculado' : 'Trabajador vinculado'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-400 border border-white"></span>
                <span className="font-medium text-slate-700">{isPt ? 'Trabalhador Desvinculado' : 'Trabajador desvinculado'}</span>
              </div>
              <div className="text-slate-400 font-mono">
                {isPt ? 'Total de Agentes Ativos: 3' : 'Cantidad de trabajadores: 3'}
              </div>
            </div>

            {/* Field Agents Markers */}
            {[
              { id: 'agent-1', name: 'Carlos Oliveira', ugi: 'UGI-1', x: '35%', y: '42%', active: true, phone: '(11) 98451-2290', lastSync: '14:47:51' },
              { id: 'agent-2', name: 'Roberto Mendes', ugi: 'UGI-2', x: '58%', y: '34%', active: true, phone: '(11) 97103-8841', lastSync: '14:45:10' },
              { id: 'agent-3', name: 'Marcos Silveira', ugi: 'UGI-3', x: '72%', y: '68%', active: true, phone: '(11) 99120-4412', lastSync: '14:40:02' },
              { id: 'agent-4', name: 'Lucas Barreto', ugi: 'UGI-5', x: '22%', y: '65%', active: false, phone: '(21) 99312-0044', lastSync: '09:12:00' },
            ].map((agent) => (
              <div
                key={agent.id}
                style={{ left: agent.x, top: agent.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedAgentOnMap(agent.id)}
              >
                {/* Marker Pin */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 border-2 border-white ${
                      agent.active ? 'bg-[#76b82a]' : 'bg-slate-400'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="mt-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-bold font-mono whitespace-nowrap shadow-xs">
                    {agent.ugi} - {agent.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}

            {/* Agent Info Popup matching PDF slide 2 */}
            {selectedAgentOnMap && (
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-72 text-xs z-30 animate-in fade-in">
                <div className="flex justify-between items-start border-b pb-2 mb-2">
                  <div>
                    <h5 className="font-bold text-slate-900">Carlos Oliveira (UGI-1)</h5>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Trabalhador Vinculado • Em Rota
                    </span>
                  </div>
                  <button onClick={() => setSelectedAgentOnMap(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1.5 text-slate-700">
                  <p><b className="text-slate-500">Telefone:</b> (11) 98451-2290</p>
                  <p><b className="text-slate-500">ID Unidade:</b> 1 - UGI-1</p>
                  <p><b className="text-slate-500">Data / Hora Sinc:</b> 08/10/2026 14:47:51</p>
                  <p><b className="text-slate-500">Endereço Atual:</b> Av. Rangel Pestana, 412 - Brás</p>
                  <p><b className="text-slate-500">Arrecadação Hoje:</b> <span className="font-mono font-bold text-emerald-700">R$ 6.450,00</span></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CENTRAL DE APROVAÇÕES com as bolhas "BURBUJAS" matching PDF slide 5 */}
      {subView === 'general_aprobaciones' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {isPt ? 'Módulo de Aprovações & Exceções' : 'Módulo de Aprobaciones'}
              </h3>
              <p className="text-xs text-slate-500">
                {isPt
                  ? 'Cada vez que são enviadas transferências, pré-vendas, pré-gastos e chaves, o sistema indica por meio de BOLHAS a quantidade pendente.'
                  : 'Cada vez que se envíen transferencias, Pre Ventas, Pre Gastos y Llaves, el sistema indica por medio de "BURBUJAS" la cantidad pendiente.'}
              </p>
            </div>
          </div>

          {/* Bubble Tabs ("BURBUJAS") matching PDF slide 5 */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setApprovalTab('transferencias')}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs transition border ${
                approvalTab === 'transferencias'
                  ? 'bg-[#8cc63f] text-slate-900 border-[#7cb342] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>↑↓ {isPt ? 'Transferências' : 'Transferencias'}</span>
              {countTransferencias > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  {countTransferencias}
                </span>
              )}
            </button>

            <button
              onClick={() => setApprovalTab('preventas')}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs transition border ${
                approvalTab === 'preventas'
                  ? 'bg-[#8cc63f] text-slate-900 border-[#7cb342] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>$ {isPt ? 'Pré-Vendas' : 'Pre Ventas'}</span>
              {countPreVentas > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  {countPreVentas}
                </span>
              )}
            </button>

            <button
              onClick={() => setApprovalTab('pregastos')}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs transition border ${
                approvalTab === 'pregastos'
                  ? 'bg-[#8cc63f] text-slate-900 border-[#7cb342] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>$ {isPt ? 'Pré-Gastos' : 'Pre Gastos'}</span>
              {countPreGastos > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  {countPreGastos}
                </span>
              )}
            </button>

            <button
              onClick={() => setApprovalTab('llaves')}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-xs transition border ${
                approvalTab === 'llaves'
                  ? 'bg-[#8cc63f] text-slate-900 border-[#7cb342] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>🔑 {isPt ? 'Chaves (Llaves)' : 'Llaves'}</span>
              {countLlaves > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                  {countLlaves}
                </span>
              )}
            </button>
          </div>

          {/* Table matching PDF slide 5 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-[#8cc63f] text-slate-900 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-3 py-2.5">{isPt ? 'Data Solicitação' : 'Fecha de solicitud'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'ID Caixa' : 'Id Caja'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Unidade' : 'Unidad'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Centro de Negócios' : 'Centro de negocios'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Tipo Movimento' : 'Tipo de movimiento'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Descrição / Motivo' : 'Descripción'}</th>
                  <th className="px-3 py-2.5 text-right">{isPt ? 'Valor' : 'Valor'}</th>
                  <th className="px-3 py-2.5">{isPt ? 'Solicitante' : 'Solicitado por'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Rejeitar' : 'Rechazar'}</th>
                  <th className="px-3 py-2.5 text-center">{isPt ? 'Aceitar' : 'Aceptar'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentModuleApprovals.map((item, i) => (
                  <tr key={item.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-3 py-3 font-mono text-slate-600 text-[11px]">{item.date}</td>
                    <td className="px-3 py-3 font-mono">{item.boxId}</td>
                    <td className="px-3 py-3 font-semibold text-slate-900">{item.unitName}</td>
                    <td className="px-3 py-3 text-slate-600 text-[11px] truncate max-w-xs">{item.businessCenter}</td>
                    <td className="px-3 py-3 font-medium text-slate-800">{item.movementType}</td>
                    <td className="px-3 py-3 text-slate-600">
                      <div>{item.description}</div>
                      {item.justification && (
                        <div className="text-[10px] text-slate-400 italic">Motivo: {item.justification}</div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right font-mono font-bold text-slate-900">
                      R$ {formatCurrency(item.value)}
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-700">{item.requestedBy}</td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => onReject(item.id, 'Recusado pelo Administrador')}
                        className="w-7 h-7 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 inline-flex items-center justify-center font-bold"
                        title="Rejeitar solicitação"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        onClick={() => onApprove(item.id, 'Aprovado via Web Master')}
                        className="w-7 h-7 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 inline-flex items-center justify-center font-bold"
                        title="Aceitar solicitação"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: FACTURACIÓN & ALERTA DE BLOQUEIO matching PDF slide 2/4 */}
      {subView === 'general_facturacion' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div className="border-b pb-4 flex justify-between items-start">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {isPt ? 'Rotina de Faturamento & Pagamento de Licenças' : 'Rutina Facturación'}
              </h3>
              <p className="text-xs text-slate-500">
                {isPt ? 'Controle de mensalidades de UGIs ativas. Atenção: 3 faturas em aberto bloqueiam emissão de relatórios.' : 'Control de facturación de UGIs.'}
              </p>
            </div>
            {/* Payment gateways */}
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-800 font-bold text-[10px]">Pagadito</span>
              <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">SafetyPay</span>
              <span className="px-2 py-1 rounded bg-purple-50 text-purple-800 font-bold text-[10px]">Pix CN</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* UGI Card 1 */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900">7215 - UGI-7215 (Centro)</span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 text-[10px]">
                  {isPt ? 'Em Dia' : 'Al día'}
                </span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p>Faturas Pendentes: <b>0</b></p>
                <p>Caixas Ativos: <b>4</b></p>
                <p>Total a Pagar: <b className="font-mono text-emerald-700">R$ 0,00</b></p>
              </div>
            </div>

            {/* UGI Card 2 (With overdue alert matching PDF slide) */}
            <div className="border border-amber-300 rounded-xl p-4 bg-amber-50/60 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900">414 - 414 Sprint5 (Reserva)</span>
                <span className="px-2 py-0.5 rounded-full font-bold bg-amber-200 text-amber-900 text-[10px]">
                  {isPt ? '1 Fatura Aberta' : '1 Factura'}
                </span>
              </div>
              <div className="space-y-1 text-slate-700">
                <p>Faturas Pendentes: <b>1</b></p>
                <p>Caixas Ativos: <b>2</b></p>
                <p>Total a Pagar: <b className="font-mono text-slate-900">R$ 1.000,00</b></p>
              </div>
              <button
                onClick={() => alert(isPt ? 'Redirecionando para gateway de pagamento Pix/SafetyPay...' : 'Redirigiendo a pasarela de pagos...')}
                className="w-full py-2 rounded-lg bg-[#50007d] hover:bg-[#400066] text-white font-bold text-xs"
              >
                {isPt ? 'Pagar Fatura' : 'Pagar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: SEGUROS & REPATRIAÇÃO */}
      {subView === 'general_seguros' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-4 text-xs">
          <div className="border-b pb-3 flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-900">
              {isPt ? 'Serviço de Seguro & Repatriação' : 'Servicio de Repatriación'}
            </h3>
            <span className="bg-[#8cc63f] text-slate-900 font-bold px-2 py-0.5 rounded text-[10px]">
              {isPt ? 'Vinculação em Poucos Cliques' : 'Vinculación ágil'}
            </span>
          </div>
          <p className="text-slate-600">
            {isPt
              ? 'Conheça os termos e condições ao solicitar o serviço de Repatriação e seguro de vida para trabalhadores e cobradores de rota.'
              : 'Conoce los términos y condiciones al momento de solicitar el Servicio de Repatriación.'}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
            <h5 className="font-bold text-slate-900">Términos y Condiciones (T&C)</h5>
            <p className="text-[11px] leading-relaxed">
              1. Afiliado Principal: Entre 18 e 64 anos de idade.<br />
              2. Carências: 30 dias para morte acidental ou violenta, 90 dias para morte natural diagnosticada.<br />
              3. Características: Trâmites legais, cofre hermético, translado do corpo ao aeroporto internacional mais próximo da cidade de destino final.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
