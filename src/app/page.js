"use client";
import Image from "next/image";
import styles from "../assets/styles/home/home.module.scss";
import { memo, useState, useCallback, useContext } from "react";
import Header from "@/views/components/home/Header";
import Footer from "@/views/components/home/Footer";
import book from "../assets/svg/home/book.svg";
import samWell from "@/assets/icons/container.png";
import Context from "@/context/context";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();

  const handleNavigateToTest = useCallback(
    (e, click = false) => {
      if (e?.key === "Enter" || click) {
        if (e?.shiftKey) {
          return;
        }
        router.push("/test");
      }
    },
    [router]
  );

  const [info, setInfo] = useState({
    userQuery: "",
  });

  const onQueryChange = useCallback(
    (e) => {
      setInfo((prev) => ({ ...prev, userQuery: e.target.value }));
    },
    [info]
  );
  return (
    <div className={styles.homePageContainer}>
      <Header />
      <div className={styles.homePageContent}>
        <div className=""></div>
        <Image src={samWell} />
        <span className={styles.supprtingText}>
          Explore how Samwell can help you learn what you need, effortlessly.
        </span>
        <div className={styles.tutorContainer}>
          <div className={styles.tutorHeader}>
            <Image src={book} alt="book" />
            <span className={styles.tutorTitle}>AI tutor</span>
          </div>
          <div className={styles.studyInput}>
            <textarea
              placeholder="Type what you want to study..."
              onChange={onQueryChange}
              value={info.userQuery}
              onKeyDown={handleNavigateToTest}
            />
            <button
              className={styles.startButton}
              onClick={handleNavigateToTest}
            >
              Start Studying
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(Home);
