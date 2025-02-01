// Erstellt die Werte für die erste Tabelle (ohne Rotation)
function generateFirstTableValues(dimensions) {
	// Initialisierung der Tabelle
	const firstTableValues = [];

	// Iterieren über alle Punkte
	for (let i = 1; i <= dimensions.pointTotal; i++) {
		let valuePointEnd;

		// Bestimmung des Endpunkts (pointEnd) basierend auf Kontrollpunkten
		if (i === dimensions.corner1) {
			valuePointEnd = dimensions.corner2;
		} else if (i === dimensions.corner2) {
			valuePointEnd = dimensions.corner3;
		} else if (i === dimensions.corner3) {
			valuePointEnd = dimensions.corner4;
		} else if (i === dimensions.corner4) {
			valuePointEnd = dimensions.corner1;
		}
		// Wenn i zwischen zwei Kontrollpunkten liegt
		else if (i > dimensions.corner1 && i < dimensions.corner2) {
			// Zwischen corner1 und corner2 (untere Kante, rückwärts von corner4)
			valuePointEnd = dimensions.corner4 - (i - dimensions.corner1);
		} else if (i > dimensions.corner2 && i < dimensions.corner3) {
			// Zwischen corner2 und corner3 (rechte Kante, rückwärts vom maximalen Punktwert)
			valuePointEnd = dimensions.pointTotal + 1 - (i - dimensions.corner2);
		} else if (i > dimensions.corner3 && i < dimensions.corner4) {
			// Zwischen corner3 und corner4 (obere Kante, rückwärts von corner2)
			valuePointEnd = dimensions.corner2 - (i - dimensions.corner3);
		} else {
			// Zwischen corner4 und corner1 (linke Kante, rückwärts von corner3)
			valuePointEnd = dimensions.corner3 - (i - dimensions.corner4);
		}

		// Hinzufügen von Start-End-Paaren zur Tabelle
		firstTableValues.push({
			pointStart: i,
			pointEnd: valuePointEnd,
		});
	}
	// console.log('firstTableValues:', firstTableValues);
	// Rückgabe der fertigen Tabelle
	return firstTableValues;
}
