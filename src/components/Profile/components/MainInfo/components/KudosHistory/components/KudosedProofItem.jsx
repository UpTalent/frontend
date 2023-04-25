import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sponsorApi } from '../../../../../../../api/sponsorAPI';
import {
	Button,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';

export const KudosedProofItem = ({ id }) => {
	const { sponsorId } = useParams();
	const [isFetching, setIsFetching] = useState(false);
	const [total_pages, setTotalPages] = useState(3);
	const [history, setHistory] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const getHistory = async page => {
		try {
			setIsFetching(true);
			const { data } = await sponsorApi.getKudosedProofHistory(
				sponsorId,
				id,
				page,
			);
			setHistory(prev => [...prev, ...data.content]);
			setTotalPages(data.total_pages);
			setIsFetching(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	const uploadHistory = () => {
		getHistory(currentPage + 1);
		setCurrentPage(prev => prev + 1);
	};

	const formatDate = dateString => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${day.toString().padStart(2, '0')}.${month
			.toString()
			.padStart(2, '0')}.${year} ${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}`;
	};

	useEffect(() => {
		getHistory(0);
	}, []);

	return (
		<>
			<TableContainer sx={{ maxHeight: '400px' }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>KUDOS</TableCell>
							<TableCell>DATE/TIME</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.map((el, id) => (
							<TableRow key={id}>
								<TableCell>{el.kudos}</TableCell>
								<TableCell>{formatDate(el.sent)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{isFetching ? (
					<CircularProgress />
				) : (
					total_pages - 1 !== currentPage && (
						<Button variant='text' onClick={uploadHistory}>
							Load more
						</Button>
					)
				)}
			</TableContainer>
		</>
	);
};
