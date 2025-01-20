function getDimensions() {
	let dimension = {};
	dimension.pointWidth = parseInt(document.getElementById('input-field-point-width').value, 10);
	dimension.pointLength = parseInt(document.getElementById('input-field-point-length').value, 10);
	dimension.pointTotal = 2 * dimension.pointWidth + 2 * dimension.pointLength - 4;
	dimension.C1 = 1;
	dimension.C2 = dimension.pointWidth;
	dimension.C3 = dimension.pointWidth + dimension.pointLength - 1;
	dimension.C4 = dimension.C3 + dimension.pointWidth - 1;
	dimension.rotationMax = dimension.pointTotal / 2 - 1;
	return dimension;
}
