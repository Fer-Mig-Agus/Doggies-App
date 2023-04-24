import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Pagination() {
	const users = useSelector((state) => state.users);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('');
	const [showCompleted, setShowCompleted] = useState(false);

	const handlePageChange = (page) => setCurrentPage(page);

	const handleSearch = (event) => {
		
		// Implementar la lógica de búsqueda y actualizar el estado local searchTerm
         event.preventDefault();
					// Obtener el término de búsqueda del estado local searchTerm
					const search = searchTerm.trim().toLowerCase();

					// Filtrar los usuarios según el término de búsqueda
					const filteredUsers = users.filter((user) =>
						user.name.toLowerCase().includes(search),
					);

					// Actualizar estado local de usuarios filtrados y resetear el número de página
					setFilteredUsers(filteredUsers);
					setCurrentPage(1);
	};

	const handleSort = (event) => {
        const value = event.target.value;

				// Clonar la lista de usuarios filtrados
				const sortedUsers = [...filteredUsers];

				// Ordenar los usuarios según el criterio seleccionado
				switch (value) {
					case 'nameAsc':
						sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
						break;
					case 'nameDesc':
						sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
						break;
					case 'emailAsc':
						sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
						break;
					case 'emailDesc':
						sortedUsers.sort((a, b) => b.email.localeCompare(a.email));
						break;
					default:
						break;
				}

				// Actualizar estado local de usuarios ordenados y resetear el número de página
				setSortedUsers(sortedUsers);
				setCurrentPage(1);
		// Implementar la lógica de ordenamiento y actualizar el estado local sortOrder
	};

	const handleFilterCompleted = () => {
		setShowCompleted(!showCompleted);
	};

	const handleReset = () => {
		setCurrentPage(1);
		setSearchTerm('');
		setSortOrder('');
		setShowCompleted(false);
	};

	const handleSortClick = () => {
		if (sortOrder === 'asc') {
			handleSort('desc');
		} else if (sortOrder === 'desc') {
			handleSort('');
		} else {
			handleSort('asc');
		}
	};

	// Implementar lógica de filtrado de usuarios por completado
	let filteredUsersTwo = [];
	if (showCompleted) {
		filteredUsersTwo = users.filter((user) => user.completed);
	} else {
		filteredUsersTwo = users;
	}

	// Implementar lógica de búsqueda de usuarios por nombre
	if (searchTerm) {
		filteredUsers = filteredUsers.filter((user) =>
			user.name.includes(searchTerm),
		);
	}

	// Implementar lógica de ordenamiento de usuarios
	if (sortOrder) {
		filteredUsers.sort((a, b) => {
			if (sortOrder === 'asc') {
				return a.name.localeCompare(b.name);
			} else {
				return b.name.localeCompare(a.name);
			}
		});
	}

	const usersPerPage = 3;
	const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

	const startIndex = (currentPage - 1) * usersPerPage;
	const endIndex = startIndex + usersPerPage;
	const currentUsers = filteredUsers.slice(startIndex, endIndex);
	return (
		<div>
			<h2>Pagination Component</h2>

			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				/>
				<button type="submit">Search</button>
			</form>

			<button onClick={handleSortClick}>
				Sort {sortOrder === 'asc' ? 'A-Z' : sortOrder === 'desc' ? 'Z-A' : ''}
			</button>

			<button onClick={handleFilterCompleted}>
				{showCompleted ? 'Show All' : 'Filter Completed'}
			</button>

			<div>
				{currentUsers.map((user) => (
					<div key={user.id}>
						<p>{user.name}</p>
						<p>{user.email}</p>
						<p>{user.completed ? 'Completed' : 'Not Completed'}</p>
					</div>
				))}

				<div>
					{Array.from(Array(totalPages), (x, index) => index + 1).map(
						(page) => (
							<button key={page} onClick={() => handlePageChange(page)}>
								{page}
							</button>
						),
					)}
				</div>
			</div>

			<button onClick={handleReset}>Reset</button>
		</div>
	);
}

export default Pagination;
