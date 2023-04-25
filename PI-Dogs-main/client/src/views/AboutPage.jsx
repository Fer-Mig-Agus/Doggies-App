import React from 'react';
import styles from '../assets/styles/components/views/AboutPage.module.css';
import image from '../assets/img/Logo.webp';
const AboutPage = () => {
	return (
		<div className={styles.content}>
			<div className={styles.contentSecondary}>
				<div className={styles.contentImage}>
					<a
						href="https://portfolio-miguel-fernandez.netlify.app/"
						target="_black"
					>
						<img
							src={image}
							className={styles.image}
							alt="Miguel Fernandez"
							title="Miguel Fernandez"
						/>
					</a>
				</div>
				<div className={styles.contentText}>
					<h1 className={styles.title}>Who i am?</h1>
					<p className={styles.description}>
						I am a curious person, who tries to grow every day, and to learn
						more and more.
					</p>
					<h1 className={styles.title}>How to contact me?</h1>
					<div className={styles.contentIcon}>
						<a
							href="https://www.linkedin.com/in/miguel-agustin-fernandez-aa1596248/"
							target="_black"
						>
							<p className={styles.linkedin}>C</p>
						</a>
						<a
							href="https://portfolio-miguel-fernandez.netlify.app/"
							target="_black"
						>
							<p className={styles.web}>K</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
