import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lawyers",
  description: "Immigration, family, civil, criminal, and corporate lawyers serving the Nepali community in Germany.",
};

export default function LawyersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
