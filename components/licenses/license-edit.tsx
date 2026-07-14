"use client";

import { useActionState, useState } from "react";
import { updateLicenseAction } from "@/app/actions/license.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { License } from "@/services/admin.service";

export function LicenseEdit({license}:{license:License}){const [open,setOpen]=useState(false);const [state,action,pending]=useActionState(updateLicenseAction,{});return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button variant="link" size="sm" />}>Edit</DialogTrigger><DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Edit license</DialogTitle><DialogDescription>License ending in {license.key_last4}</DialogDescription></DialogHeader><form action={action} className="space-y-4"><input type="hidden" name="id" value={license.id}/><div className="space-y-1.5"><Label htmlFor={`email-${license.id}`}>Customer email</Label><Input id={`email-${license.id}`} className="h-9" name="email" type="email" defaultValue={license.customer_email} required/></div><div className="grid gap-3 sm:grid-cols-2"><div className="space-y-1.5"><Label>Plan</Label><FormSelect name="plan" defaultValue={license.plan} options={[{value:"monthly",label:"Monthly"},{value:"six_months",label:"Six months"},{value:"yearly",label:"Yearly"}]} className="h-9 w-full"/></div><div className="space-y-1.5"><Label htmlFor={`expires-${license.id}`}>Expires</Label><Input id={`expires-${license.id}`} className="h-9" name="expires_at" type="datetime-local" defaultValue={license.expires_at.slice(0,16)} required/></div></div><div className="space-y-1.5"><Label>Status</Label><FormSelect name="active" defaultValue={String(license.active)} options={[{value:"true",label:"Active"},{value:"false",label:"Revoked"}]} className="h-9 w-full"/></div><Label className="flex items-center gap-2 font-normal"><Checkbox name="clear_device"/>Clear device binding</Label>{state.message&&<p className={`text-xs ${state.ok?"text-emerald-700":"text-red-700"}`}>{state.message}</p>}<Button type="submit" disabled={pending} className="w-full">{pending?"Saving…":"Save changes"}</Button></form></DialogContent></Dialog>}
