import { ResultType } from '@remix-run/router/dist/utils';
import { all } from 'axios';
import React from 'react'
import { useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from "../assets/styles/components/Pagination.module.css";
import {getAllDogs} from "../redux/actions";
import Cards from "./Cards";

const Pagination = () => {

	const allDogs=useSelector(state=>state.dogs);

	const [currentPage,setCurrentPage]=useState(1);
	const [itemsPerPage, setItemPerPage] = useState(8);

	const pages=[];

	for(let i=1;i <= Math.ceil(allDogs.length/itemsPerPage);i++){
		pages.push(i);
	}

	const indexOfLastItem=currentPage*itemsPerPage;
	const indexOfFirstItem=indexOfLastItem-itemsPerPage;
	const currentItems= allDogs.slice(indexOfFirstItem,indexOfLastItem);

	const renderPageNumbers=pages.map(number=>{
		return(
			<li key={number} id={number}>
				{number}
			</li>
		);
	})

	console.log("esta en la paginacion")
	console.log("allDogs en pagination: ", allDogs);

	


    
	// // Funcion que trae a todos los dogs que existen
	// const allDogs = () => {
	// 	console.log('todos los perros');
	// };

	return (
		<div>
			Esta es la paginacion
			<ul className="pageNumbers">{renderPageNumbers}</ul>
			<Cards allDogs={currentItems} />
		</div>
	);
}

export default Pagination;
