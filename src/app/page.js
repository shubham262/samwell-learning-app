import Image from "next/image";
import styles from "../assets/styles/home.module.scss";
import { memo } from "react";
import Header from "@/views/components/home/Header";
import Footer from "@/views/components/home/Footer";
// import Image from "next/image";
import samWell from "@/assets/icons/container.png";
const Home = () => {
  return (
    <div className={styles.homePageContainer}>
      <Header />
      <div className={styles.homePageContent}>
        <Image src={samWell} />
        <span className={styles.supprtingText}>
          Explore how Samwell can help you learn what you need, effortlessly.
        </span>
        <div className=""></div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(Home);
