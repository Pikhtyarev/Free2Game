import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { GamePage } from './pages/GamePage';
import { Navigation } from './components/Navigation';

function App() {
	// async function getGames() {
	// 	try {
	// 		const response = await axios.get('/api/games');
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.log('error');
	// 	}
	// }

	// getGames();

	return (
		<>
			<Navigation />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/:id' element={<GamePage />} />
			</Routes>
		</>
	);
}

export default App;
