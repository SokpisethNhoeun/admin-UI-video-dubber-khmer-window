"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function PasswordInput({ className, ...props }: Omit<React.ComponentProps<typeof Input>, "type">) {
  const [visible, setVisible] = useState(false);
  return <div className="relative"><Input type={visible ? "text" : "password"} className={cn("pr-10", className)} {...props}/><Button type="button" variant="ghost" size="icon-sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setVisible((value) => !value)} aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible}>{visible ? <EyeOffIcon/> : <EyeIcon/>}</Button></div>;
}
