import { AppSidebar } from "@/components/app-sidebar"
import AppNavbar from "@/components/app-navbar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RightSidebar as UtilitySidebar } from "@/components/utilitysidebar";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Softech Chat",
  description: "A chat application powered by Softechure",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
// export default function Page() {

  return (
      <html lang="en">
  <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <Toaster />
    {/* LEFT SIDEBAR PROVIDER */}
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <AppNavbar /> {/* optional: Navbar controlled by same provider */}
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-4 p-0 pt-0">
        {children}
      </div>
    </SidebarInset>

    {/* MAIN CONTENT (needs ANY provider to exist above it) */}

    {/* RIGHT SIDEBAR PROVIDER */}
    {/* <SidebarProvider defaultOpen={false} > */}
      <UtilitySidebar />
    </SidebarProvider>
    {/* </SidebarProvider> */}

  </body>
</html>
  
  )
}
