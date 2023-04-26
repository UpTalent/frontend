export const formatNumber = number => {
	const formatter = Intl.NumberFormat('en', { notation: 'compact' });
	const formated = formatter.format(number);

	return formated;
};
