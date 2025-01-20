// Funktion für die Rastergenerierung (mit Linien)
function generateGridAndSVG(dimension, tableData, xMax, yMax, lineData) {
	// console.log('Line Data:', lineData);
	// console.log('Table Data:', tableData);

	const pointDistanceInPixels = 25 / 0.26458;

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
	svg.style.border = '1px solid black';

	const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	border.setAttribute('x', 0);
	border.setAttribute('y', 0);
	border.setAttribute('width', svgWidth);
	border.setAttribute('height', svgHeight);
	border.setAttribute('style', 'stroke:black;stroke-width:1;fill:none;');
	svg.appendChild(border);

	// Linien hinzufügen
	lineData.forEach(({startCoords, endCoords}) => {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const scaleFactorX = svgWidth / xMax;
		const scaleFactorY = svgHeight / yMax;

		line.setAttribute('x1', startCoords.x * scaleFactorX);
		line.setAttribute('y1', svgHeight - startCoords.y * scaleFactorY);
		line.setAttribute('x2', endCoords.x * scaleFactorX);
		line.setAttribute('y2', svgHeight - endCoords.y * scaleFactorY);
		line.setAttribute('style', 'stroke:black;stroke-width:1');
		svg.appendChild(line);
	});
	// console.log('Generating SVG with:', {dimension, tableData, xMax, yMax, lineData});
	return {svg, svgWidth, svgHeight};
}
