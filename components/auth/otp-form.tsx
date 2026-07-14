"use client";

import { useActionState, useEffect, useState } from "react";
import { resendOtpAction, verifyOtpAction } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OtpStatus } from "@/services/admin.service";

function secondsUntil(value:string){return Math.max(0,Math.ceil((new Date(value).getTime()-Date.now())/1000))}
export function OtpForm({initial}:{initial:OtpStatus}){const [verifyState,verify,pending]=useActionState(verifyOtpAction,{});const [resendState,resend,resending]=useActionState(resendOtpAction,{});const [,tick]=useState(0);useEffect(()=>{const id=setInterval(()=>tick(v=>v+1),1000);return()=>clearInterval(id)},[]);const status=resendState.status??initial;const expiry=secondsUntil(status.expires_at),wait=secondsUntil(status.resend_at);const mm=String(Math.floor(expiry/60)).padStart(2,"0"),ss=String(expiry%60).padStart(2,"0");return <><form action={verify} className="mt-6 space-y-4"><div className="space-y-1.5"><Label htmlFor="code">Verification code</Label><Input className="h-11 text-center font-mono text-xl tracking-[.35em]" id="code" name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" required autoFocus placeholder="000000"/></div><div className="flex items-center justify-between text-xs"><span className={expiry?"text-gray-500":"text-red-600"}>{expiry?`Expires in ${mm}:${ss}`:"Code expired"}</span><Button type="submit" variant="link" size="sm" formAction={resend} disabled={wait>0||resending}>{resending?"Sending…":wait?`Resend in ${wait}s`:"Resend code"}</Button></div>{(verifyState.error||resendState.error)&&<p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{verifyState.error||resendState.error}</p>}<Button type="submit" disabled={pending||expiry===0} size="lg" className="w-full">{pending?"Verifying…":"Verify and sign in"}</Button></form><p className="mt-4 text-center text-xs text-gray-400">Sent to {status.email}</p></>}
