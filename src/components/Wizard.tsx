import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LeadData, RevenueModel, DecisionProfile } from '../types';

interface WizardProps {
  onComplete: (data: LeadData) => void;
  onCancel: () => void;
  error?: string | null;
}

const STORAGE_KEY = 'monynha_wizard_draft_v1';

const TOOLTIPS_REVENUE = {
  'Serviço': 'Venda de expertise, consultoria ou mão de obra especializada.',
  'Produto': 'Venda de itens físicos ou digitais escaláveis.',
  'Assinatura': 'Pagamentos recorrentes por acesso contínuo.',
  'Outro': 'Modelos híbridos ou nichos específicos.'
};

const CARD_REVENUE_DESCRIPTIONS = {
  'Serviço': 'Consultoria, operação ou execução personalizada.',
  'Produto': 'Itens físicos ou digitais prontos para escala.',
  'Assinatura': 'Receita recorrente com acesso contínuo.',
  'Outro': 'Formato híbrido ou modelo fora do padrão.'
};

const TOOLTIPS_DECISION = {
  'Faço tudo': 'Você é a "eu-presa" e cuida do operacional ao estratégico.',
  'Prefiro contratar alguém para fazer': 'Busca especialistas para focar no seu core business.',
  'Estou mais procupade em vender': 'Foca no comercial e quer automação total na entrega.',
  'Não sei ainda, to perdide': 'Precisa de clareza sobre como delegar ou crescer.'
};

const CARD_DECISION_DESCRIPTIONS = {
  'Faço tudo': 'Centraliza a operação e a estratégia no dia a dia.',
  'Prefiro contratar alguém para fazer': 'Quer time ou parceiros tocando a entrega.',
  'Estou mais procupade em vender': 'Prioriza vendas e deseja execução automatizada.',
  'Não sei ainda, to perdide': 'Busca clareza para delegar e escalar.'
};

const AnimatedTextField: React.FC<{
  value: string;
  onChange: (val: string) => void;
  id?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  isValid?: boolean;
}> = ({ value, onChange, id, placeholder, type = "text", className = "", disabled = false, autoFocus = false, inputRef, isValid }) => {
  return (
    <div className={`relative w-full group transition-transform duration-300 ${isValid && value ? 'scale-[1.01]' : ''}`}>
      <div 
        className={`absolute inset-0 p-3 sm:p-4 text-lg sm:text-xl font-bold flex flex-wrap items-center pointer-events-none select-none overflow-hidden whitespace-pre font-body ${disabled ? 'opacity-30' : ''}`}
        aria-hidden="true"
      >
        {value.split('').map((char, i) => (
          <span 
            key={`${i}-${char}`} 
            className="inline-block animate-char-reveal text-near-black"
            style={{ animationDelay: `${i * 0.02}s` }}
          >
            {char}
          </span>
        ))}
        {value.length === 0 && (
          <span className="text-black/10">{placeholder}</span>
        )}
      </div>

      <input
        id={id}
        ref={inputRef}
        autoFocus={autoFocus}
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} w-full bg-transparent border-[3px] sm:border-[4px] p-3 sm:p-4 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all caret-primary text-transparent selection:bg-primary/30 font-body min-h-[3rem] sm:min-h-[3.5rem]`}
      />
    </div>
  );
};

const AnimatedTextAreaField: React.FC<{
  value: string;
  onChange: (val: string) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  autoFocus?: boolean;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}> = ({ value, onChange, id, placeholder, className = "", rows = 3, autoFocus = false, textareaRef }) => {
  return (
    <div className="relative w-full group">
      <div 
        className="absolute inset-0 p-4 sm:p-6 text-lg sm:text-xl font-bold pointer-events-none select-none whitespace-pre-wrap break-words overflow-hidden font-body"
        aria-hidden="true"
      >
        {value.split('').map((char, i) => (
          <span 
            key={`${i}-${char}`} 
            className="inline-block animate-char-reveal text-near-black"
            style={{ animationDelay: `${i * 0.01}s` }}
          >
            {char}
          </span>
        ))}
        {value.length === 0 && (
          <span className="text-black/10">{placeholder}</span>
        )}
      </div>

      <textarea
        id={id}
        ref={textareaRef}
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${className} w-full bg-transparent border-[3px] sm:border-[4px] p-4 sm:p-6 text-lg sm:text-xl font-bold rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none resize-none caret-primary text-transparent selection:bg-primary/30 font-body min-h-[6rem] sm:min-h-[8rem]`}
      />
    </div>
  );
};

const Tooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-white border-2 border-near-black shadow-brutalist-purple rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 scale-90 group-hover:scale-100">
    <p className="text-[10px] font-black uppercase tracking-widest text-near-black leading-tight">
      {text}
    </p>
    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-near-black"></div>
  </div>
);

const Wizard: React.FC<WizardProps> = ({ onComplete, onCancel, error }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [formData, setFormData] = useState<LeadData>({
    email: '',
    brand_name: '',
    no_brand: false,
    revenue_model: 'Serviço',
    decision_profile: 'Faço tudo',
    website: '',
    instagram: '',
    linkedin: '',
    struggle: ''
  });

  const mainInputRef = useRef<HTMLInputElement>(null);
  const mainTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const CORE_STEPS = [2, 3, 4, 5];
  const totalCoreSteps = CORE_STEPS.length;
  
  const currentCoreStepIndex = CORE_STEPS.indexOf(step);
  const currentCoreStepDisplay = currentCoreStepIndex !== -1 ? currentCoreStepIndex + 1 : null;

  useEffect(() => {
    const draft = localStorage.getItem(STORAGE_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed.data);
        setStep(parsed.step);
      } catch (e) {
        console.error("Error loading draft", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data: formData }));
  }, [step, formData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mainInputRef.current) mainInputRef.current.focus();
      else if (mainTextAreaRef.current) mainTextAreaRef.current.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, [step]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  useEffect(() => {
    setIsEmailValid(!!validateEmail(formData.email || ''));
  }, [formData.email]);

  const nextStep = useCallback(() => {
    if (step < 6) {
      setDirection('next');
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      localStorage.removeItem(STORAGE_KEY);
      onComplete(formData);
    }
  }, [step, formData, onComplete]);

  const prevStep = () => {
    if (step === 1) {
      onCancel();
    } else {
      setDirection('prev');
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isStepValid = useCallback(() => {
    if (step === 1) return isEmailValid;
    if (step === 2) return formData.no_brand || formData.brand_name.trim().length > 1;
    if (step === 5) return formData.struggle.length >= 10;
    return true;
  }, [step, isEmailValid, formData.no_brand, formData.brand_name, formData.struggle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isStepValid() && !e.shiftKey) {
        if (step !== 5 || (step === 5 && formData.struggle.length >= 10)) {
           nextStep();
        }
      }
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, isStepValid, onCancel, step, formData.struggle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid()) nextStep();
  };

  const totalWizardSteps = 6;
  const progress = ((step - 1) / (totalWizardSteps - 1)) * 100;

  const renderStep = () => {
    const animationClass = direction === 'next' ? 'animate-step-next' : 'animate-step-prev';
    const stepKey = `step-${step}-${direction}`;

    switch (step) {
      case 1:
        return (
          <div key={stepKey} className={`space-y-4 sm:space-y-6 text-center w-full max-w-4xl mx-auto ${animationClass} px-4`}>
            <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-black leading-tight">
              Oi, moninha! <br/>
              <span className="text-primary italic">Diz-me o teu melhor e-mail</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium text-near-black/50 italic mb-4 sm:mb-6">
              Pra gente dar o close certo com o pé direito (e o look pronto).
            </p>
            <div className="max-w-xl mx-auto space-y-3 sm:space-y-4">
              <div className="relative group">
                <label htmlFor="email" className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/50 mb-1 sm:mb-2 text-left group-focus-within:text-primary transition-colors">Seu melhor e-mail</label>
                <AnimatedTextField
                  id="email"
                  inputRef={mainInputRef}
                  autoFocus
                  type="email"
                  value={formData.email}
                  isValid={isEmailValid}
                  onChange={val => setFormData({...formData, email: val})}
                  placeholder="exemplo@sua-empresa.com"
                  className={`${formData.email && !isEmailValid ? 'border-red-500' : 'border-near-black'} shadow-brutalist transition-all`}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div key={stepKey} className={`space-y-4 sm:space-y-6 text-center w-full max-w-4xl mx-auto ${animationClass} px-4`}>
            <h1 className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-black leading-tight">
              Qual é a tua <br/> <span className="text-primary italic">marca?</span>
            </h1>
            <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
              <div className="relative">
                <label htmlFor="brand_name" className="block text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/50 mb-1 sm:mb-2 text-left group-focus-within:text-primary transition-colors">Nome da Empresa ou Projeto</label>
                <AnimatedTextField 
                  id="brand_name"
                  inputRef={mainInputRef}
                  autoFocus
                  disabled={formData.no_brand}
                  value={formData.brand_name}
                  isValid={formData.brand_name.length > 1}
                  onChange={val => setFormData({...formData, brand_name: val})}
                  placeholder="Ex: Monynha Labs"
                  className="border-near-black shadow-brutalist transition-all disabled:opacity-30 disabled:bg-gray-50"
                />
              </div>
              <label htmlFor="no_brand" className="flex items-center gap-2 sm:gap-3 group text-left p-3 sm:p-4 rounded-xl hover:bg-black/5 transition-all border-2 border-transparent hover:border-black/5 active:scale-[0.98] min-h-[3rem]">
                <input 
                  id="no_brand"
                  type="checkbox" 
                  checked={formData.no_brand}
                  onChange={e => setFormData({...formData, no_brand: e.target.checked, brand_name: e.target.checked ? '' : formData.brand_name})}
                  className="h-5 w-5 sm:h-6 sm:w-6 rounded border-4 border-near-black bg-white text-primary focus:ring-2 focus:ring-primary checked:bg-near-black transition-transform active:scale-90"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-lg sm:text-xl text-near-black uppercase tracking-tight group-hover:text-primary transition-colors">Ainda não tenho nome</span>
                </div>
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div key={stepKey} className={`space-y-4 sm:space-y-6 text-center w-full max-w-4xl mx-auto ${animationClass} px-4`}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-black leading-tight break-words">
              Como entra <br/><span className="text-primary italic">o faturamento?</span>
            </h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto text-left">
              {(['Serviço', 'Produto', 'Assinatura', 'Outro'] as RevenueModel[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setFormData({...formData, revenue_model: m})}
                  className={`w-full group relative p-3 xs:p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-[2px] xs:border-[3px] sm:border-[4px] transition-all flex flex-col gap-2 sm:gap-3 md:gap-4 shadow-brutalist hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[5.5rem] xs:min-h-[6rem] sm:min-h-[7rem] md:min-h-[8rem] ${formData.revenue_model === m ? 'border-primary bg-primary/5 shadow-[4px_4px_0px_0px_#9767e4] sm:shadow-[6px_6px_0px_0px_#9767e4]' : 'border-near-black bg-white'}`}
                >
                  <Tooltip text={TOOLTIPS_REVENUE[m]} />
                  <div className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border-2 border-near-black flex items-center justify-center transition-transform ${formData.revenue_model === m ? 'bg-primary text-white scale-110' : 'bg-primary/10 text-near-black group-hover:scale-105'}`}>
                    <span className="material-icons text-lg xs:text-xl sm:text-2xl" aria-hidden="true">{m === 'Serviço' ? 'handshake' : m === 'Produto' ? 'inventory_2' : m === 'Assinatura' ? 'subscriptions' : 'more_horiz'}</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-black uppercase italic tracking-tighter">{m}</h3>
                  </div>
                  <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-near-black/60 leading-snug">
                    {CARD_REVENUE_DESCRIPTIONS[m]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div key={stepKey} className={`space-y-4 sm:space-y-6 text-center w-full max-w-4xl mx-auto ${animationClass} px-4`}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-black leading-tight break-words">
              Quem bate o martelo <br/><span className="text-primary italic">nas decisões?</span>
            </h1>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto w-full">
              {(['Faço tudo', 'Prefiro contratar alguém para fazer', 'Estou mais procupade em vender', 'Não sei ainda, to perdide'] as DecisionProfile[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({...formData, decision_profile: p})}
                  className={`w-full group relative flex flex-col p-3 xs:p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-[2px] xs:border-[3px] sm:border-[4px] transition-all text-left shadow-brutalist hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[5.5rem] xs:min-h-[6rem] sm:min-h-[7rem] md:min-h-[8rem] ${formData.decision_profile === p ? 'border-primary bg-primary/5 shadow-[4px_4px_0px_0px_#9767e4] sm:shadow-[6px_6px_0px_0px_#9767e4]' : 'border-near-black bg-white'}`}
                >
                  <Tooltip text={TOOLTIPS_DECISION[p]} />
                  <div className={`w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl border-2 border-near-black flex items-center justify-center mb-2 sm:mb-3 md:mb-4 transition-all ${formData.decision_profile === p ? 'bg-primary text-white scale-110' : 'bg-primary/10 text-near-black group-hover:scale-105'}`}>
                    <span className="material-symbols-outlined text-lg xs:text-xl sm:text-2xl" aria-hidden="true">{p === 'Faço tudo' ? 'person_celebrate' : p === 'Prefiro contratar alguém para fazer' ? 'payments' : p === 'Não sei ainda, to perdide' ? 'help_center' : 'trending_up'}</span>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-black uppercase italic tracking-tighter break-words">{p}</h3>
                  </div>
                  <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-near-black/60 leading-snug">
                    {CARD_DECISION_DESCRIPTIONS[p]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div key={stepKey} className={`space-y-4 sm:space-y-6 text-center w-full max-w-4xl mx-auto ${animationClass} px-4`}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-black leading-tight break-words">
              O que você <br/><span className="text-primary italic">tá tentando construir?</span>
            </h1>
            <div className="max-w-2xl mx-auto w-full relative">
              <AnimatedTextAreaField 
                textareaRef={mainTextAreaRef}
                autoFocus
                value={formData.struggle}
                onChange={val => setFormData({...formData, struggle: val})}
                rows={3}
                placeholder="Ex: 'Preciso automatizar meus fluxos de trabalho no Odoo e construir um e-commerce modernão e babadeiro...'"
                className="border-near-black shadow-brutalist"
              />
              <div className="mt-2 sm:mt-4 flex justify-between items-center px-2">
                <span className={`text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest transition-colors ${formData.struggle.length < 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {formData.struggle.length < 10 ? 'Pelo menos 10 caracteres, mona!' : 'Close certo! Pode prosseguir.'}
                </span>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div key={stepKey} className={`space-y-4 sm:space-y-6 text-center w-full max-w-4xl mx-auto ${animationClass} px-4`}>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tighter max-w-3xl mx-auto leading-tight break-words">
              Onde o mundo <br/><span className="text-primary italic">te encontra?</span>
            </h1>
            <div className="flex flex-col gap-4 sm:gap-6 max-w-xl mx-auto w-full text-left">
              {[
                { name: 'website', icon: 'language', label: 'Website (opcional)', placeholder: 'https://suaempresa.com' },
                { name: 'instagram', icon: 'alternate_email', label: 'Instagram (opcional)', placeholder: '@suaempresa' },
                { name: 'linkedin', icon: 'work', label: 'LinkedIn (opcional)', placeholder: 'linkedin.com/in/voce' }
              ].map((field, idx) => (
                <div key={field.name} className="relative group">
                  <span className="material-symbols-outlined absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-near-black/30 group-focus-within:text-primary transition-all text-xl sm:text-2xl group-focus-within:scale-110">{field.icon}</span>
                  <input 
                    ref={idx === 0 ? mainInputRef : undefined}
                    autoFocus={idx === 0}
                    type="text"
                    value={(formData as any)[field.name]}
                    onChange={e => setFormData({...formData, [field.name]: e.target.value})}
                    placeholder={field.placeholder}
                    className="w-full pl-12 sm:pl-16 pr-6 sm:pr-8 py-3 sm:py-5 bg-white border-[3px] sm:border-[4px] border-near-black rounded-xl sm:rounded-2xl text-base sm:text-xl font-bold focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-near-black/10 outline-none shadow-brutalist-sm font-body cursor-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none min-h-[3rem] sm:min-h-[3.5rem]"
                  />
                  <label className="absolute -top-2.5 left-6 sm:left-8 px-2 sm:px-4 bg-[#FAFAFC] text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-near-black/40 group-focus-within:text-primary group-focus-within:font-black transition-colors">{field.label}</label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col p-3 xs:p-4 md:p-8 font-body overflow-x-hidden relative">
      <header className="flex justify-between items-center max-w-7xl mx-auto w-full mb-4 sm:mb-6 relative z-10">
        <button type="button" className="flex items-center gap-2 sm:gap-3 group cursor-none active:scale-95 transition-transform text-left" onClick={onCancel}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-near-black text-white rounded-lg flex items-center justify-center shadow-brutalist-sm group-hover:bg-primary transition-colors">
            <span className="font-display font-bold text-lg sm:text-xl">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">Monynha</span>
            <span className="text-[10px] xs:text-xs sm:text-sm font-black tracking-widest text-primary uppercase">Softwares</span>
          </div>
        </button>
        
        <div className="flex flex-col items-end gap-1">
          {currentCoreStepDisplay !== null && (
            <>
              <div className="flex gap-1 sm:gap-1.5">
                {CORE_STEPS.map((s) => (
                  <div 
                    key={s} 
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${step === s ? 'w-4 sm:w-6 bg-primary shadow-sm animate-breathe' : step > s ? 'w-4 sm:w-6 bg-primary/40' : 'w-1.5 sm:w-2 bg-near-black/10'}`}
                  />
                ))}
              </div>
              <span className="font-display text-[10px] xs:text-xs sm:text-sm font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-near-black/40 mt-0.5 transition-all">
                Passo {currentCoreStepDisplay} de {totalCoreSteps}
              </span>
            </>
          )}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center w-full max-w-7xl mx-auto py-1 sm:py-2 relative z-10 overflow-hidden min-h-[250px] sm:min-h-[350px]">
        <form onSubmit={handleSubmit} className="w-full h-full relative">
          {renderStep()}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-near-black/5 px-4">
            <button 
              type="button"
              onClick={prevStep}
              className="order-2 sm:order-1 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-near-black/40 hover:text-near-black transition-all font-black text-lg sm:text-xl flex items-center justify-center gap-2 sm:gap-3 uppercase tracking-tighter group cursor-none active:scale-95 min-h-[2.5rem]"
            >
              <span className="material-icons text-xl sm:text-2xl group-hover:-translate-x-1 transition-transform" aria-hidden="true">arrow_back</span>
              Voltar
            </button>
            <button 
              type="submit"
              disabled={!isStepValid()}
              className="order-1 sm:order-2 w-full sm:w-auto group relative px-8 py-4 sm:px-12 sm:py-6 bg-primary text-white font-black text-lg sm:text-2xl border-[3px] sm:border-[4px] border-near-black rounded-xl sm:rounded-2xl shadow-brutalist hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center justify-center gap-3 sm:gap-4 uppercase tracking-tighter disabled:opacity-30 disabled:cursor-not-allowed cursor-none magical-btn-hover min-h-[3rem] sm:min-h-[4rem]"
            >
              {step === 1 ? 'Começar' : step === 6 ? 'Gerar Diagnóstico' : 'Próximo Passo'}
              <span className="material-icons text-2xl sm:text-3xl group-hover:translate-x-1 transition-transform" aria-hidden="true">{step === 6 ? 'auto_awesome' : 'arrow_forward'}</span>
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-auto pt-2 sm:pt-4 flex flex-col items-center gap-2 sm:gap-4 no-print relative z-10">
        <div className="w-full max-w-xs relative px-4">
          <div className="h-2 sm:h-3 w-full bg-near-black/5 border-[1px] border-near-black rounded-full overflow-hidden shadow-inner">
            <div className="h-full pride-gradient transition-all duration-1000 ease-out relative" style={{ width: `${progress}%` }}>
               <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
        <p className="text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-black tracking-[0.15em] xs:tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-near-black/40 uppercase text-center max-w-2xl mx-auto leading-relaxed italic px-4 mt-2 sm:mt-4">
          Descomplicamos burocracia, evidenciamos sua marca no digital e implementamos soluções ágeis, tecnológicas e escaláveis.
        </p>
    </div>
  );
};

export default Wizard;
