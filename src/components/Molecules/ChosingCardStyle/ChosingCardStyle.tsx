import { Controller, useFormContext } from "react-hook-form";

import Headings from "@/components/Atoms/Headings/Headings";
import Input from "@/components/Atoms/Input/Input";
import { cardColors, cardTitles } from "@/constants/index";

import styles from "./ChosingCardStyle.module.css";

const ChosingCardStyle = () => {
  const { control } = useFormContext();

  return (
    <>
      <section className={styles.cardTitlesContainer}>
        <Headings level={3}>
          <>Pick card title</>
        </Headings>
        <section className={styles.styleSelection}>
          {cardTitles.map((title) => (
            <Controller
              key={title.name}
              name="cardTitle"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="radio"
                  name={title.name}
                  labelValue={title.value}
                  group="cardTitle"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          ))}
        </section>
        <Headings level={3}>
          <>Pick card color</>
        </Headings>
        <section className={styles.styleSelection}>
          {cardColors.map((color) => (
            <Controller
              key={color.name}
              name="cardColor"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  key={color.name}
                  type="radio"
                  name={color.name}
                  labelValue={color.name}
                  group="cardColor"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default ChosingCardStyle;
