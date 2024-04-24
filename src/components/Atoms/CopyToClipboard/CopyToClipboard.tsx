import Typography from "../Typography/Typography";
import styles from "./CopyToClipboard.module.css";

interface Properties {
  valueToCopy: string;
}

const CopyToClipboard = ({ valueToCopy }: Properties) => {
  return (
    <section className={styles.copyToClipboard}>
      <Typography customClass="cornsilkMarginReset">
        <>{valueToCopy}</>
      </Typography>
    </section>
  );
};

export default CopyToClipboard;
