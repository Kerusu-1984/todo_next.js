import styles from "../styles/Login.module.css"
import { useCallback, useEffect } from 'react';
import Router from "next/router";

export default function Login() {
    const login = useCallback(e => {
        e.preventDefault();
        Router.push("/board")
    },[])

    useEffect(()=> {
        Router.prefetch("/board");
    },[]);
    
    return (
        <div className={styles.Login_content}>
          <div className={styles.Login_box}>
            <div className={styles.Login_title}>
              <h1>ログイン</h1>
            </div>
            <form className={styles.Login_form} onSubmit={login}>
            <div className={styles.Login_item}>
              <div className={styles.Login_label}>名前</div>
              <input type="text" />
            </div>
            <div className={styles.Login_item}>
              <div className={styles.Login_label}>パスワード</div>
              <input type="password" />
            </div>
            <div className={styles.Login_buttonGruop}>
              <button className={styles.Login_button}>ログインする</button>
            </div>
            </form>
          </div>
        </div>
      );
};