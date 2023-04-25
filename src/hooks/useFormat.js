import { useState } from 'react';

export const useFormat = initial => {
	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	const formatNumber = formatter.format(initial);
	const [count, setCount] = useState(formatNumber);
	const [unformated, setUnformated] = useState(initial);

	const updateNumber = num => {
		setCount(formatter.format(num));
		setUnformated(num);
	};
	return [count, updateNumber, unformated];
};
