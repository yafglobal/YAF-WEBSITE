import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BranchPage from "@/components/branches/BranchPage";
import { BRANCHES, getBranchBySlug } from "@/lib/branches-config";

interface BranchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BranchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) return {};
  return {
    title: `Youth Alive ${branch.name} | Youth Alive Global`,
    description: branch.description,
  };
}

export default async function BranchRoute({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);
  if (!branch) notFound();

  return (
    <main className="relative grain">
      <Navbar />
      <BranchPage branch={branch} />
      <Footer />
    </main>
  );
}
