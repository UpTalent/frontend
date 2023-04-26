import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const useFormat = initial => {
	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	const formatNumber = formatter.format(initial);
	const [count, setCount] = useState(formatNumber);
	const [unformated, setUnformated] = useState(initial);

	const updateNumber = useCallback(
		num => {
			setCount(formatter.format(num));
			setUnformated(num);
		},
		[formatter],
	);

	useEffect(() => {
		updateNumber(initial);
	}, [initial, updateNumber]);

	return [count, updateNumber, unformated];
};
