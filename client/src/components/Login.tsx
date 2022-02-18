import React, { useState } from "react";
import styles from "../styles/Login.module.css"
import Router from "next/router";
import { useInput } from "../hooks/useInput";
import { useRecoilState } from "recoil" 
import { nameState,isLoggedInState } from  "./atoms"
import { BackendService } from "../backend/BackendService";

export  const Login: React.FC = () => {
    const [email, emailAttributes] = useInput('');
    const [password, passwordAttributes] = useInput('');
    const [formError, setFormError] = useState('');
    const [isLoggedIn,setIsLoggedIn] = useRecoilState(isLoggedInState)
    const [name,setName] = useRecoilState(nameState)

    const login: React.FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();
        try{
            const response = await BackendService.login(email,password);
            setName(response.name)
            
        } catch(error){
            if (error.status === 401) {
              setFormError("ログインに失敗しました");
              return;
            }
            throw error;
        }
        setIsLoggedIn(true)
        Router.push('/board');
    }



    
    return (
        <div className={styles.Login_content}>
          <div className={styles.Login_box}>
            <div className={styles.Login_title}>
              <h1>ログイン</h1>
              <div className="error">{formError}</div>
            </div>
            <form className={styles.Login_form} onSubmit={login}>
            <div className={styles.Login_item}>
              <div className={styles.Login_label}>メールアドレス</div>
              <input type="text" {...emailAttributes}/>
            </div>
            <div className={styles.Login_item}>
              <div className={styles.Login_label}>パスワード</div>
              <input type="password" {...passwordAttributes}/>
            </div>
            <div className={styles.Login_buttonGruop}>
              <button className={styles.Login_button}>ログインする</button>
            </div>
            </form>
          </div>
        </div>
      );
};