function generateTables(dimension) {
	const tableContainer = document.getElementById('generatedTables');
	tableContainer.innerHTML = ''; // Alte Tabellen entfernen

	// Vor der ersten Tabelle die Dimensionen anzeigen
	displayDimensions(dimension, tableContainer);

	// Anzahl zusätzlicher Tabellen
	const numberOfTables = Math.floor(dimension.pointTotal / 2 - 1);

	// Initiale Tabelle erstellen
	let firstTableData = [];
	for (let i = 1; i <= dimension.pointTotal; i++) {
		let value;

		// Excel-Formel als Logik umgesetzt
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
			value = dimension.pointTotal + 1 - (i - dimension.C2);
		} else if (i > dimension.C3 && i < dimension.C4) {
			value = dimension.C2 - (i - dimension.C3);
		} else {
			value = dimension.C3 - (i - dimension.C4);
		}

		firstTableData.push(value);
	}

	// Erste Tabelle generieren
	createSingleTable(dimension, firstTableData, tableContainer, 1);

	// Zusätzliche Tabellen generieren
	for (let t = 1; t <= numberOfTables; t++) {
		const newTableData = firstTableData.map((value, index) => {
			let newValue = value + t;

			// Wenn der Wert den maximalen Punktwert überschreitet
			if (newValue > dimension.pointTotal) {
				newValue = newValue % dimension.pointTotal;
			}

			// Neue Logik: Wenn Startpunkt = Endpunkt
			if (newValue === index + 1) {
				newValue += dimension.pointTotal / 2;
				if (newValue > dimension.pointTotal) {
					newValue = newValue - dimension.pointTotal;
				}
			}

			return newValue;
		});

		createSingleTable(dimension, newTableData, tableContainer, t + 1);
	}
}

// Funktion, um die Dimensionen anzuzeigen
function displayDimensions(dimension, container) {
	const dimensionContainer = document.createElement('div');
	dimensionContainer.style.marginBottom = '20px';

	// Breite, Länge, Gesamtanzahl der Punkte, Ecken und Maximale Rotation anzeigen
	dimensionContainer.innerHTML = `
		<p><strong> Width:</strong> ${dimension.pointWidth}</p>
		<p><strong> Length:</strong> ${dimension.pointLength}</p>
		<p><strong>Points Total:</strong> ${dimension.pointTotal}</p>
		<p><strong>Corner 1:</strong> ${dimension.C1}</p>
		<p><strong>Corner 2:</strong> ${dimension.C2}</p>
		<p><strong>Corner 3:</strong> ${dimension.C3}</p>
		<p><strong>Corner 4:</strong> ${dimension.C4}</p>
		<p><strong>Rotation maximum:</strong> ${Math.floor(dimension.pointTotal / 2 - 1)}</p>
	`;

	// Die Dimensionen im Container vor der Tabelle anzeigen
	container.appendChild(dimensionContainer);
}

// Funktion, um eine einzelne Tabelle zu erstellen
function createSingleTable(dimension, tableData, container, tableNumber) {
	// Tabellenüberschrift als separates Element
	const title = document.createElement('div');
	title.innerHTML = `<h3>Rotation +${tableNumber - 1}</h3>`;
	title.style.fontWeight = 'bold';
	title.style.marginBottom = '10px';
	title.style.textAlign = 'left';

	// Tabelle erstellen
	const table = document.createElement('table');
	table.style.borderCollapse = 'collapse';
	table.style.marginBottom = '20px';
	table.style.width = '100%';
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

		// Spalte 1 (Starting point)
		const cell1 = document.createElement('td');
		cell1.innerText = i;
		cell1.style.border = '1px solid black';
		cell1.style.textAlign = 'center';

		// Spalte 2 (End point)
		const cell2 = document.createElement('td');
		cell2.innerText = tableData[i - 1];
		cell2.style.border = '1px solid black';
		cell2.style.textAlign = 'center';

		// Zellen einfärben je nach Wert für cell1
		cell1.style.backgroundColor = getCellColor(i, dimension);

		// Zellen einfärben je nach Wert für cell2
		cell2.style.backgroundColor = getCellColor(tableData[i - 1], dimension);

		row.appendChild(cell1);
		row.appendChild(cell2);
		tbody.appendChild(row);
	}
	table.appendChild(tbody);

	// Tabelle und Titel in den Container einfügen
	container.appendChild(title);
	container.appendChild(table);
}

// Hilfsfunktion zur Farbzuweisung für jede Zelle
function getCellColor(value, dimension) {
	if (value === dimension.C1) {
		return '#c0392b'; // =C1
	} else if (value > dimension.C1 && value < dimension.C2) {
		return '#e74c3c'; // >C1 <C2
	} else if (value === dimension.C2) {
		return '#d35400'; // =C2
	} else if (value > dimension.C2 && value < dimension.C3) {
		return '#e67e22'; // >C2 <C3
	} else if (value === dimension.C3) {
		return '#f39c12'; // =C3
	} else if (value > dimension.C3 && value < dimension.C4) {
		return '#f1c40f'; // >C3 <C4
	} else if (value === dimension.C4) {
		return '#27ae60'; // =C4
	} else if (value > dimension.C4) {
		return '#2ecc71'; // >C4
	}
}
