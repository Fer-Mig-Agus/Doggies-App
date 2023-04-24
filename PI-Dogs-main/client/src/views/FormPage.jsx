import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../assets/styles/components/views/FormPage.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ErrorComun from '../components/ErrorComun';
import { getAllTemperamentsIds, getAllTemperaments } from '../redux/actions';
import axios from 'axios';
import { verificarCampos, verificarOrden, validate } from './validateFormPage';

//important: Aqui termina la validacion

const FormPage = () => {
	const mostrandoMensajeError = (error, mensaje) => {
		setAlerta({ error: error, mensaje: mensaje });
		setTimeout(() => {
			setAlerta({});
		}, 2000);
		return;
	};

	const URL_BASE = 'http://localhost:3001';

	const [selectedTemperaments, setSelectedTemperaments] = useState([]);
	const [ids, setIds] = useState([]);

	const dispatch = useDispatch();

	//Trae todos los temperamentos
	const allTemperaments = useSelector((state) => state.temperaments);

	useEffect(() => {
		dispatch(getAllTemperaments());
	}, []);

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

	const allIdsNames = async (arrayNames) => {
		let listTemperament = { listTemperaments: arrayNames };
		const idReturn = await axios.put(
			`${URL_BASE}/dogs/temperaments`,
			listTemperament,
		);
		setIds(idReturn.data);
	};

	useEffect(() => {
		allIdsNames(selectedTemperaments);
	}, [selectedTemperaments]);

	const navigate = useNavigate();

	//important: Fijarme este metodo falta terminar
	async function createDog({
		name,
		image,
		heightMin,
		heightMax,
		weightMin,
		weightMax,
		temperament,
		life_spanMax,
		life_spanMin,
	}) {
		const newDog = {
			name: name,
			image: image,
			height: `${heightMax} - ${heightMin}`,
			weight: `${weightMax} - ${weightMin}`,
			temperament: ids,
			life_span: `${life_spanMax} - ${life_spanMin} years`,
		};

		console.log(newDog)

		await axios
			.post(`${URL_BASE}/dogs`, newDog)
			.then((res) => {
				console.log('creado con exito');
				mostrandoMensajeError(false,"Creado con exito");
				setForm({
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
				//fijarme como borrar los selecionados
				setSelectedTemperaments([]);
				
				
			})
			.catch((error) => {
				
				mostrandoMensajeError(true,"La raza ya existe!");
				
			});

		
	}

	//Esta funcion va escribiendo en tiempo real
	//los atributos del formulario en el estado

	const handleChange = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		setForm({ ...form, [property]: value, temperament: selectedTemperaments });

		setErrors(
			validate(
				{ ...form, [property]: value, temperament: selectedTemperaments },
				errors,
			),
		);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (!verificarCampos(form)) {
			mostrandoMensajeError(true, 'Completa los campos');
			return;
		}

		if (!verificarOrden(form)) {
			mostrandoMensajeError(true, 'Debe ser menor al maximo');
			return;
		}

		createDog(form);
	};

	const [alerta, setAlerta] = useState({});
	const { mensaje, error } = alerta;

	const handleChangeOption = (event) => {
		const selectedTemperament = event.target.value;
		if (event.target.checked) {
			setSelectedTemperaments([...selectedTemperaments, selectedTemperament]);
		} else {
			setSelectedTemperaments(
				selectedTemperaments.filter(
					(temperament) => temperament !== selectedTemperament,
				),
			);
		}
	};

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
					<div className={styles.boxTemperaments}>
						{allTemperaments.map((temperament) => {
							return (
								<div key={temperament}>
									<input
										type="checkbox"
										value={temperament}
										onChange={handleChangeOption}
									/>
									<label value="">{temperament}</label>
								</div>
							);
						})}
					</div>

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

		// <div>
		// 	<div>
		// 		<input type="checkbox" name="" id="" />
		// 		<label htmlFor="">bueno</label>
		// 	</div>
		// 	<div>
		// 		<input type="malo" name="" id="" />
		// 		<label htmlFor="">bueno</label>
		// 	</div>
		// 	<div>
		// 		<input type="quieto" name="" id="" />
		// 		<label htmlFor="">bueno</label>
		// 	</div>
		// 	<div>
		// 		<input type="obediente" name="" id="" />
		// 		<label htmlFor="">bueno</label>
		// 	</div>
		// </div>
	);
};

export default FormPage;
