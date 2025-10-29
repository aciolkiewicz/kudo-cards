import styles from "./Button.module.css";

interface Properties {
  type: "submit" | "reset" | "button";
  onClick?: () => Promise<void> | void;
  disabled?: boolean;
  children: string;
}

const Button = ({ type, onClick, disabled, children }: Properties) => {
  if (onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={styles[type]}
        disabled={disabled}>
        {children}
      </button>
    );
  }
  return (
    <button type={type} className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
