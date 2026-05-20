import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bisacom-portfolio.vercel.app"),
  title: {
    default: "Bisacom | Product Designer",
    template: "%s | Bisacom",
  },
  description:
    "Bisacom is a product design portfolio focused on UI/UX design, responsive websites, mobile app concepts, and conversion-focused digital products.",
  keywords: [
    "Bisacom",
    "Product Designer",
    "UI UX Designer",
    "Frontend Developer",
    "Portfolio",
    "Norwich",
    "UK Designer",
  ],
  authors: [{ name: "Bisacom" }],
  creator: "Bisacom",
  openGraph: {
    title: "Bisacom | Product Designer",
    description:
      "UI/UX design, responsive websites, mobile app concepts, and conversion-focused digital products.",
    url: "https://bisacom-portfolio.vercel.app",
    siteName: "Bisacom Portfolio",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1120",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
