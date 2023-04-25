import React from 'react'
import styles from "../assets/styles/components/views/ErrorPage.module.css";   
import image from "../assets/img/pageNotFound.png" ;

const ErrorPage = () => {
  return (
		<div className={styles.content}>
			<div className={styles.contentSecondary}>
				<h1 className={styles.titlePrimary}>Page Not Found</h1>
				<div className={styles.contentImage}>
					<img className={styles.image} src={image} alt="Page Not Fount" />
				</div>

				<h5 className={styles.titleSecondary}>Error 404</h5>
			</div>
		</div>
	);
}

export default ErrorPage
