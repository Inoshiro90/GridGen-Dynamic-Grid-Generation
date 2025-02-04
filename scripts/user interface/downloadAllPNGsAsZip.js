// Batch-Download-Button für PNGs hinzufügen
function downloadAllPNGsAsZip(folderName) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');
	const pngPromises = []; // Array, um alle PNG-Erstellungs-Promises zu speichern

	svgElements.forEach((svg, index) => {
		const i = String(index + 1).padStart(3, '0');
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
					zip.file(`grid_${folderName}_${i}.png`, blob);
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
			link.download = `PNGs_${folderName}.zip`;
			link.click();
			URL.revokeObjectURL(link.href);
		});
	});
}
