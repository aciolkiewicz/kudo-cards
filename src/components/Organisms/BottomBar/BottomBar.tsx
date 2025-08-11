"use client";

import { useEffect, useState } from "react";

import { fetchLastKudoCards } from "@/app/lib/actions/kudoCard.actions";
import StrongText from "@/components/Atoms/StrongText/StrongText";
import Typography from "@/components/Atoms/Typography/Typography";

import styles from "./BottomBar.module.css";

const BottomBar = () => {
  const [kudoCards, setKudoCards] = useState<CardParameters[]>([]);

  const fetchLastKudoCardshHandler = async () => {
    try {
      const data = await fetchLastKudoCards();

      if (!("error" in data)) {
        setKudoCards(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLastKudoCardshHandler();
  }, []);

  return (
    <footer className={styles.bottomBar}>
      <section className={styles.carouselContainer}>
        <div className={styles.sliders}>
          {[...kudoCards, ...kudoCards].map((card, index) => (
            <div className={styles.quote} key={`${card._id}-${index}`}>
              <span className={styles.icon}>💬</span>
              <Typography customClass="inline">
                <>
                  <StrongText>{`"`}</StrongText>
                  {card.for}
                  <StrongText>{`" - ${card.from}`}</StrongText>
                </>
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </footer>
  );
};

export default BottomBar;
