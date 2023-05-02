import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const CREATE_NEW_DOG ="CREATE_NEW_DOG";
export const GENERATED_COPY_DOGS ="GENERATED_COPY_DOGS";
export const FILTER_SEARCH_BY_NAME = "FILTER_SEARCH_BY_NAME";
export const FILTER_TEMPERAMENTS ="FILTER_TEMPERAMENTS";
export const FILTER_ORIGEN ="FILTER_ORIGEN";
export const FILTER_ORDER ="FILTER_ORDER";
export const FILTER_PESO ="FILTER_PESO";
export const GET_DOG_BY_ID ="GET_DOG_BY_ID";

//Variable con la url base
const URL_BASE = "http://localhost:3001"


//Esta action hace una consulta get al servidor local,
// trayendo toda la informacion de las razas
export const getAllDogs = () => {
    return async function (dispatch) {
        const response = await axios.get(`/dogs`)
        dispatch({ type: GET_ALL_DOGS, payload: response.data })
    }
}

//Esta action crea una copia del estado principal, para poder trabajar sin alterar el original
export const generatedCopyDogs=()=>{
    return { type: GENERATED_COPY_DOGS }
}

//Esta acition hace una consulta get al servidor local,
// trayendo toda la informacion de los temperamentos
export const getAllTemperaments = () => {
    return async function (dispatch) {
        const response = await axios.get(`/temperaments`)
        const allTemperamtsNames=[];
        response.data.map((temp)=> allTemperamtsNames.push(temp.name));
        dispatch({ type: GET_ALL_TEMPERAMENTS, payload: allTemperamtsNames })
    }
}

//Esta action recibe el nombre a buscar
export const filterSearchByName=(name)=>{
        return async function (dispatch) {
            const search = await axios.get(`/dogs/names?name=${name}`);
            dispatch({ type: FILTER_SEARCH_BY_NAME, payload: search.data })
        }
}

//Esta action recibe el tipo de temperamento a filtrar
export const filterTemperaments=(tipo)=>{
    return {type: FILTER_TEMPERAMENTS,payload:tipo}
}

//Esta action recibe el tipo de origen a filtrar
export const filterOrigen=(origen)=>{
    return {type: FILTER_ORIGEN,payload:origen}
}

//Esta action recibe el tipo orden alfabetico a ordenar
export const filterOrden=(orden)=>{
    
    return {type: FILTER_ORDER,payload:orden};
}

//Esta action recibe el tipo de orden por peso a ordenar
export const filterPeso=(peso)=>{
    return {type: FILTER_PESO,payload:peso};
}





