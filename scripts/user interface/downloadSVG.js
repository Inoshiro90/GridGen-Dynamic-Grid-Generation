function downloadSVG(svgElement, fileName) {
	// console.log(dimensions);
	if (!svgElement) {
		console.error('Error: SVG element not found.');
		return;
	}

	// Konvertiere das SVG-Element in einen String
	const svgContent = new XMLSerializer().serializeToString(svgElement);

	// Erstelle einen Blob mit dem richtigen MIME-Typ für SVG
	const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'});

	// Erstelle eine URL für den Blob
	const svgUrl = URL.createObjectURL(svgBlob);

	// Erstelle einen versteckten Download-Link
	const link = document.createElement('a');
	link.href = svgUrl;
	link.download = `grid_${fileName}.svg`; // Datei-Benennung

	// Klick auf den Link, um den Download zu starten
	document.body.appendChild(link); // Link temporär in den DOM einfügen
	link.click(); // Download auslösen
	document.body.removeChild(link); // Link wieder entfernen

	// Speicher freigeben
	URL.revokeObjectURL(svgUrl);
}
