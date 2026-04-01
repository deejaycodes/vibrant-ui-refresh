const API_BASE = "https://api.safevoice.org";

export function getToken(): string | null {
  return localStorage.getItem("safevoice_token");
}

export function setToken(token: string) {
  localStorage.setItem("safevoice_token", token);
}

export function clearToken() {
  localStorage.removeItem("safevoice_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function handleAuthError() {
  clearToken();
  window.location.href = "/";
}

export async function login(email: string, password: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Login failed" }));
    throw new Error(error.message || "Login failed");
  }

  const data = await res.json();
  setToken(data.token);
  return data;
}

export async function register(payload: {
  orgName: string;
  contactPerson: string;
  email: string;
  phone: string;
  password: string;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Registration failed" }));
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export function logout() {
  clearToken();
  localStorage.removeItem("safevoice_demo");
  window.location.href = "/";
}
