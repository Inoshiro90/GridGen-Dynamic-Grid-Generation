function generateTables(dimension) {
	const tableContainer = document.getElementById('generatedTables');
	tableContainer.innerHTML = ''; // Alte Tabellen entfernen

	// Anzahl zusätzlicher Tabellen
	const numberOfTables = Math.floor(dimension.pointTotal / 2 - 1);

	// Initiale Tabelle erstellen
	let previousTableData = [];
	for (let i = 1; i <= dimension.pointTotal; i++) {
		let value;
		if (i === dimension.C1) {
			value = dimension.C2;
		} else if (i === dimension.C2) {
			value = dimension.C3;
		} else if (i === dimension.C3) {
			value = dimension.C4;
		} else if (i === dimension.C4) {
			value = dimension.C1;
		} else if (i > dimension.C1 && i < dimension.C2) {
			value = dimension.C4 - (i - dimension.C1);
		} else if (i > dimension.C2 && i < dimension.C3) {
			value = dimension.C4 - (i - dimension.C2);
		} else if (i > dimension.C3 && i < dimension.C4) {
			value = dimension.C4 - (i - dimension.C3);
		} else if (i > dimension.C4) {
			value = dimension.C3 - (i - dimension.C4);
		} else {
			value = 0; // Fallback
		}

		previousTableData.push(value);
	}

	// Erste Tabelle generieren
	createSingleTable(dimension, previousTableData, tableContainer, 1);

	// Zusätzliche Tabellen generieren
	for (let t = 1; t <= numberOfTables; t++) {
		const newTableData = previousTableData.map((value) =>
			value + 1 > dimension.pointTotal ? 1 : value + 1
		);

		createSingleTable(dimension, newTableData, tableContainer, t + 1);
		previousTableData = newTableData; // Neue Tabelle wird zur vorherigen Tabelle
	}
}

// Funktion, um eine einzelne Tabelle zu erstellen
function createSingleTable(dimension, tableData, container, tableNumber) {
	// Tabellenüberschrift als separates Element
	const title = document.createElement('div');
	title.innerText = `Rotation +${tableNumber - 1}`;
	title.style.fontWeight = 'bold';
	title.style.marginBottom = '10px';
	title.style.textAlign = 'left';

	// Tabelle erstellen
	const table = document.createElement('table');
	table.style.borderCollapse = 'collapse';
	table.style.marginBottom = '20px';
	table.style.width = '25%';
	table.style.tableLayout = 'fixed'; // Gleichmäßige Spaltenbreiten

	// Tabellenkopf
	const thead = document.createElement('thead');
	const headerRow = document.createElement('tr');

	const header1 = document.createElement('th');
	header1.innerText = 'Starting point';
	header1.style.textAlign = 'center';
	header1.style.width = '50%'; // 50% der Tabellenbreite
	const header2 = document.createElement('th');
	header2.innerText = 'End point';
	header2.style.textAlign = 'center';
	header2.style.width = '50%'; // 50% der Tabellenbreite

	headerRow.appendChild(header1);
	headerRow.appendChild(header2);
	thead.appendChild(headerRow);
	table.appendChild(thead);

	// Tabellenkörper
	const tbody = document.createElement('tbody');
	for (let i = 1; i <= dimension.pointTotal; i++) {
		const row = document.createElement('tr');

		// Spalte 1
		const cell1 = document.createElement('td');
		cell1.innerText = i;
		cell1.style.border = '1px solid black';
		cell1.style.textAlign = 'center';

		// Spalte 2
		const cell2 = document.createElement('td');
		cell2.innerText = tableData[i - 1];
		cell2.style.border = '1px solid black';
		cell2.style.textAlign = 'center';

		row.appendChild(cell1);
		row.appendChild(cell2);
		tbody.appendChild(row);
	}
	table.appendChild(tbody);

	// Tabelle und Titel in den Container einfügen
	container.appendChild(title);
	container.appendChild(table);
}
