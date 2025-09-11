"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import BoardHeader from "@/components/Molecules/BoardHeader/BoardHeader";
import CardsBoard from "@/components/Organisms/CardsBoard/CardsBoard";

export default function Home() {
  const searchParams = useSearchParams();
  const dateFromUrl = searchParams.get("choosenDate");
  const todayDate = new Date();
  const formattedDate = `${todayDate.getFullYear()}-${("0" + (todayDate.getMonth() + 1)).slice(-2)}`;

  const initialFormValues = {
    choosenDate: dateFromUrl || formattedDate,
  };

  const methods = useForm({
    defaultValues: initialFormValues,
  });

  const { setValue, watch } = methods;

  useEffect(() => {
    if (!dateFromUrl) {
      setValue("choosenDate", formattedDate);
    }
  }, [dateFromUrl]);

  return (
    <FormProvider {...methods}>
      <BoardHeader />
      {watch("choosenDate") && <CardsBoard />}
    </FormProvider>
  );
}
