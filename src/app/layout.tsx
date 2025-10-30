import "@/app/globals.css";

import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { Suspense } from "react";

import { auth0 } from "@/app/lib/auth0";
import Loading from "@/components/Atoms/Loading/Loading";
import LoginPopup from "@/components/Molecules/LoginPopup/LoginPopup";
import BottomBar from "@/components/Organisms/BottomBar/BottomBar";
import TopBar from "@/components/Organisms/TopBar/TopBar";

import styles from "./layout.module.css";

const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kudo Cards",
  description: "Here’s to those who inspire you and don’t even know it.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();

  return (
    <html lang="en">
      <body className={robotoSlab.className}>
        {session ? (
          <>
            <TopBar />
            <main className={styles.mainContainer}>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
            <BottomBar />
          </>
        ) : (
          <LoginPopup />
        )}
      </body>
    </html>
  );
}
