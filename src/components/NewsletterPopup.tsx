import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem("aether-newsletter-seen");
      if (!hasSeen) setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("aether-newsletter-seen", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-paper overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 aspect-square md:aspect-auto bg-ink overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1510442221142-491410712211?q=80&w=800&auto=format&fit=crop" 
                 className="h-full w-full object-cover grayscale brightness-75" 
                 alt="Newsletter" 
               />
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center text-center md:text-left">
               <button onClick={closePopup} className="absolute top-6 right-6 hover:rotate-90 transition-transform">
                  <X className="h-5 w-5" />
               </button>
               <h2 className="text-fluid-huge font-bold tracking-tighter opacity-10 leading-none mb-1 md:mb-[-1rem]">Arkiv</h2>
               <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Registry Access</h3>
               <p className="text-xs text-ink/60 uppercase tracking-widest leading-relaxed mb-8">
                  Join the Aether Registry for early access to Drop 02 and seasonal archive releases.
               </p>
               <form onSubmit={(e) => { e.preventDefault(); closePopup(); }} className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="EMAIL@DOMAIN.COM" 
                    className="w-full border-b border-ink/20 py-4 text-[10px] font-bold uppercase tracking-widest focus:border-ink outline-none transition-colors"
                  />
                  <button className="flex w-full items-center justify-center space-x-4 bg-ink py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-paper hover:bg-ink/90 transition-all">
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
               </form>
               <p className="mt-8 text-[8px] uppercase tracking-widest text-ink/30 italic">
                  By subscribing you agree to our privacy policy. No spam, only drops.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
