import styles from "./Input.module.css";

interface Properties {
  type: "radio" | "text" | "checkbox" | "textarea";
  name: string;
  labelValue: string;
  group: string;
  value: string;
  onChange: () => void;
}

const Input = ({
  type,
  name,
  labelValue,
  group,
  value,
  onChange,
}: Properties) => {
  if (type === "radio") {
    return (
      <div className={styles.inputContainer}>
        <input
          type={type}
          id={name}
          name={group}
          value={name}
          checked={name === value}
          onChange={onChange}
        />
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
        <input
          type={type}
          id={name}
          name={group}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className={styles.inputColumnFlex}>
        <label htmlFor={name}>{labelValue}</label>
        <textarea
          id={name}
          name={group}
          value={value}
          onChange={onChange}
          rows={10}
        />
      </div>
    );
  }
};

export default Input;
