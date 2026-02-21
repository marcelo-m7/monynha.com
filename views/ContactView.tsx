import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactView: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send signal.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Transmission failed. Please check your connection or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-white/10 border-4 border-white/30 px-6 py-4 md:py-5 text-white text-lg md:text-xl font-medium focus:border-brand-violet focus:outline-none transition-all placeholder:text-white/40 font-display";
  const labelClasses = "block text-sm font-black tracking-[0.3em] uppercase text-white/80 mb-3";

  return (
    <div className="bg-brand-black min-h-screen min-h-[100dvh] flex flex-col">
      {/* Hero Header */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 px-6 border-b-4 border-white bg-gradient-to-br from-brand-violet/10 to-transparent">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-black tracking-[0.4em] uppercase bg-brand-violet text-white px-5 py-2 mb-8 inline-block">Initial Sync</span>
            <h1 className="text-5xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 font-display">
              Let's build <br /><span className="text-outline">Meaningful.</span>
            </h1>
            <p className="text-xl md:text-4xl font-medium text-slate-300 max-w-3xl leading-tight">
              No pressure. No fluff. Just a conversation about how we can simplify your digital complexity.
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
                <h2 className="text-4xl md:text-5xl font-black uppercase font-display tracking-tighter">Connection Established.</h2>
                <p className="text-lg md:text-xl font-bold opacity-80">We've received your signal. Our team will reach back out within 24 earth hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs border-2 border-white hover:bg-transparent hover:text-white transition-all"
                >
                  Send another signal
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label className={labelClasses}>What is your name?</label>
                    <input type="text" name="name" placeholder="Identity" className={inputClasses} required />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <label className={labelClasses}>Where can we reach you?</label>
                    <input type="email" name="email" placeholder="Email Address" className={inputClasses} required />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <label className={labelClasses}>Phone Number <span className="text-white/30 lowercase tracking-normal">(Optional)</span></label>
                    <input type="tel" name="tel" placeholder="+00 000 000 000" className={inputClasses} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <label className={labelClasses}>Company or Project Name <span className="text-white/30 lowercase tracking-normal">(Optional)</span></label>
                    <input type="text" name="company" placeholder="Your Vision" className={inputClasses} />
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <label className={labelClasses}>What are you trying to build?</label>
                  <textarea 
                    rows={5} 
                    name="message"
                    placeholder="Tell us about the challenges you're facing. We value clarity and specificity." 
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
                        Start conversation
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
              <h4 className="text-xs font-black tracking-[0.5em] uppercase text-white/30 mb-6 md:mb-8">Direct Signals</h4>
              <div className="space-y-4 md:space-y-6">
                <a href="mailto:hello@monynha.com" className="block text-2xl md:text-3xl font-black uppercase font-display hover:text-brand-violet transition-colors break-all">hello@monynha.com</a>
                <span className="block text-lg md:text-xl font-bold text-white/40">Portugal · Remote First</span>
              </div>
            </div>

            <div className="p-8 md:p-10 border-4 border-white bg-white/5 backdrop-blur-md">
              <h4 className="text-xl font-black uppercase mb-6 font-display">What happens next?</h4>
              <ol className="space-y-6">
                {[
                  { step: "01", title: "Review", text: "Marcelo or Tércio will analyze your project goals personally." },
                  { step: "02", title: "Alignment", text: "We schedule a brief sync to ensure our philosophies align." },
                  { step: "03", title: "Proposal", text: "You receive a clear, outcome-focused roadmap and budget." }
                ].map((item, i) => (
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
                You'll be speaking directly with <br />our core engineering team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Footnote */}
      <section className="py-16 md:py-24 px-6 text-center bg-white text-black">
        <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase font-display max-w-2xl mx-auto">
          "Software is a conversation between human intuition and engineering logic."
        </h2>
      </section>
    </div>
  );
};