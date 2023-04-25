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
	generatedCopyDogs,
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

	const resetAll = (event) => {
		event.preventDefault();
		window.location.reload();
	};

	return (
		<div className={styles.contentMain}>
			<div className={styles.contentButtonFilters}>
				<div>
					<h3 className={styles.typesFilter}>Origin:</h3>
					<select
						className={styles.selectedFilters}
						name=""
						id=""
						onChange={handleChangeOrigen}
					>
						<option value="Default">Default</option>
						<option value="Creados">Created</option>
						<option value="Originales">Original</option>
					</select>
				</div>

				<div>
					<h3 className={styles.typesFilter}>Order:</h3>
					<select
						className={styles.selectedFilters}
						name=""
						id=""
						onChange={handleChangeOrden}
					>
						<option value="Default">Default</option>
						<option value="A-Z">A-Z</option>
						<option value="Z-A">Z-A</option>
					</select>
				</div>
				<div>
					<h3 className={styles.typesFilter}>Weight:</h3>
					<select
						className={styles.selectedFilters}
						name=""
						id=""
						onChange={handleChangePeso}
					>
						<option value="">Default</option>
						<option value="Máximo">Maximum</option>
						<option value="Minimo">Minimum</option>
					</select>
				</div>
				<div className={styles.contentFilterTemperaments}>
					<h3 className={styles.typesFilter}>Temperaments:</h3>
					<select
						name=""
						id=""
						className={styles.selectedFilters}
						onChange={handleChangeTemperament}
					>
						<option value="">Default</option>
						{allTemperaments.map((temperament) => {
							return <option key={temperament}>{temperament}</option>;
						})}
					</select>
				</div>
				{/* importo el boton para restaurar */}
				{/* <button className={styles.buttonReset} onClick={resetAll}>
					<svg
						class="svg-icon"
						fill="none"
						height="20"
						viewBox="0 0 20 20"
						width="20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g stroke="#ff342b" stroke-linecap="round" stroke-width="1.5">
							<path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
							<path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
						</g>
					</svg>
					<span className={styles.resetText}>Restore</span>
				</button> */}
				<button
					className={styles.buttonCreate}
					type="button"
					onClick={resetAll}
				>
					Restore
				</button>
				<Link to="/form">
					<button className={styles.buttonCreate}>Create</button>
				</Link>
			</div>
			<div className={styles.searchBar}>
				<SearchBar />
			</div>
		</div>
	);
};

export default AllFilters;
