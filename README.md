# Proyecto Individual - Henry Dogs
---
![PI Dogs ](https://github.com/Fer-Mig-Agus/PI-DOGS/assets/98432911/6f0317cb-0e13-43fd-9101-e2b217cfeb93)

---
---

## Objetivos del proyecto
Crear una aplicación web donde se puedan encontrar distintos tipos de razas de perros 🐶, utilizando una [API externa](https://api.thedogapi.com/v1/breeds).
Y a partir de ella poder:

* Buscar razas
* Filtrar las razas por:
  * Temperamentos
  * Peso
  * Nombre
* Ordenarlos
* Filtrar por razas creadas manualmente o de la API
* Crear una raza propia

---
---

## Requisitos para ejecutarla localmente ✔️✔️
1. Intala PostgreSQL
2. Crea una BDD llamada dogs
3. Dentro de `./api` crea una archivo .env con sus credenciales como se muestra a continuacion
```
URL_BASE= https://api.thedogapi.com
APY_KEY= tu api key
DB_USER= tu nombre de usuario de postgresql
DB_PASSWORD= tu contraseña de posgresql
DB_HOST=localhost
DB_PORT= el puerto elejido por lo general es: 5432
BDD=dogs
DB_DIALECT=postgres
```
Reemplaza: `API_KEY` , `DB_USER` , `DB_PASSWORD` , `DB_PORT` con tus datos.

---
---

## Instalación  ✔️✔️
Utilice el administrador de paquetes `npm` para instalar. Recuerda usar este comando en cada una de las carpetas, es decir en `./api` y `./client`

`
npm install
`

---
---

## Ejecutar local  ✔️✔️

* Frontend dentro de `./client`

`
npm start
`

* Backend dentro de `./api`

`
npm run dev
`

---
---

# Espero que lo disfruten... 😊 ☺️

---

