import React from "react";

import styles from "./Headings.module.css";

interface HeadingsProperties {
  children?: JSX.Element;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  customClass?: string;
}

const Headings = ({
  children = <></>,
  level = 1,
  customClass = "",
}: HeadingsProperties) => {
  const HeadTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <HeadTag className={styles[customClass]}>{children}</HeadTag>;
};

export default Headings;
