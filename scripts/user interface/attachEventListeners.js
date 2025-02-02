// Bindet Event-Listener an die Formular-Schaltflächen wie „Generate“ oder „Download“.
function attachEventListeners() {
	// Button 'Generate' Event Listener
	const generateButton = document.getElementById('btn-generate');
	generateButton.addEventListener('click', () => {
		const userInputs = getUserInputs();
		if (userInputs) {
			// console.log('Grid is generated with the following inputs:', userInputs);

			document.getElementById('generatedTablesAndGrids').innerHTML = '';

			// Initialisierung des tables-Objekts
			const tables = [];

			// Berechnung der Dimensionen
			const dimensions = calculateDimensions(userInputs);

			// Generierung der ersten Tabelle
			const firstTableValues = generateFirstTableValues(dimensions);

			// Fügt die 'firstTableValues' zum 'tables' Array hinzu
			tables.push(firstTableValues);

			const batchSVGDownloadButton = document.createElement('button');
			batchSVGDownloadButton.innerText = 'Download All SVGs';
			batchSVGDownloadButton.id = 'btn-download-all-svgs';
			batchSVGDownloadButton.classList.add('btn', 'btn-primary', 'mt-3');
			batchSVGDownloadButton.style.display = 'block';
			batchSVGDownloadButton.onclick = () => downloadAllSVGsAsZip(dimensions, userInputs);
			generatedTablesAndGrids.appendChild(batchSVGDownloadButton);

			const batchPNGDownloadButton = document.createElement('button');
			batchPNGDownloadButton.innerText = 'Download All PNGs';
			batchPNGDownloadButton.id = 'btn-download-all-pngs';
			batchPNGDownloadButton.classList.add('btn', 'btn-primary', 'mt-3');
			batchPNGDownloadButton.style.display = 'block';
			batchPNGDownloadButton.style.marginBottom = '20px';
			batchPNGDownloadButton.onclick = () => downloadAllPNGsAsZip(dimensions, userInputs);
			generatedTablesAndGrids.appendChild(batchPNGDownloadButton);

			// Fügt die rotierten Tabellen zum 'tables' Array hinzu
			const rotatedTables = applyRotationPattern(
				dimensions,
				firstTableValues,
				rotationPattern
			);
			tables.push(...rotatedTables);

			tables.forEach((table, index) => {
				// Berechne Koordinaten für diese eine Tabelle
				const coordinates = calculateCoordinates(dimensions, [table]);

				// Erstelle einen separaten SVG-Container für jede Tabelle
				let svgContainer = createSVGContainer(
					dimensions,
					userInputs.pointDistance,
					userInputs.pointDistanceUnit,
					userInputs.dpi,
					userInputs.lineWidth
				);

				// Füge die Linien für diese Tabelle hinzu
				svgContainer = connectPoints(
					svgContainer,
					coordinates,
					userInputs.pointDistance,
					userInputs.pointDistanceUnit,
					userInputs.dpi,
					userInputs.lineWidth
				);

				displayGrid(svgContainer, dimensions, userInputs);

				if (index > 0) {
					// Nur aufrufen, wenn es **nicht das erste Raster** ist
					displayRotatedGrid(svgContainer, dimensions, userInputs);
				}

				// Ausgabe für Debugging
				// console.log(`SVG für Tabelle ${index + 1}:`, svgContainer);
			});
		}
	});

	// Event Listener für das Eingabefeld 'Width'
	const widthInput = document.getElementById('input-field-point-width');
	widthInput.addEventListener('input', () => {
		console.log('New width entered:', widthInput.value);
	});

	// Event Listener für das Eingabefeld 'Length'
	const lengthInput = document.getElementById('input-field-point-length');
	lengthInput.addEventListener('input', () => {
		console.log('New length entered:', lengthInput.value);
	});

	// Event Listener für das Eingabefeld 'Point Distance'
	const pointDistanceInput = document.getElementById('input-field-cell-size');
	pointDistanceInput.addEventListener('input', () => {
		console.log('New point distance entered:', pointDistanceInput.value);
	});

	// Event Listener für die Dropdown-Auswahl 'Point Distance Unit'
	const pointDistanceUnitDropdown = document.getElementById('cell-size-unit-dropdown');
	pointDistanceUnitDropdown.addEventListener('change', () => {
		console.log('New unit selected:', pointDistanceUnitDropdown.value);
	});

	// Event Listener für das Eingabefeld 'Line Width'
	const lineWidthInput = document.getElementById('input-field-line-width');
	lineWidthInput.addEventListener('input', () => {
		console.log('New line width entered:', lineWidthInput.value);
	});

	// Event Listener für das Eingabefeld 'Dots per inch'
	const dpiInput = document.getElementById('input-field-dpi');
	dpiInput.addEventListener('input', () => {
		console.log('New dpi entered:', dpiInput.value);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	attachEventListeners();
});

// Event-Listener für Änderungen am Dropdown hinzufügen
const cellSizeInput = document.getElementById('input-field-cell-size');
const unitDropdown = document.getElementById('cell-size-unit-dropdown');
unitDropdown.addEventListener('change', () => {
	const currentUnit = unitDropdown.value;

	// Setze den Wert des Input-Feldes basierend auf der Einheit
	if (currentUnit === 'mm') {
		cellSizeInput.value = 5; // Standardwert für mm
	}
	if (currentUnit === 'px') {
		cellSizeInput.value = 14; // Standardwert für px
	} else if (currentUnit === 'in') {
		cellSizeInput.value = 0.2; // Standardwert für inch
	}
});
