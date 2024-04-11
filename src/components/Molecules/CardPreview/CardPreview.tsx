import Headings from "@/components/Atoms/Headings/Headings";
import Input from "@/components/Atoms/Input/Input";

import styles from "./CardPreview.module.css";

const CardPreview = () => {
  return (
    <section className={styles.cardPreview}>
      <section className={styles.cardTitle}>
        <Headings level={3}>
          <>Amazing!</>
        </Headings>
      </section>
      <section className={styles.cardContent}>
        <Input type="text" name="to" labelValue="TO:" group="to" />
        <Input type="textarea" name="for" labelValue="FOR:" group="for" />
        <Input type="text" name="from" labelValue="FROM:" group="from" />
      </section>
    </section>
  );
};

export default CardPreview;
