"use client";
import { Controller, useFormContext } from "react-hook-form";

import styles from "./DatePicker.module.css";

const DatePicker = () => {
  const { control } = useFormContext();

  const todayDate = new Date();
  const formattedDate = `${todayDate.getFullYear()}-${("0" + (todayDate.getMonth() + 1)).slice(-2)}`;

  return (
    <form>
      <Controller
        name="choosenDate"
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            className={styles.choosenDate}
            type="month"
            id="choosenDate"
            name="choosenDate"
            value={value}
            onChange={onChange}
            max={formattedDate}
          />
        )}
      />
    </form>
  );
};

export default DatePicker;
