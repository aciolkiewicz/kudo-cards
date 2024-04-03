import styles from "./StrongText.module.css";

interface StrongTextProperties {
  children: string;
  customClass?: string;
}

const StrongText = ({ children, customClass = "" }: StrongTextProperties) => {
  return (
    <strong className={`${styles.strongText} ${styles[customClass]}`}>
      {children}
    </strong>
  );
};

export default StrongText;
