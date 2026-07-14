"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});
  return <form action={action} className="mt-8 space-y-4"><div className="space-y-1.5"><Label htmlFor="email">Admin email</Label><Input className="h-10" id="email" name="email" type="email" autoComplete="username" placeholder="admin@company.com" required autoFocus /></div><div className="space-y-1.5"><div className="flex justify-between"><Label htmlFor="password">Password</Label><span className="text-[11px] text-muted-foreground">Secure access</span></div><PasswordInput className="h-10" id="password" name="password" autoComplete="current-password" placeholder="Enter your password" minLength={8} required /></div>{state.error && <p role="alert" className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-700">{state.error}</p>}<Button type="submit" disabled={pending} size="lg" className="mt-2 w-full">{pending ? "Signing in…" : "Sign in to dashboard"}</Button></form>;
}
