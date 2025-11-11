"use client";
import { useRouter } from "next/navigation";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/components/Atoms/Button/Button";
import CardForm from "@/components/Molecules/CardForm/CardForm";
import ChosingCardStyle from "@/components/Molecules/ChosingCardStyle/ChosingCardStyle";

import styles from "./FormCreateCard.module.css";

interface OnSubmitParameters {
  data: CardParameters;
  sendAgain: boolean;
}

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
    gifUrl: "",
    hearts: 0,
    created: todayDate,
  };

  const methods = useForm({
    defaultValues: initialFormValues,
  });

  const { handleSubmit, reset } = methods;

  async function onSubmit({ data, sendAgain }: OnSubmitParameters) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/kudo-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${process.env.NEXT_PUBLIC_ENV_KUDO_API_KEY}`,
        },
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

        if (sendAgain) {
          const persistedValues = {
            ...initialFormValues,
            from: data.from,
            cardTitle: data.cardTitle,
            cardColor: data.cardColor,
          };
          reset(persistedValues);
        } else if (createdKudoCard._id) {
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
      <form className={styles.formContainer}>
        <SnackbarProvider maxSnack={1} />
        <section className={styles.interactiveSection}>
          <ChosingCardStyle />
          <CardForm />
        </section>
        <div className={styles.buttonsContainer}>
          <Button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit((data) =>
              onSubmit({ data, sendAgain: false })
            )}>
            Send Kudo Card
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            variant="secondary"
            onClick={handleSubmit((data) =>
              onSubmit({ data, sendAgain: true })
            )}>
            Send and Create New Kudo Card
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormCreateCard;
