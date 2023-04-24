
import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    GET_ALL_TEMPERAMENTS_IDS,
    FILTER_SEARCH_BY_NAME,
    GENERATED_COPY_DOGS,
    FILTER_TEMPERAMENTS,
    FILTER_ORDER,
    FILTER_ORIGEN,
    FILTER_PESO
} from "../redux/actions";


const initialState = {
    dogs: [],
    copyDogs: [],
    temperaments: [],
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        case GENERATED_COPY_DOGS:
            return {
                ...state,
                copyDogs: state.dogs
            }
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_SEARCH_BY_NAME:
            return {
                ...state,
                copyDogs: action.payload
            }

        case FILTER_TEMPERAMENTS:

            return {
                ...state,
                copyDogs: state.dogs.filter((dog) => dog.temperaments?.includes(action.payload))
            }
        case FILTER_ORIGEN:

            if (action.payload == "DB") {
                return {
                    ...state,
                    copyDogs: state.dogs.filter((dog) => isNaN(dog.id))
                }
            } else {
                return {
                    ...state,
                    copyDogs: state.dogs.filter((dog) => !isNaN(dog.id))
                }
            }
        case FILTER_ORDER:
            return {
                ...state,
                copyDogs:
                    action.payload === "ascendente"
                        ? [
                            ...state.copyDogs.sort(function (a, b) {
                                return a.name.localeCompare(b.name)
                            }),
                        ]
                        : [
                            ...state.copyDogs.sort(function (a, b) {
                                return b.name.localeCompare(a.name)
                            }),
                        ],
            };
        case FILTER_PESO:
            if (action.payload === "maximo") {
                return {
                    ...state,
                    copyDogs: ordenarPesoFinalMaximo([...state.copyDogs])
                }
            } else {
                return {
                    ...state,
                    copyDogs: ordenarPesoFinalMinimo([...state.copyDogs])
                }
            }

        default: return { ...state }

    }
}

const ordenarPesoFinalMaximo=(array)=>{

    for (let i = 0; i < array.length; i++) {

        var miIndex = i;

        for (let j = i + 1; j < array.length; j++) {

            let pesoDefinitivoJ=0;
            const pesosdeJ = array[j].weight.split(" - ");
            const peso1deJ = parseInt(pesosdeJ[0]);
            const peso2deJ = parseInt(pesosdeJ[1]);
            peso1deJ > peso2deJ ? pesoDefinitivoJ = peso1deJ : pesoDefinitivoJ = peso2deJ;

            let pesoDefinitivoI = 0;
            const pesosdeI = array[miIndex].weight.split(" - "); 
            const peso1deI = parseInt(pesosdeI[0]); 
            const peso2deI = parseInt(pesosdeI[1]); 
            peso1deI > peso2deI ? pesoDefinitivoI = peso1deI : pesoDefinitivoI = peso2deI;

            

            if (pesoDefinitivoJ < pesoDefinitivoI) miIndex = j;
        }
        var aux = array[i];
        array[i] = array[miIndex];
        array[miIndex] = aux;
    }

    
    return array;
    
}


const ordenarPesoFinalMinimo = (array) => {

    for (let i = 0; i < array.length; i++) {

        var miIndex = i;

        for (let j = i + 1; j < array.length; j++) {

            let pesoDefinitivoJ = 0;
            const pesosdeJ = array[j].weight.split(" - ");
            const peso1deJ = parseInt(pesosdeJ[0]);
            const peso2deJ = parseInt(pesosdeJ[1]);
            peso1deJ < peso2deJ ? pesoDefinitivoJ = peso1deJ : pesoDefinitivoJ = peso2deJ;

            let pesoDefinitivoI = 0;
            const pesosdeI = array[miIndex].weight.split(" - ");
            const peso1deI = parseInt(pesosdeI[0]);
            const peso2deI = parseInt(pesosdeI[1]);
            peso1deI < peso2deI ? pesoDefinitivoI = peso1deI : pesoDefinitivoI = peso2deI;



            if (pesoDefinitivoJ < pesoDefinitivoI) miIndex = j;
        }

        var aux = array[i];
        array[i] = array[miIndex];
        array[miIndex] = aux;
    }


    return array;

}


