"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface ThreeDButtonProps {
  children: ReactNode;
  variant?: "plum" | "plum-tint";
  className?: string;
  onClick?: () => void;
}

export default function ThreeDButton({
  children,
  variant = "plum",
  className = "",
  onClick,
}: ThreeDButtonProps) {
  return (
    <button
      className={`btn3d ${variant === "plum-tint" ? "btn3d--plum-tint" : ""} ${className}`}
      onClick={onClick}
    >
      <div className="btn3d-bg" />
      <div className="btn3d-wrap">
        {/* Logo watermark - subtle embossed effect */}
        <div className="btn3d-watermark">
          <Image
            src="/images/yaf-pc.svg"
            alt=""
            width={60}
            height={60}
            className="btn3d-watermark-img"
            aria-hidden="true"
          />
        </div>
        <div className="btn3d-content">
          <span className="btn3d-label">{children}</span>
          <svg
            className="btn3d-arrow"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
