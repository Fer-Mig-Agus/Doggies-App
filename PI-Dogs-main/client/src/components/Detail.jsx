import React from 'react';
import { useParams, Link,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/components/Detail.module.css';
import ErrorComun from './ErrorComun';
import axios from 'axios';

const Detail = () => {
  
	const mostrandoMensajeError = (error, mensaje) => {
		setAlerta({ error: error, mensaje: mensaje });
		setTimeout(() => {
			setAlerta({});
		}, 2000);
		return;
	};

	const navigate = useNavigate();

	const [dog, setDog] = useState({});
	const { id } = useParams();

	const [alerta, setAlerta] = useState({});
	const { mensaje, error } = alerta;

	

	useEffect(() => {
		axios
			.get(`http://localhost:3001/dogs/${id}`)
			.then((response) => {
        console.log(response.data.name);
				response.data.name
					? setDog(response.data)
					: mostrandoMensajeError(true, 'No esta el ID');
			})
			//.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			{mensaje && <ErrorComun mensaje={mensaje} style={error} />}

			{dog.name ? (
				<div className={styles.content}>
					<div className={styles.contentSecondary}>
						<div className={styles.contentImage}>
							<img className={styles.imageDog} src={dog.image} alt={dog.name} />
						</div>
						<div>
							<button
								onClick={() => {
									navigate('/home');
								}}
								className={styles.buttonCreate}
							>
								Go back
							</button>
							<h3>
								Name:
								<span>{dog.name}</span>
							</h3>
							<h3>
								Temperaments:
								<span>{dog.temperaments}</span>
							</h3>
							<h3>
								Height:
								<span>{dog.height}</span>
							</h3>
							<h3>
								Weight:
								<span>{dog.weight}</span>
							</h3>
							<h3>
								Time of life:
								<span> {dog.life_span}</span>
							</h3>
						</div>
					</div>
				</div>
			) : (
				<h3>Loading...</h3>
			)}
		</div>
	);
};

export default Detail;
