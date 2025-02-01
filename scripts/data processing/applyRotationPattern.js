function applyRotationPattern(dimensions, firstTableValues, rotationPattern) {
	const tables = []; // Sammlung aller generierten Tabellen
	const uniqueTablesSet = new Set(); // Set zur Vermeidung von Duplikaten

	const sideConditions = {
		// bottom: Ecke 1 bis Ecke 2, alles kleiner als Ecke 2
		bottom: (pointStart) =>
			(pointStart =
				dimensions.corner1 &&
				pointStart > dimensions.corner1 &&
				pointStart < dimensions.corner2),

		// right: Ecke 2 bis Ecke 3, alles kleiner als Ecke 3
		right: (pointStart) =>
			(pointStart =
				dimensions.corner2 &&
				pointStart > dimensions.corner2 &&
				pointStart < dimensions.corner3),

		// top: Ecke 3 bis Ecke 4, alles kleiner als Ecke 4
		top: (pointStart) =>
			(pointStart =
				dimensions.corner3 &&
				pointStart > dimensions.corner3 &&
				pointStart < dimensions.corner4),

		// left: Ecke 4 bis pointTotal, alles größer als Ecke 4 aber kleiner oder gleich pointTotal
		left: (pointStart) =>
			pointStart > dimensions.corner4 && pointStart <= dimensions.pointTotal,
	};

	const pointTotal = dimensions.pointTotal; // Maximaler Punktwert

	// Iteriere über alle Rotationsmuster im rotationPattern
	for (let patternIndex = 0; patternIndex < rotationPattern.length; patternIndex++) {
		const pattern = rotationPattern[patternIndex]; // Aktuelles Rotationsmuster
		const maxRotation = Math.min(dimensions.pointWidth, dimensions.pointLength) - 2;

		// Generiere **maxRotation Tabellen** für dieses Muster
		for (let rotationStep = 1; rotationStep <= maxRotation; rotationStep++) {
			const rotatedTable = firstTableValues.map(({pointStart, pointEnd}) => {
				let newPointEnd = pointEnd;

				// Bestimme, auf welcher Seite sich der Startpunkt befindet und rotiere schrittweise
				if (sideConditions.bottom(pointStart) && pattern.bottom !== '0') {
					newPointEnd =
						pattern.bottom === '+'
							? newPointEnd + rotationStep
							: newPointEnd - rotationStep;
				} else if (sideConditions.right(pointStart) && pattern.right !== '0') {
					newPointEnd =
						pattern.right === '+'
							? newPointEnd + rotationStep
							: newPointEnd - rotationStep;
				} else if (sideConditions.top(pointStart) && pattern.top !== '0') {
					newPointEnd =
						pattern.top === '+'
							? newPointEnd + rotationStep
							: newPointEnd - rotationStep;
				} else if (sideConditions.left(pointStart) && pattern.left !== '0') {
					newPointEnd =
						pattern.left === '+'
							? newPointEnd + rotationStep
							: newPointEnd - rotationStep;
				}

				// Prüfen und korrigieren: Grenzen für newPointEnd
				if (newPointEnd > pointTotal) {
					newPointEnd = newPointEnd - pointTotal;
				} else if (newPointEnd < 1) {
					newPointEnd = pointTotal;
				}
				// console.log(pointStart, newPointEnd);
				return {pointStart, pointEnd: newPointEnd};
			});

			// Serialisiere die Tabelle zur Überprüfung auf Duplikate
			const serializedTable = JSON.stringify(rotatedTable);

			// Erstelle eine alternative Serialisierung mit vertauschten Start- und Endpunkten
			const swappedTable = rotatedTable.map(({pointStart, pointEnd}) => ({
				pointStart: pointEnd,
				pointEnd: pointStart,
			}));
			const serializedSwappedTable = JSON.stringify(swappedTable);

			// Prüfe, ob die Original- oder die gespiegelte Tabelle bereits existiert
			if (
				!uniqueTablesSet.has(serializedTable) &&
				!uniqueTablesSet.has(serializedSwappedTable)
			) {
				// console.log(
				// 	`Table with pattern ${JSON.stringify(pattern)}, step ${rotationStep} is unique`
				// );

				// Beide Versionen als gesehen markieren
				uniqueTablesSet.add(serializedTable);
				uniqueTablesSet.add(serializedSwappedTable);

				// Füge die Tabelle zur Sammlung hinzu
				tables.push(rotatedTable);
			} else {
				// console.log(
				// 	`Table with pattern ${JSON.stringify(
				// 		pattern
				// 	)}, step ${rotationStep} is a duplicate`
				// );
			}
		}
	}
	return tables; // Gibt alle generierten Tabellen zurück
}
