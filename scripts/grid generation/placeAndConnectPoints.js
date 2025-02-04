function connectPoints(
	svgContainer,
	coordinates,
	pointDistance,
	pointDistanceUnit,
	dpi,
	lineWidth,
	lineColor,
) {
	// Berechnet den Umrechnungsfaktor basierend auf der Einheit
	let conversionFactor;

	switch (pointDistanceUnit) {
		case 'in':
			conversionFactor = dpi;
			break;
		case 'mm':
			conversionFactor = dpi / 25.4;
			break;
		case 'px':
			conversionFactor = 1;
			break;
		default:
			console.error('Unknown unit:', pointDistanceUnit);
	}

	// Konvertiere die Koordinaten in Pixel
	const convertedCoordinates = coordinates.map((table) =>
		table.map(({pointStartCoordinates, pointEndCoordinates}) => ({
			x1: pointStartCoordinates.x * pointDistance * conversionFactor,
			y1: pointStartCoordinates.y * pointDistance * conversionFactor,
			x2: pointEndCoordinates.x * pointDistance * conversionFactor,
			y2: pointEndCoordinates.y * pointDistance * conversionFactor,
		}))
	);

	// Berechne die Ecken des Rasters (die äußeren Koordinaten)
	const minX = Math.min(...convertedCoordinates.flat().map(({x1}) => x1));
	const minY = Math.min(...convertedCoordinates.flat().map(({y1}) => y1));
	const maxX = Math.max(...convertedCoordinates.flat().map(({x2}) => x2));
	const maxY = Math.max(...convertedCoordinates.flat().map(({y2}) => y2));

	// Füge das Raster (die Linien zwischen den Punkten) hinzu
	let svgLines = convertedCoordinates
		.flat()
		.map(
			({x1, y1, x2, y2}) =>
				`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${lineColor}" stroke-width="${lineWidth}pt"/>`
		)
		.join('');

		const updatedSvg = svgContainer.replace('</svg>', svgLines + '</svg>');

	// console.log('svgLines:', svgLines);
	// console.log('borderLines:', borderLines);

	return updatedSvg;
}
