// function generateTables(dimension) {
// 	const tableContainer = document.getElementById('generatedTables');
// 	tableContainer.innerHTML = ''; // Alte Tabellen entfernen

// 	// Vor der ersten Tabelle die Dimensionen anzeigen
// 	displayDimensions(dimension, tableContainer);

// 	// Anzahl zusätzlicher Tabellen
// 	const numberOfTables = Math.floor(dimension.pointTotal / 2 - 1);

// 	// Initiale Tabelle erstellen
// 	let firstTableData = [];
// 	for (let i = 1; i <= dimension.pointTotal; i++) {
// 		let value;

// 		// Excel-Formel als Logik umgesetzt
// 		if (i === dimension.C1) {
// 			value = dimension.C2;
// 		} else if (i === dimension.C2) {
// 			value = dimension.C3;
// 		} else if (i === dimension.C3) {
// 			value = dimension.C4;
// 		} else if (i === dimension.C4) {
// 			value = dimension.C1;
// 		} else if (i > dimension.C1 && i < dimension.C2) {
// 			value = dimension.C4 - (i - dimension.C1);
// 		} else if (i > dimension.C2 && i < dimension.C3) {
// 			value = dimension.pointTotal + 1 - (i - dimension.C2);
// 		} else if (i > dimension.C3 && i < dimension.C4) {
// 			value = dimension.C2 - (i - dimension.C3);
// 		} else {
// 			value = dimension.C3 - (i - dimension.C4);
// 		}

// 		firstTableData.push(value);
// 	}

// 	// Erste Tabelle generieren
// 	createSingleTable(dimension, firstTableData, tableContainer, 1);

// 	// Zusätzliche Tabellen generieren
// 	for (let t = 1; t <= numberOfTables; t++) {
// 		const newTableData = firstTableData.map((value, index) => {
// 			let newValue = value + t;

// 			// Wenn der Wert den maximalen Punktwert überschreitet
// 			if (newValue > dimension.pointTotal) {
// 				newValue = newValue % dimension.pointTotal;
// 			}

// 			// Neue Logik: Wenn Startpunkt = Endpunkt
// 			if (newValue === index + 1) {
// 				newValue += dimension.pointTotal / 2;
// 				if (newValue > dimension.pointTotal) {
// 					newValue = newValue - dimension.pointTotal;
// 				}
// 			}

// 			return newValue;
// 		});

// 		createSingleTable(dimension, newTableData, tableContainer, t + 1);
// 	}
// }

// // Funktion, um die Dimensionen anzuzeigen
// function displayDimensions(dimension, container) {
// 	const dimensionContainer = document.createElement('div');
// 	dimensionContainer.style.marginBottom = '20px';

// 	// Breite, Länge, Gesamtanzahl der Punkte, Ecken und Maximale Rotation anzeigen
// 	dimensionContainer.innerHTML = `
// 		<p><strong> Width:</strong> ${dimension.pointWidth}</p>
// 		<p><strong> Length:</strong> ${dimension.pointLength}</p>
// 		<p><strong>Points Total:</strong> ${dimension.pointTotal}</p>
// 		<p><strong>Corner 1:</strong> ${dimension.C1}</p>
// 		<p><strong>Corner 2:</strong> ${dimension.C2}</p>
// 		<p><strong>Corner 3:</strong> ${dimension.C3}</p>
// 		<p><strong>Corner 4:</strong> ${dimension.C4}</p>
// 		<p><strong>Rotation maximum:</strong> ${Math.floor(dimension.pointTotal / 2 - 1)}</p>
// 	`;

// 	// Die Dimensionen im Container vor der Tabelle anzeigen
// 	container.appendChild(dimensionContainer);
// }

// // Funktion, um eine einzelne Tabelle zu erstellen
// function createSingleTable(dimension, tableData, container, tableNumber) {
// 	// Tabellenüberschrift als separates Element
// 	const title = document.createElement('div');
// 	title.innerHTML = `<h3>Rotation +${tableNumber - 1}</h3>`;
// 	title.style.fontWeight = 'bold';
// 	title.style.marginBottom = '10px';
// 	title.style.textAlign = 'left';

// 	// Tabelle erstellen
// 	const table = document.createElement('table');
// 	table.style.borderCollapse = 'collapse';
// 	table.style.marginBottom = '20px';
// 	table.style.width = '100%';
// 	table.style.tableLayout = 'fixed'; // Gleichmäßige Spaltenbreiten

// 	// Tabellenkopf
// 	const thead = document.createElement('thead');
// 	const headerRow = document.createElement('tr');

// 	const header1 = document.createElement('th');
// 	header1.innerText = 'Starting point';
// 	header1.style.textAlign = 'center';
// 	header1.style.width = '50%'; // 50% der Tabellenbreite
// 	const header2 = document.createElement('th');
// 	header2.innerText = 'End point';
// 	header2.style.textAlign = 'center';
// 	header2.style.width = '50%'; // 50% der Tabellenbreite

// 	headerRow.appendChild(header1);
// 	headerRow.appendChild(header2);
// 	thead.appendChild(headerRow);
// 	table.appendChild(thead);

// 	// Tabellenkörper
// 	const tbody = document.createElement('tbody');
// 	for (let i = 1; i <= dimension.pointTotal; i++) {
// 		const row = document.createElement('tr');

// 		// Spalte 1 (Starting point)
// 		const cell1 = document.createElement('td');
// 		cell1.innerText = i;
// 		cell1.style.border = '1px solid black';
// 		cell1.style.textAlign = 'center';

// 		// Spalte 2 (End point)
// 		const cell2 = document.createElement('td');
// 		cell2.innerText = tableData[i - 1];
// 		cell2.style.border = '1px solid black';
// 		cell2.style.textAlign = 'center';

// 		// Zellen einfärben je nach Wert für cell1
// 		cell1.style.backgroundColor = getCellColor(i, dimension);

// 		// Zellen einfärben je nach Wert für cell2
// 		cell2.style.backgroundColor = getCellColor(tableData[i - 1], dimension);

// 		row.appendChild(cell1);
// 		row.appendChild(cell2);
// 		tbody.appendChild(row);
// 	}
// 	table.appendChild(tbody);

// 	// Tabelle und Titel in den Container einfügen
// 	container.appendChild(title);
// 	container.appendChild(table);
// }

// // Hilfsfunktion zur Farbzuweisung für jede Zelle
// function getCellColor(value, dimension) {
// 	if (value === dimension.C1) {
// 		return '#c0392b'; // =C1
// 	} else if (value > dimension.C1 && value < dimension.C2) {
// 		return '#e74c3c'; // >C1 <C2
// 	} else if (value === dimension.C2) {
// 		return '#d35400'; // =C2
// 	} else if (value > dimension.C2 && value < dimension.C3) {
// 		return '#e67e22'; // >C2 <C3
// 	} else if (value === dimension.C3) {
// 		return '#f39c12'; // =C3
// 	} else if (value > dimension.C3 && value < dimension.C4) {
// 		return '#f1c40f'; // >C3 <C4
// 	} else if (value === dimension.C4) {
// 		return '#27ae60'; // =C4
// 	} else if (value > dimension.C4) {
// 		return '#2ecc71'; // >C4
// 	}
// }

function generateTables(dimension) {
	const tableContainer = document.getElementById('generatedTables');
	tableContainer.innerHTML = ''; // Alte Tabellen entfernen

	// Berechnung der maximalen X- und Y-Werte
	const xMax = dimension.pointWidth - 1;
	const yMax = dimension.pointLength - 1;

	// Koordinaten der Ecken definieren
	const corners = {
		C1: {x: 0, y: 0},
		C2: {x: xMax, y: 0},
		C3: {x: xMax, y: yMax},
		C4: {x: 0, y: yMax},
	};

	// Vor der ersten Tabelle die Dimensionen anzeigen
	displayDimensions(dimension, xMax, yMax, tableContainer);

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
	createSingleTable(dimension, firstTableData, tableContainer, 1, xMax, yMax, corners);

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

		createSingleTable(dimension, newTableData, tableContainer, t + 1, xMax, yMax, corners);
	}
}

// Funktion zur Bestimmung der Seite eines Punktes
function determineSide(point, dimension) {
	if (
		point === dimension.C1 ||
		point === dimension.C2 ||
		point === dimension.C3 ||
		point === dimension.C4
	)
		return 'corner';
	if (point > dimension.C1 && point < dimension.C2) return 'bottom';
	if (point > dimension.C2 && point < dimension.C3) return 'right';
	if (point > dimension.C3 && point < dimension.C4) return 'top';
	return 'left';
}

// Funktion zur Bestimmung der Koordinaten basierend auf der Seite
function calculateCoordinates(point, side, xMax, yMax, dimension) {
	switch (side) {
		case 'bottom':
			return {x: point - 1, y: 0};
		case 'right':
			return {x: xMax, y: point - dimension.pointWidth};
		case 'top':
			return {
				x: xMax - 1 - (point - (dimension.pointWidth + dimension.pointLength)),
				y: yMax,
			};
		case 'left':
			return {x: 0, y: yMax - (point - dimension.C4)};
		case 'corner':
			if (point === dimension.C1) return {x: 0, y: 0};
			if (point === dimension.C2) return {x: xMax, y: 0};
			if (point === dimension.C3) return {x: xMax, y: yMax};
			if (point === dimension.C4) return {x: 0, y: yMax};
		default:
			return {x: 0, y: 0};
	}
}

// Funktion, um eine einzelne Tabelle zu erstellen
function createSingleTable(dimension, tableData, container, tableNumber, xMax, yMax, corners) {
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

	const headers = ['Start', 'Side', 'X1', 'Y1', 'End', 'Side', 'X2', 'Y2'];
	headers.forEach((header) => {
		const th = document.createElement('th');
		th.innerText = header;
		th.style.textAlign = 'center';
		th.style.border = '1px solid black';
		headerRow.appendChild(th);
	});

	thead.appendChild(headerRow);
	table.appendChild(thead);

	// Tabellenkörper
	const tbody = document.createElement('tbody');
	for (let i = 1; i <= dimension.pointTotal; i++) {
		const row = document.createElement('tr');

		const startSide = determineSide(i, dimension);
		const startCoords = calculateCoordinates(i, startSide, xMax, yMax, dimension);

		const endPoint = tableData[i - 1];
		const endSide = determineSide(endPoint, dimension);
		const endCoords = calculateCoordinates(endPoint, endSide, xMax, yMax, dimension);

		const cells = [
			i,
			startSide,
			startCoords.x,
			startCoords.y,
			endPoint,
			endSide,
			endCoords.x,
			endCoords.y,
		];

		cells.forEach((cell, index) => {
			const td = document.createElement('td');
			td.innerText = cell;
			td.style.border = '1px solid black';
			td.style.textAlign = 'center';

			// Farbgebung anwenden
			if (index === 0 || index === 4) {
				td.style.backgroundColor = getCellColor(cell, dimension);
			}

			row.appendChild(td);
		});

		tbody.appendChild(row);
	}

	table.appendChild(tbody);

	// Tabelle und Titel in den Container einfügen
	container.appendChild(title);
	container.appendChild(table);
}

// Funktion zur Farbzuweisung für jede Zelle
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

// Funktion, um die Dimensionen anzuzeigen
function displayDimensions(dimension, xMax, yMax, container) {
	const dimensionContainer = document.createElement('div');
	dimensionContainer.style.marginBottom = '20px';

	// Breite, Länge, Gesamtanzahl der Punkte, Ecken, Maximalwerte und Maximale Rotation anzeigen
	dimensionContainer.innerHTML = `
        <p><strong>Width:</strong> ${dimension.pointWidth}</p>
        <p><strong>Length:</strong> ${dimension.pointLength}</p>
        <p><strong>Points Total:</strong> ${dimension.pointTotal}</p>
        <p><strong>Corner 1:</strong> ${dimension.C1}</p>
        <p><strong>Corner 2:</strong> ${dimension.C2}</p>
        <p><strong>Corner 3:</strong> ${dimension.C3}</p>
        <p><strong>Corner 4:</strong> ${dimension.C4}</p>
        <p><strong>X Maximum:</strong> ${xMax}</p>
        <p><strong>Y Maximum:</strong> ${yMax}</p>
        <p><strong>Rotation Maximum:</strong> ${Math.floor(dimension.pointTotal / 2 - 1)}</p>
    `;

	// Die Dimensionen im Container vor der Tabelle anzeigen
	container.appendChild(dimensionContainer);
}
