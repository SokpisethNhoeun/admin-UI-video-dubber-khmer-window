"use client";

import { useActionState, useState } from "react";
import { PlusIcon } from "lucide-react";
import { saveDiscountAction } from "@/app/actions/discount.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Discount } from "@/services/admin.service";

export function DiscountForm({discount}:{discount?:Discount}){const [open,setOpen]=useState(false);const [state,action,pending]=useActionState(saveDiscountAction,{});return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button variant={discount?"link":"default"} size={discount?"sm":"lg"} />} >{discount?"Edit":<><PlusIcon/>New discount</>}</DialogTrigger><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle>{discount?"Edit":"Create"} discount</DialogTitle><DialogDescription>Fixed amount or percentage promotion.</DialogDescription></DialogHeader><form action={action} className="space-y-4">{discount&&<input type="hidden" name="id" value={discount.id}/>}<div className="grid gap-3 sm:grid-cols-2"><Field label="Code"><Input className="h-9 uppercase" name="code" defaultValue={discount?.code} pattern="[A-Za-z0-9_-]{2,40}" required/></Field><Field label="Type"><FormSelect name="discount_type" defaultValue={discount?.discount_type??"percent"} options={[{value:"percent",label:"Percentage"},{value:"fixed",label:"Fixed USD"}]} className="h-9 w-full"/></Field></div><div className="grid gap-3 sm:grid-cols-3"><Field label="Value"><Input className="h-9" name="value" type="number" min="0.01" max="100" step="0.01" defaultValue={discount?.value} required/></Field><Field label="Max discount USD"><Input className="h-9" name="max_discount_amount" type="number" min="0.01" step="0.01" defaultValue={discount?.max_discount_amount??""}/></Field><Field label="Usage limit"><Input className="h-9" name="usage_limit" type="number" min="1" defaultValue={discount?.usage_limit??""}/></Field></div><div className="grid gap-3 sm:grid-cols-2"><Field label="Starts at"><Input className="h-9" name="starts_at" type="datetime-local" defaultValue={discount?.starts_at?.slice(0,16)}/></Field><Field label="Expires at"><Input className="h-9" name="expires_at" type="datetime-local" defaultValue={discount?.expires_at?.slice(0,16)}/></Field></div><Label className="flex items-center gap-2 font-normal"><Checkbox name="active" defaultChecked={discount?.active??true}/>Active</Label>{state.message&&<p className={`rounded-lg p-2 text-xs ${state.ok?"bg-emerald-50 text-emerald-700":"bg-red-50 text-red-700"}`}>{state.message}</p>}<Button type="submit" disabled={pending} className="w-full">{pending?"Saving…":"Save discount"}</Button></form></DialogContent></Dialog>}

function Field({label,children}:{label:string;children:React.ReactNode}){return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>}
