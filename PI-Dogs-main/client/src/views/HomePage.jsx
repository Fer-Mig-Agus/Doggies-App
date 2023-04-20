import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import Cards from '../components/Cards';
import { getAllDogs, getAllTemperaments } from '../redux/actions';
import AllFilters from '../components/AllFilters';
import styles from '../assets/styles/components/views/HomePage.module.css';
import Pagination from '../components/Pagination';

const HomePage = () => {

	
	return (
		<div className={styles.content}>
			<h1>home page</h1>
			<AllFilters />
			<Pagination />
			
		</div>
	);
};

export default HomePage;
