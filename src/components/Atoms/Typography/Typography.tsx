import React from "react";

import styles from "./Typography.module.css";

interface TypographyProperties {
  children?: JSX.Element;
  customClass?: string;
}

const Typography = ({
  children = <></>,
  customClass = "",
}: TypographyProperties) => {
  return <p className={styles[customClass]}>{children}</p>;
};

export default Typography;
