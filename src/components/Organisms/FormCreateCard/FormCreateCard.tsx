"use client";
import { useRouter } from "next/navigation";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/Atoms/Button/Button";
import CardForm from "@/components/Molecules/CardForm/CardForm";
import ChosingCardStyle from "@/components/Molecules/ChosingCardStyle/ChosingCardStyle";

import styles from "./FormCreateCard.module.css";

const FormCreateCard = () => {
  const router = useRouter();
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

  const { handleSubmit } = methods;

  async function onSubmit(data: CardParameters) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/kudo-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const createdKudoCard = await res.json();

      if (typeof createdKudoCard === "object" && "error" in createdKudoCard) {
        enqueueSnackbar(createdKudoCard.error, {
          variant: "error",
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar("Kudo Card created.", {
          variant: "success",
        });

        if (createdKudoCard._id) {
          router.push(`/kudo-card/${createdKudoCard._id}`);
        }
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <SnackbarProvider maxSnack={1} />
        <section className={styles.interactiveSection}>
          <ChosingCardStyle />
          <CardForm />
        </section>
        <Button type="submit" disabled={isLoading}>
          Send Kudo Card
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormCreateCard;
