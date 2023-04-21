import React from 'react'
import Card from "./Card";
import styles from "../assets/styles/components/Cards.module.css";


const Cards = ({allDogs}) => {
    
    	
		console.log("entro al cards")
		console.log("allDogs en cards: ",allDogs)


    const close=(id)=>{
        console.log(id);
    }


  return (
		<div>
			<h1>Lista de todos los Perritos</h1>
			<div className={styles.content}>
				{allDogs.length ? (
					allDogs.map(
						({ id, name, image, temperaments, weight, height, life_span }) => {
							console.log('si entra al map');
							return (
								<Card
									key={id}
									name={name}
									image={image}
									height={height}
									temperaments={temperaments}
									weight={weight}
									life_span={life_span}
									close={close}
								/>
							);
						},
					)
				) : (
					<p>No hay perritos...</p>
				)}
			</div>
		</div>
	);
}

export default Cards
