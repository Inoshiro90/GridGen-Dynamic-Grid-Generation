function calculateTableNumber(dimension) {
	const numberOfTables =
		dimension.pointWidth < dimension.pointLength
			? dimension.pointWidth + 1
			: dimension.pointLength + 1;
	return numberOfTables;
}
