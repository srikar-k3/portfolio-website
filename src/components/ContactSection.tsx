'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

type ContactApiResponse = {
  error?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // moved outside to avoid deps warning

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    purpose: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  // form root observed for entrance animation
  const rootRef = useRef<HTMLFormElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.12, once: true });

  // Parent variants (just orchestration)
  const groupVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    []
  );

  // Child item variants
  const item: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.985 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: EASE },
      },
    }),
    []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData satisfies FormData),
      });

      // Best-effort parse; if JSON fails, treat as null
      const data = (await res
        .json()
        .catch(() => null)) as ContactApiResponse | null;

      if (!res.ok) {
        const msg = (data && data.error) || 'Email failed';
        throw new Error(msg);
      }

      setSubmitMsg('Message sent!');
      setFormData({ name: '', email: '', purpose: '', message: '' });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Error — please try again.';
      setSubmitMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-[72px]">
      {/* Title — exactly like other sections */}
      <h2 className="text-2xl font-semibold text-white mb-6 text-left">Contact</h2>

      <motion.form
        ref={rootRef}
        variants={groupVariants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        onSubmit={handleSubmit}
        className="space-y-10"
        noValidate
      >
        {/* Name + Email */}
        <motion.div variants={item} className="pb-2">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="flex-1 border-b border-white/15 pb-3">
              <label
                htmlFor="name"
                className="block text-sm md:text-base font-medium text-white/70 mb-2 tracking-wide"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full text-gray-300 text-[20px] leading-relaxed font-light bg-transparent border-0 outline-none placeholder-white/40"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className="flex-1 border-b border-white/15 pb-3">
              <label
                htmlFor="email"
                className="block text-sm md:text-base font-medium text-white/70 mb-2 tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full text-gray-300 text-[20px] leading-relaxed font-light bg-transparent border-0 outline-none placeholder-white/40"
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </div>
        </motion.div>

        {/* Purpose */}
        <motion.div variants={item} className="border-b border-white/15 pb-3">
          <label
            htmlFor="purpose"
            className="block text-sm md:text-base font-medium text-white/70 mb-2 tracking-wide"
          >
            Purpose
          </label>
          <div className="relative">
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className={`appearance-none w-full text-gray-300 text-[20px] leading-relaxed font-light bg-transparent border-0 outline-none pr-10 ${
                formData.purpose ? 'text-white' : 'text-white/40'
              }`}
            >
              <option value="" disabled className="text-black">
                Select one…
              </option>
              <option value="Recruiter — hiring opportunity">Recruiter — hiring opportunity</option>
              <option value="Client — project inquiry">Client — project inquiry</option>
              <option value="Other — general inquiry">Other — general inquiry</option>
            </select>
            <svg
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="currentColor"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div variants={item} className="border-b border-white/15 pb-3">
          <label
            htmlFor="message"
            className="block text-sm md:text-base font-medium text-white/70 mb-2 tracking-wide"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full text-gray-300 text-[20px] leading-relaxed font-light bg-transparent border-0 outline-none placeholder-white/40 resize-none"
            placeholder="Tell me a bit about your project…"
          />
        </motion.div>

        {/* Submit */}
        <motion.div variants={item} className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center justify-between w-full py-6 border-b border-white/15 hover:bg-white/5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h3 className="text-xl md:text-3xl font-semibold text-white group-hover:text-white/90 transition-colors">
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </h3>

            <div
              className="flex-1 mx-6 md:mx-10 min-h-[1.25rem] text-sm md:text-base"
              aria-live="polite"
            >
              {submitMsg && (
                <span className={/sent!/i.test(submitMsg) ? 'text-green-500' : 'text-red-500'}>
                  {submitMsg}
                </span>
              )}
            </div>

            <div className="text-2xl font-light text-white/70 group-hover:text-white" aria-hidden="true">
              →
            </div>
          </button>
        </motion.div>
      </motion.form>
    </section>
  );
}