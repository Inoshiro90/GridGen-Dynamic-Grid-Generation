// // Funktion zum Generieren der Tabellenzeilen und Sammeln der Linieninformationen
// function generateTableRows(dimension, firstTableData, xMax, yMax, lineData, tbody) {
// 	for (let i = 1; i <= dimension.pointTotal; i++) {
// 		const row = document.createElement('tr');

// 		const startSide = determineSide(i, dimension);
// 		const startCoords = calculateCoordinates(i, startSide, xMax, yMax, dimension);

// 		const endPoint = firstTableData[i - 1];
// 		const endSide = determineSide(endPoint, dimension);
// 		const endCoords = calculateCoordinates(endPoint, endSide, xMax, yMax, dimension);

// 		if (
// 			(startSide === endSide && startSide !== 'corner') ||
// 			(startSide === 'bottom' &&
// 				endSide === 'corner' &&
// 				(endPoint === dimension.C1 || endPoint === dimension.C2)) ||
// 			(startSide === 'right' &&
// 				endSide === 'corner' &&
// 				(endPoint === dimension.C2 || endPoint === dimension.C3)) ||
// 			(startSide === 'top' &&
// 				endSide === 'corner' &&
// 				(endPoint === dimension.C3 || endPoint === dimension.C4)) ||
// 			(startSide === 'left' &&
// 				endSide === 'corner' &&
// 				(endPoint === dimension.C4 || endPoint === dimension.C1))
// 		) {
// 			continue;
// 		}

// 		const cells = [
// 			i,
// 			startSide,
// 			startCoords.x,
// 			startCoords.y,
// 			endPoint,
// 			endSide,
// 			endCoords.x,
// 			endCoords.y,
// 		];

// 		cells.forEach((cell, index) => {
// 			const td = document.createElement('td');
// 			td.innerText = cell;
// 			td.style.border = '1px solid black';
// 			td.style.textAlign = 'center';

// 			if (index === 0 || index === 4) {
// 				td.style.backgroundColor = getCellColor(cell, dimension);
// 			}

// 			row.appendChild(td);
// 		});

// 		// Linieninformationen sammeln
// 		lineData.push({startCoords, endCoords});

// 		tbody.appendChild(row);
// 	}
// }

function generateTableRows(dimension, tableData, xMax, yMax, lineData, tbody) {
	for (let i = 1; i <= dimension.pointTotal; i++) {
		const row = document.createElement('tr');

		const startSide = determineSide(i, dimension);
		const startCoords = calculateCoordinates(i, startSide, xMax, yMax, dimension);

		// Jetzt auf die neuen Objekte zugreifen
		const endPoint = tableData[i-1].pointEnd;  // pointEnd statt value
		const endSide = determineSide(endPoint, dimension);
		const endCoords = calculateCoordinates(endPoint, endSide, xMax, yMax, dimension);

		if (
			(startSide === endSide && startSide !== 'corner') ||
			(startSide === 'bottom' &&
				endSide === 'corner' &&
				(endPoint === dimension.C1 || endPoint === dimension.C2)) ||
			(startSide === 'right' &&
				endSide === 'corner' &&
				(endPoint === dimension.C2 || endPoint === dimension.C3)) ||
			(startSide === 'top' &&
				endSide === 'corner' &&
				(endPoint === dimension.C3 || endPoint === dimension.C4)) ||
			(startSide === 'left' &&
				endSide === 'corner' &&
				(endPoint === dimension.C4 || endPoint === dimension.C1))
		) {
			continue;
		}

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

			if (index === 0 || index === 4) {
				td.style.backgroundColor = getCellColor(cell, dimension);
			}

			row.appendChild(td);
		});

		// Linieninformationen sammeln
		console.log('pointStart',startCoords)
		console.log('pointEnd',endCoords)
		lineData.push({startCoords, endCoords});

		tbody.appendChild(row);
	}
}