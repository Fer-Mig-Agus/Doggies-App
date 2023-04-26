import React from 'react';
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
	

	//funcion para filtrar por el tipo de temperamento
	const handleChangeTemperament = (event) => {
		const value = event.target.value;
		console.log("entro en la cosulta del temperamentos")
		dispatch(filterTemperaments(value));
	};

	//funcion para filtrar por el origen (BDD / API)
	const handleChangeOrigen = (event) => {
		const value = event.target.value;
		let origen = '';
		value === 'Creados' ? (origen = 'DB') : (origen = 'API');
		dispatch(filterOrigen(origen));
	};

	//funcion para ordenar alfabeticamente en orden Ascendente de Descendente
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
	//funcion para recargar la pagina cuando precione restaurar
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
						<option value="Default">Select</option>
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
						<option value="Default">Select</option>
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
						<option value="Default">Select</option>
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
						<option value="Default">Select</option>
						{allTemperaments.map((temperament) => {
							return <option key={temperament}>{temperament}</option>;
						})}
					</select>
				</div>
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
