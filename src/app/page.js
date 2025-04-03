"use client";
import Image from "next/image";
import styles from "../assets/styles/home/home.module.scss";
import { memo, useState, useCallback, useContext, useEffect } from "react";
import Header from "@/views/components/home/Header";
import Footer from "@/views/components/home/Footer";
import book from "../assets/svg/home/book.svg";
import samWell from "@/assets/icons/container.png";
import Context from "@/context/context";
import { useRouter } from "next/navigation";
import { message, Spin } from "antd";

const Home = () => {
  const {
    tutorInfo: { fetchQuestions, updateStateValue },
  } = useContext(Context);
  const router = useRouter();

  const [info, setInfo] = useState({
    userQuery: "",
    loader: false,
    error: false,
  });

  //clearing state on mounting
  useEffect(() => {
    updateStateValue({
      userQuery: "",
      questionsData: null,
    });
  }, []);

  const onQueryChange = useCallback(
    (e) => {
      setInfo((prev) => ({ ...prev, userQuery: e.target.value, error: false }));
    },
    [info]
  );

  const handleNavigateToTest = useCallback(
    async (e, click = false) => {
      if (e?.key === "Enter" || click) {
        if (e?.shiftKey) {
          return;
        }
        if (info?.loader) {
          return;
        }
        if (!info?.userQuery?.length) {
          return setInfo((prev) => ({ ...prev, error: true }));
        }
        setInfo((prev) => ({ ...prev, loader: true, userQuery: "" }));

        const result = await fetchQuestions(info?.userQuery);

        if (result) {
          router.push("/test");
        } else {
          message.error("something went wrong");
        }
        setInfo((prev) => ({ ...prev, loader: false }));
      }
    },
    [router, info]
  );

  return (
    <div className={styles.homePageContainer}>
      <Header />
      <div className={styles.homePageContent}>
        <div className=""></div>
        <Image src={samWell} alt="target" />
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
              style={{ borderColor: info?.error ? "red" : "" }}
            />
            <div
              className={styles.errorContainer}
              style={{
                justifyContent: info?.error ? "space-between" : "flex-end",
              }}
            >
              {info?.error && (
                <span className={styles.errorTest}>
                  User Quey Cannot be empty
                </span>
              )}
              <button
                className={styles.startButton}
                onClick={() => handleNavigateToTest(null, true)}
              >
                {info?.loader ? (
                  <span className={styles.loaderText}>
                    <Spin /> Fetching Questions...
                  </span>
                ) : (
                  "Start Studying"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(Home);
