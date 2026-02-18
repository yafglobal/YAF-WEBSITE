import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en">
      <body className={`${syne.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
