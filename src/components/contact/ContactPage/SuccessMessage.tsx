"use client";

import { motion } from "motion/react";
import { CheckCircle } from "@phosphor-icons/react";

export default function SuccessMessage() {
  return (
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
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
      >
        <CheckCircle size={64} className="text-fire mb-4" weight="fill" />
      </motion.div>
      <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)]">
        Message Sent!
      </h3>
      <p className="text-[var(--color-text-muted)] text-sm mt-2">
        Thank you for reaching out. We&apos;ll respond shortly.
      </p>
    </motion.div>
  );
}
