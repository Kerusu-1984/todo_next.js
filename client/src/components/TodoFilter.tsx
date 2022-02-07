import styles from "../styles/TodoFilter.module.css"

export type FilterType = 'ALL' | 'INCOMPLETE' | 'COMPLETED';

export default function TodoFilter({filterType, setFilterType}) {
  return (
    <div className={styles.TodoFilter_content}>
      <button className={filterType === 'ALL' ? styles.TodoFilter_buttonSelected : styles.TodoFilter_buttonUnselected}
              disabled={filterType === 'ALL'}
              onClick={() => setFilterType('ALL')}>
        全て
      </button>
      <button className={filterType === 'INCOMPLETE' ? styles.TodoFilter_buttonSelected : styles.TodoFilter_buttonUnselected}
              disabled={filterType === 'INCOMPLETE'}
              onClick={() => setFilterType('INCOMPLETE')}>
        未完了のみ
      </button>
      <button className={filterType === 'COMPLETED' ? styles.TodoFilter_buttonSelected : styles.TodoFilter_buttonUnselected}
              disabled={filterType === 'COMPLETED'}
              onClick={() => setFilterType('COMPLETED')}>
        完了のみ
      </button>
    </div>
  );
};