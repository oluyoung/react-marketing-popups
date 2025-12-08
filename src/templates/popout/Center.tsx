import { useState, type FormEvent } from 'react';
import styles from './Center.module.css';

export const PopoutCenter = ({ onOk }: { onOk: () => void }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      const id = setTimeout(() => {
        onOk();
        clearTimeout(id);
      }, 3000);
    } else {
      alert('Insert an email before submitting');
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIconWrapper}>
          <div className={styles.successIconBg}>
            <svg className={styles.successIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
          </div>
        </div>
        <h3 className={styles.successTitle}>You're All Set!</h3>
        <p className={styles.successMessage}>
          Thank you for subscribing. Check your inbox for a special welcome offer!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIconWrapper}>
          <div className={styles.headerIconBg}>
            <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </div>
        </div>
        <h2 className={styles.headerTitle}>Stay in the Loop</h2>
        <p className={styles.headerDescription}>
          Get exclusive tips, industry insights, and special offers delivered straight to your inbox.
        </p>
      </div>

      <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="newsletter-email" className={styles.label}>
              Email Address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Subscribe Now
          </button>
        </form>

        <p className={styles.privacy}>
          We respect your privacy. No spam, ever. 🔒
        </p>
      </div>
    </div>
  );
};
