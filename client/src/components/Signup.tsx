import React, { useState } from "react";
import styles from "../styles/Signup.module.css"
import Router from "next/router"
import { BackendService } from "../backend/BackendService";
import { useInput } from "../hooks/useInput";

export const Signup:React.FC = () => {
    const [formError,setFormError] = useState("");
    const [email,EmailAttributes] = useInput("");
    const [userName,UserNameAttributes] = useInput("");
    const [password,PasswordAttributes] = useInput("");

    const signup: React.FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();  
        try {
          await BackendService.signup(userName, password, email);

        } catch (error) {
          if (error.status === 409) {
            setFormError("同じメールアドレスが登録されています");
            return ;
          }
          throw error;
        }

                
      Router.push('/');

    };


    return(
        <div className={styles.Signup_content}>
      <div className={styles.Signup_box}>
        <div className={styles.Signup_title}>
          <h1>ユーザー登録</h1>
          <div className="error">{formError}</div>
        </div>
        <form className={styles.Signup_form} onSubmit={signup}>
        <div className={styles.Signup_item}>
          <div className={styles.Signup_label}>メールアドレス</div>
          <input type="text" {...EmailAttributes}/>
        </div>
        <div className={styles.Signup_item}>
          <div className={styles.Signup_label}>名前</div>
          <input type="text" {...UserNameAttributes}/>
        </div>
        <div className={styles.Signup_item}>
          <div className={styles.Signup_label}>パスワード</div>
          <input type="password" {...PasswordAttributes}/>
        </div>
        <div className={styles.Signup_buttonGroup}>
          <button type="submit" className={styles.Signup_button}>登録する</button>
        </div>
        </form>
      </div>
    </div>
    )};