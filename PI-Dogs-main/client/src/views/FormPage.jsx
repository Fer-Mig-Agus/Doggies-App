import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../assets/styles/components/views/FormPage.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComun from '../components/ErrorComun';
import {getAllTemperaments } from '../redux/actions';
import axios from 'axios';
import { verificarCampos, verificarOrden, validate } from '../utils/validateFormPage';

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
				mostrandoMensajeError(false,"Creado con exito");
				window.location.reload();	
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
			mostrandoMensajeError(true, 'Completa los campos!');
			return;
		}
		if (selectedTemperaments.length === 0){
			mostrandoMensajeError(true, 'Elija al menos un temperamento!');
			return;
		}
			if (!verificarOrden(form)) {
				mostrandoMensajeError(true, 'Debe ser menor al maximo!');
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
	}

	return (
		<div className={styles.content}>
			{mensaje && <ErrorComun mensaje={mensaje} style={error} />}
			<h1 className={styles.titleMain}>
				<span>T</span> Create you new breed <span>T</span>
			</h1>

			<form className={styles.form} onSubmit={submitHandler}>
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="name">
						Name:
					</label>
					<input
						placeholder="Name here..."
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
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="image">
						Image:
					</label>
					<input
						placeholder="Image url here..."
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
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="heightMax">
						Weight Max:
					</label>
					<input
						placeholder="Height Max here..."
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
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="heightMin">
						Weight Min:
					</label>
					<input
						placeholder="Height Min here..."
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
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="weightMax">
						Height Max:
					</label>
					<input
						placeholder="Weight Max here..."
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
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="weightMin">
						Height Min:
					</label>
					<input
						placeholder="Weight Min here..."
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
					<label className={styles.labelTemperaments} htmlFor="temperament">
						Temperaments:
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
									<label value="" className={styles.itemTemperament}>
										{temperament}
									</label>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="life_spanMax">
						Time of life Max:
					</label>
					<input
						placeholder="Time of life max here..."
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
				<div className={styles.boxContentInputs}>
					<label className={styles.label} htmlFor="life_spanMin">
						Time of life Min:
					</label>
					<input
						placeholder="Time of life min here ..."
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

				<button className={styles.buttonCreate} type="submit">
					Create new breed
				</button>
			</form>
			<Link to="/home" className={styles.link}>
				<h3 className={styles.item}>Quieres regresar?</h3>
			</Link>
		</div>
	);
};

export default FormPage;
