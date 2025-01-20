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
