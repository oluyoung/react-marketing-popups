import styles from './Top.module.css';

export const BannerTop = ({ onOk }: { onOk: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.message}>
            <span className={styles.highlight}>🎉 Limited Time Offer!</span> Get 50% off all premium plans. Offer ends soon!
          </p>
        </div>
        <button className={styles.cta} onClick={onOk}>
          Claim Your Discount
        </button>
      </div>
    </div>
  );
};
