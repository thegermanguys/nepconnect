"use client";

import * as React from "react";
import { Check, X, Users, Building2, CalendarDays, MapPinned, ShieldCheck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cities } from "@/lib/data/cities";
import { clubs } from "@/lib/data/clubs";
import { events } from "@/lib/data/events";
import { restaurants } from "@/lib/data/restaurants";

const pendingQueue = [
  { id: "p1", type: "Sports Club", name: "Leipzig Lions Cricket Club", city: "Leipzig", submittedBy: "sanjay@example.com" },
  { id: "p2", type: "Restaurant", name: "Sherpa Kitchen", city: "Hanover", submittedBy: "owner@sherpakitchen.de" },
  { id: "p3", type: "Music Group", name: "Kathmandu Beats Berlin", city: "Berlin", submittedBy: "band@example.com" },
];

const overviewStats = [
  { icon: MapPinned, label: "Cities", value: cities.length },
  { icon: Users, label: "Clubs & Groups", value: clubs.length },
  { icon: Building2, label: "Restaurants", value: restaurants.length },
  { icon: CalendarDays, label: "Events", value: events.length },
];

export default function AdminPage() {
  const [queue, setQueue] = React.useState(pendingQueue);

  function resolve(id: string) {
    setQueue((q) => q.filter((item) => item.id !== id));
  }

  return (
    <div className="container py-14">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage listings, users, and approvals across the platform.</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {overviewStats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-5 text-center shadow-soft">
            <s.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="approvals" className="mt-10">
        <TabsList className="flex-wrap h-auto gap-y-2">
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="cities">Cities</TabsTrigger>
          <TabsTrigger value="clubs">Clubs & Groups</TabsTrigger>
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending moderation ({queue.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {queue.length === 0 && <p className="text-sm text-muted-foreground">Queue is clear — nice work.</p>}
              {queue.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="muted">{item.type}</Badge>
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{item.city} · submitted by {item.submittedBy}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => resolve(item.id)}>
                      <Check className="h-4 w-4" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => resolve(item.id)}>
                      <X className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cities">
          <AdminTable
            columns={["City", "State", "Communities", "Businesses", "Events"]}
            rows={cities.map((c) => [c.name, c.state, c.communityCount, c.businessCount, c.eventCount])}
          />
        </TabsContent>
        <TabsContent value="clubs">
          <AdminTable
            columns={["Club/Group", "City", "Category", "Members", "Status"]}
            rows={clubs.map((c) => [c.name, c.citySlug, c.categorySlug, c.memberCount, c.status])}
          />
        </TabsContent>
        <TabsContent value="restaurants">
          <AdminTable
            columns={["Restaurant", "City", "Category", "Rating", "Status"]}
            rows={restaurants.map((b) => [b.name, b.citySlug, b.category, b.rating, b.status])}
          />
        </TabsContent>
        <TabsContent value="events">
          <AdminTable
            columns={["Event", "City", "Date", "Category", "Status"]}
            rows={events.map((e) => [e.title, e.citySlug, e.startDate, e.category, e.status])}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdminTable({ columns, rows }: { columns: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            {columns.map((c) => (
              <th key={c} className="px-5 py-3 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-2/60">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-3">
                  {j === row.length - 1 && typeof cell === "string" ? (
                    <Badge variant={cell === "approved" ? "pine" : cell === "pending" ? "accent" : "muted"} className="capitalize">
                      {cell}
                    </Badge>
                  ) : (
                    String(cell)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
