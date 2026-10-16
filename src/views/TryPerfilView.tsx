import React, { useState } from 'react';
import { Language } from '../types';
import { User, CheckCircle2, Shield, Key, History, Save } from 'lucide-react';

interface TryPerfilViewProps {
  language: Language;
}

export const TryPerfilView: React.FC<TryPerfilViewProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'senha' | 'atividade'>('perfil');
  const [isSaved, setIsSaved] = useState(false);

  // Form states matching screenshot
  const [primerNombre, setPrimerNombre] = useState('ERICSON');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('APARECIDO');
  const [segundoApellido, setSegundoApellido] = useState('VICENTE');
  const [numeroDoc, setNumeroDoc] = useState('490129894');
  const [pais, setPais] = useState('Brasil');
  const [estado, setEstado] = useState('São Paulo');
  const [cidade, setCidade] = useState('Guarulhos');
  const [email, setEmail] = useState('Ericknois99@gmail.com');

  const isPt = language === 'pt';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {isPt ? 'Meu Perfil de Usuário' : 'Mi Perfil'}
          </h2>
          <p className="text-xs text-slate-500">
            {isPt ? 'Configurações de conta e dados de acesso' : 'Detalles de la cuenta'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'perfil'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isPt ? 'Atualizar Perfil' : 'Actualizar Perfil'}
          </button>
          <button
            onClick={() => setActiveTab('senha')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'senha'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isPt ? 'Alterar Senha' : 'Cambiar Contraseña'}
          </button>
          <button
            onClick={() => setActiveTab('atividade')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              activeTab === 'atividade'
                ? 'bg-[#50007d] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isPt ? 'Minha Atividade' : 'Mi Actividad'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side Profile Card matching screenshot */}
        <div className="md:col-span-4 bg-white rounded-xl shadow-xs border border-slate-200 p-6 text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-[#50007d] text-white mx-auto flex items-center justify-center text-3xl font-black shadow-md border-4 border-purple-100">
            EA
          </div>

          <div>
            <h3 className="font-black text-base text-slate-900 uppercase">
              {primerNombre} {primerApellido}
            </h3>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#8cc63f] text-slate-900">
              Administrador Master
            </span>
          </div>

          <div className="border-t border-slate-100 pt-4 text-left text-xs space-y-2.5 text-slate-600">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                {isPt ? 'Nome de Usuário' : 'Usuario'}
              </span>
              <span className="font-mono font-medium text-slate-800">{email}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                {isPt ? 'Última Conexão' : 'Última Conexión'}
              </span>
              <span className="font-mono text-slate-800">08/10/2026 18:47:54</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                {isPt ? 'Último IP de Acesso' : 'Última IP'}
              </span>
              <span className="font-mono text-slate-800">4.249.138.56</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">
                {isPt ? 'Total de Acessos à Plataforma' : 'Total Accesos'}
              </span>
              <span className="font-mono font-bold text-[#50007d]">608 acessos</span>
            </div>
          </div>
        </div>

        {/* Right Side Form matching screenshot */}
        <div className="md:col-span-8 bg-white rounded-xl shadow-xs border border-slate-200 p-6 space-y-6">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* Section 1: Detalles personales */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 pb-1 border-b border-slate-100">
                1. {isPt ? 'Detalhes Pessoais' : 'Detalles personales'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Primeiro Nome' : 'Primer Nombre'}
                  </label>
                  <input
                    type="text"
                    value={primerNombre}
                    onChange={(e) => setPrimerNombre(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:border-[#50007d]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Segundo Nome' : 'Segundo Nombre'}
                  </label>
                  <input
                    type="text"
                    value={segundoNombre}
                    onChange={(e) => setSegundoNombre(e.target.value)}
                    placeholder={isPt ? 'Inserir segundo nome' : 'ingresar Segundo Nombre aquí'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:border-[#50007d]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Primeiro Sobrenome' : 'Primer Apellido'}
                  </label>
                  <input
                    type="text"
                    value={primerApellido}
                    onChange={(e) => setPrimerApellido(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:border-[#50007d]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Segundo Sobrenome' : 'Segundo Apellido'}
                  </label>
                  <input
                    type="text"
                    value={segundoApellido}
                    onChange={(e) => setSegundoApellido(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:border-[#50007d]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Número do Documento (CPF / RG)' : 'Número de Documento'}
                  </label>
                  <input
                    type="text"
                    value={numeroDoc}
                    onChange={(e) => setNumeroDoc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium font-mono focus:border-[#50007d]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Dirección */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 pb-1 border-b border-slate-100">
                2. {isPt ? 'Endereço e Localização' : 'Dirección'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'País' : 'País'}
                  </label>
                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
                  >
                    <option value="Brasil">Brasil</option>
                    <option value="Colômbia">Colômbia</option>
                    <option value="México">México</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Estado' : 'Estado'}
                  </label>
                  <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
                  >
                  </input>
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Cidade' : 'Ciudad'}
                  </label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Conta Mais Controle / Try Controller */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 pb-1 border-b border-slate-100">
                3. {isPt ? 'Credenciais da Conta Mais Controle' : 'Cuenta TryController'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'Nome de Usuário' : 'Nombre de Usuario'}
                  </label>
                  <input
                    type="text"
                    value={email}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-600 block mb-1">
                    {isPt ? 'E-mail Cadastrado' : 'Correo electrónico'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Buttons matching screenshot */}
            <div className="pt-4 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={() => alert(isPt ? 'Edição cancelada' : 'Cancelado')}
                className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
              >
                {isPt ? 'Cancelar' : 'Cancelar'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#8cc63f] hover:bg-[#7cb342] text-slate-900 font-black transition shadow-xs flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaved ? (isPt ? '✓ Salvo!' : '✓ Guardado') : (isPt ? 'Salvar Alterações' : 'Guardar Cambios')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
