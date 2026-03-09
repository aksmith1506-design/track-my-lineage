import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://trackmylineage.com"),

  title: {
    default: "Track My Lineage",
    template: "%s | Track My Lineage",
  },

  description:
    "Track My Lineage is a public genealogy research archive documenting historical individuals, families, and original source documents.",

  keywords: [
    "genealogy",
    "family history",
    "ancestry",
    "family tree",
    "historical records",
    "genealogy research",
  ],

  authors: [{ name: "Track My Lineage" }],

  openGraph: {
    title: "Track My Lineage",
    description:
      "A public genealogy research archive documenting families and historical records.",
    url: "https://trackmylineage.com",
    siteName: "Track My Lineage",
    type: "website",
  },

  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  twitter: {
    card: "summary_large_image",
    title: "Track My Lineage",
    description:
      "A public genealogy research archive documenting families and historical records.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}