import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Production Company | Professional Video Services",
  description: "Professional video production company specializing in wedding videos, commercial videos, music videos, and documentaries. Bring your vision to life with our expert team.",
  keywords: ["video production", "wedding video", "commercial video", "music video", "documentary", "film production", "video editing"],
  authors: [{ name: "Video Production Company" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Video Production Company",
    description: "Professional video production services for weddings, commercials, music videos, and documentaries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Production Company",
    description: "Professional video production services for weddings, commercials, music videos, and documentaries",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
