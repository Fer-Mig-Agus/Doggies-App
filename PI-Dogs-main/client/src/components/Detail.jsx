import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';

const Detail = () => {

    const {id}=useParams();

    const [dog,setDog]=useState();
    
    const dogSearch=()=>{

    }
  return (
    <div>
        {
            dog.name ? 
            <h1></h1>
        }
      
    </div>
  )
}

export default Detail