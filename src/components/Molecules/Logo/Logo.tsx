import Link from "next/link";

import Headings from "@/components/Atoms/Headings/Headings";

import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href="/" title="Board" className={styles.logoContainer}>
      <Headings level={1}>
        <>Kudo</>
      </Headings>
      <Headings level={1} customClass="jonquilColor">
        <>Cards</>
      </Headings>
    </Link>
  );
};

export default Logo;
