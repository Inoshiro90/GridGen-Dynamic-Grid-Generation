// Funktion zur Bestimmung der Seite eines Punktes
function determineSide(point, dimension) {
	if (
		point === dimension.C1 ||
		point === dimension.C2 ||
		point === dimension.C3 ||
		point === dimension.C4
	)
		return 'corner';
	if (point > dimension.C1 && point < dimension.C2) return 'bottom';
	if (point > dimension.C2 && point < dimension.C3) return 'right';
	if (point > dimension.C3 && point < dimension.C4) return 'top';
	return 'left';
}
