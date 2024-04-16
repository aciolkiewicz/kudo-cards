"use client";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { FormProvider, useForm } from "react-hook-form";

import { createKudoCard } from "@/app/lib/actions/kudoCard.actions";
import Button from "@/components/Atoms/Button/Button";
import CardPreview from "@/components/Molecules/CardPreview/CardPreview";
import ChosingCardStyle from "@/components/Molecules/ChosingCardStyle/ChosingCardStyle";

import styles from "./FormCreateCard.module.css";

const FormCreateCard = () => {
  const todayDate = new Date().toLocaleDateString();
  const initialFormValues = {
    cardTitle: "theBest",
    cardColor: "jonquil",
    to: "",
    for: "",
    from: "",
    created: todayDate,
  };

  const methods = useForm({
    defaultValues: initialFormValues,
  });

  const { handleSubmit, reset } = methods;

  async function onSubmit(data: CardParameters) {
    try {
      await createKudoCard({ data });

      enqueueSnackbar("Kudo Card created.", {
        variant: "success",
      });
      reset(initialFormValues);
    } catch (error) {
      enqueueSnackbar(error as string, {
        variant: "error",
      });
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <SnackbarProvider />
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
