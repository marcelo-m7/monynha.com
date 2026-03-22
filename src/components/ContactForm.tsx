import React, { useEffect, useRef, useState } from 'react';
import { ContactFormData } from '../types';
import { sendContactFormMessage } from '../services';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' });
  const nameRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setStatus('idle');
    setErrorMsg('');
    setForm({ name: '', email: '', message: '', phone: '' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameRef.current?.focus(), 100);
    } else {
      const t = setTimeout(resetForm, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const isValid = form.name.trim().length >= 2 && isEmailValid && form.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');

    const payload: ContactFormData = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    if (form.phone.trim()) payload.phone = form.phone.trim();

    try {
      await sendContactFormMessage(payload);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Algo correu mal. Tenta novamente ou escreve para hello@monynha.com');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Formulário de contato"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-near-black/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className="relative w-full sm:max-w-lg bg-[#FAFAFC] border-t-4 sm:border-4 border-near-black rounded-t-[32px] sm:rounded-[32px] shadow-brutalist p-6 sm:p-8 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Contato Direto</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tighter leading-none">
              Fala com a <span className="text-primary italic">Monynha.</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário de contato"
            className="shrink-0 w-10 h-10 flex items-center justify-center border-2 border-near-black/20 rounded-xl hover:border-near-black hover:bg-near-black hover:text-white transition-all text-near-black/40"
          >
            <span className="material-icons text-xl">close</span>
          </button>
        </div>

        {/* States */}
        {status === 'success' ? (
          <div className="flex flex-col items-center text-center py-10 space-y-5">
            <div className="w-20 h-20 bg-primary/10 border-4 border-primary rounded-3xl flex items-center justify-center">
              <span className="material-icons text-5xl text-primary">mark_email_read</span>
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-tight">Mensagem enviada!</h3>
            <p className="text-base font-medium text-near-black/60 italic leading-relaxed max-w-xs">
              Recebemos o teu contacto. A nossa equipa responde em até <strong>48h úteis</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="cf-name" className="block text-[10px] font-black uppercase tracking-widest text-near-black/50">
                  Nome *
                </label>
                <input
                  id="cf-name"
                  ref={nameRef}
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Como te chamam?"
                  className="w-full border-[3px] border-near-black rounded-xl p-3 text-base font-bold bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="cf-email" className="block text-[10px] font-black uppercase tracking-widest text-near-black/50">
                  E-mail *
                </label>
                <input
                  id="cf-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="seu@email.com"
                  className={`w-full border-[3px] rounded-xl p-3 text-base font-bold bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all ${form.email && !isEmailValid ? 'border-red-400' : 'border-near-black'}`}
                  required
                />
              </div>
            </div>

            {/* Phone (optional) */}
            <div className="space-y-1.5">
              <label htmlFor="cf-phone" className="block text-[10px] font-black uppercase tracking-widest text-near-black/50">
                Telefone / WhatsApp <span className="font-medium normal-case tracking-normal opacity-60">(opcional)</span>
              </label>
              <input
                id="cf-phone"
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+41 77 968 8872"
                className="w-full border-[3px] border-near-black/20 rounded-xl p-3 text-base font-bold bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="cf-message" className="block text-[10px] font-black uppercase tracking-widest text-near-black/50">
                Mensagem *
              </label>
              <textarea
                id="cf-message"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Conta-nos sobre o teu projeto, dúvida ou ideia..."
                rows={4}
                className="w-full border-[3px] border-near-black rounded-xl p-3 text-base font-bold bg-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                required
              />
            </div>

            {status === 'error' && (
              <p className="text-sm font-bold text-red-600 bg-red-50 border-2 border-red-200 rounded-xl p-3">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={!isValid || status === 'loading'}
                className="flex-1 px-5 py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl border-[3px] border-near-black shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="material-icons text-base animate-spin">refresh</span>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span className="material-icons text-base">send</span>
                    <span>Enviar mensagem</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3.5 border-[3px] border-near-black/20 text-near-black/50 font-black text-xs uppercase tracking-widest rounded-2xl hover:border-near-black hover:text-near-black transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
