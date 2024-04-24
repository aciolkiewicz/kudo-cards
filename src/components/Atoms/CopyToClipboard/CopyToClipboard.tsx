"use client";

import Image from "next/image";
import { useState } from "react";

import Typography from "../Typography/Typography";
import styles from "./CopyToClipboard.module.css";

interface Properties {
  valueToCopy: string;
}

const CopyToClipboard = ({ valueToCopy }: Properties) => {
  const [copied, setCopied] = useState(false);
  const copyHandler = () => {
    setCopied(true);
    navigator.clipboard.writeText(valueToCopy);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.copyToClipboard}>
      <Typography customClass="cornsilkMarginReset">
        <>{valueToCopy}</>
      </Typography>
      <Image
        className={`${styles.copyIcon} ${copied && styles.copiedIcon}`}
        src={copied ? "/icons/done.svg" : "/icons/copy.svg"}
        alt="Copy to clipboard"
        width={25}
        height={25}
        onClick={copyHandler}
      />
    </section>
  );
};

export default CopyToClipboard;
