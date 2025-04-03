import { memo } from "react";
import styles from "../../assets/styles/test/test.module.scss";
import Sidebar from "@/views/components/test/Sidebar";
import TestContent from "@/views/components/test/TestContent";

const Test = () => {
  return (
    <div className={styles.testParentContainer}>
      <Sidebar />
      <TestContent />
    </div>
  );
};
export default memo(Test);
