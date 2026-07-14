import { WifiOffIcon } from "lucide-react";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return <main className="grid min-h-svh place-items-center bg-background px-5"><section className="card w-full max-w-sm p-7 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground"><WifiOffIcon className="size-5" /></span><h1 className="mt-5 text-xl font-semibold">You’re offline</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Reconnect to the internet to securely load live licenses, payments, and customer data.</p><a href="/dashboard" className="btn btn-primary mt-6 w-full">Try again</a></section></main>;
}
