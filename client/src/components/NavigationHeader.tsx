import styles from '../styles/NavigationHeader.module.css';

export default function NavigationHeader() {
  return (
    <header className={styles.PageHeader_header}>
      <h1 className={styles.PageHeader_title}>Todoアプリ</h1>
    </header>
  );
};