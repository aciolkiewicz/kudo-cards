import Image from "next/image";

import StrongText from "../StrongText/StrongText";
import Typography from "../Typography/Typography";
import styles from "./HeartPlus.module.css";

interface Properties {
  hearts: number;
}

const HeartPlus = ({ hearts }: Properties) => {
  return (
    <div className={styles.heartPlus}>
      <Image
        src="/icons/heart_plus.svg"
        alt="Send heart"
        width={25}
        height={25}
        className={styles.heartPlusIcon}
      />
      <Typography customClass="heartCount">
        <>
          <StrongText>{`${hearts}`}</StrongText> times loved
        </>
      </Typography>
    </div>
  );
};

export default HeartPlus;
