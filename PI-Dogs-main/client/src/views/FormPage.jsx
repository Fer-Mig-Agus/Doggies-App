import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../assets/styles/components/views/FormPage.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorComun from '../components/ErrorComun';
import axios from 'axios';

//important: Aqui esta la validacion de los campos
function validate(state, errorsState) {
	const errors = { ...errorsState };

	//document: validacion name
	if (!state.name) errors.name = 'Nombre Vacio';
	else if (state.name.length > 30) errors.name = 'Supera los 35 caracteres';
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

//important: Aqui termina la validacion

const FormPage = () => {
	//Creo el estado para el formulario
	const [form, setForm] = useState({
		name: '',
		image: '',
		heightMin: '',
		heightMax: '',
		weightMin: '',
		weightMax: '',
		temperament: '',
		life_spanMin: '',
		life_spanMax: '',
	});

	//Creo un formulario para los errores
	const [errors, setErrors] = useState({
		name: '',
		image: '',
		heightMin: '',
		heightMax: '',
		weightMin: '',
		weightMax: '',
		life_spanMin: '',
		life_spanMax: '',
	});

	const navigate = useNavigate();

	const URL_BASE = 'http://localhost:3001';

	async function createDog({
		name,
		image,
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		temperament,
		life_span,
	}) {
		console.log('crearlo luego');
		// console.log(email);
		// console.log(password);
		// await axios
		// 	.get(`${URL_BASE}/login?email=${email}&password=${password}`)
		// 	.then((res) => {
		// 		console.log('entro...');
		// 		console.log(res);
		// 		dispatch(setAccess(true));
		// 		navigate('/home');
		// 	})
		// 	.catch((error) => {
		// 		console.log('dio error');
		// 		console.log(error);
		// 		dispatch(setAccess(false));
		// 		setAlerta({ error: true, mensaje: 'Correo o Contraseña incorrecta' });
		// 		setTimeout(() => {
		// 			setAlerta({});
		// 		}, 2000);
		// 	});
	}

	//Esta funcion va escribiendo en tiempo real
	//los atributos del formulario en el estado

	const handleChangeOption = (event) => {
		setForm({...form,temperament:event.target.value})
	};
	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;
	
		setForm({ ...form, [property]: value });

		setErrors(validate({ ...form, [property]: value }, errors));
	};

	const verificarCampos = ({
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
		console.log(temperament);
		if (!name || name === '') return false;
		if (!image || image === '') return false;
		if (!heightMin || heightMin === '') return false;
		if (!heightMax || heightMax === '') return false;
		if (!weightMin || weightMin === '') return false;
		if (!weightMax || weightMax === '') return false;
		if (!temperament || temperament === '') return false;
		if (!life_spanMin || life_spanMin === '') return false;
		if (!life_spanMax || life_spanMax === '') return false;
		return true;
	};

	const verificarOrden = ({
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
	const submitHandler = (event) => {
		event.preventDefault();
		if (!verificarCampos(form)) {
			setAlerta({ error: true, mensaje: 'Completa los campos' });
			setTimeout(() => {
				setAlerta({});
			}, 2000);
			return;
		}
		if (!verificarOrden(form)) {
			setAlerta({ error: true, mensaje: 'Debe ser menor al maximo' });
			setTimeout(() => {
				setAlerta({});
			}, 2000);
			return;
		}

		createDog(form);
	};

	const [alerta, setAlerta] = useState({});
	const { mensaje, error } = alerta;

	//Trae todos los temperamentos
	const allTemperaments = ['hola', 'como'];

	//  name,
	// 	image,
	// 	heightMin,
	// 	heightMax,
	// 	weightMin,
	// 	weightMax,
	// 	temperament,
	// 	life_span;

	return (
		<div>
			{mensaje && <ErrorComun mensaje={mensaje} style={error} />}

			<form className={styles.form} onSubmit={submitHandler}>
				<div className={styles.name}>
					<label className={styles.label} htmlFor="name">
						Nombre:
					</label>
					<input
						placeholder="Name aqui...."
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						className={`${errors.name ? styles.error : styles.success}  ${
							styles.input
						}`}
					/>
					<span className={styles.errorSpan}>{errors.name}</span>
				</div>
				<div className={styles.image}>
					<label className={styles.label} htmlFor="image">
						Imagen:
					</label>
					<input
						placeholder="Image url...."
						type="text"
						name="image"
						value={form.image}
						onChange={handleChange}
						className={`${errors.image ? styles.error : styles.success}  ${
							styles.input
						}`}
					/>
					<span className={styles.errorSpan}>{errors.image}</span>
				</div>
				<div className={styles.heightMax}>
					<label className={styles.label} htmlFor="heightMax">
						Altura Max:
					</label>
					<input
						placeholder="Height Max aqui...."
						type="text"
						name="heightMax"
						value={form.heightMax}
						onChange={handleChange}
						className={`${errors.heightMax ? styles.error : styles.success}  ${
							styles.input
						}`}
					/>
					<span className={styles.errorSpan}>{errors.heightMax}</span>
				</div>
				<div className={styles.heightMin}>
					<label className={styles.label} htmlFor="heightMin">
						Altura Min:
					</label>
					<input
						placeholder="Height Min aqui...."
						type="text"
						name="heightMin"
						value={form.heightMin}
						onChange={handleChange}
						className={`${errors.heightMin ? styles.error : styles.success}  ${
							styles.input
						}`}
					/>
					<span className={styles.errorSpan}>{errors.heightMin}</span>
				</div>
				<div className={styles.weightMax}>
					<label className={styles.label} htmlFor="weightMax">
						Peso Max:
					</label>
					<input
						placeholder="Weight Max aqui...."
						type="text"
						name="weightMax"
						value={form.weightMax}
						onChange={handleChange}
						className={`${errors.weightMax ? styles.error : styles.success}  ${
							styles.input
						}`}
					/>
					<span className={styles.errorSpan}>{errors.weightMax}</span>
				</div>
				<div className={styles.weightMin}>
					<label className={styles.label} htmlFor="weightMin">
						Peso Min:
					</label>
					<input
						placeholder="Weight Min aqui...."
						type="text"
						name="weightMin"
						value={form.weightMin}
						onChange={handleChange}
						className={`${errors.weightMin ? styles.error : styles.success}  ${
							styles.input
						}`}
					/>
					<span className={styles.errorSpan}>{errors.weightMin}</span>
				</div>
				<div className={styles.temperament}>
					<label className={styles.label} htmlFor="temperament">
						Temperament:
					</label>
					<select name="" id="" onClick={handleChangeOption}>
						<option value="">Default</option>
						{allTemperaments.map((temperament) => {
							return <option>{temperament}</option>;
						})}
					</select>
					{/* <input
						placeholder="Temperament aqui...."
						type="text"
						name="temperament"
						value={form.temperament}
						onChange={handleChange}
						className={`${
							errors.temperament ? styles.error : styles.success
						}  ${styles.input}`}
					/> */}
					<span className={styles.errorSpan}>{errors.temperament}</span>
				</div>
				<div className={styles.life_spanMax}>
					<label className={styles.label} htmlFor="life_spanMax">
						Tiempo de vida Max:
					</label>
					<input
						placeholder="Tiempo de vida max aqui...."
						type="text"
						name="life_spanMax"
						value={form.life_spanMax}
						onChange={handleChange}
						className={`${
							errors.life_spanMax ? styles.error : styles.success
						}  ${styles.input}`}
					/>
					<span className={styles.errorSpan}>{errors.life_spanMax}</span>
				</div>
				<div className={styles.life_spanMin}>
					<label className={styles.label} htmlFor="life_spanMin">
						Tiempo de vida Min:
					</label>
					<input
						placeholder="Tiempo de vida min aqui...."
						type="text"
						name="life_spanMin"
						value={form.life_spanMin}
						onChange={handleChange}
						className={`${
							errors.life_spanMin ? styles.error : styles.success
						}  ${styles.input}`}
					/>
					<span className={styles.errorSpan}>{errors.life_spanMin}</span>
				</div>

				<button className={styles.button} type="submit">
					Create Dog
				</button>
				<Link to="/home">
					<h3 className={styles.registrado}>Quieres regresar?</h3>
				</Link>
			</form>
		</div>
	);
};

export default FormPage;
