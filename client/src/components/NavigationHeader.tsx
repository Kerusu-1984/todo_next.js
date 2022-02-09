import styles from '../styles/NavigationHeader.module.css';
import Link from 'next/link';

export default function NavigationHeader() {
  const logout = async () =>{
    window.location.href = "/";
  };

  return (
    <header className={styles.PageHeader_header}>
      <h1 className={styles.PageHeader_title}>Todoアプリ</h1>
      <nav>
        <ul className={styles.PageHeader_nav}>
          <li>
            <Link href="/login">ログイン</Link>
          </li>
          <li>テストユーザさん</li>
          <li>
            <button type="button" onClick={logout}>ログアウト</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};