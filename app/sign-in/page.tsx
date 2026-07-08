import type { Metadata } from "next";
import Link from "next/link";
import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function SignInPage() {
  return (
    <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center py-14">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-soft">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Mountain className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to save favourites and manage your listings.</p>
        </div>

        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs uppercase text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full">Sign in</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here? <Link href="/sign-up" className="font-medium text-primary">Create an account</Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Authentication is powered by Clerk once <code className="rounded bg-surface-2 px-1">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> is configured.
        </p>
      </div>
    </div>
  );
}
