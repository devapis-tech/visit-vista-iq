import { motion } from "framer-motion";
import {
  MapPin, Clock, CheckCircle2, XCircle, PlayCircle, TrendingUp,
  Navigation, ClipboardList, Bell, CalendarDays, Fuel, Trophy,
  ArrowRight, Zap, ChevronRight, Users
} from "lucide-react";
import { mockVisits, mockFollowUps, mockTourPlan } from "@/data/mockData";
import { Link } from "react-router-dom";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

function KPICard({ icon: Icon, label, value, subtitle, color }: { icon: any; label: string; value: string | number; subtitle?: string; color: string }) {
  return (
    <motion.div className="kpi-card" {...fadeIn}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const completed = mockVisits.filter((v) => v.status === "completed").length;
  const planned = mockVisits.filter((v) => v.status === "planned").length;
  const inProgress = mockVisits.filter((v) => v.status === "in-progress").length;
  const missed = mockVisits.filter((v) => v.status === "missed").length;
  const nextVisit = mockVisits.find((v) => v.status === "in-progress") || mockVisits.find((v) => v.status === "planned");
  const overdueCount = mockFollowUps.filter((f) => f.status === "overdue").length;

  return (
    <div className="p-6 space-y-6">
      {/* Next Visit Strip */}
      {nextVisit && (
        <motion.div
          className="gradient-primary rounded-xl p-4 shadow-primary flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Navigation className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-primary-foreground/70">NEXT VISIT</p>
              <p className="text-lg font-bold text-primary-foreground">{nextVisit.hcpName}</p>
              <p className="text-sm text-primary-foreground/80">{nextVisit.specialty} · {nextVisit.clinic}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-primary-foreground">{nextVisit.scheduledTime}</p>
              <p className="text-xs text-primary-foreground/70">ETA 12 min</p>
            </div>
            <Link
              to="/route"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-primary-foreground" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard icon={CheckCircle2} label="Completed" value={completed} subtitle="visits today" color="bg-success/10 text-success" />
        <KPICard icon={PlayCircle} label="In Progress" value={inProgress} subtitle="active now" color="bg-info/10 text-info" />
        <KPICard icon={Clock} label="Planned" value={planned} subtitle="remaining today" color="bg-primary/10 text-primary" />
        <KPICard icon={XCircle} label="Missed" value={missed} subtitle="need reason" color="bg-destructive/10 text-destructive" />
      </div>

      {/* Second row: Tour, Follow-ups, Mileage, Streak */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard icon={CalendarDays} label="Tour Progress" value={`${mockTourPlan.completedVisits}/${mockTourPlan.totalVisits}`} subtitle={mockTourPlan.month} color="bg-primary/10 text-primary" />
        <KPICard icon={Bell} label="Follow-Ups" value={mockFollowUps.length} subtitle={`${overdueCount} overdue`} color="bg-warning/10 text-warning" />
        <KPICard icon={Fuel} label="Mileage Today" value="47 km" subtitle="Target: 80 km" color="bg-accent/10 text-accent" />
        <KPICard icon={Trophy} label="Visit Streak" value="12 days" subtitle="Rank #3 in team" color="bg-primary/10 text-primary" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: Navigation, label: "Start Route", to: "/route", color: "gradient-primary text-primary-foreground shadow-primary" },
          { icon: MapPin, label: "Log Visit", to: "/map", color: "bg-accent text-accent-foreground" },
          { icon: Bell, label: "Add Follow-Up", to: "/follow-ups", color: "bg-warning text-warning-foreground" },
          { icon: ClipboardList, label: "View Tour Plan", to: "/tour-plan", color: "bg-secondary text-secondary-foreground" },
        ].map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className={`flex items-center gap-3 rounded-xl p-4 font-medium text-sm transition-all hover:scale-[1.02] ${action.color}`}
          >
            <action.icon className="h-5 w-5" />
            {action.label}
          </Link>
        ))}
      </div>

      {/* Today's Visit Timeline & Follow-up Summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Visit Timeline */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Today's Visits</h2>
            <Link to="/calendar" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              View Calendar <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockVisits.map((visit) => (
              <div
                key={visit.id}
                className="flex items-center gap-4 rounded-lg border border-border p-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="text-xs font-medium text-muted-foreground w-16 shrink-0">{visit.scheduledTime}</div>
                <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                  visit.status === "completed" ? "bg-success" :
                  visit.status === "in-progress" ? "bg-info animate-pulse-dot" :
                  visit.status === "missed" ? "bg-destructive" : "bg-muted-foreground/40"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{visit.hcpName}</p>
                  <p className="text-xs text-muted-foreground">{visit.specialty} · {visit.clinic}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                  visit.tier === "high" ? "priority-high" :
                  visit.tier === "medium" ? "priority-medium" : "priority-low"
                }`}>
                  {visit.tier.toUpperCase()}
                </span>
                <span className={`text-xs font-medium ${
                  visit.status === "completed" ? "text-success" :
                  visit.status === "in-progress" ? "text-info" :
                  visit.status === "missed" ? "text-destructive" : "text-muted-foreground"
                }`}>
                  {visit.status === "in-progress" ? "In Progress" : visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Follow-up Summary */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Pending Follow-Ups</h2>
            <Link to="/follow-ups" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockFollowUps.filter(f => f.status !== "completed").slice(0, 5).map((fu) => (
              <div key={fu.id} className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-secondary/50 transition-colors">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                  fu.status === "overdue" ? "bg-destructive" : "bg-warning"
                }`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{fu.hcpName}</p>
                  <p className="text-xs text-muted-foreground">{fu.type.replace("-", " ")} · {fu.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
