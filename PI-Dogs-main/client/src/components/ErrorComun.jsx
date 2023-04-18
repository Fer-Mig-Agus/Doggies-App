import React from 'react';
import styles from "../assets/styles/components/ErrorComun.module.css";

const ErrorComun = ({ style, mensaje }) => {
	return (
		<div className={styles.content}>
			<div
				className={`${style ? styles.failed : styles.success} ${
					styles.contentError
				}`}
			>
				<p className={styles.parrafo}>{mensaje}</p>
			</div>
		</div>
	);
};

export default ErrorComun;
