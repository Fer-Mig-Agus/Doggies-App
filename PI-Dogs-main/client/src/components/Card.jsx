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
			<div>
				<img src={image} alt={name} title={id} />
			</div>
			<button
				className={styles.button}
				onClick={() => {
					close(id);
				}}
			>
				X
			</button>
			<Link to={`/detail/:${id}`}>
				<h3>{name}</h3>
			</Link>

			 <h4>{temperaments}</h4>;

			<h5>{life_span}</h5>
			<p>{weight}</p>
			<p>{height}</p>
		</div>
	);
};

export default Card;
