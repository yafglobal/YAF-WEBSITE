import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { PREFETCH_REELS, NAVBAR_PREVIEW_REEL } from "@/lib/reels-config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Youth Alive Global | Kingdom Giants",
  description:
    "Welcome to Youth Alive — an ENFIRED community of kingdom giants. A global youth movement committed to spiritual growth, personal development, and purpose.",
  keywords: [
    "Youth Alive",
    "Winners Youth",
    "Kingdom Giants",
    "YAF",
    "Youth Ministry",
    "Winners Chapel Youth",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prefetch reel videos so they're cached before the user visits /reels */}
        {[NAVBAR_PREVIEW_REEL, ...PREFETCH_REELS].map((url) => (
          <link key={url} rel="prefetch" href={url} as="video" />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
