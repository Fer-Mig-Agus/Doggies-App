import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/styles/components/Pagination.module.css';
import { getAllDogs } from '../redux/actions';
import Cards from './Cards';

const Pagination = () => {


	const allDogs = useSelector((state) => state.copyDogs);

	console.log(typeof allDogs);

	// useEffect(()=>{
		
	// },[allDogs])

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemPerPage] = useState(8);
	const [pageNumerLimit, setPageNumerLimit] = useState(8);
	const [maxPageNumerLimit, setMaxPageNumerLimit] = useState(8);
	const [minPageNumerLimit, setMinPageNumerLimit] = useState(0);

	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	const pages = [];

	for (let i = 1; i <= Math.ceil(allDogs.length / itemsPerPage); i++) {
		pages.push(i);
	}

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = allDogs.slice(indexOfFirstItem, indexOfLastItem);

	const renderPageNumbers = pages.map((number) => {
		if (number < maxPageNumerLimit + 1 && number > minPageNumerLimit) {
			return (
				<li
					key={number}
					id={number}
					onClick={handleClick}
					className={currentPage == number ? styles.active : null}
				>
					{number}
				</li>
			);
		}else{
			return null
		}
	});

	const handleNextBtn=()=>{
		setCurrentPage(currentPage+1);
		if(currentPage+1 > maxPageNumerLimit){
			setMaxPageNumerLimit(maxPageNumerLimit+pageNumerLimit);
			setMinPageNumerLimit(minPageNumerLimit+pageNumerLimit)
		}
	}

	const handlePrevBtn=()=>{
		setCurrentPage(currentPage - 1);
		if ((currentPage - 1)%pageNumerLimit == 0) {
			setMaxPageNumerLimit(maxPageNumerLimit - pageNumerLimit);
			setMinPageNumerLimit(minPageNumerLimit - pageNumerLimit);
		}
	}



	// // Funcion que trae a todos los dogs que existen
	// const allDogs = () => {
	// 	console.log('todos los perros');
	// };

	let pageIncrementBtn=null;
	if(pages.length > maxPageNumerLimit){
		pageIncrementBtn= <li onClick={handleNextBtn}>&hellip;</li>
	}
	let pageDecrementBtn = null;
	if (minPageNumerLimit >= 1) {
		pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>;
	}

	return (
		<div>
			
			<ul className={styles.pageNumbers}>
				<li>
					<button
						onClick={handlePrevBtn}
						className={styles.buttonPagination}
						disabled={currentPage == pages[0] ? true : false}
					>
						Prev
					</button>
				</li>
				{pageDecrementBtn}
				{renderPageNumbers}
				{pageIncrementBtn}
				<li>
					<button
						onClick={handleNextBtn}
						className={styles.buttonPagination}
						disabled={currentPage == pages[pages.length - 1] ? true : false}
					>
						Next
					</button>
				</li>
			</ul>
			<Cards allDogs={currentItems} />
		</div>
	);
};

export default Pagination;
