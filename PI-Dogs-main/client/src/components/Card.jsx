import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/Card.module.css';

const Card = ({
	id,
	name,
	image,
	temperaments,
	weight,
}) => {

	

	
	return (
		<div className={styles.content}>
			<div className={styles.contentImage}>
				<img className={styles.imageCard} src={image} alt={name} title={name} />
			</div>
			<div className={styles.contentText}>
				<Link to={`/detail/${id}`} className={styles.link}>
					<h3 className={styles.item}>
						<span className={styles.spanList}>Name: </span>
						<br />
						{name}
					</h3>
				</Link>
				<p className={styles.temperamentList}>
					<span className={styles.spanList}>Temperamentos: </span>
					{temperaments}
				</p>
				;
				<p className={styles.pesoList}>
					{' '}
					<span className={styles.spanList}>Peso: </span>
					{weight}
				</p>
			</div>
		</div>
	);
};

export default Card;
