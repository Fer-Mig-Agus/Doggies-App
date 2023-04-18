import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';
import FormPage from "./FormPage";
import styles from '../assets/styles/components/views/HomePage.module.css';

const HomePage = () => {
	// Funcion para buscar por el nombre
	const searchFuntion = (name) => {
		console.log(name);
	};

	// Funcion que trae a todos los dogs que existen
	const allDogs = () => {
		console.log('todos los perros');
	};

	//Trae todos los temperamentos
	const allTemperaments = ['hola', 'como'];

	return (
		<div className={styles.content}>
			<h1>home page</h1>
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

					<Link to="/form">
						<button>Crear</button>
					</Link>
				</div>
				<div>
					<SearchBar searchFuntion={searchFuntion} />
				</div>
			</div>

			<Cards allDogs={allDogs} />
		</div>
	);
};

export default HomePage;
