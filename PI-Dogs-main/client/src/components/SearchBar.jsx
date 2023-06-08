import React from 'react';
import {useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../assets/styles/components/SearchBar.module.css';
import { filterSearchByName } from '../redux/actions.js';

const SearchBar = () => {

	const dispatch=useDispatch();

	const [search, setSearch] = useState('');

	//para el input
	const handleValue = (event) => {
		setSearch(event.target.value);
	};

	//para el btn cuando hace click
	const handleSearch=(event)=>{
		event.preventDefault();
		
		dispatch(filterSearchByName(search));
	}

	return (
		<div className={styles.content}>
			<input
				placeholder="Search..."
				onChange={handleValue}
				className={styles.input}
				type="text"
			/>
			<button className={styles.buttonSearch} onClick={handleSearch}>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
