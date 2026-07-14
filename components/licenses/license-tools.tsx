"use client";

import { useActionState, useState } from "react";
import { PlusIcon } from "lucide-react";
import { createLicenseAction, licenseAction } from "@/app/actions/license.actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";

type State={message?:string;ok?:boolean};
const plans=[{value:"monthly",label:"Monthly"},{value:"six_months",label:"Six months"},{value:"yearly",label:"Yearly"}];

export function LicenseTools(){const [open,setOpen]=useState(false);const [createState,create,pending]=useActionState(createLicenseAction,{});const [actionState,act,acting]=useActionState(licenseAction,{});return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button size="lg" />}><PlusIcon/>Manage license</DialogTrigger><DialogContent className="sm:max-w-xl"><DialogHeader><DialogTitle>License operations</DialogTitle><DialogDescription>Create, reset, or revoke access securely.</DialogDescription></DialogHeader><div className="grid gap-6 sm:grid-cols-2"><form action={create} className="space-y-3"><h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Issue new</h3><Input className="h-9" name="email" type="email" placeholder="customer@email.com" required/><FormSelect name="plan" defaultValue="monthly" options={plans} className="h-9 w-full"/><Button type="submit" disabled={pending} className="w-full">{pending?"Creating…":"Create & email"}</Button><Feedback state={createState}/></form><form action={act} className="space-y-3"><h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Existing key</h3><Input className="h-9" name="license_key" placeholder="KVD-XXXXXX-…" required minLength={12}/><FormSelect name="mode" defaultValue="reset-device" options={[{value:"reset-device",label:"Reset device binding"},{value:"revoke",label:"Revoke license"}]} className="h-9 w-full"/><Button type="submit" disabled={acting} variant="outline" className="w-full">{acting?"Updating…":"Apply action"}</Button><Feedback state={actionState}/></form></div></DialogContent></Dialog>}
function Feedback({state}:{state:State}){return state.message?<p className={`rounded-lg p-2 text-xs ${state.ok?"bg-emerald-50 text-emerald-700":"bg-red-50 text-red-700"}`}>{state.message}</p>:null}
