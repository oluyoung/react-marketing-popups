import styles from './Right.module.css';

export const SlideInRight = ({ onOk }: { onOk: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
          </div>
          <div className={styles.headerText}>
            <div className={styles.badge}>Power Up</div>
            <h3 className={styles.title}>Go Premium Today</h3>
          </div>
        </div>

        <div className={styles.offerBadge}>
          <div className={styles.offerLabel}>LAUNCH SPECIAL</div>
          <div className={styles.offerAmount}>50% Off First 3 Months</div>
        </div>

        <button className={styles.cta} onClick={onOk}>
          Upgrade to Premium
        </button>

        <p className={styles.disclaimer}>
          Cancel anytime • Money-back guarantee
        </p>
      </div>
    </div>
  );
};
