import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { event, site } from "@/lib/data";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  metadataBase: new URL(event.website),
  icons: { icon: "/brand/algonex-icon.svg" },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    type: "website",
    images: ["/brand/algonex-logo-horizontal.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0304",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
