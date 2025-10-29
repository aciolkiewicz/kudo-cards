"use client";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import React from "react";

import { useAuth } from "@/context/AuthContext";

import Button from "../Button/Button";
import Headings from "../Headings/Headings";
import Loading from "../Loading/Loading";
import styles from "./LoginPopup.module.css";

export default function LoginPopup() {
  const { signIn, loading } = useAuth();

  return (
    <section className={styles.mainContainer}>
      <div>
        <Headings level={2}>
          <>Sign in to Kudo Card</>
        </Headings>
        <p>Welcome back! Please sign in to continue</p>
      </div>

      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <SnackbarProvider maxSnack={1} />
            <Button
              type="button"
              onClick={async () => {
                try {
                  await signIn();
                } catch (error) {
                  enqueueSnackbar(
                    "You are not authorized to use this application. Please contact the administrator to request access.",
                    {
                      variant: "error",
                      preventDuplicate: true,
                    }
                  );
                }
              }}>
              Sign in with Google
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
