import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { mockVisits } from "@/data/mockData";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

// Generate calendar days for Feb 2026
const generateCalendarDays = () => {
  const days: { date: number; isCurrentMonth: boolean; isToday: boolean }[] = [];
  // Feb 2026 starts on Sunday (0), 28 days
  const startDay = 6; // Sunday = fill last position
  for (let i = 0; i < startDay; i++) days.push({ date: 31 - startDay + i + 1, isCurrentMonth: false, isToday: false });
  for (let i = 1; i <= 28; i++) days.push({ date: i, isCurrentMonth: true, isToday: i === 21 });
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) days.push({ date: i, isCurrentMonth: false, isToday: false });
  return days;
};

export default function CalendarPage() {
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const calendarDays = generateCalendarDays();

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Schedule</h1>
          <p className="text-sm text-muted-foreground">February 21, 2026 — Saturday</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-card">
            {(["day", "week", "month"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  view === v ? "bg-primary text-primary-foreground rounded-lg" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <button className="gradient-primary rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground shadow-primary flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Visit
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Mini Calendar */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <button className="p-1 hover:bg-secondary rounded"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm font-semibold text-foreground">February 2026</span>
            <button className="p-1 hover:bg-secondary rounded"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map(d => <div key={d} className="text-[10px] font-medium text-muted-foreground py-1">{d}</div>)}
            {calendarDays.map((day, i) => (
              <button
                key={i}
                className={`h-8 w-8 rounded-lg text-xs font-medium transition-colors ${
                  day.isToday ? "gradient-primary text-primary-foreground shadow-primary" :
                  day.isCurrentMonth ? "text-foreground hover:bg-secondary" : "text-muted-foreground/40"
                }`}
              >
                {day.date}
              </button>
            ))}
          </div>
          {/* Upcoming visits count */}
          <div className="mt-4 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Today's Summary</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total visits</span>
              <span className="font-semibold text-foreground">{mockVisits.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">High priority</span>
              <span className="font-semibold text-destructive">{mockVisits.filter(v => v.tier === "high").length}</span>
            </div>
          </div>
        </div>

        {/* Day View Timeline */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-4">
          {view === "day" && (
            <div className="space-y-0">
              {HOURS.map((hour) => {
                const hourNum = parseInt(hour);
                const visitsAtHour = mockVisits.filter(v => {
                  const h = parseInt(v.scheduledTime);
                  const isPM = v.scheduledTime.includes("PM") && h !== 12;
                  return (isPM ? h + 12 : h) === hourNum;
                });
                return (
                  <div key={hour} className="flex border-b border-border/50 last:border-0">
                    <div className="w-16 py-3 text-xs text-muted-foreground shrink-0">{hour}</div>
                    <div className="flex-1 py-1 min-h-[3rem]">
                      {visitsAtHour.map(visit => (
                        <div
                          key={visit.id}
                          className={`rounded-lg px-3 py-2 mb-1 border-l-4 ${
                            visit.status === "completed" ? "bg-success/5 border-success" :
                            visit.status === "in-progress" ? "bg-info/5 border-info" :
                            "bg-primary/5 border-primary"
                          }`}
                        >
                          <p className="text-sm font-medium text-foreground">{visit.hcpName}</p>
                          <p className="text-xs text-muted-foreground">{visit.specialty} · {visit.scheduledTime}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* Visits not matched to hour grid */}
              <div className="mt-4 border-t border-border pt-4">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3">ALL TODAY'S VISITS</h3>
                <div className="space-y-2">
                  {mockVisits.map(visit => (
                    <div key={visit.id} className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-secondary/50 transition-colors">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground w-16">{visit.scheduledTime}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{visit.hcpName}</p>
                        <p className="text-xs text-muted-foreground">{visit.clinic}</p>
                      </div>
                      <span className={`h-2 w-2 rounded-full ${
                        visit.status === "completed" ? "bg-success" :
                        visit.status === "in-progress" ? "bg-info animate-pulse-dot" : "bg-muted-foreground/40"
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {view === "week" && (
            <div className="text-center py-20 text-muted-foreground text-sm">
              <CalendarWeekView />
            </div>
          )}
          {view === "month" && (
            <div className="text-center py-20 text-muted-foreground text-sm">
              Month view coming soon — use the mini calendar to navigate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalendarWeekView() {
  const weekDays = ["Mon 16", "Tue 17", "Wed 18", "Thu 19", "Fri 20", "Sat 21", "Sun 22"];
  const visitCounts = [4, 5, 3, 6, 4, 6, 0];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => (
          <div key={day} className={`rounded-xl border p-4 text-left ${day.includes("21") ? "border-primary bg-primary/5" : "border-border"}`}>
            <p className="text-xs font-medium text-muted-foreground">{day}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{visitCounts[i]}</p>
            <p className="text-xs text-muted-foreground">visits</p>
          </div>
        ))}
      </div>
    </div>
  );
}
