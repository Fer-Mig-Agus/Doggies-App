import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';
import {
	getAllDogs,
	getAllTemperaments,
	generatedCopyDogs,
} from '../redux/actions';
import AllFilters from '../components/AllFilters';
import styles from '../assets/styles/components/views/HomePage.module.css';
import Pagination from '../components/Pagination';
import PaginatioTwo from '../components/PaginationTwo';

const HomePage = () => {
	const stateGlobal = useSelector((state) => state.dogs);
	const dispatch = useDispatch();

	

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getAllTemperaments());
	}, []);

	useEffect(() => {
		dispatch(generatedCopyDogs());
	}, [stateGlobal]);

	return (
		<div className={styles.content}>
			<h1 className={styles.titleMain}>
				Bienvenido estas son todas la razas disponibles
			</h1>
			<AllFilters />
			<h1 className={styles.titleSecond}>Lista de todos los Perritos</h1>
			<Pagination />
			{/* <PaginatioTwo /> */}
		</div>
	);
};

export default HomePage;
