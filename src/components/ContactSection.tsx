"use client";

import { useEffect, useRef, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  workType: string;
  timeframe: string;
  comments?: string;
};

type ContactApiResponse = {
  error?: string;
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    workType: '',
    timeframe: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const rootRef = useRef<HTMLFormElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Entrance animation trigger
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitMsg(null);
    setIsSuccess(false);
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

      const data = (await res
        .json()
        .catch(() => null)) as ContactApiResponse | null;

      if (!res.ok) {
        const msg = (data && data.error) || 'Email failed';
        throw new Error(msg);
      }

      setSubmitMsg('Message sent!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', workType: '', timeframe: '', comments: '' });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Error — please try again.';
      setSubmitMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'none';
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-0 bg-white mx-[calc(50%-50vw)] min-h-[calc(100vh-120px)] flex items-center overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div
        ref={cardRef}
        className="mx-auto w-full max-w-7xl bg-white px-6 sm:px-10 md:px-12 py-8 md:py-12"
      >
        <div className="md:grid md:grid-cols-12 md:gap-16 lg:gap-24">
          {/* Left column — Title */}
          <div className={`md:col-span-5 mb-8 md:mb-0 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-gray-900 text-left">
              <span className="block">HAVE A VISION?</span>
              <span className="block mt-1 md:mt-2">LET&apos;S TALK.</span>
            </h2>
            <p className="mt-4 md:mt-6 text-gray-500 text-base md:text-lg leading-relaxed max-w-sm">
              If you are ready to bring your project to life, share some details and I&apos;ll get back to you.
            </p>
          </div>

          {/* Right column — Form */}
          <div className={`md:col-span-7 transition-all duration-700 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <form
              ref={rootRef}
              onSubmit={handleSubmit}
              className="space-y-5 md:space-y-6"
              noValidate
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-200 ease-out pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? '-top-6 text-xs text-gray-500'
                        : 'top-3 text-base text-gray-400'
                    }`}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full text-gray-900 text-lg bg-transparent outline-none border-b-2 border-gray-200 pb-3 pt-3 transition-colors duration-200 focus:border-gray-900"
                    autoComplete="name"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-200 ease-out pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? '-top-6 text-xs text-gray-500'
                        : 'top-3 text-base text-gray-400'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full text-gray-900 text-lg bg-transparent outline-none border-b-2 border-gray-200 pb-3 pt-3 transition-colors duration-200 focus:border-gray-900"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              {/* Type of work */}
              <div className="relative">
                <label htmlFor="workType" className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">
                  Type of Work
                </label>
                <div className="relative">
                  <select
                    id="workType"
                    name="workType"
                    value={formData.workType}
                    onChange={handleChange}
                    required
                    className={`appearance-none w-full text-lg bg-gray-50 outline-none pr-12 border-2 border-transparent rounded-xl px-4 py-3.5 transition-all duration-200 focus:border-gray-900 focus:bg-white ${
                      formData.workType ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    <option value="" disabled>Select one…</option>
                    <option value="UX/MOBILE/WEB">UX / Mobile / Web</option>
                    <option value="BRAND/IDENTITY">Brand / Identity</option>
                    <option value="VIDEO/MOTION GRAPHICS">Video / Motion Graphics</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>

              {/* Timeframe */}
              <div className="relative">
                <label htmlFor="timeframe" className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">
                  Timeframe
                </label>
                <div className="relative">
                  <select
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    required
                    className={`appearance-none w-full text-lg bg-gray-50 outline-none pr-12 border-2 border-transparent rounded-xl px-4 py-3.5 transition-all duration-200 focus:border-gray-900 focus:bg-white ${
                      formData.timeframe ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    <option value="" disabled>Select one…</option>
                    <option value="ASAP">ASAP</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                    <option value="simple inquiry/just exploring">Just exploring</option>
                  </select>
                  <svg
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>

              {/* Additional Comments */}
              <div className="relative">
                <label htmlFor="comments" className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">
                  Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows={3}
                  value={(formData as FormData).comments || ''}
                  onChange={handleChange}
                  className="w-full text-gray-900 text-lg bg-gray-50 outline-none border-2 border-transparent rounded-xl p-3 md:p-4 resize-none transition-all duration-200 focus:border-gray-900 focus:bg-white"
                  placeholder="Tell me about your project…"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-3.5 px-8 rounded-xl font-medium text-lg transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>{isSubmitting ? 'Sending…' : 'Send Message'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </button>

                {/* Status message */}
                <div className="mt-4 min-h-[1.25rem]" aria-live="polite">
                  {submitMsg && (
                    isSuccess ? (
                      <div className="flex items-center gap-3 bg-gray-900 text-white rounded-xl px-5 py-3.5 animate-[fadeSlideUp_0.4s_ease-out_both]">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-medium text-sm tracking-wide">Message sent — I&apos;ll be in touch soon.</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3.5 animate-[fadeSlideUp_0.4s_ease-out_both]">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="font-medium text-sm tracking-wide">{submitMsg}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
