import React, { useState } from 'react';
import { Language, ViewMode } from '../types';
import { BrandLogo } from '../components/BrandLogo';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Phone,
  HelpCircle,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface TryLoginViewProps {
  language: Language;
  onLoginSuccess: (mode: ViewMode) => void;
  brandVariant: 'maiscontrole' | 'trycontroller';
  onToggleBrandVariant: () => void;
}

export const TryLoginView: React.FC<TryLoginViewProps> = ({
  language,
  onLoginSuccess,
  brandVariant,
  onToggleBrandVariant,
}) => {
  const [email, setEmail] = useState('Ericknois99@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const isPt = language === 'pt';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('admin');
  };

  return (
    <div className="min-h-screen bg-[#50007d] flex flex-col items-center justify-center p-4 sm:p-6 text-slate-100 font-sans selection:bg-[#8cc63f] selection:text-slate-900">
      {/* Top Brand Toggle */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <button
          onClick={onToggleBrandVariant}
          className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-600 transition"
        >
          Marca: <b className="text-white">{brandVariant === 'maiscontrole' ? 'Mais Controle' : 'Try Controller'}</b>
        </button>
      </div>

      {/* Brand Logo in header matching screenshot */}
      <div className="mb-6 text-center flex flex-col items-center">
        <BrandLogo variant={brandVariant} inverted={true} className="scale-125" />
      </div>

      {/* Main White Card Container matching screenshot screencapture-trycontroller-co-2026-10-08-20_22_32.png */}
      <div className="bg-white text-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-300/30 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-black text-[#50007d] text-center mb-6">
          {isPt ? 'Bem-vindo' : 'Welcome'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#50007d] transition"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#50007d] transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-purple-800 hover:text-purple-950"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert(isPt ? 'Instruções enviadas para seu e-mail!' : 'Instrucciones enviadas'); }} className="text-xs text-slate-500 hover:text-[#50007d]">
              {isPt ? 'Esqueceu a senha?' : 'Forgot Password?'}
            </a>
          </div>

          {/* Lime Green Login Button matching screenshot */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#85c226] hover:bg-[#76b82a] text-white font-bold text-sm shadow-md transition active:scale-98"
          >
            {isPt ? 'Entrar / Login' : 'Login'}
          </button>

          <div className="text-center pt-2 text-slate-500 text-xs">
            {isPt ? 'Ainda não é cliente?' : 'Not a client yet?'}
          </div>

          {/* Lavender information button matching screenshot */}
          <button
            type="button"
            onClick={() => alert(isPt ? 'Consulte planos em https://maiscontrolecrm.com/' : 'Visita https://trycontroller.co/')}
            className="w-full py-2.5 rounded-lg bg-[#f4ecf8] hover:bg-[#ebdcf3] text-[#50007d] font-bold text-xs transition border border-purple-200"
          >
            {isPt ? 'Clique aqui para mais informações!' : 'Click here for more information!'}
          </button>
        </form>

        {/* Quick Testing Shortcuts */}
        <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
          <div className="text-[10px] uppercase font-bold text-slate-400 text-center tracking-wider">
            {isPt ? 'Ambiente de Teste para o Cliente' : 'Acceso Rápido'}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onLoginSuccess('admin')}
              className="p-2 rounded-lg bg-[#50007d] text-white font-bold text-center hover:bg-[#400066] transition shadow-xs"
            >
              💻 {isPt ? 'Web Master' : 'Web Admin'}
            </button>
            <button
              onClick={() => onLoginSuccess('mobile_app')}
              className="p-2 rounded-lg bg-[#76b82a] text-white font-bold text-center hover:bg-[#6aa822] transition shadow-xs"
            >
              📱 {isPt ? 'App Cobrador' : 'App Móvil'}
            </button>
          </div>
        </div>
      </div>

      {/* Support lines matching screenshot */}
      <div className="mt-8 text-center space-y-3">
        <span className="text-xs text-purple-200 font-semibold uppercase tracking-wider block">
          {isPt ? 'Linhas de Atendimento' : 'Líneas de atención'}
        </span>

        <div className="flex items-center justify-center space-x-3 text-xs">
          <a
            href="https://wa.me/573103520478"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2 rounded-lg border border-purple-300 text-white hover:bg-white/10 transition"
          >
            <span className="text-emerald-400 font-bold">WhatsApp</span>
            <span>{isPt ? 'Vendas' : 'Ventas'}</span>
          </a>

          <a
            href="https://wa.me/573103520478"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-5 py-2 rounded-lg border border-purple-300 text-white hover:bg-white/10 transition"
          >
            <span className="text-emerald-400 font-bold">WhatsApp</span>
            <span>{isPt ? 'Suporte' : 'Soporte'}</span>
          </a>
        </div>

        {/* Social Media icons matching screenshot */}
        <div className="pt-2">
          <span className="text-[11px] text-purple-300 block mb-2">
            {isPt ? 'Siga-nos nas redes sociais' : 'Follow us on social media'}
          </span>
          <div className="flex items-center justify-center space-x-3 text-white">
            <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-xs font-bold">f</span>
            <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-xs font-bold">ig</span>
            <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-xs font-bold">yt</span>
            <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-xs font-bold">tk</span>
          </div>
        </div>

        {/* Google Play Store Badge */}
        <div className="pt-2">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-black/40 border border-purple-400/30 text-[11px] text-white">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>DISPONÍVEL NO <b>Google Play</b></span>
          </div>
        </div>
      </div>
    </div>
  );
};
