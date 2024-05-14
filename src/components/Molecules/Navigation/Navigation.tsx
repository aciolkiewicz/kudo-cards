"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Typography from "@/components/Atoms/Typography/Typography";
import { mainNavLinks } from "@/constants/index.js";

import styles from "./Navigation.module.css";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.navList}>
        {mainNavLinks.map((navLink) => (
          <li key={navLink.label} className={styles.navListElement}>
            <Link
              href={navLink.route}
              title={navLink.label}
              className={`${styles[navLink.linkType]} ${navLink.route === pathname && styles.active}`}>
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
