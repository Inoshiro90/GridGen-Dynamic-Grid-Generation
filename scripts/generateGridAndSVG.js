function generateGridAndSVG(dimension, tableData, xMax, yMax, lineData) {
	// Eingabefelder und Dropdown abrufen
	const lineWidthInput = document.getElementById('input-field-line-width');
	const lineWidth = lineWidthInput.value; // Wert des Inputs
	const cellSizeInput = document.getElementById('input-field-cell-size');
	const unitDropdown = document.getElementById('cell-size-unit-dropdown');

	// Cell Size und Einheit
	const cellSize = parseFloat(cellSizeInput.value);
	const unit = unitDropdown.value;

	// Punktabstand in Pixel basierend auf der Einheit berechnen (300 dpi)
	const mmToPixels = 100 / 25.4; // 1 mm ≈ 11.811 Pixels
	const inchToPixels = 100; // 1 inch = 300 Pixels
	const pixel = 1;
	const pointDistanceInPixels =
		cellSize * (unit === 'mm' ? mmToPixels : unit === 'inch' ? inchToPixels : pixel);

	// SVG für Linien
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	let svgWidth, svgHeight;

	if (xMax > yMax) {
		svgWidth = xMax * pointDistanceInPixels;
		svgHeight = (svgWidth * yMax) / xMax;
	} else {
		svgHeight = yMax * pointDistanceInPixels;
		svgWidth = (svgHeight * xMax) / yMax;
	}

	svg.setAttribute('width', svgWidth);
	svg.setAttribute('height', svgHeight);
	svg.style.border = `${lineWidth * 0.75}px solid black`;

	// Erstelle den SVG-Rahmen
	const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	border.setAttribute('x', 0);
	border.setAttribute('y', 0);
	border.setAttribute('width', svgWidth);
	border.setAttribute('height', svgHeight);
	border.setAttribute(
		'style',
		`stroke:black;stroke-width: ${
			lineWidth * 0.75
		}px; border-style: solid; border-width: 1pt; fill:none;`
	);
	svg.appendChild(border);

	// Füge Linien hinzu
	lineData.forEach(({startCoords, endCoords}) => {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const scaleFactorX = svgWidth / xMax;
		const scaleFactorY = svgHeight / yMax;

		line.setAttribute('x1', startCoords.x * scaleFactorX);
		line.setAttribute('y1', svgHeight - startCoords.y * scaleFactorY);
		line.setAttribute('x2', endCoords.x * scaleFactorX);
		line.setAttribute('y2', svgHeight - endCoords.y * scaleFactorY);
		line.setAttribute('style', `stroke:black;stroke-width:${lineWidth * 0.75}px;`);
		svg.appendChild(line);
	});

	// Gib das SVG-Element und seine Maße zurück
	return {svg, svgWidth, svgHeight};
}
