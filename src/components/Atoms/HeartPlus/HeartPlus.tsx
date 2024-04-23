import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

import { addHeart, fetchKudoCard } from "@/app/lib/actions/kudoCard.actions";

import StrongText from "../StrongText/StrongText";
import Typography from "../Typography/Typography";
import styles from "./HeartPlus.module.css";

interface Properties {
  cardId: string;
  hearts: number;
}

const HeartPlus = ({ cardId, hearts }: Properties) => {
  const [heartsSaved, setHeartsSaved] = useState(hearts);
  const addHeartHandler = async () => {
    if (hearts === heartsSaved) {
      try {
        await addHeart({ cardId: cardId, hearts: heartsSaved });
        const kudoCard = await fetchKudoCard({ cardId: cardId });

        setHeartsSaved(kudoCard.hearts);
      } catch (error) {
        enqueueSnackbar(error as string, {
          variant: "error",
        });
      }
    }
  };
  return (
    <div className={styles.heartPlus}>
      <Image
        src="/icons/heart_plus.svg"
        alt="Send heart"
        width={25}
        height={25}
        className={`${styles.heartPlusIcon} ${hearts !== heartsSaved && styles.heartAdded}`}
        onClick={addHeartHandler}
      />
      <Typography customClass="heartCount">
        <>
          <StrongText>{`${heartsSaved}`}</StrongText> times loved
        </>
      </Typography>
    </div>
  );
};

export default HeartPlus;
