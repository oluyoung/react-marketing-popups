import styles from './Right.module.css';

export const BannerRight = ({ onOk }: { onOk: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
        </div>
        
        <div className={styles.textContent}>
          <div className={styles.badge}>
            EXCLUSIVE OFFER
          </div>
          <h2 className={styles.title}>
            Special Holiday Deal
          </h2>
          <p className={styles.description}>
            Save big this season! Get our annual plan at the best price of the year. Limited spots available.
          </p>
        </div>

        <div className={styles.offerBox}>
          <div className={styles.offerAmount}>70% OFF</div>
          <div className={styles.offerDetails}>First Year Subscription</div>
        </div>

        <button className={styles.cta} onClick={onOk}>
          Claim Offer Now
          <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>

        <div className={styles.disclaimerList}>
          <p>⏱ Offer expires in 48 hours</p>
          <p>🔒 Secure checkout guaranteed</p>
        </div>
      </div>
    </div>
  );
};
