import Typography from "@/components/Atoms/Typography/Typography";

import styles from "./BottomBar.module.css";

const BottomBar = () => {
  return (
    <footer className={styles.bottomBar}>
      <Typography>
        <>Here’s to those who inspire you and don’t even know it.</>
      </Typography>
    </footer>
  );
};

export default BottomBar;
