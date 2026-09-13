'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { useContactModal } from '@/context/ContactModalContext';

export function ContactModal() {
  const { open, closeModal } = useContactModal();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, closeModal]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-heading"
            className="relative w-full max-w-lg clip-angular scanline-overlay border border-neutral-700 bg-neutral-900 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close contact form"
              className="absolute top-4 right-4 text-neutral-500 hover:text-glitch-cyan transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h2
              id="contact-modal-heading"
              className="text-2xl md:text-3xl font-bold font-display text-white mb-2 pr-8"
            >
              Let&apos;s Build Something Together
            </h2>
            <p className="text-neutral-400 mb-8">
              Whether it&apos;s a product to launch or a bug worth chasing down, tell
              me what you&apos;re working on.
            </p>

            <ContactForm onSuccess={closeModal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
