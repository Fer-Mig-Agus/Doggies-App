
import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    FILTER_SEARCH_BY_NAME,
    GENERATED_COPY_DOGS,
    FILTER_TEMPERAMENTS,
    FILTER_ORDER,
    FILTER_ORIGEN,
    FILTER_PESO
} from "../redux/actions";

//El estado glogal contiene tres atributos
const initialState = {
    dogs: [],
    copyDogs: [],
    temperaments: [],
}

export default function Reducer(state = initialState, action) {
    switch (action.type) {
        //Guarda toda la informacion en el atributo dogs del estado global
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload
            }
        //Crea una copia del atributo dogs en copydogs
        case GENERATED_COPY_DOGS:
            return {
                ...state,
                copyDogs: state.dogs
            }
        //Guarda todos los temperamentos traidos en el atributo temperaments del estado global
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        //Retorna las razas que se encontraron con ese nombre
        case FILTER_SEARCH_BY_NAME:
            return {
                ...state,
                copyDogs: action.payload
            }
        //Retorna las razas que cumplen con requisito de temperamento
        case FILTER_TEMPERAMENTS:
            if (action.payload !== "Default") {
                return {
                    ...state,
                    copyDogs: state.dogs.filter((dog) => dog.temperaments?.includes(action.payload))
                }
            } else {
                return {
                    ...state,
                    copyDogs: state.dogs
                }
            }


        //Retorna las razas que cumplan con el origen pedido
        case FILTER_ORIGEN:
            if (action.payload !== "Default") {
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
            } else {
                return {
                    ...state,
                    copyDogs: state.dogs
                }
            }
        //Retorna la informacion ordenada alfabeticamente, dependiendo del tipo de ordenamiento
        case FILTER_ORDER:
            if (action.payload != "Default") {
                if (action.payload === "ascendente") {
                    return {
                        ...state,
                        copyDogs: [
                            ...state.copyDogs.sort(function (a, b) {
                                return a.name.localeCompare(b.name)
                            }),
                        ]
                    }
                } else {
                    return {
                        ...state,
                        copyDogs: [
                            ...state.copyDogs.sort(function (a, b) {
                                return b.name.localeCompare(a.name)
                            }),
                        ]
                    }
                }
            } else {
                return {
                    ...state,
                    copyDogs: state.dogs
                }
            }
        //Retorna la informacion ordenada por peso, dependiendo del tipo de ordenamiento
        case FILTER_PESO:
            if (action.payload !== "Default") {

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
            } else {
                return {
                    ...state,
                    copyDogs: state.dogs
                }
            }

        default: return { ...state }

    }
}


//Esta funcion ordena el array recibido por parametro
const ordenarPesoFinalMaximo = (array) => {

    for (let i = 0; i < array.length; i++) {

        var miIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            //Aqui hago un pequeño filtrado de informacion, tomando el mayor de cada elemento
            let pesoDefinitivoJ = 0;
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


