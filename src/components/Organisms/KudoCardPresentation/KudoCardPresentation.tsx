"use client";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";

import { fetchKudoCard } from "@/app/lib/actions/kudoCard.actions";
import Typography from "@/components/Atoms/Typography/Typography";
import KudoCard from "@/components/Molecules/KudoCard/KudoCard";

import styles from "./KudoCardPresentation.module.css";

interface Parameters {
  cardId: string;
}

const KudoCardPresentation = ({ cardId }: Parameters) => {
  const [kudoCardSaved, setKudoCardSaved] = useState<CardParameters | {}>({});

  const getKudoCard = async () => {
    if (cardId) {
      try {
        const kudoCard = await fetchKudoCard({ cardId: cardId });

        setKudoCardSaved(kudoCard);
      } catch (error) {
        enqueueSnackbar(error as string, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  useEffect(() => {
    getKudoCard();
  }, [cardId]);

  if ("cardTitle" in kudoCardSaved) {
    return (
      <section className={styles.presentationContainer}>
        <KudoCard kudoCard={kudoCardSaved} />
      </section>
    );
  }

  return (
    <>
      <SnackbarProvider maxSnack={1} />
      <Typography>
        <>Kudo Card not found!</>
      </Typography>
    </>
  );
};

export default KudoCardPresentation;
