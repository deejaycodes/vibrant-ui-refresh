const API_BASE = import.meta.env.VITE_API_URL || "https://api.safevoice.org";

function getTenant(): string {
  return localStorage.getItem("safevoice_tenant") || "uk";
}

function getToken(): string | null {
  return localStorage.getItem("safevoice_token");
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const tenant = getTenant();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Tenant": tenant,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, signal: controller.signal });
  clearTimeout(timeout);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || "API request failed");
  }

  return res.json();
}

// Dashboard
export async function getDashboard() {
  return apiFetch("/api/dashboard");
}

export async function getReports() {
  return apiFetch("/api/reports");
}

export async function getReferrals() {
  return apiFetch("/api/referrals");
}

export async function getReferralDetail(id: string) {
  return apiFetch(`/api/referrals/${id}`);
}

// Copilot
export async function sendCopilotMessage(message: string) {
  return apiFetch("/api/copilot", { method: "POST", body: JSON.stringify({ message }) });
}

// Handoff
export async function getHandoffs() {
  return apiFetch("/api/handoffs");
}

export async function createHandoff(data: Record<string, unknown>) {
  return apiFetch("/api/handoffs", { method: "POST", body: JSON.stringify(data) });
}

// Meetings
export async function getMeetings() {
  return apiFetch("/api/meetings");
}

export async function createMeeting(data: Record<string, unknown>) {
  return apiFetch("/api/meetings", { method: "POST", body: JSON.stringify(data) });
}

// Services
export async function getServices() {
  return apiFetch("/api/services");
}

// Analytics
export async function getAnalytics() {
  return apiFetch("/api/analytics");
}

// Settings
export async function getSettings() {
  return apiFetch("/api/settings");
}

export async function updateSettings(data: Record<string, unknown>) {
  return apiFetch("/api/settings", { method: "PUT", body: JSON.stringify(data) });
}

// Admin
export async function getStats() {
  return apiFetch("/api/admin/stats");
}

export async function getHealthCheck() {
  return apiFetch("/api/admin/health");
}

export async function getGenerations() {
  return apiFetch("/api/admin/generations");
}

export async function runCron() {
  return apiFetch("/api/admin/cron", { method: "POST" });
}

export async function getAdminUsers() {
  return apiFetch("/api/admin/users");
}

export async function getAdminPrompts() {
  return apiFetch("/api/admin/prompts");
}

export async function updatePrompt(id: string, data: Record<string, unknown>) {
  return apiFetch(`/api/admin/prompts/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function getAdminReviews() {
  return apiFetch("/api/admin/reviews");
}

export async function getAuditLog() {
  return apiFetch("/api/admin/audit");
}

export { getTenant, getToken };
