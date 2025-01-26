function generateTables(dimension) {
	const tableContainer = document.getElementById('generatedTables');
	tableContainer.innerHTML = ''; // Alte Tabellen entfernen

	const xMax = calculateXMaximum(dimension);
	const yMax = calculateYMaximum(dimension);
	const corners = defineCorners(xMax, yMax);

	// Vor der ersten Tabelle die Dimensionen anzeigen
	displayDimensions(dimension, xMax, yMax, tableContainer);

	// Anzahl zusätzlicher Tabellen
	const numberOfTables = calculateTableNumber(dimension);

	// Initiale Tabelle erstellen
	const firstTableData = generateInitialTableData(dimension);

	// Erste Tabelle generieren
	createTable(dimension, firstTableData, tableContainer, 1, xMax, yMax, corners);

	// Zusätzliche Tabellen generieren
	generateTableValues(
		dimension,
		firstTableData,
		numberOfTables,
		tableContainer,
		xMax,
		yMax,
		corners,
		// rotationPattern
	);
}
