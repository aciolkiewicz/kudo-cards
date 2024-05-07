import Image from "next/image";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useState } from "react";
import { MouseEvent } from "react";

import { addHeart } from "@/app/lib/actions/kudoCard.actions";

import StrongText from "../StrongText/StrongText";
import Typography from "../Typography/Typography";
import styles from "./HeartPlus.module.css";

interface Properties {
  cardId: string;
  hearts: number;
}

const HeartPlus = ({ cardId, hearts }: Properties) => {
  const [heartsSaved, setHeartsSaved] = useState(hearts);
  const [isLoading, setIsLoading] = useState(false);
  const addHeartHandler = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (hearts === heartsSaved) {
      try {
        setIsLoading(true);
        const kudoCardHearts = await addHeart({
          cardId: cardId,
          hearts: heartsSaved,
        });

        if (typeof kudoCardHearts === "object" && "error" in kudoCardHearts) {
          enqueueSnackbar(kudoCardHearts.error, {
            variant: "error",
            preventDuplicate: true,
          });
        } else {
          setHeartsSaved(kudoCardHearts);
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
  return (
    <div className={styles.heartPlus}>
      <SnackbarProvider maxSnack={1} />

      <Image
        src="/icons/heart_plus.svg"
        alt="Send heart"
        width={25}
        height={25}
        className={`${styles.heartPlusIcon} ${(hearts !== heartsSaved || isLoading) && styles.heartAdded}`}
        onClick={(event) => addHeartHandler(event)}
      />
      <Typography customClass="cornsilkMarginReset">
        <>
          <StrongText>{`${heartsSaved}`}</StrongText> times loved
        </>
      </Typography>
    </div>
  );
};

export default HeartPlus;
