import { useState } from "react";
import { motion } from "framer-motion";
import {
  Navigation, MapPin, CheckCircle2, Clock, Play, Square, RotateCcw, Fuel,
  ChevronDown, ChevronUp, Camera, FileText, ArrowRight, Car
} from "lucide-react";
import { mockVisits, mockHCPs } from "@/data/mockData";

const routeStops = mockVisits.map((v, i) => ({
  ...v,
  distance: [0, 8.2, 5.7, 12.4, 6.1, 3.5][i],
  eta: ["—", "18 min", "12 min", "25 min", "14 min", "8 min"][i],
  address: mockHCPs.find(h => h.id === v.hcpId)?.clinic || "",
}));

export default function RoutePlanner() {
  const [routeStarted, setRouteStarted] = useState(true);
  const [expandedStop, setExpandedStop] = useState<string | null>(null);

  const totalDistance = routeStops.reduce((s, r) => s + r.distance, 0);
  const completedStops = routeStops.filter(r => r.status === "completed").length;

  return (
    <div className="flex h-full">
      {/* Route List */}
      <div className="w-[420px] border-r border-border bg-card flex flex-col overflow-hidden">
        {/* Route Header */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-foreground">Today's Route</h1>
            <span className="text-xs font-medium text-muted-foreground">{completedStops}/{routeStops.length} stops</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-secondary p-2.5 text-center">
              <p className="text-lg font-bold text-foreground">{totalDistance.toFixed(1)}</p>
              <p className="text-[10px] text-muted-foreground">km total</p>
            </div>
            <div className="rounded-lg bg-secondary p-2.5 text-center">
              <p className="text-lg font-bold text-foreground">2h 15m</p>
              <p className="text-[10px] text-muted-foreground">drive time</p>
            </div>
            <div className="rounded-lg bg-secondary p-2.5 text-center">
              <p className="text-lg font-bold text-foreground">{routeStops.length}</p>
              <p className="text-[10px] text-muted-foreground">stops</p>
            </div>
          </div>
          <div className="flex gap-2">
            {!routeStarted ? (
              <button
                onClick={() => setRouteStarted(true)}
                className="flex-1 gradient-primary rounded-lg py-2.5 text-sm font-medium text-primary-foreground shadow-primary flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4" /> Start Route
              </button>
            ) : (
              <>
                <button className="flex-1 bg-destructive/10 text-destructive rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2">
                  <Square className="h-4 w-4" /> End Route
                </button>
                <button className="rounded-lg border border-border px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stops */}
        <div className="flex-1 overflow-auto">
          {routeStops.map((stop, i) => (
            <div key={stop.id} className="border-b border-border">
              <button
                onClick={() => setExpandedStop(expandedStop === stop.id ? null : stop.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors text-left"
              >
                {/* Step indicator */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    stop.status === "completed" ? "bg-success text-success-foreground" :
                    stop.status === "in-progress" ? "gradient-primary text-primary-foreground animate-pulse-dot" :
                    "bg-secondary text-secondary-foreground"
                  }`}>
                    {stop.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < routeStops.length - 1 && <div className="w-0.5 h-4 bg-border" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{stop.hcpName}</p>
                  <p className="text-xs text-muted-foreground">{stop.clinic} · {stop.scheduledTime}</p>
                </div>

                <div className="text-right shrink-0">
                  {stop.distance > 0 && (
                    <>
                      <p className="text-xs font-medium text-foreground">{stop.distance} km</p>
                      <p className="text-[10px] text-muted-foreground">{stop.eta}</p>
                    </>
                  )}
                </div>

                {expandedStop === stop.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>

              {/* Expanded details */}
              {expandedStop === stop.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="overflow-hidden bg-secondary/20 px-4 pb-3"
                >
                  <div className="pl-11 space-y-2.5 pt-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {stop.address}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                        stop.tier === "high" ? "priority-high" :
                        stop.tier === "medium" ? "priority-medium" : "priority-low"
                      }`}>
                        {stop.tier.toUpperCase()}
                      </span>
                      <span className="text-muted-foreground">{stop.specialty}</span>
                    </div>
                    {stop.status !== "completed" && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                          <CheckCircle2 className="h-3 w-3" /> Check In
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                          <Navigation className="h-3 w-3" /> Navigate
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                          <Camera className="h-3 w-3" /> Photo
                        </button>
                      </div>
                    )}
                    {stop.status === "completed" && stop.notes && (
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <FileText className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        {stop.notes}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Mileage Footer */}
        <div className="border-t border-border p-4 bg-secondary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fuel className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">Mileage Today</span>
            </div>
            <span className="text-sm font-bold text-foreground">47.3 km</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-[59%] gradient-accent rounded-full" />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Target: 80 km</p>
        </div>
      </div>

      {/* Route Map Area */}
      <div className="flex-1 relative bg-secondary/30">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />

        {/* Route visualization */}
        <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points="15,20 30,35 45,25 60,55 75,40 85,60"
            fill="none"
            stroke="hsl(280, 60%, 45%)"
            strokeWidth="0.4"
            strokeDasharray="1,0.5"
            opacity="0.6"
          />
        </svg>

        {/* Route stop markers on map */}
        {routeStops.map((stop, i) => {
          const positions = [
            { x: 15, y: 20 }, { x: 30, y: 35 }, { x: 45, y: 25 },
            { x: 60, y: 55 }, { x: 75, y: 40 }, { x: 85, y: 60 },
          ];
          const pos = positions[i];
          return (
            <motion.div
              key={stop.id}
              className="absolute z-20"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold shadow-md ${
                stop.status === "completed" ? "bg-success text-success-foreground" :
                stop.status === "in-progress" ? "gradient-primary text-primary-foreground" :
                "bg-card text-foreground border-2 border-border"
              }`}>
                {i + 1}
              </div>
            </motion.div>
          );
        })}

        {/* Car icon for current position */}
        <motion.div
          className="absolute z-30"
          style={{ left: "45%", top: "25%" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-info text-info-foreground shadow-lg">
            <Car className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
