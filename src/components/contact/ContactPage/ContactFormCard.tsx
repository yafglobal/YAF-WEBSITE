"use client";

import { motion, AnimatePresence } from "motion/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import type { ContactFormState } from "./useContactForm";
import SuccessMessage from "./SuccessMessage";

interface ContactFormCardProps {
  form: ContactFormState;
  submitted: boolean;
  sending: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const inputClasses =
  "w-full px-5 py-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-plum/40 focus:ring-1 focus:ring-plum/20 transition-all text-sm";
const labelClasses =
  "block text-xs font-display font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase mb-2";

export default function ContactFormCard({
  form,
  submitted,
  sending,
  handleChange,
  handleSubmit,
}: ContactFormCardProps) {
  return (
    <ScrollReveal direction="right" delay={0.15}>
      <div className="relative bg-[var(--color-background)]/85 backdrop-blur-xl border border-[var(--color-border-medium)] rounded-2xl p-8 md:p-10">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-plum/5 via-transparent to-plum-tint/5 -z-10 blur-sm" />
        <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
          Send Us a Message
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm mb-8">
          Fill in the form below and we&apos;ll get back to you as soon as possible.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <SuccessMessage />
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div>
                <label htmlFor="name" className={labelClasses}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group relative w-full mt-2 py-4 px-6 bg-gradient-to-r from-plum to-plum-light text-[var(--color-text-primary)] font-display font-semibold text-sm tracking-wide uppercase rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(134,22,87,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {sending ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <PaperPlaneTilt
                        size={18}
                        weight="fill"
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}
