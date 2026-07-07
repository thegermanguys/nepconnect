import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctors",
  description: "Nepali, English, and German-speaking doctors recommended by the community across Germany.",
};

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
