"use client";

import { usePathname } from "next/navigation";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";

import { fetchKudoCard } from "@/app/lib/actions/kudoCard.actions";
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
        const kudoCard = await fetchKudoCard({ cardId: cardId });

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
