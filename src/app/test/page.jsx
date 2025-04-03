"use client";
import { memo, useContext, useEffect } from "react";
import styles from "../../assets/styles/test/test.module.scss";
import Sidebar from "@/views/components/test/Sidebar";
import TestContent from "@/views/components/test/TestContent";
import { useRouter } from "next/navigation";
import Context from "@/context/context";

const Test = () => {
  const router = useRouter();
  const {
    tutorInfo: { questionsData },
  } = useContext(Context);

  useEffect(() => {
    if (!questionsData) {
      router.push("/");
    }
  }, [questionsData]);
  return (
    <div className={styles.testParentContainer}>
      <Sidebar />
      <TestContent />
    </div>
  );
};
export default memo(Test);
