"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/cities", label: "Cities" },
  { href: "/events", label: "Events" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/affiliates", label: "Affiliates" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-border/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">Nepali Connect</span>
            <span className="hidden sm:inline text-muted-foreground font-sans text-sm font-normal">Germany</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
                  pathname?.startsWith(link.href) && "bg-surface-2 text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" asChild aria-label="Search">
              <Link href="/search">
                <Search className="h-[18px] w-[18px]" />
              </Link>
            </Button>
            <ThemeToggle />
            <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" className="hidden md:inline-flex" asChild>
              <Link href="/submit">Submit Your Community</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      <div className="prayer-flag-strip" />

      {open && (
        <div className="glass border-b border-border/60 lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-4">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href="/submit">Submit</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
