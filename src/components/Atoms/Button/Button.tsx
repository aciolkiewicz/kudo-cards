import styles from "./Button.module.css";

interface Properties {
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  children: string;
  variant?: "primary" | "secondary" | "inline";
  onClick?: () => void;
}

const Button = ({ type, disabled, children, variant, onClick }: Properties) => {
  if (onClick) {
    return (
      <button
        type={type}
        className={`${styles[type]} ${variant && styles[variant]}`}
        disabled={disabled}
        onClick={onClick}>
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
