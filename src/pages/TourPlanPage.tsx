import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, Send, Edit, MessageSquare, Calendar, Users, Home, Briefcase, AlertTriangle, ChevronRight } from "lucide-react";
import { mockTourPlan, mockHCPs } from "@/data/mockData";

const tourDays = [
  { date: "Feb 1", type: "field", visits: ["Dr. Ashish Mishra", "Dr. Nikesh Jain", "Dr. Priya Sharma"], status: "completed" },
  { date: "Feb 2", type: "field", visits: ["Dr. Suresh Patel", "Dr. Meena Rao"], status: "completed" },
  { date: "Feb 3", type: "hq", visits: [], status: "completed" },
  { date: "Feb 4", type: "field", visits: ["Dr. Rajesh Kumar", "Dr. Anita Desai", "Dr. Vikram Singh"], status: "completed" },
  { date: "Feb 5", type: "jfw", visits: ["Dr. Ashish Mishra (JFW)"], status: "completed" },
  { date: "Feb 6", type: "leave", visits: [], status: "completed" },
  { date: "Feb 7", type: "field", visits: ["Dr. Nikesh Jain", "Dr. Suresh Patel"], status: "completed" },
  { date: "Feb 21", type: "field", visits: ["Dr. Ashish Mishra", "Dr. Priya Sharma", "Dr. Rajesh Kumar", "Dr. Nikesh Jain", "Dr. Anita Desai", "Dr. Suresh Patel"], status: "in-progress" },
  { date: "Feb 22", type: "field", visits: ["Dr. Meena Rao", "Dr. Vikram Singh"], status: "planned" },
  { date: "Feb 23", type: "hq", visits: [], status: "planned" },
];

const typeConfig = {
  field: { icon: Briefcase, label: "Field Day", color: "bg-primary/10 text-primary" },
  hq: { icon: Home, label: "HQ Day", color: "bg-secondary text-secondary-foreground" },
  jfw: { icon: Users, label: "Joint Field Work", color: "bg-info/10 text-info" },
  leave: { icon: Calendar, label: "Leave", color: "bg-muted text-muted-foreground" },
};

export default function TourPlanPage() {
  const progress = Math.round((mockTourPlan.completedVisits / mockTourPlan.totalVisits) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Tour Plan</h1>
          <p className="text-sm text-muted-foreground">{mockTourPlan.month} · Standard Touring Programme</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            mockTourPlan.status === "approved" ? "bg-success/10 text-success" :
            mockTourPlan.status === "submitted" ? "bg-info/10 text-info" :
            mockTourPlan.status === "rejected" ? "bg-destructive/10 text-destructive" :
            "bg-muted text-muted-foreground"
          }`}>
            {mockTourPlan.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="kpi-card">
          <p className="text-xs text-muted-foreground">Total Visits</p>
          <p className="text-xl font-bold text-foreground">{mockTourPlan.totalVisits}</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs text-muted-foreground">Completed</p>
          <p className="text-xl font-bold text-success">{mockTourPlan.completedVisits}</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs text-muted-foreground">HQ Days</p>
          <p className="text-xl font-bold text-foreground">{mockTourPlan.hqDays}</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs text-muted-foreground">JFW Days</p>
          <p className="text-xl font-bold text-info">{mockTourPlan.jfwDays}</p>
        </div>
        <div className="kpi-card">
          <p className="text-xs text-muted-foreground">Leave Days</p>
          <p className="text-xl font-bold text-foreground">{mockTourPlan.leaveDays}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Tour Progress</span>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        {mockTourPlan.managerComment && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-info/5 border border-info/20 p-3">
            <MessageSquare className="h-4 w-4 text-info mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-info">Manager Comment</p>
              <p className="text-sm text-foreground">{mockTourPlan.managerComment}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tour Day List */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Daily Breakdown</h2>
        </div>
        <div className="divide-y divide-border">
          {tourDays.map((day, i) => {
            const config = typeConfig[day.type as keyof typeof typeConfig];
            return (
              <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-secondary/30 transition-colors">
                <div className="w-16 text-sm font-medium text-muted-foreground">{day.date}</div>
                <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>
                  <config.icon className="h-3 w-3" />
                  {config.label}
                </div>
                <div className="flex-1 text-sm text-foreground">
                  {day.visits.length > 0 ? day.visits.join(", ") : "—"}
                </div>
                <div className="flex items-center gap-1.5">
                  {day.status === "completed" && <CheckCircle2 className="h-4 w-4 text-success" />}
                  {day.status === "in-progress" && <Clock className="h-4 w-4 text-info animate-pulse-dot" />}
                  {day.status === "planned" && <Clock className="h-4 w-4 text-muted-foreground" />}
                  <span className="text-xs text-muted-foreground capitalize">{day.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
