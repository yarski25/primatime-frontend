import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerBox} data-testid="spinner-box">
      <div className={styles.spinner} data-testid="spinner" />
    </div>
  );
};

export default LoadingSpinner;
