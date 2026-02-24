import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Warm up connections for video CDNs used by the navbar reel and footer */}
        <link rel="preconnect" href="https://globalreels.winnerschapelsudbury.org" />
        <link rel="preconnect" href="https://stream.mux.com" />
        <link rel="preconnect" href="https://cdn.mux.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.remove('light');
                  } else {
                    // Default to light mode for all new/returning visitors
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
