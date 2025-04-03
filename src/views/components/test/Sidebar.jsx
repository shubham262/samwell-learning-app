"use client";
import { memo, useCallback } from "react";
import styles from "../../../assets/styles/test/sidebar.module.scss";
import logo from "@/assets/svg/home/samwell.svg";
import share from "@/assets/svg/test/share.svg";
import menu from "@/assets/svg/test/menu.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();

  const handleNavigateToHome = useCallback(() => {
    router.push("/");
  }, [router]);
  return (
    <div className={styles.sidebarParentContainer}>
      <Image
        src={logo}
        alt="Samwell Logo"
        onClick={handleNavigateToHome}
        style={{ cursor: "pointer" }}
      />

      <div className={styles.sidebarLogoContainer}>
        <Image src={share} alt="share" />
        <Image src={menu} alt="menu" />
      </div>
    </div>
  );
};
export default memo(Sidebar);
