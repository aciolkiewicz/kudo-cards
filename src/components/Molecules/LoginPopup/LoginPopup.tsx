"use client";
import { SnackbarProvider } from "notistack";
import React from "react";

import Button from "@/components/Atoms/Button/Button";
import Headings from "@/components/Atoms/Headings/Headings";

import styles from "./LoginPopup.module.css";

export default function LoginPopup() {
  return (
    <section className={styles.mainContainer}>
      <div>
        <Headings level={2}>
          <>Sign in to Kudo Card</>
        </Headings>
        <p>Welcome back! Please sign in to continue</p>
      </div>

      <div>
        <div>
          <SnackbarProvider maxSnack={1} />
          <a href="/auth/login">
            <Button type="button">Sign in with Google</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
