"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { fetchKudoCards } from "@/app/lib/actions/kudoCard.actions";
import Loading from "@/components/Atoms/Loading/Loading";
import StrongText from "@/components/Atoms/StrongText/StrongText";
import Typography from "@/components/Atoms/Typography/Typography";
import KudoCard from "@/components/Molecules/KudoCard/KudoCard";

import styles from "./CardsBoard.module.css";

const CardsBoard = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [kudoCards, setKudoCards] = useState<CardParameters[]>([]);

  const { watch } = useFormContext();
  const watchChoosenDate = watch("choosenDate");

  const fetcKudoCardshHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetchKudoCards(watchChoosenDate);

      if (typeof data === "object" && "error" in data) {
        enqueueSnackbar(data.error, {
          variant: "error",
          preventDuplicate: true,
        });
      } else {
        setKudoCards(data);
      }
    } catch (error) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
        preventDuplicate: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setSerachParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("choosenDate", watchChoosenDate);
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setSerachParams();
    fetcKudoCardshHandler();
  }, [watchChoosenDate]);

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
        <SnackbarProvider maxSnack={1} />
        <section>
          <Typography customClass="error">
            <>Kudo Cards not found!</>
          </Typography>
          <Typography customClass="textCenter">
            <StrongText>
              Do not hesitate to send a beam of positive energy first.
            </StrongText>
          </Typography>
        </section>
      </section>
    );
  }

  return (
    <section className={styles.cardsBoard}>
      {kudoCards.map((kudoCard) => (
        <Link key={kudoCard._id} href={`/kudo-card/${kudoCard._id}`}>
          <KudoCard kudoCard={kudoCard} />
        </Link>
      ))}
    </section>
  );
};

export default CardsBoard;
