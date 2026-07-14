"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError, challengeApi, CHALLENGE_COOKIE, login, OtpStatus, SESSION_COOKIE } from "@/services/admin.service";

export type LoginState = { error?: string };
export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };
  try {
    const result = await login(email, password);
    (await cookies()).set(CHALLENGE_COOKIE, result.challenge_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/login", expires: new Date(result.challenge_expires_at), priority: "high" });
  } catch (error) { return { error: error instanceof ApiError ? error.message : "Unable to reach the API. Try again." }; }
  redirect("/login/verify");
}

export type OtpState = { error?: string; status?: OtpStatus };

export async function verifyOtpAction(_: OtpState, formData: FormData): Promise<OtpState> {
  const code = String(formData.get("code") ?? "");
  if (!/^\d{6}$/.test(code)) return { error: "Enter the six-digit code." };
  try {
    const result = await challengeApi<{ access_token: string; expires_at: string }>("/v1/admin/auth/otp/verify", { method: "POST", body: JSON.stringify({ code }) });
    const jar = await cookies();
    jar.set(SESSION_COOKIE, result.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", expires: new Date(result.expires_at), priority: "high" });
    jar.delete(CHALLENGE_COOKIE);
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { error: e instanceof ApiError ? e.message : "Verification failed." };
  }
  redirect("/dashboard");
}

export async function resendOtpAction(state: OtpState, formData: FormData): Promise<OtpState> {
  void state; void formData;
  try {
    return { status: await challengeApi<OtpStatus>("/v1/admin/auth/otp/resend", { method: "POST" }) };
  } catch (e) {
    if (isRedirectError(e)) throw e;
    return { error: e instanceof ApiError ? e.message : "Could not resend the code." };
  }
}

export async function logoutAction() { (await cookies()).delete(SESSION_COOKIE); redirect("/login"); }
