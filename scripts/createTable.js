function createTable(dimension, firstTableData, container, tableNumber, xMax, yMax, corners) {
	// Titel erstellen
	const title = createTableTitle(tableNumber);

	// Tabelle erstellen
	const table = document.createElement('table');
	table.style.borderCollapse = 'collapse';
	table.style.marginBottom = '20px';
	table.style.width = '100%';
	table.style.tableLayout = 'fixed';

	// Tabellenkopf erstellen
	const thead = createTableHeader();
	table.appendChild(thead);

	// Tabellenkörper erstellen
	const lineData = [];
	const tbody = createTableBody(dimension, firstTableData, xMax, yMax, lineData);
	table.appendChild(tbody);

	// Raster und SVG erstellen
	const {svg} = generateGridAndSVG(dimension, firstTableData, xMax, yMax, lineData);

	// Download-Buttons erstellen
	const downloadButtons = generateDownloadButtons(svg, tableNumber, dimension);

	// Elemente zum Container hinzufügen
	container.appendChild(title);
	  // Prüfen, ob die Checkbox aktiviert ist
	  const checkboxTable = document.getElementById('checkbox-table');
	  if (checkboxTable.checked) {
		// Tabelle nur hinzufügen, wenn die Checkbox ausgewählt ist
		container.appendChild(table);
	  }
	container.appendChild(svg);
	downloadButtons.forEach((button) => container.appendChild(button));
}