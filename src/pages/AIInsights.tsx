import { motion } from "framer-motion";
import {
  Brain, Mic, CreditCard, Sparkles, TrendingUp, TrendingDown, AlertTriangle,
  MessageSquare, FileText, User, Pill, Activity, ArrowRight, Search
} from "lucide-react";
import { mockHCPs } from "@/data/mockData";

const preCallBrief = {
  hcp: mockHCPs[0],
  lastVisitSummary: "Discussed Atorvastatin 20mg efficacy. Doctor requested 40mg samples for select patients. Positive reception to new lipid management data.",
  objectionHistory: ["Concerned about muscle pain side effects", "Prefers branded over generic"],
  preferredProducts: ["Atorvastatin 20mg", "Rosuvastatin 10mg", "Clopidogrel 75mg"],
  talkingPoints: [
    "Share new Phase III trial data showing reduced myalgia incidence",
    "Highlight cost-effectiveness vs branded alternatives",
    "Discuss combination therapy benefits for high-risk patients",
  ],
  rxTrend: { direction: "up" as const, change: "+12%", period: "last 3 months" },
  behavioralSignals: ["Early adopter of new molecules", "Values clinical evidence", "Responds well to peer comparisons"],
};

const aiAlerts = [
  { type: "rx-drop", hcp: "Dr. Meena Rao", message: "Rx volume dropped 35% in last 2 months. Schedule priority visit.", severity: "high" },
  { type: "opportunity", hcp: "Dr. Vikram Singh", message: "Nearby unvisited HCP — 2.3 km from your next stop. Consider a quick visit.", severity: "medium" },
  { type: "trend", hcp: "Dr. Suresh Patel", message: "Increasing adoption of your competitor's product in Endocrinology segment.", severity: "high" },
];

export default function AIInsights() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">AI Insights</h1>
          <p className="text-sm text-muted-foreground">Pre-call intelligence & smart recommendations</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <Mic className="h-4 w-4" /> Voice Notes
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            <CreditCard className="h-4 w-4" /> Scan Card
          </button>
        </div>
      </div>

      {/* AI Alerts */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Smart Alerts
        </h2>
        {aiAlerts.map((alert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-start gap-3 rounded-xl border p-4 ${
              alert.severity === "high" ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"
            }`}
          >
            <AlertTriangle className={`h-5 w-5 mt-0.5 shrink-0 ${
              alert.severity === "high" ? "text-destructive" : "text-warning"
            }`} />
            <div>
              <p className="text-sm font-semibold text-foreground">{alert.hcp}</p>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pre-Call Brief */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">{preCallBrief.hcp.name}</h2>
                <p className="text-sm text-muted-foreground">{preCallBrief.hcp.specialty} · {preCallBrief.hcp.clinic}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                Rx {preCallBrief.rxTrend.change}
              </div>
            </div>

            {/* Last Visit */}
            <div className="rounded-lg bg-secondary/50 p-4 mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Last Visit Summary</h3>
              <p className="text-sm text-foreground">{preCallBrief.lastVisitSummary}</p>
            </div>

            {/* Talking Points */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-Suggested Talking Points
              </h3>
              <div className="space-y-2">
                {preCallBrief.talkingPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Objection History */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Known Objections</h3>
              <div className="space-y-1.5">
                {preCallBrief.objectionHistory.map((obj, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning shrink-0" />
                    {obj}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side panels */}
        <div className="space-y-4">
          {/* Preferred Products */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Pill className="h-3.5 w-3.5" /> Preferred Products
            </h3>
            <div className="space-y-2">
              {preCallBrief.preferredProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm text-foreground">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  {product}
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Signals */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> Behavioral Signals
            </h3>
            <div className="space-y-2">
              {preCallBrief.behavioralSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Sparkles className="h-3 w-3 text-accent shrink-0" />
                  {signal}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                <MessageSquare className="h-4 w-4" />
                Generate Follow-Up Email
              </button>
              <button className="w-full flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-muted transition-colors">
                <Search className="h-4 w-4" />
                NPI / HCP Lookup
              </button>
              <button className="w-full flex items-center gap-2 rounded-lg bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-muted transition-colors">
                <FileText className="h-4 w-4" />
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
