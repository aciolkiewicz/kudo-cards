import Headings from "@/components/Atoms/Headings/Headings";
import HeartPlus from "@/components/Atoms/HeartPlus/HeartPlus";
import Input from "@/components/Atoms/Input/Input";
import { cardTitles } from "@/constants/index";

import styles from "./KudoCard.module.css";

interface Parameters {
  kudoCard: CardParameters;
}

const KudoCard = ({ kudoCard }: Parameters) => {
  const cardTitle = kudoCard.cardTitle;
  const cardColor = kudoCard.cardColor;
  const cardObject = cardTitles.find((element) => element.name === cardTitle);

  return (
    <section className={styles.kudoCard}>
      <section className={`${styles.cardTitle} ${styles[cardColor]}`}>
        <Headings level={3} customClass="cardTitle">
          <>{cardObject?.value || ""}</>
        </Headings>
        <HeartPlus hearts={kudoCard.hearts} />
      </section>
      <section className={styles.cardContent}>
        <Input
          type="text"
          name="to"
          labelValue="TO:"
          group="to"
          value={kudoCard.to}
          readOnly
        />
        <Input
          type="textarea"
          name="for"
          labelValue="FOR:"
          group="for"
          value={kudoCard.for}
          readOnly
        />
        <Input
          type="text"
          name="from"
          labelValue="FROM:"
          group="from"
          value={kudoCard.from}
          readOnly
        />
      </section>
    </section>
  );
};

export default KudoCard;
