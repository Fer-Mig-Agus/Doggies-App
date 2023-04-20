import React from 'react'
import styles from "../assets/styles/components/Pagination.module.css";
import Cards from "./Cards";

const Pagination = () => {
    
	// Funcion que trae a todos los dogs que existen
	const allDogs = () => {
		console.log('todos los perros');
	};

	return (
		<div>
			Esta es la paginacion
			<Cards allDogs={allDogs} />
		</div>
	);
}

export default Pagination
