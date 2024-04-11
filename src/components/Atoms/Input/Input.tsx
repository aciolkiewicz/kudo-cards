import styles from "./Input.module.css";

interface Properties {
  type: "radio" | "text" | "checkbox" | "textarea";
  name: string;
  labelValue: string;
  group: string;
}

const Input = ({ type, name, labelValue, group }: Properties) => {
  if (type === "radio") {
    return (
      <div className={styles.inputContainer}>
        <input type={type} id={name} name={group} value={name} />
        {group === "cardColor" && (
          <label htmlFor={name}>
            <div className={`${styles.cardColor} ${styles[labelValue]}`} />
          </label>
        )}
        {group !== "cardColor" && <label htmlFor={name}>{labelValue}</label>}
      </div>
    );
  }
  if (type === "text") {
    return (
      <div className={styles.inputColumnFlex}>
        <label htmlFor={name}>{labelValue}</label>
        <input type={type} id={name} name={group} value={name} />
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className={styles.inputColumnFlex}>
        <label htmlFor={name}>{labelValue}</label>
        <textarea id={name} name={group} value={name} rows={10} />
      </div>
    );
  }
};

export default Input;
