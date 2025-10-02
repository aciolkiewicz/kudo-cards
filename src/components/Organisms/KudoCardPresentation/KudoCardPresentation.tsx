"use client";

import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";

import CopyToClipboard from "@/components/Atoms/CopyToClipboard/CopyToClipboard";
import Headings from "@/components/Atoms/Headings/Headings";
import Loading from "@/components/Atoms/Loading/Loading";
import Typography from "@/components/Atoms/Typography/Typography";
import KudoCard from "@/components/Molecules/KudoCard/KudoCard";

import styles from "./KudoCardPresentation.module.css";

interface Parameters {
  cardId: string;
}

const KudoCardPresentation = ({ cardId }: Parameters) => {
  const [isLoading, setIsLoading] = useState(true);
  const [kudoCardSaved, setKudoCardSaved] = useState<CardParameters | {}>({});
  const pathname = usePathname();
  const fullURL = `${window?.location?.origin}${pathname}` || "";

  const getKudoCard = async () => {
    if (cardId) {
      try {
        const res = await fetch(`/api/kudo-cards/${cardId}`);
        const kudoCard = await res.json();

        if (typeof kudoCard === "object" && "error" in kudoCard) {
          enqueueSnackbar(kudoCard.error, {
            variant: "error",
            preventDuplicate: true,
          });
        } else {
          setKudoCardSaved(kudoCard);
        }
      } catch (error) {
        enqueueSnackbar("An unexpected error occurred.", {
          variant: "error",
          preventDuplicate: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getKudoCard();
  }, [cardId]);

  useEffect(() => {
    if (kudoCardSaved && "cardTitle" in kudoCardSaved) {
      const end = Date.now() + 10 * 1000;
      const colors = ["#bb0000", "#ffffff"];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [kudoCardSaved]);

  if (kudoCardSaved && "cardTitle" in kudoCardSaved) {
    return (
      <section className={styles.presentationContainer}>
        <Headings level={3} customClass="resetMargins">
          <>Copy the link and share the Kudo Card</>
        </Headings>
        <CopyToClipboard valueToCopy={fullURL} />
        <KudoCard kudoCard={kudoCardSaved} />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles.presentationContainer}>
        <Loading />
      </section>
    );
  }

  return (
    <section className={styles.presentationContainer}>
      <SnackbarProvider maxSnack={1} />
      <Typography customClass="error">
        <>Kudo Card not found!</>
      </Typography>
    </section>
  );
};

export default KudoCardPresentation;
