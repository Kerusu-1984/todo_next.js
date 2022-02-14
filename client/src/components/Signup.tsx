import React from "react";
import styles from "../styles/Signup.module.css"
import Router from "next/router"
import { useCallback } from 'react';

export const Signup:React.FC = () => {
    const signup = useCallback(e => {
        e.preventDefault();
        Router.push("/")
    },[])


    return(
        <div className={styles.Signup_content}>
      <div className={styles.Signup_box}>
        <div className={styles.Signup_title}>
          <h1>ユーザー登録</h1>
        </div>
        <form className={styles.Signup_form} onSubmit={signup}>
        <div className={styles.Signup_item}>
          <div className={styles.Signup_label}>メールアドレス</div>
          <input type="text"/>
        </div>
        <div className={styles.Signup_item}>
          <div className={styles.Signup_label}>名前</div>
          <input type="text"/>
        </div>
        <div className={styles.Signup_item}>
          <div className={styles.Signup_label}>パスワード</div>
          <input type="password" />
        </div>
        <div className={styles.Signup_buttonGroup}>
          <button type="submit" className={styles.Signup_button}>登録する</button>
        </div>
        </form>
      </div>
    </div>
    )};