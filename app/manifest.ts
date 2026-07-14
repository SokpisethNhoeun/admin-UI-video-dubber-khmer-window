import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/dashboard",
    name: "Khmer Video Dubber Admin",
    short_name: "Dubber Admin",
    description: "Manage Khmer Video Dubber licenses, payments, customers, and discounts.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    background_color: "#f4f6f3",
    theme_color: "#12634a",
    orientation: "any",
    categories: ["business", "productivity", "utilities"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Overview", short_name: "Overview", url: "/dashboard", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Licenses", short_name: "Licenses", url: "/licenses", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
      { name: "Payments", short_name: "Payments", url: "/payments", icons: [{ src: "/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
