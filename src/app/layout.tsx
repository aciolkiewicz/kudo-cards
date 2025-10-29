import "@/app/globals.css";

import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { Suspense } from "react";

import Loading from "@/components/Atoms/Loading/Loading";
import BottomBar from "@/components/Organisms/BottomBar/BottomBar";
import TopBar from "@/components/Organisms/TopBar/TopBar";
import { AuthProvider } from "@/context/AuthContext";

import styles from "./layout.module.css";

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
        <AuthProvider>
          <TopBar />
          <main className={styles.mainContainer}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <BottomBar />
        </AuthProvider>
      </body>
    </html>
  );
}
