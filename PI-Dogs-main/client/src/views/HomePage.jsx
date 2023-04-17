import React from 'react'
import SearchBar from "../components/SearchBar";
import Cards from '../components/Cards';
import styles from "../assets/styles/components/views/HomePage.module.css";

const HomePage = () => {

  // Funcion para buscar por el nombre
  const searchFuntion=(name)=>{
      console.log(name)
  }
  
  // Funcion que trae a todos los dogs que existen
  const allDogs=()=>{
    console.log("todos los perros")
  }

  //Trae todos los temperamentos
  const allTemperaments=["hola","como"];


  return (
		<div className={styles.content}>
			<h1>home page</h1>
			<div>
				<select name="" id="">
					<option value="">Default</option>
					<option value="">Creados</option>
					<option value="">Originales</option>
				</select>

				<select name="" id="">
					<option value="">Default</option>
					<option value="">A-Z</option>
					<option value="">Z-A</option>
				</select>

				<div>
					<label htmlFor="">Min:</label>
					<input type="text" name="" id="" placeholder="Minimo" />
					<label htmlFor="">Máx:</label>
					<input type="text" name="" id="" placeholder="Maximo" />
				</div>

				<select name="" id="">
					<option value="">Default</option>
					{allTemperaments.map((temperament) => {
						return <option>{temperament}</option>;
					})}
				</select>
			</div>

			<SearchBar searchFuntion={searchFuntion} />

			<Cards allDogs={allDogs} />
		</div>
	);
}

export default HomePage;
