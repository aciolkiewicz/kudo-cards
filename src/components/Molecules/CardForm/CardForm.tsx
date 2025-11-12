import { Controller, useFormContext } from "react-hook-form";

import Button from "@/components/Atoms/Button/Button";
import Headings from "@/components/Atoms/Headings/Headings";
import Input from "@/components/Atoms/Input/Input";
import ToolbarTextField from "@/components/Molecules/ToolbarTextField/ToolbarTextField";
import { cardTitles } from "@/constants/index";

import styles from "./CardForm.module.css";

const CardForm = () => {
  const { control, watch, setValue } = useFormContext();
  const cardTitle = watch("cardTitle");
  const cardColor = watch("cardColor");
  const gifUrl = watch("gifUrl");
  const cardObject = cardTitles.find((element) => element.name === cardTitle);

  const backgroundStyle = gifUrl
    ? {
        backgroundImage: `url(${gifUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <section className={styles.cardForm}>
      <section className={`${styles.cardTitle} ${styles[cardColor]}`}>
        <Headings level={3} customClass="cardTitle">
          <>
            {cardObject?.value || ""}{" "}
            {gifUrl && (
              <Button
                type="button"
                variant="inline"
                onClick={() => setValue("gifUrl", "")}>
                Remove GIF
              </Button>
            )}
          </>
        </Headings>
      </section>
      <section className={styles.relativeContainer}>
        <div className={styles.gifContainer} style={backgroundStyle}></div>
        <div className={styles.inputsContainer}>
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
          <div className={styles.relativeContainer}>
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
            <ToolbarTextField fieldToManipulate="for" />
          </div>
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
        </div>
      </section>
    </section>
  );
};

export default CardForm;
