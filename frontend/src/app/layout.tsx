import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Duel",
  description: "A competitive gaming platform for real-time duels and epic battles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-slate-50 font-sans antialiased",
          fontSans.variable
      )}>
        {children}
        {/* Toaster from shadcn */}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}