import React from 'react';
import styles from '../styles/NavigationHeader.module.css';
import Link from 'next/link';
import { useRecoilState } from "recoil" 
import { nameState,isLoggedInState } from  "./atoms"
import { BackendService } from '../backend/BackendService';

export const NavigationHeader: React.FC = () => {
  const [name,setName] = useRecoilState(nameState)
  const [isLoggedIn,setIsLoggedIn] = useRecoilState(isLoggedInState)

  const logout = async () => {
    await BackendService.logout();
    setName("")
    window.location.href = "/";
    setIsLoggedIn(false)
  };

  return (
    <header className={styles.PageHeader_header}>
      <h1 className={styles.PageHeader_title}>Todoアプリ</h1>
      <nav>
        <ul className={styles.PageHeader_nav}>
         {isLoggedIn? (
           <>
           <li><button type="button" onClick={logout}>ログアウト</button></li>
           <li>{name}</li>
           </>
         )
         :
         (
           <li><Link href="/login">ログイン</Link></li>
         )}
        </ul>
      </nav>
    </header>
  );
};



