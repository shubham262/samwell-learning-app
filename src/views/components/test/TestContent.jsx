import { memo } from "react";
import styles from "../../../assets/styles/test/testContent.module.scss";
import bullseye from "../../../assets/icons/bullseye.png";
import user from "../../../assets/icons/user.png";
import Image from "next/image";
const TestContent = () => {
  return (
    <div className={styles.testContentParentContainer}>
      {/* //test header */}
      <div className={styles.testHeaderContainer}>
        <div className={styles.testHeaderContentContainer}>
          <Image src={bullseye} />
          <span className={styles.testHeadertextStyling}>
            Biology - chapter 22: Evolution
          </span>
        </div>
        <Image src={user} />
      </div>
    </div>
  );
};

export default memo(TestContent);
