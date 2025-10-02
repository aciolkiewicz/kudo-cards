import Image from "next/image";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useState } from "react";
import { MouseEvent, useRef } from "react";

import StrongText from "../StrongText/StrongText";
import Typography from "../Typography/Typography";
import styles from "./HeartPlus.module.css";

interface Properties {
  cardId: string;
  hearts: number;
}

const HeartPlus = ({ cardId, hearts }: Properties) => {
  const [heartsSaved, setHeartsSaved] = useState(hearts);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);
  const heartId = useRef(0);

  const addHeartHandler = async (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const res = await fetch(`/api/kudo-cards/${cardId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hearts: heartsSaved }),
      });
      const kudoCardHearts = await res.json();
      if (typeof kudoCardHearts === "object" && "error" in kudoCardHearts) {
        enqueueSnackbar(kudoCardHearts.error, {
          variant: "error",
          preventDuplicate: true,
        });
      } else {
        const heartsToAdd = kudoCardHearts - heartsSaved;
        setFloatingHearts((prev) => [
          ...prev,
          ...Array.from({ length: heartsToAdd }, () => heartId.current++),
        ]);
        setHeartsSaved(kudoCardHearts);
      }
    } catch (error) {
      enqueueSnackbar("An unexpected error occurred.", {
        variant: "error",
        preventDuplicate: true,
      });
    }
  };

  const handleAnimationEnd = (id: number) => {
    setFloatingHearts((prev) => prev.filter((h) => h !== id));
  };

  return (
    <div className={styles.heartPlus}>
      <SnackbarProvider maxSnack={1} />

      <div className={styles.heartsContainer}>
        <Image
          src="/icons/heart_plus.svg"
          alt="Send heart"
          width={25}
          height={25}
          className={`${styles.heartPlusIcon}`}
          onClick={(event) => addHeartHandler(event)}
        />
        <div className={styles.floatingHeartsContainer}>
          {floatingHearts.map((id) => (
            <span
              key={id}
              className={styles.floatingHeart}
              onAnimationEnd={() => handleAnimationEnd(id)}>
              ❤️
            </span>
          ))}
        </div>
      </div>
      <Typography customClass="cornsilkMarginReset">
        <>
          <StrongText>{`${heartsSaved}`}</StrongText> times loved
        </>
      </Typography>
    </div>
  );
};

export default HeartPlus;
