import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { nameState, isLoggedInState } from "./atoms";
import { BackendService } from "../backend/BackendService";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const [formError, setFormError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [name, setName] = useRecoilState(nameState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const response = await BackendService.login(email, password);
      setName(response.name);
    } catch (error) {
      if (error.status === 401) {
        setFormError("ログインに失敗しました");
        return;
      }
      throw error;
    }
    setIsLoggedIn(true);
    Router.push("/board");
  };

  return (
    <div className={styles.Login_content}>
      <div className={styles.Login_box}>
        <div className={styles.Login_title}>
          <h1>ログイン</h1>
          <div className="error">{formError}</div>
        </div>
        <form className={styles.Login_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.Login_item}>
            <div className={styles.Login_label}>メールアドレス</div>
            <input type="text" {...register("email", { required: true })} />
            {errors.email && (
              <span style={{ color: "red" }}>
                このフィールドの入力は必須です
              </span>
            )}
          </div>
          <div className={styles.Login_item}>
            <div className={styles.Login_label}>パスワード</div>
            <input
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <span style={{ color: "red" }}>
                このフィールドの入力は必須です
              </span>
            )}
          </div>
          <div className={styles.Login_buttonGruop}>
            <button className={styles.Login_button}>ログインする</button>
          </div>
        </form>
      </div>
    </div>
  );
};
