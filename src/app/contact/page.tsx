import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us | Youth Alive Global",
  description:
    "Get in touch with Youth Alive Global. Reach out for questions about our programs, events, or how to get involved in the movement.",
};

export default function ContactRoute() {
  return (
    <main className="relative grain">
      <Navbar />
      <ContactPage />
      <Footer transparent />
    </main>
  );
}
