import React from 'react'
import Card from "./Card";


const Cards = ({allDogs}) => {
    	
		

    const close=(id)=>{
        console.log(id);
    }


  return (
		<div>
			<h1>Lista de todos los Perritos</h1>
			{allDogs.lenght ? allDogs.map(({id,name,image,temperament,weight})=>{
                return <Card key={id} name={name} image={image} temperament={temperament} weight={weight} close={close}/>
            }) : <p>No hay perritos...</p>}
		</div>
	);
}

export default Cards
