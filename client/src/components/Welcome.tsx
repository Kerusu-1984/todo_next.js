import React, { useEffect } from "react";
import styles from "../styles/Welcome.module.css"
import Link from "next/link";
import Router from "next/router";
import { useRecoilState } from "recoil" 
import { isLoggedInState } from  "./atoms"

export const Welcome:React.FC =() => {
  const [isLoggedIn] = useRecoilState(isLoggedInState)
  useEffect(() => {
    if (isLoggedIn) Router.push("/board");
  },[])

    return(
    <div className={styles.Welcome_content}>
      <div>
        <h1 className={styles.Welcome_title}>Welcome</h1>
        <div className={styles.Welcome_buttonGroup}>
            <Link href="/signup">
                <button className={styles.Welcome_button}>登録する</button>
            </Link>
        </div>
      </div>
    </div>
    );
};