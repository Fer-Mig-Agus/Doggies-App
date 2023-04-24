import React from 'react';
import { Link } from 'react-router-dom';
import Detail from './Detail';
import styles from '../assets/styles/components/Card.module.css';

const Card = ({
	id,
	name,
	image,
	temperaments,
	weight,
	height,
	life_span,
	close,
}) => {

	

	
	return (
		<div className={styles.content}>
			<div className={styles.contentImage}>
				<img src={image} alt={name} title={id} />
			</div>
			{/* <button
				className={styles.button}
				onClick={() => {
					close(id);
				}}
			>
				X
			</button> */}
			<Link to={`/detail/${id}`}>
				
				<h3>Name:<br />{name}</h3>
			</Link>
			<h4>Temperamentos: {temperaments}</h4>;
			<h5>Tiempo de vida: {life_span}</h5>
			<p>Peso: {weight}</p>
			<p>Altura: {height}</p>
		</div>
	);
};

export default Card;
