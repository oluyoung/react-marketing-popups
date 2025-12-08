import styles from './Bottom.module.css';

export const BannerBottom = ({ onOk }: { onOk: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.message}>
            <span className={styles.highlight}>🚀 New Feature Launch!</span> Experience our revolutionary AI-powered tools now available.
          </p>
        </div>
        <button className={styles.cta} onClick={onOk}>
          Explore Features
        </button>
      </div>
    </div>
  );
};
