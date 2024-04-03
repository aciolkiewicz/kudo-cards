import Logo from "@/components/Molecules/Logo/Logo";
import Navigation from "@/components/Molecules/Navigation/Navigation";

import styles from "./TopBar.module.css";

const TopBar = () => {
  return (
    <section className={styles.topBar}>
      <Logo />
      <Navigation />
    </section>
  );
};

export default TopBar;
