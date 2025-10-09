import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const AA_Stetica_Bold = localFont({
  src: "../public/fonts/AA_Stetica_Bold.otf",
  variable: "--font-stetica-bold",
});

const AA_Stetica_Regular = localFont({
  src: "../public/fonts/AA_Stetica_Regular.otf",
  variable: "--font-stetica-regular",
});

export const metadata: Metadata = {
  title: "Dream House",
  description: "Dream House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${AA_Stetica_Bold.variable} ${AA_Stetica_Regular.variable} antialiased`}>{children}</body>
    </html>
  );
}
