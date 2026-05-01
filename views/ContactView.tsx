import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { getCanonicalUrl, getSiteAssetUrl } from '../src/seo/config';

export const ContactView: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contactEmail = 'hello@open2.tech';
  const steps = t('contact.steps', { returnObjects: true }) as Array<{ step: string; title: string; text: string }>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      
      let result: any = {};
      if (isJson) {
        result = await response.json();
      }

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 405) {
          throw new Error(t('contact.errors.apiUnavailable'));
        } else if (response.status === 400) {
          throw new Error(result.error || t('contact.errors.invalidFields'));
        } else if (response.status === 500) {
          throw new Error(result.error || t('contact.errors.serverError', { email: contactEmail }));
        }
        throw new Error(result.error || t('contact.errors.failedSignal'));
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || t('contact.errors.transmissionFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white/10 border-4 border-white/30 px-6 py-4 md:py-5 text-white text-lg md:text-xl font-medium focus:border-brand-violet focus:outline-none transition-all placeholder:text-white/40 font-display";
  const labelClasses = "block text-sm font-black tracking-[0.3em] uppercase text-white/80 mb-3";

  return (
    <div className="bg-brand-black min-h-screen min-h-[100dvh] flex flex-col">
      <Seo
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        canonical={getCanonicalUrl('/contact')}
        image={getSiteAssetUrl('/assets/base-colors.png')}
      />
      {/* Hero Header */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 border-b-4 border-white bg-gradient-to-br from-brand-violet/10 to-transparent">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-black tracking-[0.4em] uppercase bg-brand-violet text-white px-5 py-2 mb-8 inline-block">{t('contact.badge')}</span>
            <h1 className="text-5xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 font-display">
              {t('contact.headingLine1')} <br /><span className="text-outline">{t('contact.headingLine2')}</span>
            </h1>
            <p className="text-xl md:text-4xl font-medium text-slate-300 max-w-3xl leading-tight">
              {t('contact.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-24 px-6 border-b-4 border-white flex-grow">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Form Side */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 border-4 border-brand-teal bg-brand-teal/10 flex flex-col items-center text-center space-y-8"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-teal rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase font-display tracking-tighter">{t('contact.successTitle')}</h2>
                <p className="text-lg md:text-xl font-bold opacity-80">{t('contact.successMessage')}</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs border-2 border-white hover:bg-transparent hover:text-white transition-all"
                >
                  {t('contact.successButton')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label className={labelClasses}>{t('contact.form.nameLabel')}</label>
                    <input type="text" name="name" placeholder={t('contact.form.namePlaceholder')} className={inputClasses} required />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label className={labelClasses}>{t('contact.form.emailLabel')}</label>
                    <input type="email" name="email" placeholder={t('contact.form.emailPlaceholder')} className={inputClasses} required />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <label className={labelClasses}>{t('contact.form.phoneLabel')} <span className="text-white/30 lowercase tracking-normal">{t('contact.form.optional')}</span></label>
                    <input type="tel" name="tel" placeholder={t('contact.form.phonePlaceholder')} className={inputClasses} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <label className={labelClasses}>{t('contact.form.companyLabel')} <span className="text-white/30 lowercase tracking-normal">{t('contact.form.optional')}</span></label>
                    <input type="text" name="company" placeholder={t('contact.form.companyPlaceholder')} className={inputClasses} />
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <label className={labelClasses}>{t('contact.form.messageLabel')}</label>
                  <textarea 
                    rows={5} 
                    name="message"
                    placeholder={t('contact.form.messagePlaceholder')} 
                    className={`${inputClasses} resize-none`} 
                    required 
                  />
                </motion.div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border-4 border-red-500 bg-red-500/10 text-red-500 font-bold text-sm uppercase tracking-widest"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 md:px-16 py-6 md:py-8 bg-brand-violet text-white font-black text-xl md:text-2xl tracking-widest uppercase border-4 border-brand-violet hover:bg-white hover:text-black hover:border-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-6"
                  >
                    {isSubmitting ? (
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {t('contact.form.submit')}
                        <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12 md:space-y-20">
            <div>
              <h4 className="text-xs font-black tracking-[0.5em] uppercase text-white/30 mb-6 md:mb-8">{t('contact.directSignals')}</h4>
              <div className="space-y-4 md:space-y-6">
                <a href={`mailto:${contactEmail}`} className="block text-2xl md:text-3xl font-black uppercase font-display hover:text-brand-violet transition-colors break-all">{contactEmail}</a>
                <span className="block text-lg md:text-xl font-bold text-white/40">{t('contact.location')}</span>
              </div>
            </div>

            <div className="p-8 md:p-10 border-4 border-white bg-white/5 backdrop-blur-md">
              <h4 className="text-xl font-black uppercase mb-6 font-display">{t('contact.nextTitle')}</h4>
              <ol className="space-y-6">
                {steps.map((item, i) => (
                  <li key={i} className="flex gap-6">
                    <span className="text-brand-violet font-black">{item.step}</span>
                    <div>
                      <h5 className="font-black uppercase tracking-widest text-xs mb-1">{item.title}</h5>
                      <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-6 md:gap-8 pb-8 md:pb-0">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-4 border-brand-black flex items-center justify-center bg-brand-violet overflow-hidden">
                   <span className="text-[10px] font-black uppercase">MS</span>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-brand-black flex items-center justify-center bg-brand-blue overflow-hidden">
                   <span className="text-[10px] font-black uppercase">TB</span>
                </div>
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/40 leading-snug">
                {t('contact.teamNote')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Footnote */}
      <section className="py-16 md:py-24 px-6 text-center bg-white text-black">
        <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase font-display max-w-2xl mx-auto">
          "{t('contact.quote')}"
        </h2>
      </section>
    </div>
  );
};