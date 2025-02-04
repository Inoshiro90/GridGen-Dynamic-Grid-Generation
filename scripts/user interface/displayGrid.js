let downloadCounter = 1; // Zähler für die Datei-Nummerierung

// Funktion zum Zurücksetzen der Benutzeroberfläche (bei neuem "Generate")
function resetGridDisplay() {
	const gridContainer = document.getElementById('generatedTablesAndGrids');
	if (gridContainer) {
		gridContainer.innerHTML = ''; // Vorherigen Inhalt löschen
	}
	downloadCounter = 1; // Zähler zurücksetzen
}

// Fügt das generierte SVG-Element für die Rasterdarstellung in die Benutzeroberfläche ein.
function displayGrid(svgContainer, dimensions, userInputs) {
	const gridContainer = document.getElementById('generatedTablesAndGrids');
	if (!gridContainer) {
		console.error('Error: The element with the ID "generatedTablesAndGrids" was not found.');
		return;
	}

	// Neues div für das SVG
	const svgWrapper = document.createElement('div');
	svgWrapper.classList.add('svg-wrapper');

	// SVG einfügen
	svgWrapper.innerHTML = svgContainer;

	// Download-Buttons erstellen
	const downloadSVGButton = document.createElement('button');
	downloadSVGButton.textContent = 'Download SVG';
	downloadSVGButton.classList.add('btn', 'btn-secondary', 'mt-1', 'mr-2');
	downloadSVGButton.style.display = 'block';
	downloadSVGButton.style.marginBottom = '20px';

	const downloadPNGButton = document.createElement('button');
	downloadPNGButton.textContent = 'Download PNG';
	downloadPNGButton.classList.add('btn', 'btn-secondary', 'mt-1', 'mr-2');
	downloadPNGButton.style.display = 'block';
	downloadPNGButton.style.marginBottom = '20px';

	// Speichere die aktuelle Nummer
	const tableNumber = String(downloadCounter).padStart(3, '0');
	const fileName = `grid_${dimensions.pointWidth}x${dimensions.pointLength}_${
		userInputs.pointDistance
	}${userInputs.pointDistanceUnit}x${userInputs.dpi}_${userInputs.lineColor}${percentToHex(
		userInputs.lineColorTransparency * 100
	)}-${userInputs.lineWidth}_${tableNumber}`;

	// Event-Listener für Download-Buttons
	downloadSVGButton.addEventListener('click', function () {
		const svgElement = svgWrapper.querySelector('svg');
		if (svgElement) {
			downloadSVG(svgElement, fileName);
		} else {
			console.error('No SVG element found.');
		}
	});

	downloadPNGButton.addEventListener('click', function () {
		const svgElement = svgWrapper.querySelector('svg');
		if (svgElement) {
			downloadPNG(svgElement, fileName);
		} else {
			console.error('No SVG element found.');
		}
	});

	// Buttons unter das SVG setzen
	svgWrapper.appendChild(downloadSVGButton);
	svgWrapper.appendChild(downloadPNGButton);

	// In das Ziel-Element einfügen
	gridContainer.appendChild(svgWrapper);

	// Zähler erhöhen
	downloadCounter++;
}

// Event-Listener für "Generate"-Button
document.getElementById('btn-generate').addEventListener('click', function () {
	resetGridDisplay(); // Setzt das Grid zurück und die Nummerierung beginnt neu
});
