import styles from "./Left.module.css";

export const SlideInLeft = ({ onOk }: { onOk: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
              <polyline points="16 7 22 7 22 13"></polyline>
            </svg>
          </div>
          <div className={styles.headerText}>
            <div className={styles.badge}>Success Story</div>
            <h3 className={styles.title}>Boost Your Growth</h3>
          </div>
        </div>

        <div className={styles.priceBox}>
          <div className={styles.price}>$49/mo</div>
          <div className={styles.priceDetails}>Everything included</div>
        </div>

        <button className={styles.cta} onClick={onOk}>Start Your Free Trial</button>

        <p className={styles.disclaimer}>
          14-day free trial • No credit card required
        </p>
      </div>
    </div>
  );
};
