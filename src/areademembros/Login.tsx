import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';

// ============================================================
// CREDENCIAIS DE ACESSO — altere aqui para personalizar
// ============================================================
const VALID_PASSWORD = 'xbolo2024';
// Qualquer e-mail funciona, desde que a senha seja correta.
// ============================================================

const AUTH_KEY = 'xbolo_user';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in or redirected from webhook with email/name, handle it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryName = params.get('name');
    const queryEmail = params.get('email');

    if (queryName) {
      localStorage.setItem('xbolo_user_name', queryName);
    }

    if (queryEmail) {
      localStorage.setItem(AUTH_KEY, queryEmail.trim().toLowerCase());
      navigate('/dashboard', { replace: true });
      return;
    }

    if (localStorage.getItem(AUTH_KEY)) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Informe seu e-mail de cadastro.');
      return;
    }
    if (!password.trim()) {
      setError('Informe sua senha.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (password === VALID_PASSWORD) {
        localStorage.setItem(AUTH_KEY, email.trim().toLowerCase());
        navigate('/dashboard', { replace: true });
      } else {
        setError('Senha incorreta. Verifique seus dados e tente novamente.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EA] flex flex-col items-center justify-center px-5 py-10 font-sans">

      {/* Logo — grande e centralizada */}
      <div className="mb-8 flex flex-col items-center space-y-3">
        <img
          src="https://i.ibb.co/QvybJJJH/image.png"
          alt="X-Bolo Lucrativo"
          className="h-44 w-auto object-contain drop-shadow-xl select-none"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col items-center space-y-0.5">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#4E2A1E]/40 uppercase">
            Área de Membros
          </span>
          <div className="w-10 h-0.5 rounded-full bg-[#F4C95D]/60" />
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-white rounded-3xl border border-[#E5DED3] shadow-xl overflow-hidden">

        {/* Card Header */}
        <div className="bg-gradient-to-br from-[#4E2A1E] to-[#6B3A2A] px-6 py-5 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4C95D]/10 rounded-full -translate-y-8 translate-x-8 blur-xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-4 blur-lg" />
          <h1 className="text-lg font-serif font-bold text-white relative z-10">
            Acesse sua conta
          </h1>
          <p className="text-xs text-white/50 mt-0.5 relative z-10">
            Insira seus dados para entrar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-6 py-6 space-y-4">

          {/* Error message */}
          {error && (
            <div className="flex items-start space-x-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-3">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#4E2A1E]/60 uppercase tracking-wider">
              E-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E2A1E]/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-3 bg-[#F5F1EA] border border-[#E5DED3] rounded-xl text-sm text-[#4E2A1E] placeholder-[#4E2A1E]/30 focus:outline-none focus:border-[#4E2A1E]/40 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-[#4E2A1E]/60 uppercase tracking-wider">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4E2A1E]/30" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-[#F5F1EA] border border-[#E5DED3] rounded-xl text-sm text-[#4E2A1E] placeholder-[#4E2A1E]/30 focus:outline-none focus:border-[#4E2A1E]/40 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4E2A1E]/30 hover:text-[#4E2A1E]/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F4C95D] hover:bg-[#e0b84d] text-[#4E2A1E] font-sans font-black py-3.5 rounded-xl tracking-wider transition-all active:scale-98 shadow-md shadow-[#F4C95D]/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm mt-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[#4E2A1E]/30 border-t-[#4E2A1E] rounded-full animate-spin" />
                <span>Verificando...</span>
              </>
            ) : (
              <span>ENTRAR NA ÁREA DE MEMBROS</span>
            )}
          </button>

          <p className="text-center text-[11px] text-[#4E2A1E]/40 leading-relaxed pt-1">
            Problemas para acessar? Entre em contato com o suporte via e-mail.
          </p>
        </form>
      </div>

      {/* Back to sales page */}
      <a
        href="/"
        className="mt-6 text-xs text-[#4E2A1E]/40 hover:text-[#4E2A1E]/70 underline underline-offset-2 transition-colors"
      >
        ← Voltar à página principal
      </a>
    </div>
  );
};
