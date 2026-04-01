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

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

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

export { getTenant, getToken };
