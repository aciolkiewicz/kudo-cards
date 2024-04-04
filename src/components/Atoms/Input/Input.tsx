import styles from "./Input.module.css";

interface Properties {
  type: "radio" | "text" | "checkbox";
  name: string;
  value: string;
  group: string;
}

const Input = ({ type, name, value, group }: Properties) => {
  return (
    <div className={styles.inputContainer}>
      <input type={type} id={name} name={group} value={name} checked />
      {group === "cardColor" && (
        <label htmlFor={name}>
          <div className={`${styles.cardColor} ${styles[value]}`} />
        </label>
      )}
      {group !== "cardColor" && <label htmlFor={name}>{value}</label>}
    </div>
  );
};

export default Input;
