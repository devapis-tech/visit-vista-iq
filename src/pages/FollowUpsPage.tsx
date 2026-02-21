import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell, Clock, CheckCircle2, AlertCircle, Phone, Package, BookOpen,
  HelpCircle, ChevronRight, Calendar, MoreHorizontal
} from "lucide-react";
import { mockFollowUps } from "@/data/mockData";

const typeIcons = {
  callback: Phone,
  "sample-delivery": Package,
  "literature-drop": BookOpen,
  "query-resolution": HelpCircle,
};

const typeLabels = {
  callback: "Callback",
  "sample-delivery": "Sample Delivery",
  "literature-drop": "Literature Drop",
  "query-resolution": "Query Resolution",
};

export default function FollowUpsPage() {
  const [filter, setFilter] = useState<"all" | "overdue" | "pending" | "completed">("all");

  const filtered = mockFollowUps.filter(f => filter === "all" || f.status === filter);
  const overdueCount = mockFollowUps.filter(f => f.status === "overdue").length;
  const pendingCount = mockFollowUps.filter(f => f.status === "pending").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Follow-Ups</h1>
          <p className="text-sm text-muted-foreground">{mockFollowUps.length} total · {overdueCount} overdue · {pendingCount} pending</p>
        </div>
        <button className="gradient-primary rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground shadow-primary flex items-center gap-2">
          <Bell className="h-4 w-4" /> Add Follow-Up
        </button>
      </div>

      {/* Overdue Banner */}
      {overdueCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-xl bg-destructive/5 border border-destructive/20 p-4"
        >
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-destructive">{overdueCount} overdue follow-ups</p>
            <p className="text-xs text-muted-foreground">These require immediate attention</p>
          </div>
          <button className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive">
            View Overdue
          </button>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(["all", "overdue", "pending", "completed"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "overdue" && overdueCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground px-1">
                {overdueCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Follow-Up List */}
      <div className="space-y-3">
        {filtered.map((fu, i) => {
          const TypeIcon = typeIcons[fu.type];
          return (
            <motion.div
              key={fu.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl border bg-card p-4 transition-all hover:shadow-md ${
                fu.status === "overdue" ? "border-destructive/30" : "border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl shrink-0 ${
                  fu.status === "overdue" ? "bg-destructive/10 text-destructive" :
                  fu.status === "completed" ? "bg-success/10 text-success" :
                  "bg-primary/10 text-primary"
                }`}>
                  <TypeIcon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{fu.hcpName}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                      fu.priority === "high" ? "priority-high" :
                      fu.priority === "medium" ? "priority-medium" : "priority-low"
                    }`}>
                      {fu.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{typeLabels[fu.type]}</p>
                  <p className="text-sm text-foreground mt-1.5">{fu.notes}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Due: {fu.dueDate}
                    </div>
                    {fu.status === "overdue" && (
                      <span className="text-xs font-medium text-destructive">Overdue</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {fu.status !== "completed" && (
                    <>
                      <button className="rounded-lg bg-success/10 p-2 text-success hover:bg-success/20 transition-colors" title="Mark Complete">
                        <CheckCircle2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg bg-secondary p-2 text-muted-foreground hover:bg-muted transition-colors" title="Snooze">
                        <Clock className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
