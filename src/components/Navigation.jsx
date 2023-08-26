import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
	return (
		<nav>
			<Link to='/'>
				<button>Catalog</button>
			</Link>
		</nav>
	);
}
