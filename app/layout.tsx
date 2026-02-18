import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devuxion — Designing Digital Experiences That Grow Businesses",
  description:
    "We create user-focused websites, modern interfaces, and marketing systems that help brands attract and convert customers online.",
  openGraph: {
    title: "Devuxion — Designing Digital Experiences That Grow Businesses",
    description:
      "We create user-focused websites, modern interfaces, and marketing systems that help brands attract and convert customers online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
