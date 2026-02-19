"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import Grainient from "./Grainient";

// Theme-adaptive color presets
const darkColors = {
  color1: "#FF4D00", // fire
  color2: "#FFD700", // gold
  color3: "#1A0500", // deep ember-black
};

const lightColors = {
  color1: "#FF8C42", // soft fire
  color2: "#FFBF00", // warm gold
  color3: "#FFF3E0", // warm cream
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Track theme changes for Grainient color adaptation
  useEffect(() => {
    const checkTheme = () =>
      setIsLight(document.documentElement.classList.contains("light"));
    checkTheme();

    const mo = new MutationObserver(checkTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  const colors = isLight ? lightColors : darkColors;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", email: "", message: "" });
      }, 4000);
    }, 1500);
  };

  const inputClasses =
    "w-full px-5 py-3.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-fire/40 focus:ring-1 focus:ring-fire/20 transition-all text-sm";

  return (
    <section className="relative min-h-screen">
      {/* Grainient background — fixed, full viewport */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <Grainient
          color1={colors.color1}
          color2={colors.color2}
          color3={colors.color3}
          timeSpeed={0.2}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={4}
          warpSpeed={1.5}
          warpAmplitude={40}
          blendAngle={0}
          blendSoftness={0.08}
          rotationAmount={400}
          noiseScale={2}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={isLight ? 1.2 : 1.4}
          gamma={1}
          saturation={isLight ? 0.9 : 1.1}
          centerX={0}
          centerY={0}
          zoom={0.85}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left column — Info */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-fire rounded-full" />
                <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-fire">
                  Get in Touch
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
                For More Details /{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                  Contact Us!
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="w-24 h-1 rounded-full bg-gradient-to-r from-fire to-gold" />
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg">
                Have questions about Youth Alive Global, our programs, or how to
                get involved? We&apos;d love to hear from you. Reach out to us
                through any of the channels below.
              </p>
            </ScrollReveal>

            {/* Contact info blocks */}
            <div className="flex flex-col gap-5 mt-2">
              <ScrollReveal delay={0.2}>
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-fire/10 flex items-center justify-center group-hover:bg-fire/20 transition-colors">
                    <MapPin size={22} className="text-fire" weight="fill" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-1">
                      Our Address
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      Global Youth Office, Living Faith Church,
                      <br />
                      Canaanland, Ota, Nigeria.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-fire/10 flex items-center justify-center group-hover:bg-fire/20 transition-colors">
                    <Phone size={22} className="text-fire" weight="fill" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+2348162879125"
                      className="text-[var(--color-text-secondary)] text-sm hover:text-fire transition-colors"
                    >
                      +234 816 287 9125
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-fire/10 flex items-center justify-center group-hover:bg-fire/20 transition-colors">
                    <EnvelopeSimple
                      size={22}
                      className="text-fire"
                      weight="fill"
                    />
                  </div>
                  <div>
                    <p className="font-display font-bold text-sm text-[var(--color-text-primary)] mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@winnersyouth.org"
                      className="text-[var(--color-text-secondary)] text-sm hover:text-fire transition-colors"
                    >
                      info@winnersyouth.org
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right column — Form card */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="relative bg-[var(--color-surface)]/80 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-8 md:p-10">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-fire/5 via-transparent to-gold/5 -z-10 blur-sm" />

              <h2 className="font-display font-bold text-xl md:text-2xl text-[var(--color-text-primary)] mb-2">
                Send Us a Message
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm mb-8">
                Fill in the form below and we&apos;ll get back to you as soon as
                possible.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                      }}
                    >
                      <CheckCircle
                        size={64}
                        className="text-fire mb-4"
                        weight="fill"
                      />
                    </motion.div>
                    <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                      Message Sent!
                    </h3>
                    <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                      Thank you for reaching out. We&apos;ll respond shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-display font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase mb-2"
                      >
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
                        <label
                          htmlFor="phone"
                          className="block text-xs font-display font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase mb-2"
                        >
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
                        <label
                          htmlFor="email"
                          className="block text-xs font-display font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase mb-2"
                        >
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
                      <label
                        htmlFor="message"
                        className="block text-xs font-display font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase mb-2"
                      >
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
                      className="group relative w-full mt-2 py-4 px-6 bg-gradient-to-r from-fire to-fire-light text-white font-display font-semibold text-sm tracking-wide uppercase rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.3)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {sending ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
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
        </div>
      </div>
    </section>
  );
}
