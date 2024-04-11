import Headings from "@/components/Atoms/Headings/Headings";
import Input from "@/components/Atoms/Input/Input";
import { cardColors, cardTitles } from "@/constants/index";

import styles from "./ChosingCardStyle.module.css";

const ChosingCardStyle = () => {
  return (
    <>
      <section className={styles.cardTitlesContainer}>
        <Headings level={3}>
          <>Pick card title</>
        </Headings>
        <section className={styles.styleSelection}>
          {cardTitles.map((title) => (
            <Input
              key={title.name}
              type="radio"
              name={title.name}
              labelValue={title.value}
              group="cardTitle"
            />
          ))}
        </section>
        <Headings level={3}>
          <>Pick card color</>
        </Headings>
        <section className={styles.styleSelection}>
          {cardColors.map((color) => (
            <Input
              key={color.name}
              type="radio"
              name={color.name}
              labelValue={color.name}
              group="cardColor"
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default ChosingCardStyle;
