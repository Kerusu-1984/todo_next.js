import styles from "../styles/Welcome.module.css"
import Link from "next/link";

export default function Welcome() {
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