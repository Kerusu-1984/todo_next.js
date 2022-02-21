import React, { useState } from "react";
import styles from "../styles/Signup.module.css";
import Router from "next/router";
import { BackendService } from "../backend/BackendService";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  name: string;
  password: string;
};

export const Signup: React.FC = () => {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, name, password } = data;
    try {
      await BackendService.signup(name, password, email);
    } catch (error) {
      if (error.status === 409) {
        setFormError("同じメールアドレスが登録されています");
        return;
      }
      throw error;
    }

    Router.push("/");
  };

  return (
    <div className={styles.Signup_content}>
      <div className={styles.Signup_box}>
        <div className={styles.Signup_title}>
          <h1>ユーザー登録</h1>
          <div className="error">{formError}</div>
        </div>
        <form className={styles.Signup_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.Signup_item}>
            <div className={styles.Signup_label}>メールアドレス</div>
            <input type="text" {...register("email", { required: true })} />
            {errors.email && (
              <span style={{ color: "red" }}>
                このフィールドの入力は必須です
              </span>
            )}
          </div>
          <div className={styles.Signup_item}>
            <div className={styles.Signup_label}>名前</div>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && (
              <span style={{ color: "red" }}>
                このフィールドの入力は必須です
              </span>
            )}
          </div>
          <div className={styles.Signup_item}>
            <div className={styles.Signup_label}>パスワード</div>
            <input
              type="password"
              {...register("password", { required: true, minLength: 4 })}
            />
            {errors.password?.type === "required" && (
              <span style={{ color: "red" }}>
                このフィールドの入力は必須です
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span style={{ color: "red" }}>
                パスワードは4文字以上入力してください
              </span>
            )}
          </div>
          <div className={styles.Signup_buttonGruop}>
            <button className={styles.Signup_button}>登録する</button>
          </div>
        </form>
      </div>
    </div>
  );
};
