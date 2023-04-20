import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from "./SearchBar";
import { getAllDogs, getAllTemperaments } from '../redux/actions';
import styles from "../assets/styles/components/AllFilters.module.css";

const AllFilters = () => {
	//Trae todos los temperamentos
	const allTemperaments = useSelector((state) => state.temperaments);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getAllTemperaments());
	}, []);

	// Funcion para buscar por el nombre
	const searchFuntion = (name) => {
		console.log(name);
	};


	const resetAll = () => {
		alert('volviendo...');
	};

	return (
		<div>
			<div>
				<div>
					<h3>Personajes:</h3>
					<select name="" id="">
						<option value="">Default</option>
						<option value="">Creados</option>
						<option value="">Originales</option>
					</select>
				</div>

				<div>
					<h3>Orden:</h3>
					<select name="" id="">
						<option value="">Default</option>
						<option value="">A-Z</option>
						<option value="">Z-A</option>
					</select>
				</div>
				<div>
					<h3>Peso:</h3>
					<select name="" id="">
						<option value="">Default</option>
						<option value="">Máximo</option>
						<option value="">Minimo</option>
					</select>
				</div>
				<div>
					<h3>Temperamentos:</h3>
					<select name="" id="">
						<option value="">Default</option>
						{allTemperaments.map((temperament) => {
							return <option>{temperament}</option>;
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
			<div>
				<SearchBar searchFuntion={searchFuntion} />
			</div>
		</div>
	);
}

export default AllFilters
