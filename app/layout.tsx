import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const AA_Stetica = localFont({
  src: "",
  variable: "--font-stetica"
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
      <body
        className={`${AA_Stetica.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
