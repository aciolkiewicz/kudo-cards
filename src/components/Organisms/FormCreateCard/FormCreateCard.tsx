"use client";
import { FormEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createKudoCard } from "@/app/lib/actions/kudoCard.actions";
import Button from "@/components/Atoms/Button/Button";
import CardPreview from "@/components/Molecules/CardPreview/CardPreview";
import ChosingCardStyle from "@/components/Molecules/ChosingCardStyle/ChosingCardStyle";

import styles from "./FormCreateCard.module.css";

const FormCreateCard = () => {
  const methods = useForm({
    defaultValues: {
      cardTitle: "theBest",
      cardColor: "jonquil",
      to: "",
      for: "",
      from: "",
    },
  });

  const { handleSubmit } = methods;

  async function onSubmit(data: CardParameters) {
    console.log(data);
    createKudoCard({ data });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <section className={styles.interactiveSection}>
          <ChosingCardStyle />
          <CardPreview />
        </section>
        <Button type="submit">Send Kudo Card</Button>
      </form>
    </FormProvider>
  );
};

export default FormCreateCard;
