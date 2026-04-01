// Demo/mock data returned when in demo mode and the real API is unreachable

export const demoDashboard = {
  totalCases: 127,
  activeReferrals: 34,
  criticalReports: 8,
  resolvedCount: 85,
};

export const demoReports = {
  reports: [
    { id: "R-001", survivor: "Case #1042", risk: "critical", status: "pending", abuseTypes: ["physical", "coercive control"], date: "2026-03-28" },
    { id: "R-002", survivor: "Case #1038", risk: "high", status: "active", abuseTypes: ["emotional", "financial"], date: "2026-03-27" },
    { id: "R-003", survivor: "Case #1035", risk: "medium", status: "resolved", abuseTypes: ["stalking"], date: "2026-03-25" },
    { id: "R-004", survivor: "Case #1029", risk: "low", status: "resolved", abuseTypes: ["emotional"], date: "2026-03-22" },
    { id: "R-005", survivor: "Case #1044", risk: "high", status: "pending", abuseTypes: ["physical", "sexual"], date: "2026-03-30" },
  ],
};

export const demoReferrals = [
  { id: "REF-101", service: "Women's Aid Birmingham", status: "pending", risk: "critical", date: "2026-03-29", survivorId: "S-1042" },
  { id: "REF-102", service: "Refuge National Helpline", status: "accepted", risk: "high", date: "2026-03-27", survivorId: "S-1038" },
  { id: "REF-103", service: "Victim Support Leeds", status: "completed", risk: "medium", date: "2026-03-20", survivorId: "S-1035" },
  { id: "REF-104", service: "MARAC Coordinator", status: "declined", risk: "low", date: "2026-03-18", survivorId: "S-1029" },
];

export const demoReferralDetail = (id: string) => ({
  id,
  service: "Women's Aid Birmingham",
  serviceName: "Women's Aid Birmingham",
  serviceType: "Refuge & Outreach",
  serviceContact: "0121 456 7890",
  risk: "critical",
  status: "pending",
  immediateRisk: true,
  abuseTypes: ["physical", "coercive control", "financial"],
  safetyPlan: "1. Emergency contacts shared with survivor.\n2. Safe word established for phone calls.\n3. Go-bag prepared and stored at neighbour's.\n4. Legal protective order application in progress.",
  reportDate: "2026-03-28",
  referralDate: "2026-03-29",
  timeline: [
    { date: "2026-03-28T10:30:00Z", event: "AI risk assessment completed — Critical risk" },
    { date: "2026-03-28T11:00:00Z", event: "Referral created to Women's Aid Birmingham" },
    { date: "2026-03-29T09:15:00Z", event: "Caseworker assigned" },
  ],
});

export const demoCaseNotes = [
  { id: "N-1", author: "Jane Smith", content: "Initial assessment call completed. Survivor is currently safe.", type: "note", date: "2026-03-29T14:00:00Z" },
  { id: "N-2", author: "Jane Smith", content: "Contacted local refuge — bed available from Friday.", type: "action", date: "2026-03-29T16:30:00Z" },
  { id: "N-3", author: "Mark Taylor", content: "Spoke with survivor — confirmed safe window Mon-Fri 10am-2pm.", type: "phone_call", date: "2026-03-30T11:00:00Z" },
];

export const demoHandoffs: any[] = [];

export const demoMeetings = [
  { id: "M-1", title: "MARAC Meeting — Case #1042", type: "marac", date: "2026-04-02T10:00:00Z", attendees: ["Jane Smith", "PC Davies", "Housing Officer"], notes: "Discuss refuge placement" },
  { id: "M-2", title: "Supervision — Jane Smith", type: "supervision", date: "2026-04-03T14:00:00Z", attendees: ["Jane Smith", "Sarah Manager"], notes: "" },
];

export const demoServices = [
  { id: "SV-1", name: "Women's Aid Birmingham", type: "Refuge", location: "Birmingham", phone: "0121 456 7890", email: "info@wabham.org" },
  { id: "SV-2", name: "Refuge National Helpline", type: "Helpline", location: "National", phone: "0808 200 0247", email: "help@refuge.org.uk" },
  { id: "SV-3", name: "Victim Support Leeds", type: "Advocacy", location: "Leeds", phone: "0113 987 6543", email: "leeds@victimsupport.org" },
  { id: "SV-4", name: "Respect Phoneline", type: "Perpetrator Programme", location: "National", phone: "0808 802 4040", email: "info@respect.org.uk" },
];

export const demoAnalytics = {
  casesOverTime: [
    { month: "Oct", count: 18 }, { month: "Nov", count: 24 }, { month: "Dec", count: 20 },
    { month: "Jan", count: 30 }, { month: "Feb", count: 27 }, { month: "Mar", count: 34 },
  ],
  riskDistribution: [
    { level: "Critical", count: 8 }, { level: "High", count: 14 }, { level: "Medium", count: 22 }, { level: "Low", count: 83 },
  ],
  referralOutcomes: [
    { outcome: "Accepted", count: 45 }, { outcome: "Declined", count: 12 }, { outcome: "Completed", count: 38 }, { outcome: "Pending", count: 32 },
  ],
};

export const demoSettings = {
  name: "Jane Smith",
  email: "jane@womensaid.org.uk",
  notifications: { email: true, sms: false, critical: true },
};

export const demoAdminStats = {
  totalUsers: 42,
  activePartners: 18,
  aiGenerations: 1547,
  systemHealth: "healthy",
};

export const demoAdminUsers = [
  { id: "U-1", name: "Jane Smith", email: "jane@womensaid.org.uk", org: "Women's Aid Birmingham", role: "caseworker", status: "active" },
  { id: "U-2", name: "Mark Taylor", email: "mark@refuge.org.uk", org: "Refuge", role: "manager", status: "active" },
  { id: "U-3", name: "Sarah Jones", email: "sarah@vs-leeds.org", org: "Victim Support Leeds", role: "caseworker", status: "inactive" },
];

export const demoAdminPrompts = [
  { id: "P-1", name: "Risk Assessment", content: "You are a risk assessment AI...", updatedAt: "2026-03-15" },
  { id: "P-2", name: "Safety Planning", content: "You are a safety planning assistant...", updatedAt: "2026-03-20" },
];

export const demoAdminReviews = [
  { id: "RV-1", caseId: "R-001", risk: "critical", aiAssessment: "Critical risk identified based on escalation pattern", status: "pending", date: "2026-03-29" },
  { id: "RV-2", caseId: "R-005", risk: "high", aiAssessment: "High risk — multiple abuse types reported", status: "pending", date: "2026-03-30" },
];

export const demoAuditLog = [
  { id: "A-1", user: "jane@womensaid.org.uk", action: "referral.create", details: "Created referral REF-101", timestamp: "2026-03-29T09:00:00Z" },
  { id: "A-2", user: "system", action: "ai.assessment", details: "Risk assessment completed for Case #1042", timestamp: "2026-03-28T10:30:00Z" },
  { id: "A-3", user: "mark@refuge.org.uk", action: "referral.accept", details: "Accepted referral REF-102", timestamp: "2026-03-27T14:22:00Z" },
  { id: "A-4", user: "jane@womensaid.org.uk", action: "note.add", details: "Added case note to REF-101", timestamp: "2026-03-29T14:00:00Z" },
];

export function isDemoMode(): boolean {
  return localStorage.getItem("safevoice_demo") === "true";
}
