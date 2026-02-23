"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeSlash,
  SpinnerGap,
  WarningCircle,
  CheckCircle,
  ShieldCheck,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay (mockup — no real backend)
    await new Promise((r) => setTimeout(r, 1400));

    if (name && email && password.length >= 6) {
      setSuccess(true);
      setIsLoading(false);
      // Redirect to login after showing success
      setTimeout(() => router.push("/admin/login"), 2200);
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
    } else {
      setError("Please fill in all fields.");
      setIsLoading(false);
    }
  }

  const passwordStrength =
    password.length === 0
      ? null
      : password.length < 6
        ? "weak"
        : password.length < 10
          ? "fair"
          : "strong";

  const strengthColor = {
    weak: "bg-red-400",
    fair: "bg-amber-400",
    strong: "bg-emerald-500",
  };

  const strengthWidth = {
    weak: "w-1/3",
    fair: "w-2/3",
    strong: "w-full",
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#861657]/5 px-4 py-12">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#861657]/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#D4A0B9]/10 blur-3xl" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-2xl shadow-gray-300/30 backdrop-blur-sm"
        >
          {/* Top stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#861657] via-[#D4A0B9] to-[#861657]" />

          <div className="p-8 sm:p-10">
            {/* Success state */}
            <AnimatePresence>
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100"
                  >
                    <CheckCircle size={36} weight="fill" className="text-emerald-500" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-gray-900">Account created!</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Your account is pending approval. Redirecting to sign in…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!success && (
              <>
                {/* Logo + heading */}
                <motion.div
                  className="mb-8 flex flex-col items-center text-center"
                  variants={itemVariants}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mb-5"
                  >
                    <Image
                      src="/images/logo.png"
                      alt="Youth Alive Global"
                      width={72}
                      height={72}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    Create an account
                  </h1>
                  <p className="mt-1.5 text-sm text-gray-500">
                    Request admin access to the dashboard
                  </p>
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.96, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="mb-5 flex items-start gap-3 rounded-xl bg-red-50 p-4 ring-1 ring-red-100"
                    >
                      <WarningCircle
                        size={20}
                        weight="fill"
                        className="mt-0.5 shrink-0 text-red-500"
                      />
                      <p className="text-sm font-medium text-red-700">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-[#861657] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#861657]/15"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-[#861657] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#861657]/15"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="block w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-[#861657] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#861657]/15"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      >
                        {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password strength bar */}
                    {passwordStrength && (
                      <div className="mt-2">
                        <div className="h-1 w-full rounded-full bg-gray-100">
                          <motion.div
                            className={`h-full rounded-full transition-all duration-300 ${strengthColor[passwordStrength]} ${strengthWidth[passwordStrength]}`}
                            initial={{ width: 0 }}
                            animate={{ width: undefined }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-400 capitalize">
                          {passwordStrength} password
                        </p>
                      </div>
                    )}
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    variants={itemVariants}
                    whileHover={{ scale: isLoading ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#861657] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#861657]/25 transition-all hover:bg-[#6e1248] hover:shadow-xl hover:shadow-[#861657]/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <SpinnerGap size={18} className="animate-spin" />
                        Creating account…
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>
                </motion.form>

                {/* Switch to login */}
                <motion.p
                  className="mt-7 text-center text-sm text-gray-500"
                  variants={itemVariants}
                >
                  Already have an account?{" "}
                  <Link
                    href="/admin/login"
                    className="font-semibold text-[#861657] hover:underline"
                  >
                    Sign in
                  </Link>
                </motion.p>
              </>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400"
          variants={itemVariants}
        >
          <ShieldCheck size={14} className="text-gray-300" />
          Access is granted only to authorized administrators.
        </motion.div>
      </motion.div>
    </div>
  );
}
