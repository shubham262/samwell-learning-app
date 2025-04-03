import { memo } from "react";
import styles from "@/assets/styles/footer.module.scss";
import kings from "../../../assets/icons/kings.png";
import london from "../../../assets/icons/london.png";
import toronto from "../../../assets/icons/toronto.png";
import unitedNation from "../../../assets/icons/unitedNation.png";
import bocconi from "../../../assets/icons/bocconi.png";

import Image from "next/image";
const Footer = () => {
  return (
    <div className={styles.homeFooterContainer}>
      <span>
        Loved by over 3 million Students and Academics across the world
      </span>
      <div className={styles.iconsContainer}>
        <Image src={unitedNation} alt="kings" />
        <Image src={kings} alt="kings" />
        <Image src={toronto} alt="kings" />
        <Image src={london} alt="kings" />
        <Image src={bocconi} alt="kings" />
      </div>
    </div>
  );
};
export default memo(Footer);
