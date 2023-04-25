import React from 'react';
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getAllDogs,
	getAllTemperaments,
	generatedCopyDogs,
} from '../redux/actions';
import AllFilters from '../components/AllFilters';
import styles from '../assets/styles/components/views/HomePage.module.css';
import Pagination from '../components/Pagination';


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
			<AllFilters />
			<h1 className={styles.titleSecond}>List of dog breeds</h1>
			<Pagination />
			{/* <PaginatioTwo /> */}
		</div>
	);
};

export default HomePage;
