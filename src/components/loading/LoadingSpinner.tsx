import styles from '../../styles/modules/LoadingSpinner.module.css';

export const LoadingSpinner = () => {
	return (
		<div className={styles.container} aria-label="Loading">
			<div className={styles.spinner}>
				<div className={styles.circle} />
				<div className={styles.circle} />
				<div className={styles.circle} />
			</div>
		</div>
	);
};
