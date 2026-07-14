import type { Metadata, Viewport } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Dubber Admin", template: "%s · Dubber Admin" },
  description: "Administration console for Khmer Video Dubber",
  applicationName: "Khmer Video Dubber Admin",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Dubber Admin" },
  icons: { icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#12634a" },
    { media: "(prefers-color-scheme: dark)", color: "#151a17" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full"><ThemeProvider><TooltipProvider>{children}</TooltipProvider><PwaRegister/></ThemeProvider></body>
    </html>
  );
}
