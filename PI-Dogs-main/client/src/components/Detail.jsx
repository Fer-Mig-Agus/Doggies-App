import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
			<Link to="/home">
				<h3 className={styles.link}>Volver</h3>
			</Link>

			{dog.name ? <h1>{dog.name}</h1> : <h3>Loading...</h3>}
		</div>
	);
};

export default Detail;
