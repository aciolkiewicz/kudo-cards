import Headings from "@/components/Atoms/Headings/Headings";
import DatePicker from "@/components/Molecules/DatePicker/DatePicker";

import styles from "./BoardHeader.module.css";

const BoardHeader = () => {
  return (
    <section className={styles.boardHeader}>
      <Headings level={2}>
        <>Kudo Cards from</>
      </Headings>
      <DatePicker />
    </section>
  );
};

export default BoardHeader;
