import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "dubber_admin_session";
export const CHALLENGE_COOKIE = "dubber_admin_challenge";
const API_BASE_URL = process.env.API_BASE_URL?.replace(/\/$/, "");

export class ApiError extends Error { constructor(public status: number, message: string) { super(message); } }

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.ok) return response.json() as Promise<T>;
  let message = "The server could not complete this request.";
  try { const body = await response.json(); message = body.detail ?? body.message ?? message; } catch {}
  throw new ApiError(response.status, message);
}

function baseUrl() {
  if (!API_BASE_URL) throw new Error("API_BASE_URL is not configured on the Next.js server.");
  return API_BASE_URL;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${baseUrl()}/v1/admin/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }), cache: "no-store" });
  return parseResponse<{ challenge_token: string; challenge_expires_at: string; expires_at: string; resend_at: string; email: string }>(response);
}

export type OtpStatus = { email: string; expires_at: string; resend_at: string };
export async function challengeApi<T>(path: string, init?: RequestInit): Promise<T> {
  const token = (await cookies()).get(CHALLENGE_COOKIE)?.value;
  if (!token) redirect("/login");
  const response = await fetch(`${baseUrl()}${path}`, { ...init, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...init?.headers }, cache: "no-store" });
  return parseResponse<T>(response);
}

export async function adminApi<T>(path: string, init?: RequestInit): Promise<T> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) redirect("/login");
  const response = await fetch(`${baseUrl()}${path}`, { ...init, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...init?.headers }, cache: "no-store" });
  if (response.status === 401) redirect("/login?expired=1");
  return parseResponse<T>(response);
}

export type Meta = { page: number; page_size: number; total: number; pages: number };
export type License = { id: string; customer_email: string; key_last4: string; plan: string; expires_at: string; active: boolean; device_id: string | null; device_name: string | null; activated_at: string | null; created_at: string };
export type Payment = { id: string; reference_id: string; customer_email: string; plan: string; amount: string; currency: string; status: string; fulfilled: boolean; created_at: string; paid_at: string | null };
export type Customer = { email: string; licenses: number; payments: number; spent: string; last_seen: string | null };
export type Discount = { id:string; code:string; discount_type:"percent"|"fixed"; value:string; max_discount_amount:string|null; usage_limit:number|null; used_count:number; active:boolean; starts_at:string|null; expires_at:string|null; created_at:string };
export type Dashboard = { metrics: { licenses: number; active_licenses: number; activated_devices: number; expired_licenses: number; payments: number; paid_payments: number; revenue: string }; recent_payments: Payment[]; recent_licenses: License[] };
