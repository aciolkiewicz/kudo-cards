import "@/app/globals.css";

import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

import BottomBar from "@/components/Organisms/BottomBar/BottomBar";
import TopBar from "@/components/Organisms/TopBar/TopBar";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kudo Cards",
  description: "Here’s to those who inspire you and don’t even know it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoSlab.className}>
        <TopBar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
        <BottomBar />
      </body>
    </html>
  );
}
