
import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    GET_ALL_TEMPERAMENTS_IDS,
    FILTER_SEARCH_BY_NAME,
    GENERATED_COPY_DOGS,
    FILTER_TEMPERAMENTS,
    FILTER_ORIGEN,
    FILTER_ORDER,
    FILTER_PESO
} from "../redux/actions";


const initialState = {
    dogs:[],
    copyDogs:[],
    temperaments:[],
    idsTemperaments:[],
}

export default function Reducer(state = initialState, action) {
    switch(action.type){

        case GET_ALL_DOGS:
            return{
                ...state,
                dogs:action.payload
            }
        case GENERATED_COPY_DOGS: 
        return{
            ...state,
            copyDogs:state.dogs
        }
        case GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments:action.payload
            }
        case FILTER_SEARCH_BY_NAME:
            return{
                ...state,
                copyDogs:action.payload
            }

        case FILTER_TEMPERAMENTS:
           
            return {
                ...state,
                copyDogs: state.copyDogs.filter((dog) => dog.temperaments?.includes(action.payload))
            }
        case FILTER_ORIGEN:
            if(action.payload == "DB"){
                return {
                    ...state,
                    copyDogs: state.dogs.filter((dog)=> isNaN(dog.id))
                }
            }else{
                return {
                    ...state,
                    copyDogs: state.dogs.filter((dog)=> !isNaN(dog.id))
                }
            }
        case FILTER_ORDER:
            if (action.payload === "ascendente"){
                return {
                    ...state,
                    copyDogs: state.copyDogs.sort()
                }
            }else{
                return {
                    ...state,
                    copyDogs:state.copyDogs.sort().reverse()
                }
            }
        case FILTER_PESO:

            const mayorPeso=(pesoUnitario)=>{
                    let maxPeso = "";
                    const pesos = pesoUnitario.split(" - "); // Separamos los dos valores en un array
                    const peso1 = parseInt(pesos[0]); // Convertimos el primer valor a entero
                    const peso2 = parseInt(pesos[1]); // Convertimos el segundo valor a entero
                    peso1 > peso2 ? maxPeso="valor1" : maxPeso="valor2"
                    return maxPeso;
            }

            const orderPorPeso=()=>{
                for(let i=0;i<state.copyDogs.length;i++){
                    mayorPeso(state.copyDogs[i]);
                    
                }
            }

            return{

            }
            
        // case GET_ALL_TEMPERAMENTS_IDS:
        //     return{
        //         ...state,
        //         idsTemperaments:action.payload
        //     }
        default: return{...state}

    }
}


 