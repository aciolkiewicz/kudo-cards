"use client";

import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { fetchKudoCards } from "@/app/lib/actions/kudoCard.actions";
import Loading from "@/components/Atoms/Loading/Loading";
import Typography from "@/components/Atoms/Typography/Typography";
import KudoCard from "@/components/Molecules/KudoCard/KudoCard";

import styles from "./CardsBoard.module.css";

const CardsBoard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [kudoCards, setKudoCards] = useState<CardParameters[]>([]);

  const fetcKudoCardshHandler = async () => {
    try {
      const data = await fetchKudoCards();
      setKudoCards(data);
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetcKudoCardshHandler();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.cardsBoard}>
        <Loading />
      </section>
    );
  }

  if (!isLoading && kudoCards.length === 0) {
    return (
      <section className={styles.cardsBoard}>
        <Typography>
          <>Kudo Cards not found.</>
        </Typography>
      </section>
    );
  }

  return (
    <section className={styles.cardsBoard}>
      {kudoCards.map((kudoCard) => (
        <KudoCard key={kudoCard._id} kudoCard={kudoCard} />
      ))}
    </section>
  );
};

export default CardsBoard;
