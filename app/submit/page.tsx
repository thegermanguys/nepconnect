"use client";

import * as React from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cities } from "@/lib/data/cities";

type FieldType = "text" | "email" | "tel" | "textarea" | "select-city" | "date" | "number";

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
}

const CATEGORY_FORMS: Record<string, { label: string; fields: FieldConfig[] }> = {
  "sports-club": {
    label: "Sports Club",
    fields: [
      { name: "name", label: "Club name", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "sport", label: "Sport", type: "text", placeholder: "Cricket, Football…", required: true },
      { name: "captain", label: "Captain name", type: "text", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "practiceLocation", label: "Practice location", type: "text" },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  business: {
    label: "Business",
    fields: [
      { name: "name", label: "Business name", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "category", label: "Category", type: "text", placeholder: "Consultancy, retail…" },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  restaurant: {
    label: "Restaurant",
    fields: [
      { name: "name", label: "Restaurant name", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "cuisine", label: "Cuisine", type: "text", placeholder: "Nepali, Tibetan…" },
      { name: "address", label: "Address", type: "text", required: true },
      { name: "phone", label: "Phone", type: "tel", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  association: {
    label: "Association",
    fields: [
      { name: "name", label: "Association name", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "focus", label: "Focus area", type: "text", placeholder: "Cultural, student, religious…" },
      { name: "contactName", label: "Contact name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  event: {
    label: "Event",
    fields: [
      { name: "title", label: "Event title", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "organizer", label: "Organizer", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  housing: {
    label: "Housing",
    fields: [
      { name: "title", label: "Listing title", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "price", label: "Monthly price (€)", type: "number", required: true },
      { name: "size", label: "Size (m²)", type: "number" },
      { name: "contactName", label: "Contact name", type: "text", required: true },
      { name: "contactPhone", label: "Contact phone", type: "tel", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  job: {
    label: "Job",
    fields: [
      { name: "title", label: "Job title", type: "text", required: true },
      { name: "company", label: "Company", type: "text", required: true },
      { name: "city", label: "City", type: "select-city", required: true },
      { name: "salary", label: "Salary", type: "text" },
      { name: "applyUrl", label: "Application link", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
};

export default function SubmitPage() {
  const [category, setCategory] = React.useState("sports-club");
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production this posts to Supabase with status="pending" for moderation.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container flex flex-col items-center py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pine/10 text-pine">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold">Thanks — it's in review</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Our moderation team checks every submission before it goes live, usually within 48 hours.
          We'll email you once it's published.
        </p>
        <Button className="mt-8" onClick={() => setSubmitted(false)}>
          Submit another listing
        </Button>
      </div>
    );
  }

  const config = CATEGORY_FORMS[category];

  return (
    <div className="container max-w-3xl py-14">
      <div className="max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Contribute</span>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Submit Your Community
        </h1>
        <p className="mt-4 text-muted-foreground">
          Add your club, business, restaurant, association, event, housing, or job listing. Every
          submission is reviewed before publishing.
        </p>
      </div>

      <Tabs value={category} onValueChange={setCategory} className="mt-8">
        <TabsList className="flex-wrap h-auto gap-y-2">
          {Object.entries(CATEGORY_FORMS).map(([key, val]) => (
            <TabsTrigger key={key} value={key}>{val.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={category}>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:grid-cols-2 sm:p-8">
            {config.fields.map((field) => (
              <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2 space-y-2" : "space-y-2"}>
                <Label htmlFor={field.name}>
                  {field.label} {field.required && <span className="text-primary">*</span>}
                </Label>
                {field.type === "textarea" ? (
                  <Textarea id={field.name} required={field.required} placeholder={field.placeholder} rows={4} />
                ) : field.type === "select-city" ? (
                  <Select id={field.name} required={field.required} defaultValue="">
                    <option value="" disabled>Select a city</option>
                    {cities.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <div className="sm:col-span-2 flex items-start gap-2 rounded-xl bg-surface-2 p-4 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-pine" />
              Your submission is sent to our moderation queue and reviewed before it appears publicly.
            </div>

            <Button type="submit" size="lg" className="sm:col-span-2">
              Submit for Review
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
