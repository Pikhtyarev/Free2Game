import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGames } from '../../store/actions/gamesActions';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { generateQueryString } from '../../utils/queryString';

const categoriesArray = [
	'mmorpg',
	'shooter',
	'strategy',
	'moba',
	'racing',
	'sports',
	'social',
	'sandbox',
	'open-world',
	'survival',
	'pvp',
	'pve',
	'pixel',
	'voxel',
	'zombie',
	'turn-based',
	'first-person',
	'third-Person',
	'top-down',
	'tank',
	'space',
	'sailing',
	'side-scroller',
	'superhero',
	'permadeath',
	'card',
	'battle-royale',
	'mmo',
	'mmofps',
	'mmotps',
	'3d',
	'2d',
	'anime',
	'fantasy',
	'sci-fi',
	'fighting',
	'action-rpg',
	'action',
	'military',
	'martial-arts',
	'flight',
	'low-spec',
	'tower-defense',
	'horror',
	'mmorts'
];

const sortArray = ['relevance', 'popularity', 'alphabetical', 'release-date'];

export const SelectFilter = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [category, setCategory] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [platform, setPlatform] = useState('');

	useEffect(() => {
		const handleApplyFilters = () => {
			const queryParams = new URLSearchParams();
			if (platform) {
				queryParams.append('platform', platform);
			}
			if (sortBy) {
				queryParams.append('sort-by', sortBy);
			}
			if (category) {
				queryParams.append('category', category);
			}

			navigate(generateQueryString(queryParams));
			dispatch(fetchGames(platform, category, sortBy));
		};

		handleApplyFilters();
	}, [category, sortBy, platform, dispatch, navigate]);

	// MUI
	const selectPaperStyles = {
		style: {
			maxHeight: '200px',
			boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
			borderRadius: '5px',
			backgroundColor: '#3e4d3f'
		}
	};
	const formControlStyles = {
		backgroundColor: 'primary_second.main',
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
		borderRadius: '5px'
	};

	return (
		<Stack sx={{ mb: 4 }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, md: 4 }}>
			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id='genre'>Genre</InputLabel>
				<Select
					labelId='genre'
					value={category}
					label='Genre'
					MenuProps={{
						PaperProps: selectPaperStyles
					}}
					onChange={(e) => setCategory(e.target.value)}>
					<MenuItem value=''>all genres</MenuItem>
					{categoriesArray.map((c) => (
						<MenuItem key={c} value={c}>
							<Typography>{c}</Typography>
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id='sortBy'>Sort by</InputLabel>
				<Select
					labelId='sortBy'
					value={sortBy}
					label='Sort by'
					MenuProps={{
						PaperProps: selectPaperStyles
					}}
					onChange={(e) => setSortBy(e.target.value)}>
					{sortArray.map((s) => (
						<MenuItem key={s} value={s}>
							<Typography>{s}</Typography>
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl fullWidth sx={formControlStyles}>
				<InputLabel id='platform'>Platform</InputLabel>
				<Select
					labelId='platform'
					value={platform}
					label='Platform'
					MenuProps={{
						PaperProps: selectPaperStyles
					}}
					onChange={(e) => setPlatform(e.target.value)}>
					<MenuItem value=''>
						<Typography>all platforms</Typography>
					</MenuItem>
					<MenuItem value='pc'>
						<Typography>pc</Typography>
					</MenuItem>
					<MenuItem value='browser'>
						<Typography>browser</Typography>
					</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	);
};
