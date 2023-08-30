import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { GamePage } from './pages/GamePage';
import { Header } from './components/Header';
import { Container } from '@mui/material';

function App() {
	return (
		<>
			<Header />
			<Container>
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/game/:id' element={<GamePage />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
