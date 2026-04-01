import {
  isDemoMode, demoDashboard, demoReports, demoReferrals, demoReferralDetail,
  demoCaseNotes, demoHandoffs, demoMeetings, demoServices, demoAnalytics,
  demoSettings, demoAdminStats, demoAdminUsers, demoAdminPrompts,
  demoAdminReviews, demoAuditLog,
} from "./demo-data";

const API_BASE = "https://api.safevoice.org";

export function getTenant(): string {
  return localStorage.getItem("safevoice_tenant") || "uk";
}

export function setTenant(id: string) {
  localStorage.setItem("safevoice_tenant", id);
}

export function getToken(): string | null {
  return localStorage.getItem("safevoice_token");
}

export function handleAuthError() {
  if (isDemoMode()) return; // Don't redirect in demo mode
  localStorage.removeItem("safevoice_token");
  window.location.href = "/";
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
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers, signal: controller.signal });
    clearTimeout(timeout);

    if (res.status === 401) {
      handleAuthError();
      throw new Error("Unauthorized");
    }

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || "API request failed");
    }

    return res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (isDemoMode()) {
      return getDemoFallback(path, options.method);
    }
    throw err;
  }
}

function getDemoFallback(path: string, method?: string): any {
  // Dashboard
  if (path === "/api/dashboard") return demoDashboard;
  if (path === "/api/reports") return demoReports;

  // Referrals
  if (path === "/api/referrals" && (!method || method === "GET")) return demoReferrals;
  if (path.match(/^\/api\/referrals\/[^/]+$/) && method === "PUT") return { success: true };
  if (path.match(/^\/api\/referrals\/[^/]+$/)) {
    const id = path.split("/").pop()!;
    return demoReferralDetail(id);
  }
  if (path.match(/^\/api\/referrals\/[^/]+\/notes$/) && method === "POST") return { success: true };
  if (path.match(/^\/api\/referrals\/[^/]+\/notes$/)) return demoCaseNotes;

  // Handoffs
  if (path === "/api/handoffs") return method === "POST" ? { success: true } : demoHandoffs;
  if (path.match(/\/messages$/)) return method === "POST" ? { success: true } : [];
  if (path.match(/\/typing$/)) return { success: true };
  if (path.match(/\/presence$/)) return { online: false, typing: false };
  if (path.match(/\/read$/)) return { success: true };

  // Copilot
  if (path === "/api/copilot") return { reply: "I'm running in demo mode. In production, I can help with case guidance, legal rights information, and safety planning. How can I assist you?" };

  // Meetings
  if (path === "/api/meetings") return method === "POST" ? { success: true } : demoMeetings;
  if (path.match(/\/safe-window$/)) return method === "PUT" ? { success: true } : { windows: [] };

  // Services
  if (path === "/api/services") return demoServices;

  // Analytics
  if (path === "/api/analytics") return demoAnalytics;

  // Settings
  if (path === "/api/settings") return method === "PUT" ? { success: true } : demoSettings;

  // Admin
  if (path === "/api/admin/stats") return demoAdminStats;
  if (path === "/api/admin/health") return { status: "healthy", uptime: "72h", version: "1.4.0" };
  if (path === "/api/admin/generations") return { generations: [] };
  if (path === "/api/admin/cron") return { success: true };
  if (path.match(/^\/api\/admin\/users/)) return method === "PUT" ? { success: true } : demoAdminUsers;
  if (path.match(/^\/api\/admin\/prompts/)) return method === "PUT" ? { success: true } : demoAdminPrompts;
  if (path.match(/^\/api\/admin\/reviews/)) return method === "PUT" ? { success: true } : demoAdminReviews;
  if (path.match(/^\/api\/admin\/audit/)) return demoAuditLog;

  return {};
}

// ─── Dashboard ───
export async function getDashboard() {
  return apiFetch("/api/dashboard");
}

export async function getReports() {
  return apiFetch("/api/reports");
}

// ─── Referrals ───
export async function getReferrals() {
  return apiFetch("/api/referrals");
}

export async function getReferralDetail(id: string) {
  return apiFetch(`/api/referrals/${id}`);
}

export async function updateReferral(id: string, status: string) {
  return apiFetch(`/api/referrals/${id}`, { method: "PUT", body: JSON.stringify({ status }) });
}

// ─── Case Notes ───
export async function getCaseNotes(referralId: string) {
  return apiFetch(`/api/referrals/${referralId}/notes`);
}

export async function addCaseNote(referralId: string, partnerId: string, author: string, content: string, type: string) {
  return apiFetch(`/api/referrals/${referralId}/notes`, {
    method: "POST",
    body: JSON.stringify({ partnerId, author, content, type }),
  });
}

// ─── Copilot ───
export async function sendCopilotMessage(message: string) {
  return apiFetch("/api/copilot", { method: "POST", body: JSON.stringify({ message }) });
}

// ─── Handoff ───
export async function getActiveHandoffs() {
  return apiFetch("/api/handoffs");
}

export async function startHandoff(survivorId: string, caseworkerName: string) {
  return apiFetch("/api/handoffs", { method: "POST", body: JSON.stringify({ survivorId, caseworkerName }) });
}

export async function endHandoff(survivorId: string) {
  return apiFetch(`/api/handoffs/${survivorId}`, { method: "DELETE" });
}

export async function getHandoffMessages(survivorId: string) {
  return apiFetch(`/api/handoffs/${survivorId}/messages`);
}

export async function sendHandoffMessage(survivorId: string, phone: string, message: string, caseworkerName: string) {
  return apiFetch(`/api/handoffs/${survivorId}/messages`, {
    method: "POST",
    body: JSON.stringify({ phone, message, caseworkerName }),
  });
}

export async function sendTypingIndicator(survivorId: string) {
  return apiFetch(`/api/handoffs/${survivorId}/typing`, { method: "POST" });
}

export async function clearTypingIndicator(survivorId: string) {
  return apiFetch(`/api/handoffs/${survivorId}/typing`, { method: "DELETE" });
}

export async function markMessageRead(survivorId: string, messageId: string) {
  return apiFetch(`/api/handoffs/${survivorId}/messages/${messageId}/read`, { method: "POST" });
}

export async function getPresence(survivorId: string) {
  return apiFetch(`/api/handoffs/${survivorId}/presence`);
}

// ─── Meetings ───
export async function getMeetings() {
  return apiFetch("/api/meetings");
}

export async function createMeeting(data: { title: string; type: string; date: string; attendees: string[]; notes?: string; caseId?: string }) {
  return apiFetch("/api/meetings", { method: "POST", body: JSON.stringify(data) });
}

export async function getSafeWindow(survivorId: string) {
  return apiFetch(`/api/survivors/${survivorId}/safe-window`);
}

export async function setSafeWindow(survivorId: string, windows: { day: string; startHour: number; endHour: number }[]) {
  return apiFetch(`/api/survivors/${survivorId}/safe-window`, { method: "PUT", body: JSON.stringify({ windows }) });
}

// ─── Services ───
export async function getServices() {
  return apiFetch("/api/services");
}

// ─── Analytics ───
export async function getAnalytics() {
  return apiFetch("/api/analytics");
}

// ─── Settings ───
export async function getSettings() {
  return apiFetch("/api/settings");
}

export async function updateSettings(data: Record<string, unknown>) {
  return apiFetch("/api/settings", { method: "PUT", body: JSON.stringify(data) });
}

// ─── Admin ───
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

export async function updateAdminUser(userId: string, data: Record<string, unknown>) {
  return apiFetch(`/api/admin/users/${userId}`, { method: "PUT", body: JSON.stringify(data) });
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

export async function updateReview(id: string, data: Record<string, unknown>) {
  return apiFetch(`/api/admin/reviews/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function getAuditLog(params?: { search?: string; user?: string; action?: string; from?: string; to?: string }) {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.user) query.set("user", params.user);
  if (params?.action) query.set("action", params.action);
  if (params?.from) query.set("from", params.from);
  if (params?.to) query.set("to", params.to);
  const qs = query.toString();
  return apiFetch(`/api/admin/audit${qs ? `?${qs}` : ""}`);
}

// Legacy exports for backwards compatibility
export const getHandoffs = getActiveHandoffs;
export const createHandoff = startHandoff;
