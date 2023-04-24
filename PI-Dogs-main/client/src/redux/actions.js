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
//export const GET_ALL_TEMPERAMENTS_IDS ="GET_ALL_TEMPERAMENTS_IDS";

const URL_BASE = "http://localhost:3001"



export const getAllDogs = () => {
    return async function (dispatch) {
        const response = await axios.get(`${URL_BASE}/dogs`)
        dispatch({ type: GET_ALL_DOGS, payload: response.data })
    }
}

export const generatedCopyDogs=()=>{
    return { type: GENERATED_COPY_DOGS }
}


export const getAllTemperaments = () => {
    return async function (dispatch) {
        const response = await axios.get(`${URL_BASE}/temperaments`)
        const allTemperamtsNames=[];
        response.data.map((temp)=> allTemperamtsNames.push(temp.name));
        dispatch({ type: GET_ALL_TEMPERAMENTS, payload: allTemperamtsNames })
    }
}


export const createNewDog=(newDog)=>{
    return async function(){
        const create=await axios.post(`${URL_BASE}/dogs`,newDog);
        return create.data
    }
}

export const filterSearchByName=(name)=>{
        return async function (dispatch) {
            const search = await axios.get(`${URL_BASE}/dogs/names?name=${name}`);
            dispatch({ type: FILTER_SEARCH_BY_NAME, payload: search.data })
        }
}


export const filterTemperaments=(tipo)=>{
    return {type: FILTER_TEMPERAMENTS,payload:tipo}
}

export const filterOrigen=(origen)=>{
    return {type: FILTER_ORIGEN,payload:origen}
}

export const filterOrden=(orden)=>{
    
    return {type: FILTER_ORDER,payload:orden};
}

export const filterPeso=(peso)=>{
    return {type: FILTER_PESO,payload:peso};
}




// export const getAllTemperamentsIds = (listTemperaments) => {
//     return async function (dispatch) {
//         const idReturn = await axios.get(`${URL_BASE}/dogs/temperaments`, listTemperaments);
//         console.log("desde actions: ", idReturn.data)
//         dispatch({ type: GET_ALL_TEMPERAMENTS_IDS, payload: idReturn.data })
//     }
// }





