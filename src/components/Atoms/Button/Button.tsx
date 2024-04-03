import styles from "./Button.module.css";

interface Properties {
  type: "submit" | "reset" | "button";
  children: string;
}

const Button = ({ type, children }: Properties) => {
  return (
    <button type={type} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
