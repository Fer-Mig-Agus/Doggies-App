import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import {
	filterTemperaments,
	filterOrigen,
	filterOrden,
	filterPeso,
} from '../redux/actions';
import styles from '../assets/styles/components/AllFilters.module.css';

const AllFilters = () => {
	const dispatch = useDispatch();

	//Trae todos los temperamentos
	const allTemperaments = useSelector((state) => state.temperaments);

	//funtion para filtrar por el tipo de temperamento
	const handleChangeTemperament = (event) => {
		const value = event.target.value;
		dispatch(filterTemperaments(value));
	};

	//function para filtrar por el origen (BDD / API)
	const handleChangeOrigen = (event) => {
		const value = event.target.value;

		let origen = '';
		value === 'Creados' ? (origen = 'DB') : (origen = 'API');
		dispatch(filterOrigen(origen));
	};

	//function para ordenar alfabeticamente en orden Ascendente de Descendente
	const handleChangeOrden = (event) => {
		const value = event.target.value;

		let orden = '';
		value === 'A-Z' ? (orden = 'ascendente') : (orden = 'descendente');
		dispatch(filterOrden(orden));
	};

	//funcion para ordenar por el peso
	const handleChangePeso = (event) => {
		const value = event.target.value;

		let orden = '';
		value === 'Máximo' ? (orden = 'maximo') : (orden = 'minimo');
		dispatch(filterPeso(orden));
	};

	const resetAll = () => {
		alert('volviendo...');
	};

	return (
		<div className={styles.contentMain}>
			<div className={styles.contentButtonFilters}>
				<div>
					<h3>Personajes:</h3>
					<select name="" id="" onChange={handleChangeOrigen}>
						<option value="">Default</option>
						<option value="Creados">Creados</option>
						<option value="Originales">Originales</option>
					</select>
				</div>

				<div>
					<h3>Orden:</h3>
					<select name="" id="" onChange={handleChangeOrden}>
						<option value="">Default</option>
						<option value="A-Z">A-Z</option>
						<option value="Z-A">Z-A</option>
					</select>
				</div>
				<div>
					<h3>Peso:</h3>
					<select name="" id="" onChange={handleChangePeso}>
						<option value="">Default</option>
						<option value="Máximo">Máximo</option>
						<option value="Minimo">Minimo</option>
					</select>
				</div>
				<div className={styles.contentFilterTemperaments}>
					<h3>Temperamentos:</h3>
					<select
						name=""
						id=""
						className={styles.selectTemperaments}
						onChange={handleChangeTemperament}
					>
						<option value="">Default</option>
						{allTemperaments.map((temperament) => {
							return <option key={temperament}>{temperament}</option>;
						})}
					</select>
				</div>
				<button
					className={styles.button}
					type="button"
					onClick={() => resetAll()}
				>
					Restaurar
				</button>
				<Link to="/form">
					<button>Crear</button>
				</Link>
			</div>
			<div className={styles.searchBar}>
				<SearchBar />
			</div>
		</div>
	);
};

export default AllFilters;
