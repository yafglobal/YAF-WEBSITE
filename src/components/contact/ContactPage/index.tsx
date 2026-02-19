"use client";

import Grainient from "@/components/contact/Grainient";
import { darkColors, lightColors } from "./colorPresets";
import { useContactForm } from "./useContactForm";
import ContactInfoSection from "./ContactInfoSection";
import ContactFormCard from "./ContactFormCard";

export default function ContactPage() {
  const { form, submitted, sending, isLight, handleChange, handleSubmit } = useContactForm();

  const colors = isLight ? lightColors : darkColors;

  return (
    <section className="relative min-h-screen">
      {/* Grainient background -- fixed, full page */}
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
          <ContactInfoSection />
          <ContactFormCard
            form={form}
            submitted={submitted}
            sending={sending}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
