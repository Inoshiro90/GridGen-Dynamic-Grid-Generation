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
	const numberOfTables =
		dimension.pointWidth < dimension.pointLength
			? dimension.pointWidth + 1
			: dimension.pointLength + 1;

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
	table.style.tableLayout = 'fixed';

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

	// Umrechnung von 25mm in Pixel
	const pointDistanceInPixels = 25 / 0.26458; // Umrechnung von mm in Pixel

	// SVG für Linien
	const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

	// Dynamische Anpassung der SVG-Dimensionen basierend auf dem Seitenverhältnis
	let svgWidth, svgHeight;
	if (xMax > yMax) {
		// Breite ist größer als Länge
		svgWidth = xMax * pointDistanceInPixels; // Breite basierend auf dem Punktabstand
		svgHeight = (svgWidth * yMax) / xMax; // Dynamische Höhe basierend auf dem Seitenverhältnis
	} else {
		// Länge ist größer oder gleich der Breite
		svgHeight = yMax * pointDistanceInPixels; // Höhe basierend auf dem Punktabstand
		svgWidth = (svgHeight * xMax) / yMax; // Dynamische Breite basierend auf dem Seitenverhältnis
	}

	svg.setAttribute('width', svgWidth);
	svg.setAttribute('height', svgHeight);
	svg.style.border = '1px solid black';

	// Umrandung hinzufügen
	const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	border.setAttribute('x', 0);
	border.setAttribute('y', 0);
	border.setAttribute('width', svgWidth);
	border.setAttribute('height', svgHeight);
	border.setAttribute('style', 'stroke:black;stroke-width:1;fill:none;');
	svg.appendChild(border);

	// Tabellenkörper
	const tbody = document.createElement('tbody');
	for (let i = 1; i <= dimension.pointTotal; i++) {
		const row = document.createElement('tr');

		const startSide = determineSide(i, dimension);
		const startCoords = calculateCoordinates(i, startSide, xMax, yMax, dimension);

		const endPoint = tableData[i - 1];
		const endSide = determineSide(endPoint, dimension);
		const endCoords = calculateCoordinates(endPoint, endSide, xMax, yMax, dimension);

		// Überspringe Verbindungen innerhalb derselben Seite oder zu angrenzenden Ecken
		if (
			(startSide === endSide && startSide !== 'corner') || // Innerhalb derselben Seite
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
			continue; // Verbindung wird übersprungen
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

		// Linie im SVG hinzufügen
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		const scaleFactorX = svgWidth / xMax;
		const scaleFactorY = svgHeight / yMax;

		line.setAttribute('x1', startCoords.x * scaleFactorX);
		line.setAttribute('y1', svgHeight - startCoords.y * scaleFactorY); // Y-Koordinaten invertieren
		line.setAttribute('x2', endCoords.x * scaleFactorX);
		line.setAttribute('y2', svgHeight - endCoords.y * scaleFactorY); // Y-Koordinaten invertieren
		line.setAttribute('style', 'stroke:black;stroke-width:1');
		svg.appendChild(line);

		tbody.appendChild(row);
	}

	table.appendChild(tbody);

	function downloadSVG(svg, tableNumber, dimension) {
		// Konvertiere das SVG-Element in einen String
		const svgContent = new XMLSerializer().serializeToString(svg);

		// Erstelle einen Blob mit dem richtigen MIME-Typ für SVG
		const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'});

		// Erstelle eine URL für den Blob
		const svgUrl = URL.createObjectURL(svgBlob);

		// Erstelle einen Download-Link
		const link = document.createElement('a');
		link.href = svgUrl;
		link.download = `grid_${dimension.pointWidth}x${dimension.pointLength}_${tableNumber}.svg`; // Benennung des Downloads

		// Klicke auf den Link, um den Download zu starten
		document.body.appendChild(link); // Füge den Link temporär hinzu, um ihn auszulösen
		link.click(); // Klick auslösen
		document.body.removeChild(link); // Entferne den Link nach dem Klick

		// Bereinige die URL, um Speicherlecks zu vermeiden
		URL.revokeObjectURL(svgUrl);
	}

	function downloadPNG(svg, tableNumber, dimension) {
		// Speichere die ursprünglichen Werte für die ViewBox
		const originalWidth = svg.width.baseVal.value;
		const originalHeight = svg.height.baseVal.value;

		// Berechne die neue ViewBox (größer als width und height)
		const viewBoxWidth = originalWidth + 2;
		const viewBoxHeight = originalHeight + 2;

		// Ändere das viewBox-Attribut des SVGs auf die neue größere ViewBox
		svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

		// Konvertiere das SVG-Element in einen String
		const svgContent = new XMLSerializer().serializeToString(svg);

		// Erstelle ein neues Image-Element
		const img = new Image();

		// Erstelle eine Data-URL für das SVG
		const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);

		// Setze die Quelle des Image-Elements auf die Data-URL
		img.src = svgDataUrl;

		img.onload = function () {
			// Erstelle ein Canvas-Element
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			// Setze die Canvas-Größe auf die tatsächliche SVG-Größe
			canvas.width = originalWidth;
			canvas.height = originalHeight;

			// Zeichne das SVG-Bild auf das Canvas
			ctx.drawImage(img, 0, 0);

			// Erstelle eine Data-URL im PNG-Format
			const pngDataUrl = canvas.toDataURL('image/png');

			// Erstelle einen Link für den Download
			const link = document.createElement('a');
			link.href = pngDataUrl;
			link.download = `grid_${dimension.pointWidth}x${dimension.pointLength}_${tableNumber}.png`; // Benennung des Downloads

			// Klicke auf den Link, um den Download zu starten
			document.body.appendChild(link); // Füge den Link temporär hinzu
			link.click(); // Klick auslösen
			document.body.removeChild(link); // Entferne den Link nach dem Klick

			// Setze das viewBox-Attribut zurück auf die ursprünglichen Werte
			svg.setAttribute('viewBox', `0 0 ${originalWidth} ${originalHeight}`);
		};
	}

	// Download-Link für das SVG hinzufügen
	const downloadSVGButton = document.createElement('button');
	downloadSVGButton.innerText = 'Download SVG';

	// Klassen und ID hinzufügen, um den Button anzupassen
	downloadSVGButton.id = 'btn-download-svg';
	downloadSVGButton.classList.add('btn', 'btn-secondary', 'mt-1', 'mr-2'); // Hinzufügen von margin-right für Abstand

	// display: block hinzufügen
	downloadSVGButton.style.display = 'block'; // Damit die Buttons nebeneinander erscheinen
	downloadSVGButton.style.marginBottom = '20px';

	// Event-Handler für den SVG-Download hinzufügen
	downloadSVGButton.onclick = () => downloadSVG(svg, tableNumber, dimension);

	// Download-Link für das PNG hinzufügen
	const downloadPNGButton = document.createElement('button');
	downloadPNGButton.innerText = 'Download PNG';

	// Klassen und ID hinzufügen, um den Button anzupassen
	downloadPNGButton.id = 'btn-download-png';
	downloadPNGButton.classList.add('btn', 'btn-secondary', 'mt-1', 'mr-2'); // Hinzufügen von margin-right für Abstand

	// display: block hinzufügen
	downloadPNGButton.style.display = 'block'; // Damit die Buttons nebeneinander erscheinen
	downloadPNGButton.style.marginBottom = '20px';

	// Event-Handler für den PNG-Download hinzufügen
	downloadPNGButton.onclick = () => downloadPNG(svg, tableNumber, dimension);

	// Container-Elemente anhängen
	container.appendChild(title);
	container.appendChild(table);
	container.appendChild(svg);
	container.appendChild(downloadSVGButton);
	container.appendChild(downloadPNGButton);
}

// Funktion zur Farbzuweisung
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

// Funktion, um alle SVGs in einer ZIP-Datei herunterzuladen
function downloadAllSVGsAsZip(dimension) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');
	svgElements.forEach((svg, index) => {
		const svgContent = new XMLSerializer().serializeToString(svg);
		zip.file(
			`grid_${dimension.pointWidth}x${dimension.pointLength}_${index + 1}.svg`,
			svgContent
		);
	});

	zip.generateAsync({type: 'blob'}).then((content) => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `SVGs_${dimension.pointWidth}x${dimension.pointLength}.zip`;
		link.click();
		URL.revokeObjectURL(link.href);
	});
}

// Batch-Download-Button hinzufügen
function addSVGBatchDownloadButton(container, dimension) {
	const batchDownloadButton = document.createElement('button');
	batchDownloadButton.innerText = 'Download All SVGs';
	batchDownloadButton.id = 'btn-download-all-svgs';
	batchDownloadButton.classList.add('btn', 'btn-primary', 'mt-2');
	batchDownloadButton.style.display = 'block';

	batchDownloadButton.onclick = () => downloadAllSVGsAsZip(dimension);

	container.appendChild(batchDownloadButton);
}

// Batch-Download-Button für PNGs hinzufügen
function downloadAllPNGsAsZip(dimension) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');
	const pngPromises = []; // Array, um alle PNG-Erstellungs-Promises zu speichern

	svgElements.forEach((svg, index) => {
		// Speichere die ursprünglichen Werte für die ViewBox
		const originalWidth = svg.width.baseVal.value;
		const originalHeight = svg.height.baseVal.value;

		// Berechne die neue ViewBox (größer als width und height)
		const viewBoxWidth = originalWidth + 2; // 2 Pixel größer als originalWidth
		const viewBoxHeight = originalHeight + 2; // 2 Pixel größer als originalHeight

		// Ändere das viewBox-Attribut des SVGs auf die neue größere ViewBox
		svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);

		// Konvertiere das SVG-Element in einen String
		const svgContent = new XMLSerializer().serializeToString(svg);

		// Erstelle ein neues Image-Element
		const img = new Image();

		// Erstelle eine Data-URL für das SVG
		const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);

		// Setze die Quelle des Image-Elements auf die Data-URL
		img.src = svgDataUrl;

		const pngPromise = new Promise((resolve) => {
			img.onload = function () {
				// Erstelle ein Canvas-Element
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Setze die Canvas-Größe auf die tatsächliche SVG-Größe
				canvas.width = originalWidth;
				canvas.height = originalHeight;

				// Zeichne das SVG-Bild auf das Canvas
				ctx.drawImage(img, 0, 0);

				// Erstelle eine PNG-Datei als Blob
				canvas.toBlob(function (blob) {
					zip.file(
						`grid_${dimension.pointWidth}x${dimension.pointLength}_${index + 1}.png`,
						blob
					);
					resolve(); // Promise auflösen, wenn der Blob hinzugefügt wurde
				});

				// Setze das viewBox-Attribut zurück auf die ursprünglichen Werte
				svg.setAttribute('viewBox', `0 0 ${originalWidth} ${originalHeight}`);
			};
		});

		pngPromises.push(pngPromise); // Speichere das Promise für späteres Warten
	});

	// Warten, bis alle PNGs verarbeitet wurden
	Promise.all(pngPromises).then(() => {
		// Nachdem alle PNGs hinzugefügt wurden, generiere die ZIP-Datei
		zip.generateAsync({type: 'blob'}).then((content) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(content);
			link.download = `PNGs_${dimension.pointWidth}x${dimension.pointLength}.zip`;
			link.click();
			URL.revokeObjectURL(link.href);
		});
	});
}

// Batch-Download-Button hinzufügen
function addPNGBatchDownloadButton(container, dimension) {
	const batchDownloadButton = document.createElement('button');
	batchDownloadButton.innerText = 'Download All PNGs';
	batchDownloadButton.id = 'btn-download-all-pngs';
	batchDownloadButton.classList.add('btn', 'btn-primary', 'mt-2');
	batchDownloadButton.style.display = 'block';

	batchDownloadButton.onclick = () => downloadAllPNGsAsZip(dimension);

	container.appendChild(batchDownloadButton);
}

// Funktion, um die Dimensionen anzuzeigen
function displayDimensions(dimension, xMax, yMax, container) {
	const dimensionContainer = document.createElement('div');
	dimensionContainer.style.marginBottom = '20px';

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
        <p><strong>Rotation Maximum:</strong> ${
			dimension.pointWidth < dimension.pointLength
				? dimension.pointWidth + 1
				: dimension.pointLength + 1
		}</p>
    `;

	container.appendChild(dimensionContainer);
	addSVGBatchDownloadButton(container, dimension);
	addPNGBatchDownloadButton(container, dimension);
}
