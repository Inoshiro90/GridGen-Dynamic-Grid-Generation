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
