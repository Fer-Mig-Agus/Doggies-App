//important: Aqui esta la validacion de los campos
export  function validate(state, errorsState) {
    
    const errors = { ...errorsState };

    //document: validacion name
    if (!state.name) errors.name = 'Nombre Vacio';
    else if (!isNaN(state.name)) errors.name = 'No debe ser un numero';
    else if (state.name.length > 30) errors.name = 'Supera los 30 caracteres';
    else errors.name = '';

    //document: validacion image
    if (!state.image) errors.image = 'Imagen Vacio';
    else if (
        !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
            state.image,
        )
    )
        errors.image = 'URL no valida (falta http/https)';
    else errors.image = '';

    //document: validacion altura max
    if (!state.heightMax) errors.heightMax = 'Altura maxima Vacio';
    else if (isNaN(state.heightMax)) errors.heightMax = 'Debe ser un numero';
    else errors.heightMax = '';
    //document: validacion altura min
    if (!state.heightMin) errors.heightMin = 'Altura minima Vacio';
    else if (isNaN(state.heightMin)) errors.heightMin = 'Debe ser un numero';
    else if (
        state.heightMax &&
        parseInt(state.heightMax) <= parseInt(state.heightMin)
    )
        errors.heightMin = 'Debe ser menor al maximo';
    else errors.heightMin = '';

    //document: validacion peso max
    if (!state.weightMax) errors.weightMax = 'Peso minimo Vacio';
    else if (isNaN(state.weightMax)) errors.weightMax = 'Debe ser un numero';
    else errors.weightMax = '';
    //document: validacion peso min
    if (!state.weightMin) errors.weightMin = 'Peso minimo Vacio';
    else if (isNaN(state.weightMin)) errors.weightMin = 'Debe ser un numero';
    else if (
        state.weightMax &&
        parseInt(state.weightMax) <= parseInt(state.weightMin)
    )
        errors.weightMin = 'Debe ser menor al maximo';
    else errors.weightMin = '';

    //document: validacion años de vida max
    if (!state.life_spanMax) errors.life_spanMax = 'Años de vida maximo Vacio';
    else if (isNaN(state.life_spanMax))
        errors.life_spanMax = 'Debe ser un numero';
    else errors.life_spanMax = '';
    //document: validacion años de vida min
    if (!state.life_spanMin) errors.life_spanMin = 'Años de vida minimo Vacio';
    else if (isNaN(state.life_spanMin))
        errors.life_spanMin = 'Debe ser un numero';
    else if (
        state.life_spanMax &&
        parseInt(state.life_spanMax) <= parseInt(state.life_spanMin)
    )
        errors.life_spanMin = 'Debe ser menor al maximo';
    else errors.life_spanMin = '';

    return errors;
}

export const verificarCampos = ({
    name,
    image,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    temperament,
    life_spanMin,
    life_spanMax,
}) => {
    if (!name || name === '' || !isNaN(name)) return false;
    if (!image || image === '') return false;
    if (!heightMin || heightMin === '') return false;
    if (!heightMax || heightMax === '') return false;
    if (!weightMin || weightMin === '') return false;
    if (!weightMax || weightMax === '') return false;
   // if (!temperament || temperament.length === 0) return false;
    if (!life_spanMin || life_spanMin === '') return false;
    if (!life_spanMax || life_spanMax === '') return false;
    return true;
};

export const verificarOrden = ({
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    life_spanMin,
    life_spanMax,
}) => {
    if (parseInt(life_spanMax) <= parseInt(life_spanMin)) return false;
    if (parseInt(heightMax) <= parseInt(heightMin)) return false;
    if (parseInt(weightMax) <= parseInt(weightMin)) return false;
    return true;
};


// module.exports={
//     verificarCampos,
//     verificarOrden,
//     validate
// }