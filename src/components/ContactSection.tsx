'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="mb-20"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-black uppercase">Contact</h2>
      </div>

      {/* Contact Form */}
      <div className="max-w-6xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name and Email Fields - Same Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="pb-4"
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Name Field */}
              <div className="flex-1 border-b border-gray-200 pb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full text-xl md:text-2xl font-light text-black bg-transparent border-0 outline-none placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="flex-1 border-b border-gray-200 pb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-xl md:text-2xl font-light text-black bg-transparent border-0 outline-none placeholder-gray-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            className="border-b border-gray-200 pb-4"
          >
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full text-2xl font-light text-black bg-transparent border-0 outline-none placeholder-gray-400 resize-none"
              placeholder="Your message..."
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="pt-8"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center justify-between w-full py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Left - Action */}
              <h3 className="text-2xl md:text-4xl font-normal text-black group-hover:text-gray-700 transition-colors duration-200 flex-shrink-0">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </h3>
              
              {/* Center - Status */}
              <div className="flex-1 mx-8">
                {submitStatus === 'success' && (
                  <h4 className="text-lg text-green-600 uppercase tracking-wide">Message Sent!</h4>
                )}
                {submitStatus === 'error' && (
                  <h4 className="text-lg text-red-600 uppercase tracking-wide">Error - Please try again</h4>
                )}
              </div>
              
              {/* Right - Arrow */}
              <div className="text-2xl font-light text-gray-400 flex-shrink-0">
                →
              </div>
            </button>
          </motion.div>
        </form>
      </div>
    </motion.section>
  );
}