import { Controller, useFormContext } from "react-hook-form";

import Headings from "@/components/Atoms/Headings/Headings";
import Input from "@/components/Atoms/Input/Input";
import { cardTitles } from "@/constants/index";

import styles from "./CardForm.module.css";

const CardForm = () => {
  const { control, watch } = useFormContext();
  const cardTitle = watch("cardTitle");
  const cardColor = watch("cardColor");
  const cardObject = cardTitles.find((element) => element.name === cardTitle);

  return (
    <section className={styles.cardForm}>
      <section className={`${styles.cardTitle} ${styles[cardColor]}`}>
        <Headings level={3} customClass="cardTitle">
          <>{cardObject?.value || ""}</>
        </Headings>
      </section>
      <section className={styles.cardContent}>
        <Controller
          name="to"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="text"
              name="to"
              labelValue="TO:"
              group="to"
              value={value}
              onChange={onChange}
              maxLength={40}
            />
          )}
        />
        <Controller
          name="for"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="textarea"
              name="for"
              labelValue="FOR:"
              group="for"
              value={value}
              onChange={onChange}
              maxLength={250}
            />
          )}
        />
        <Controller
          name="from"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="text"
              name="from"
              labelValue="FROM:"
              group="from"
              value={value}
              onChange={onChange}
              maxLength={40}
            />
          )}
        />
      </section>
    </section>
  );
};

export default CardForm;
