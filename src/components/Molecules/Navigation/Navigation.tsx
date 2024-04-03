import Link from "next/link";

import Typography from "@/components/Atoms/Typography/Typography";
import { mainNavLinks } from "@/constants/index.js";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        {mainNavLinks.map((navLink) => (
          <li key={navLink.label} className={styles.navListElement}>
            <Link
              href={navLink.route}
              title={navLink.label}
              className={styles[navLink.linkType]}>
              <Typography>
                <>{navLink.label}</>
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
