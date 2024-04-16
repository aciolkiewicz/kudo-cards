"use client";

import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { fetchKudoCards } from "@/app/lib/actions/kudoCard.actions";
import KudoCard from "@/components/Molecules/KudoCard/KudoCard";

import styles from "./CardsBoard.module.css";

const CardsBoard = () => {
  const [kudoCards, setKudoCards] = useState<CardParameters[]>([]);

  const fetcKudoCardshHandler = async () => {
    try {
      const data = await fetchKudoCards();
      setKudoCards(data);
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetcKudoCardshHandler();
  });

  return (
    <section className={styles.cardsBoard}>
      {kudoCards.map((kudoCard) => (
        <KudoCard key={kudoCard.id} kudoCard={kudoCard} />
      ))}
    </section>
  );
};

export default CardsBoard;
