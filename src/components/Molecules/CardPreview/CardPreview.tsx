import { Controller, useFormContext } from "react-hook-form";

import Headings from "@/components/Atoms/Headings/Headings";
import Input from "@/components/Atoms/Input/Input";

import styles from "./CardPreview.module.css";

const CardPreview = () => {
  const { control } = useFormContext();

  return (
    <section className={styles.cardPreview}>
      <section className={styles.cardTitle}>
        <Headings level={3}>
          <>Amazing!</>
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
            />
          )}
        />
      </section>
    </section>
  );
};

export default CardPreview;
