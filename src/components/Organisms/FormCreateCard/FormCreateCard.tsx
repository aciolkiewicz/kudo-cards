"use client";
import { FormEvent } from "react";

import Button from "@/components/Atoms/Button/Button";
import CardPreview from "@/components/Molecules/CardPreview/CardPreview";
import ChosingCardStyle from "@/components/Molecules/ChosingCardStyle/ChosingCardStyle";

import styles from "./FormCreateCard.module.css";

const FormCreateCard = () => {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/create-card", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <form onSubmit={onSubmit} className={styles.formContainer}>
      <section className={styles.interactiveSection}>
        <ChosingCardStyle />
        <CardPreview />
      </section>
      <Button type="submit">Send Kudo Card</Button>
    </form>
  );
};

export default FormCreateCard;
