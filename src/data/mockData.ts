export interface HCP {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  city: string;
  tier: "high" | "medium" | "low";
  lastVisit: string;
  nextVisit?: string;
  lat: number;
  lng: number;
  rxTrend: "up" | "down" | "stable";
  phone: string;
  visitCount: number;
}

export interface Visit {
  id: string;
  hcpId: string;
  hcpName: string;
  specialty: string;
  clinic: string;
  scheduledTime: string;
  status: "planned" | "completed" | "missed" | "in-progress";
  tier: "high" | "medium" | "low";
  notes?: string;
  samplesDropped?: string[];
  productsDetailed?: string[];
  checkInTime?: string;
  checkOutTime?: string;
}

export interface FollowUp {
  id: string;
  hcpId: string;
  hcpName: string;
  type: "callback" | "sample-delivery" | "literature-drop" | "query-resolution";
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed" | "overdue";
  notes: string;
}

export interface TourPlan {
  id: string;
  month: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  totalVisits: number;
  completedVisits: number;
  hqDays: number;
  jfwDays: number;
  leaveDays: number;
  managerComment?: string;
}

export const mockHCPs: HCP[] = [
  { id: "1", name: "Dr. Ashish Mishra", specialty: "Cardiology", clinic: "Wockhardt Borivali Clinic", city: "Mumbai", tier: "high", lastVisit: "2026-02-18", nextVisit: "2026-02-21", lat: 19.2307, lng: 72.8567, rxTrend: "up", phone: "+91 98765 43210", visitCount: 14 },
  { id: "2", name: "Dr. Nikesh Jain", specialty: "Cardiology", clinic: "Jaslok Hospital", city: "Mumbai", tier: "high", lastVisit: "2026-02-15", lat: 18.9710, lng: 72.8075, rxTrend: "stable", phone: "+91 98765 43211", visitCount: 11 },
  { id: "3", name: "Dr. Priya Sharma", specialty: "Neurology", clinic: "Fortis Hospital", city: "Mumbai", tier: "medium", lastVisit: "2026-02-10", lat: 19.1176, lng: 72.9060, rxTrend: "down", phone: "+91 98765 43212", visitCount: 8 },
  { id: "4", name: "Dr. Rajesh Kumar", specialty: "Orthopedics", clinic: "Lilavati Hospital", city: "Mumbai", tier: "medium", lastVisit: "2026-02-12", lat: 19.0510, lng: 72.8289, rxTrend: "up", phone: "+91 98765 43213", visitCount: 9 },
  { id: "5", name: "Dr. Anita Desai", specialty: "Dermatology", clinic: "Hinduja Hospital", city: "Mumbai", tier: "low", lastVisit: "2026-01-28", lat: 19.0380, lng: 72.8410, rxTrend: "stable", phone: "+91 98765 43214", visitCount: 5 },
  { id: "6", name: "Dr. Suresh Patel", specialty: "Endocrinology", clinic: "Kokilaben Hospital", city: "Mumbai", tier: "high", lastVisit: "2026-02-19", nextVisit: "2026-02-22", lat: 19.1300, lng: 72.8260, rxTrend: "up", phone: "+91 98765 43215", visitCount: 16 },
  { id: "7", name: "Dr. Meena Rao", specialty: "Pulmonology", clinic: "Breach Candy Hospital", city: "Mumbai", tier: "medium", lastVisit: "2026-02-05", lat: 18.9660, lng: 72.8020, rxTrend: "down", phone: "+91 98765 43216", visitCount: 7 },
  { id: "8", name: "Dr. Vikram Singh", specialty: "Gastroenterology", clinic: "Global Hospital", city: "Mumbai", tier: "low", lastVisit: "2026-02-01", lat: 19.0050, lng: 72.8300, rxTrend: "stable", phone: "+91 98765 43217", visitCount: 4 },
];

export const mockVisits: Visit[] = [
  { id: "v1", hcpId: "1", hcpName: "Dr. Ashish Mishra", specialty: "Cardiology", clinic: "Wockhardt Borivali Clinic", scheduledTime: "09:30 AM", status: "completed", tier: "high", notes: "Discussed new statin formulation", samplesDropped: ["Atorvastatin 20mg", "Rosuvastatin 10mg"], checkInTime: "09:28 AM", checkOutTime: "10:05 AM" },
  { id: "v2", hcpId: "6", hcpName: "Dr. Suresh Patel", specialty: "Endocrinology", clinic: "Kokilaben Hospital", scheduledTime: "10:45 AM", status: "completed", tier: "high", checkInTime: "10:42 AM", checkOutTime: "11:15 AM" },
  { id: "v3", hcpId: "3", hcpName: "Dr. Priya Sharma", specialty: "Neurology", clinic: "Fortis Hospital", scheduledTime: "12:00 PM", status: "in-progress", tier: "medium" },
  { id: "v4", hcpId: "4", hcpName: "Dr. Rajesh Kumar", specialty: "Orthopedics", clinic: "Lilavati Hospital", scheduledTime: "02:30 PM", status: "planned", tier: "medium" },
  { id: "v5", hcpId: "2", hcpName: "Dr. Nikesh Jain", specialty: "Cardiology", clinic: "Jaslok Hospital", scheduledTime: "04:00 PM", status: "planned", tier: "high" },
  { id: "v6", hcpId: "5", hcpName: "Dr. Anita Desai", specialty: "Dermatology", clinic: "Hinduja Hospital", scheduledTime: "05:15 PM", status: "planned", tier: "low" },
];

export const mockFollowUps: FollowUp[] = [
  { id: "f1", hcpId: "1", hcpName: "Dr. Ashish Mishra", type: "sample-delivery", dueDate: "2026-02-21", priority: "high", status: "pending", notes: "Deliver Atorvastatin 40mg samples as requested" },
  { id: "f2", hcpId: "3", hcpName: "Dr. Priya Sharma", type: "callback", dueDate: "2026-02-20", priority: "high", status: "overdue", notes: "Follow up on adverse event query for Gabapentin" },
  { id: "f3", hcpId: "7", hcpName: "Dr. Meena Rao", type: "literature-drop", dueDate: "2026-02-22", priority: "medium", status: "pending", notes: "Share latest COPD management guidelines" },
  { id: "f4", hcpId: "4", hcpName: "Dr. Rajesh Kumar", type: "query-resolution", dueDate: "2026-02-19", priority: "medium", status: "overdue", notes: "Provide dosing info for new analgesic" },
  { id: "f5", hcpId: "6", hcpName: "Dr. Suresh Patel", type: "callback", dueDate: "2026-02-23", priority: "low", status: "pending", notes: "Schedule next visit for HbA1c review" },
  { id: "f6", hcpId: "2", hcpName: "Dr. Nikesh Jain", type: "sample-delivery", dueDate: "2026-02-21", priority: "high", status: "pending", notes: "Deliver cardiac sample pack" },
];

export const mockTourPlan: TourPlan = {
  id: "tp1",
  month: "February 2026",
  status: "approved",
  totalVisits: 32,
  completedVisits: 18,
  hqDays: 4,
  jfwDays: 2,
  leaveDays: 1,
  managerComment: "Good coverage plan. Ensure Tier-1 HCPs are prioritized.",
};
