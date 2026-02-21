import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Filter, Layers, Search, Eye, ChevronDown, Navigation, Phone, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { mockHCPs } from "@/data/mockData";

export default function HCPMap() {
  const [selectedHCP, setSelectedHCP] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all");

  const specialties = [...new Set(mockHCPs.map(h => h.specialty))];
  const filtered = mockHCPs.filter(h => {
    if (filterTier !== "all" && h.tier !== filterTier) return false;
    if (filterSpecialty !== "all" && h.specialty !== filterSpecialty) return false;
    return true;
  });
  const selected = mockHCPs.find(h => h.id === selectedHCP);

  return (
    <div className="flex h-full">
      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-secondary/30">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }} />
          {/* HCP Pins */}
          {filtered.map((hcp, i) => {
            const x = 15 + ((hcp.lng - 72.78) / 0.15) * 70;
            const y = 10 + ((19.25 - hcp.lat) / 0.3) * 80;
            return (
              <motion.button
                key={hcp.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`absolute z-10 flex items-center justify-center transition-all ${
                  selectedHCP === hcp.id ? "scale-125" : "hover:scale-110"
                }`}
                style={{ left: `${Math.min(90, Math.max(5, x))}%`, top: `${Math.min(85, Math.max(5, y))}%` }}
                onClick={() => setSelectedHCP(hcp.id)}
              >
                <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-md ${
                  hcp.tier === "high" ? "bg-destructive/90 border-destructive text-destructive-foreground" :
                  hcp.tier === "medium" ? "bg-warning/90 border-warning text-warning-foreground" :
                  "bg-success/90 border-success text-success-foreground"
                }`}>
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="absolute -bottom-5 whitespace-nowrap text-[10px] font-medium text-foreground bg-card px-1.5 py-0.5 rounded shadow-sm border border-border">
                  {hcp.name.split(" ").slice(-1)[0]}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Filter Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-3 z-20">
          <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2 shadow-md">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="text-sm bg-transparent text-foreground border-none focus:outline-none"
            >
              <option value="all">All Tiers</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2 shadow-md">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="text-sm bg-transparent text-foreground border-none focus:outline-none"
            >
              <option value="all">All Specialties</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="ml-auto rounded-xl bg-card border border-border px-3 py-2 shadow-md text-xs font-medium text-muted-foreground">
            {filtered.length} HCPs shown
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-xl bg-card border border-border px-4 py-2.5 shadow-md z-20">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Low</span>
          </div>
        </div>
      </div>

      {/* HCP Detail Panel */}
      <div className={`border-l border-border bg-card transition-all duration-300 overflow-y-auto ${selectedHCP ? "w-80" : "w-0"}`}>
        {selected && (
          <motion.div className="p-5 space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.specialty}</p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                selected.tier === "high" ? "priority-high" :
                selected.tier === "medium" ? "priority-medium" : "priority-low"
              }`}>
                {selected.tier.toUpperCase()}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{selected.clinic}, {selected.city}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{selected.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last visit: {selected.lastVisit}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {selected.rxTrend === "up" ? <TrendingUp className="h-4 w-4 text-success" /> :
                 selected.rxTrend === "down" ? <TrendingDown className="h-4 w-4 text-destructive" /> :
                 <Minus className="h-4 w-4 text-muted-foreground" />}
                <span>Rx Trend: {selected.rxTrend}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{selected.visitCount} total visits</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 gradient-primary rounded-lg py-2 text-sm font-medium text-primary-foreground shadow-primary">
                Plan Visit
              </button>
              <button className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                View Profile
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
