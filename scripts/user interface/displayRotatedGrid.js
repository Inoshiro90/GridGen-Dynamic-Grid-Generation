function displayRotatedGrid(svgContainer, dimensions, userInputs) {
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

	// Das SVG-Element abrufen und horizontal spiegeln
	const svgElement = svgWrapper.querySelector('svg');
	if (svgElement) {
		const bbox = svgElement.getBBox(); // Größe des SVGs abrufen
		const width = bbox.width; // Breite des SVGs

		// Transformation: Spiegelung entlang der X-Achse
		svgElement.setAttribute('transform', `scale(-1, 1) translate(-${width}, 0)`);
	}

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
	const tableNumber = downloadCounter;

	// Event-Listener für Download-Buttons
	downloadSVGButton.addEventListener('click', function () {
		const svgElement = svgWrapper.querySelector('svg');
		if (svgElement) {
			downloadSVG(svgElement, tableNumber, dimensions, userInputs);
		} else {
			console.error('No SVG element found.');
		}
	});

	downloadPNGButton.addEventListener('click', function () {
		const svgElement = svgWrapper.querySelector('svg');
		if (svgElement) {
			downloadPNG(svgElement, tableNumber, dimensions, userInputs);
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
