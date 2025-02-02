function createSVGContainer(dimensions, pointDistance, pointDistanceUnit, dpi, lineWidth) {
	const {pointWidth, pointLength} = dimensions;

	// Standardmäßig geht die Berechnung von px aus
	let conversionFactor = 1;

	// Umrechnung je nach Einheit
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

	// Berechnung der exakten Breite und Höhe in Pixeln
	const svgWidth = pointDistance * (pointWidth - 1) * conversionFactor ;
	const svgHeight = pointDistance * (pointLength - 1) * conversionFactor;

	// console.log(`SVG Container: width=${svgWidth}px, height=${svgHeight}px`);

	// Erstelle das SVG mit expliziten ViewBox-Angaben für eine präzise Skalierung
	let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}px" height="${svgHeight}px" viewBox="0 0 ${svgWidth}px ${svgHeight}px">`;
	svgContent += `</svg>`;

	return svgContent;
}
