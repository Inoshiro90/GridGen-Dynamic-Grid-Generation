function downloadPNG(svg, fileName) {
	// Konvertiere das SVG-Element in einen String
	const svgContent = new XMLSerializer().serializeToString(svg);

	// Erstelle ein Image-Element
	const img = new Image();

	// Erstelle eine Data-URL für das SVG
	const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);

	// Setze die Quelle des Image-Elements auf die Data-URL
	img.src = svgDataUrl;

	img.onload = function () {
		// Erstelle ein Canvas-Element
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		// Setze die Canvas-Größe basierend auf dem SVG-ViewBox-Attribut oder fallback auf Width/Height
		const viewBox = svg.viewBox.baseVal;
		canvas.width = viewBox.width || svg.width.baseVal.value;
		canvas.height = viewBox.height || svg.height.baseVal.value;

		// Zeichne das SVG-Bild auf das Canvas
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		// Erstelle eine Data-URL im PNG-Format
		canvas.toBlob((blob) => {
			const pngUrl = URL.createObjectURL(blob);

			// Erstelle einen Download-Link
			const link = document.createElement('a');
			link.href = pngUrl;
			link.download = `grid_${fileName}.png`;

			// Starte den Download
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			// Speicherfreigabe
			URL.revokeObjectURL(pngUrl);
		}, 'image/png');
	};

	img.onerror = function () {
		console.error('Error loading the SVG image.');
	};
}
