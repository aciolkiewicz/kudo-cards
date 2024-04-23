"use client";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { createKudoCard } from "@/app/lib/actions/kudoCard.actions";
import Button from "@/components/Atoms/Button/Button";
import CardPreview from "@/components/Molecules/CardPreview/CardPreview";
import ChosingCardStyle from "@/components/Molecules/ChosingCardStyle/ChosingCardStyle";

import styles from "./FormCreateCard.module.css";

const FormCreateCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const todayDate = new Date().toISOString();
  const initialFormValues = {
    cardTitle: "theBest",
    cardColor: "jonquil",
    to: "",
    for: "",
    from: "",
    hearts: 0,
    created: todayDate,
  };

  const methods = useForm({
    defaultValues: initialFormValues,
  });

  const { handleSubmit, reset } = methods;

  async function onSubmit(data: CardParameters) {
    setIsLoading(true);
    try {
      await createKudoCard({ data });

      enqueueSnackbar("Kudo Card created.", {
        variant: "success",
      });
      reset(initialFormValues);
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
        preventDuplicate: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <SnackbarProvider maxSnack={1} />
        <section className={styles.interactiveSection}>
          <ChosingCardStyle />
          <CardPreview />
        </section>
        <Button type="submit" disabled={isLoading}>
          Send Kudo Card
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormCreateCard;
