
import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_ALL_TEMPERAMENTS_IDS } from "../redux/actions";


const initialState = {
    dogs:[],
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
        case GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments:action.payload
            }
        // case GET_ALL_TEMPERAMENTS_IDS:
        //     return{
        //         ...state,
        //         idsTemperaments:action.payload
        //     }
        default: return{...state}

    }
}