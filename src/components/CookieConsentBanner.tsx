import React, { useEffect, useMemo, useState } from 'react';

const CONSENT_STORAGE_KEY = 'monynha_cookie_consent_v1';

export type CookieConsent = {
  version: 1;
  essential: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  status: 'accepted_all' | 'rejected_optional' | 'customized';
  updatedAt: string;
};

type CookieConsentBannerProps = {
  onOpenCookiesPolicy?: () => void;
};

const persistConsent = (consent: CookieConsent) => {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  document.documentElement.setAttribute('data-cookie-consent', consent.status);
  window.dispatchEvent(new CustomEvent<CookieConsent>('cookie-consent-updated', { detail: consent }));
};

const readStoredConsent = (): CookieConsent | null => {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (!parsed || parsed.version !== 1 || parsed.essential !== true) {
      return null;
    }

    return {
      version: 1,
      essential: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      personalization: !!parsed.personalization,
      status: parsed.status === 'accepted_all' || parsed.status === 'rejected_optional' || parsed.status === 'customized'
        ? parsed.status
        : 'customized',
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString()
    };
  } catch {
    return null;
  }
};

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenCookiesPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [personalization, setPersonalization] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();

    if (!stored) {
      setIsVisible(true);
      return;
    }

    setAnalytics(stored.analytics);
    setMarketing(stored.marketing);
    setPersonalization(stored.personalization);
    setHasStoredConsent(true);
    document.documentElement.setAttribute('data-cookie-consent', stored.status);
  }, []);

  const currentSummary = useMemo(() => {
    const enabledCount = [analytics, marketing, personalization].filter(Boolean).length;
    if (enabledCount === 0) return 'Somente cookies essenciais ativos';
    if (enabledCount === 3) return 'Todas as categorias opcionais ativas';
    return `${enabledCount} categoria(s) opcional(is) ativa(s)`;
  }, [analytics, marketing, personalization]);

  const closeBanner = () => {
    setIsVisible(false);
    setIsManagerOpen(false);
    setHasStoredConsent(true);
  };

  const saveCustom = () => {
    persistConsent({
      version: 1,
      essential: true,
      analytics,
      marketing,
      personalization,
      status: 'customized',
      updatedAt: new Date().toISOString()
    });
    closeBanner();
  };

  const acceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    setPersonalization(true);
    persistConsent({
      version: 1,
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      status: 'accepted_all',
      updatedAt: new Date().toISOString()
    });
    closeBanner();
  };

  const rejectOptional = () => {
    setAnalytics(false);
    setMarketing(false);
    setPersonalization(false);
    persistConsent({
      version: 1,
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      status: 'rejected_optional',
      updatedAt: new Date().toISOString()
    });
    closeBanner();
  };

  if (!isVisible && !hasStoredConsent) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <section
          role="dialog"
          aria-live="polite"
          aria-label="Gerenciador de consentimento de cookies"
          className="fixed z-[140] top-3 left-3 right-3 sm:top-auto sm:bottom-6 sm:right-6 sm:left-auto sm:max-w-lg bg-secondary border-4 border-near-black rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 shadow-brutalist"
        >
          <div className="space-y-4 sm:space-y-5 text-near-black">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-primary">Consentimento</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight leading-tight">
                Preferências de Cookies
              </h2>
              <p className="text-sm sm:text-base font-medium leading-relaxed text-near-black/80">
                Usamos cookies essenciais para funcionamento e categorias opcionais para métricas, personalização e comunicação.
                Você pode ajustar sua escolha agora ou depois.
              </p>
            </div>

            {isManagerOpen && (
              <div className="space-y-3 rounded-2xl border-2 border-near-black/15 bg-white/70 p-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-primary" />
                  <span>
                    <span className="block text-sm font-black uppercase tracking-wide">Essenciais</span>
                    <span className="block text-sm text-near-black/70">Necessários para segurança, navegação e funcionamento básico.</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="block text-sm font-black uppercase tracking-wide">Analíticos</span>
                    <span className="block text-sm text-near-black/70">Medição de uso para melhoria de conteúdo e performance.</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={personalization}
                    onChange={(event) => setPersonalization(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="block text-sm font-black uppercase tracking-wide">Personalização</span>
                    <span className="block text-sm text-near-black/70">Ajustes de experiência de acordo com interações anteriores.</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-primary"
                  />
                  <span>
                    <span className="block text-sm font-black uppercase tracking-wide">Marketing</span>
                    <span className="block text-sm text-near-black/70">Comunicações e avaliação de campanhas publicitárias.</span>
                  </span>
                </label>
              </div>
            )}

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border-2 border-near-black text-sm sm:text-base font-black uppercase tracking-wide bg-primary text-white shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Aceitar tudo
              </button>
              <button
                type="button"
                onClick={rejectOptional}
                className="px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border-2 border-near-black text-sm sm:text-base font-black uppercase tracking-wide bg-white text-near-black shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Recusar opcionais
              </button>
              <button
                type="button"
                onClick={() => (isManagerOpen ? saveCustom() : setIsManagerOpen(true))}
                className="px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border-2 border-near-black text-sm sm:text-base font-black uppercase tracking-wide bg-secondary text-near-black shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                {isManagerOpen ? 'Salvar preferências' : 'Gerenciar'}
              </button>
              <button
                type="button"
                onClick={onOpenCookiesPolicy}
                className="px-4 py-2 sm:px-5 sm:py-3 rounded-2xl border-2 border-near-black text-sm sm:text-base font-black uppercase tracking-wide bg-transparent text-near-black/80"
              >
                Política de cookies
              </button>
            </div>
          </div>
        </section>
      )}

      {hasStoredConsent && !isVisible && (
        <button
          type="button"
          aria-label="Abrir preferências de cookies"
          onClick={() => {
            setIsVisible(true);
            setIsManagerOpen(true);
          }}
          className="fixed z-[130] bottom-4 left-4 sm:bottom-6 sm:left-6 px-4 py-2 rounded-full border-2 border-near-black bg-secondary text-near-black text-xs sm:text-sm font-black uppercase tracking-wider shadow-brutalist-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
        >
          Cookies: {currentSummary}
        </button>
      )}
    </>
  );
};

export default CookieConsentBanner;