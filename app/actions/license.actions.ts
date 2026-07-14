"use server";
import { revalidatePath } from "next/cache";
import { adminApi, ApiError } from "@/services/admin.service";
export type ActionState = { ok?: boolean; message?: string };
export async function createLicenseAction(_: ActionState, formData: FormData): Promise<ActionState> {
  try { await adminApi("/v1/admin/licenses", { method: "POST", body: JSON.stringify({ email: formData.get("email"), plan: formData.get("plan") }) }); revalidatePath("/licenses"); return { ok: true, message: "License created and emailed to the customer." }; }
  catch (e) { return { ok: false, message: e instanceof ApiError ? e.message : "Could not create the license." }; }
}
export async function licenseAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const mode = String(formData.get("mode"));
  try { await adminApi(`/v1/admin/licenses/${mode}`, { method: "POST", body: JSON.stringify({ license_key: formData.get("license_key") }) }); revalidatePath("/licenses"); return { ok: true, message: mode === "revoke" ? "License revoked." : "Device binding reset." }; }
  catch (e) { return { ok: false, message: e instanceof ApiError ? e.message : "The action failed." }; }
}
export async function updateLicenseAction(_: ActionState, formData: FormData): Promise<ActionState> {
  try { await adminApi(`/v1/admin/licenses/${formData.get("id")}`, { method:"PUT", body:JSON.stringify({customer_email:formData.get("email"),plan:formData.get("plan"),expires_at:formData.get("expires_at"),active:formData.get("active")==="true",clear_device:formData.get("clear_device")==="on"}) }); revalidatePath("/licenses"); return {ok:true,message:"License updated."}; }
  catch(e){return {ok:false,message:e instanceof ApiError?e.message:"Could not update the license."};}
}
