import React from 'react'
import Card from "./Card";
import styles from "../assets/styles/components/Cards.module.css";


const Cards = ({allDogs}) => {
    
  return (
		<div>
			<div className={styles.content}>
				{allDogs.length ? (
					allDogs.map(
						({ id, name, image, temperaments, weight, height, life_span }) => {
							return (
								<Card
									key={id}
									id={id}
									name={name}
									image={image}
									height={height}
									temperaments={temperaments}
									weight={weight}
									life_span={life_span}
									

								/>
							);
						},
					)
				) : (
					<h2 className={styles.sinPerritos}>No puppies...</h2>
				)}
			</div>
		</div>
	);
}

export default Cards
