// Konvertiert die Tabellenwerte in tatsächliche Koordinaten für die SVG-Elemente.
function calculateCoordinates(dimensions, tables) {
	const {pointWidth, pointLength, maxX, maxY, corner1, corner2, corner3, corner4} = dimensions;
	// console.log(
	// 	`pointWidth: ${pointWidth}, pointLength: ${pointLength}, maxX: ${maxX}, maxY: ${maxY}, corner1: ${corner1}, corner2: ${corner2} corner3: ${corner3}, corner4: ${corner4}`
	// );

	// Bestimme die Seiten für alle Punkte in den Tabellen
	const tablesWithSides = determineSidesForPoints(dimensions, tables);
	// console.log('tablesWithSides:', tablesWithSides);
	// Iteriere über alle Tabellen und berechne die Koordinaten für jeden Punkt
	return tablesWithSides.map((table) => {
		return table.map(({pointStart, pointStartSide, pointEnd, pointEndSide}) => {
			let pointStartCoordinates = {x: 0, y: 0};
			let pointEndCoordinates = {x: 0, y: 0};

			// Berechne die Koordinaten für pointStart
			switch (pointStartSide) {
				case 'bottom':
					pointStartCoordinates = {x: pointStart - 1, y: 0};
					break;
				case 'right':
					pointStartCoordinates = {x: maxX, y: pointStart - pointWidth};
					break;
				case 'top':
					pointStartCoordinates = {
						x: maxX - 1 - (pointStart - (pointWidth + pointLength)),
						y: maxY,
					};
					break;
				case 'left':
					pointStartCoordinates = {x: 0, y: maxY - (pointStart - corner4)};
					break;
				case 'corner':
					if (pointStart === corner1) pointStartCoordinates = {x: 0, y: 0};
					if (pointStart === corner2) pointStartCoordinates = {x: maxX, y: 0};
					if (pointStart === corner3) pointStartCoordinates = {x: maxX, y: maxY};
					if (pointStart === corner4) pointStartCoordinates = {x: 0, y: maxY};
					break;
				default:
					console.error('Unknown side for sideStart:', pointStartSide);
			}

			// Berechne die Koordinaten für pointEnd
			switch (pointEndSide) {
				case 'bottom':
					pointEndCoordinates = {x: pointEnd - 1, y: 0};
					break;
				case 'right':
					pointEndCoordinates = {x: maxX, y: pointEnd - pointWidth};
					break;
				case 'top':
					pointEndCoordinates = {
						x: maxX - (pointEnd - (pointWidth + pointLength)) - 1,
						y: maxY,
					};
					break;
				case 'left':
					pointEndCoordinates = {x: 0, y: maxY - (pointEnd - corner4)};
					break;
				case 'corner':
					if (pointEnd === corner1) pointEndCoordinates = {x: 0, y: 0};
					if (pointEnd === corner2) pointEndCoordinates = {x: maxX, y: 0};
					if (pointEnd === corner3) pointEndCoordinates = {x: maxX, y: maxY};
					if (pointEnd === corner4) pointEndCoordinates = {x: 0, y: maxY};
					break;
				default:
					console.error('Unknown side for sideEnd:', pointEndSide);
			}

			// console.log(
			// 	'pointStart:',
			// 	pointStart,
			// 	'pointStartCoordinates.x:',
			// 	pointStartCoordinates.x,
			// 	'pointStartCoordinates.y:',
			// 	pointStartCoordinates.y,
			// 	'pointEnd:',
			// 	pointEnd,
			// 	'pointEndCoordinates.x:',
			// 	pointEndCoordinates.x,
			// 	'pointEndCoordinates.y:',
			// 	pointEndCoordinates.y
			// );

			// Rückgabe der neuen Tabelle mit den berechneten Koordinaten
			return {
				pointStart,
				pointStartCoordinates,
				pointEnd,
				pointEndCoordinates,
			};
		});
	});
}
