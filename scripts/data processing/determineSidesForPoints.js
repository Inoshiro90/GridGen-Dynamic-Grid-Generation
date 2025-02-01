// Bestimmt die Seiten für die Punkte basierend auf den Tabellenwerten.
function determineSidesForPoints(dimensions, tables) {
	const {pointWidth, pointLength, pointTotal, corner1, corner2, corner3, corner4} = dimensions;

	// console.log('tables:', tables);
	// Hilfsfunktion, um die Seite eines Punkts zu bestimmen
	const determineSide = (point) => {
		// console.log('point:', point);
		let side;
		if (point > corner1 && point < corner2) {
			side = 'bottom';
			// console.log(`Side for ${point}:`, side);
			return side; // Untere Seite
		} else if (point > corner2 && point < corner3) {
			side = 'right';
			// console.log(`Side for ${point}:`, side);
			return side; // Rechte Seite
		} else if (point > corner3 && point < corner4) {
			side = 'top';
			// console.log(`Side for ${point}:`, side);
			return side; // Obere Seite
		} else if (point > corner4 && point <= pointTotal) {
			side = 'left';
			// console.log(`Side for ${point}:`, side);
			return side; // Linke Seite
		} else if (point === corner1) {
			side = 'corner';
			// console.log(`Side for ${point}:`, side);
			return side; // Ecke 1
		} else if (point === corner2) {
			side = 'corner';
			// console.log(`Side for ${point}:`, side);
			return side; // Ecke 2
		} else if (point === corner3) {
			side = 'corner';
			// console.log(`Side for ${point}:`, side);
			return side; // Ecke 3
		} else if (point === corner4) {
			side = 'corner';
			return side; // Ecke 4
		} else {
			return console.error('Error: Unknown side for point', point); // Unbekannte Seite
		}
	};

	// Iteriere über alle Tabellen und bestimme die Seiten für jeden Punkt
	return tables.map((table) => {
		return table.map(({pointStart, pointEnd}) => {
			// console.log('pointStart:', pointStart);
			// console.log('pointEnd:', pointEnd);
			const pointStartSide = determineSide(pointStart);
			const pointEndSide = determineSide(pointEnd);
			return {
				pointStart,
				pointStartSide,
				pointEnd,
				pointEndSide,
			};
		});
	});
}
