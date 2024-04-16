import styles from "./Button.module.css";

interface Properties {
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  children: string;
}

const Button = ({ type, disabled, children }: Properties) => {
  return (
    <button type={type} className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
