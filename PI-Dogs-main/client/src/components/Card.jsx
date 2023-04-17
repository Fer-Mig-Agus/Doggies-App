import React from 'react';
import { Link } from 'react-router-dom';
import Detail from './Detail';
import styles from '../assets/styles/components/Card.module.css';

const Card = ({ id, name, image, temperament, weight, close }) => {
	return (
		<div>
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
			<Link to={`/detail/${id}`}>
				<h3>{name}</h3>
			</Link>
			<h4>{temperament}</h4>
			<p>{weight}</p>
		</div>
	);
};

export default Card;
