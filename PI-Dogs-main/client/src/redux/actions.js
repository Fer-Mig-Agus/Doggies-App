import axios from 'axios';

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const CREATE_NEW_DOG ="CREATE_NEW_DOG";
//export const GET_ALL_TEMPERAMENTS_IDS ="GET_ALL_TEMPERAMENTS_IDS";

const URL_BASE = "http://localhost:3001"

export const getAllDogs = () => {
    return async function (dispatch) {
        const response = await axios.get(`${URL_BASE}/dogs`)
        dispatch({ type: GET_ALL_DOGS, payload: response.data })
    }
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





// export const getAllTemperamentsIds = (listTemperaments) => {
//     return async function (dispatch) {
//         const idReturn = await axios.get(`${URL_BASE}/dogs/temperaments`, listTemperaments);
//         console.log("desde actions: ", idReturn.data)
//         dispatch({ type: GET_ALL_TEMPERAMENTS_IDS, payload: idReturn.data })
//     }
// }





