import styles from './Left.module.css';

export const BannerLeft = ({ onOk }: { onOk: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
        </div>
        
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            Upgrade Your Experience
          </h2>
          <p className={styles.description}>
            Join thousands of satisfied customers who have transformed their workflow with our premium features.
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.checkmark}>✓</span>
            <span>Unlimited access to all features</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.checkmark}>✓</span>
            <span>Priority customer support</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.checkmark}>✓</span>
            <span>Advanced analytics dashboard</span>
          </div>
        </div>

        <button className={styles.cta} onClick={onOk}>
          Start Free Trial
          <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>

        <p className={styles.disclaimer}>
          No credit card required • Cancel anytime
        </p>
      </div>
    </div>
  );
};
