import { memo } from "react";
import styles from "@/assets/styles/home/header.module.scss";
import logo from "@/assets/svg/home/samwell.svg";
import Image from "next/image";
const Header = () => {
  return (
    <div className={styles.homeHeaderContainer}>
      <div className={styles.homeHeaderLeftContainer}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="Samwell Logo" />
          <span className={styles.logoname}>samwell.ai</span>
        </div>
        <div className={styles.hrefsContainer}>
          <a href="">Pricing</a>
          <a href="">Examples</a>
          <a href="">Affiliate</a>
          <a href="">Products</a>
        </div>
      </div>
      <div className={styles.homeHeaderRight}>
        <button className={styles.authActionButton}>Login</button>
        <button className={styles.authActionButton}>Sign-up for Free</button>
      </div>
    </div>
  );
};
export default memo(Header);
