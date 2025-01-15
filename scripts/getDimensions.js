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

	// console.log('Width:' + ' ' + dimension.pointWidth);
	// console.log('Length:' + ' ' + dimension.pointLength);
	// console.log('Points total:' + ' ' + dimension.pointTotal);
	// console.log('Corner 1:' + ' ' + dimension.C1);
	// console.log('Corner 2:' + ' ' + dimension.C2);
	// console.log('Corner 3:' + ' ' + dimension.C3);
	// console.log('Corner 4:' + ' ' + dimension.C4);
	// console.log('Maximum rotations:' + ' ' + dimension.rotationMax);

	return dimension;
}
