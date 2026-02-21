import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Cloud, CloudOff, Search, Bell } from "lucide-react";

export function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search HCPs, visits, follow-ups..."
                className="h-9 w-72 rounded-lg border border-input bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Sync status */}
            <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1">
              <Cloud className="h-3.5 w-3.5 text-success" />
              <span className="text-xs font-medium text-success">All synced</span>
            </div>
            {/* Notifications */}
            <button className="relative rounded-lg p-2 hover:bg-secondary transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
