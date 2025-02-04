function downloadAllPNGsAsZip(folderName) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');
	const pngPromises = []; // Array, um alle PNG-Erstellungs-Promises zu speichern

	svgElements.forEach((svg, index) => {
		const i = String(index + 1).padStart(3, '0');

		// Konvertiere das SVG-Element in einen String
		const svgContent = new XMLSerializer().serializeToString(svg);
		const img = new Image();
		const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);
		img.src = svgDataUrl;

		const pngPromise = new Promise((resolve) => {
			img.onload = function () {
				// Erstelle ein Canvas-Element
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				// Nutze die ViewBox oder fallback auf Width/Height
				const viewBox = svg.viewBox.baseVal;
				canvas.width = viewBox.width || svg.width.baseVal.value;
				canvas.height = viewBox.height || svg.height.baseVal.value;

				// Zeichne das Bild so, dass die Skalierung korrekt bleibt
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				// Erstelle die PNG-Datei als Blob
				canvas.toBlob(function (blob) {
					zip.file(`grid_${folderName}_${i}.png`, blob);
					resolve();
				});
			};
		});

		pngPromises.push(pngPromise);
	});

	// Warten, bis alle PNGs erstellt wurden, dann ZIP generieren
	Promise.all(pngPromises).then(() => {
		zip.generateAsync({type: 'blob'}).then((content) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(content);
			link.download = `PNGs_${folderName}.zip`;
			link.click();
			URL.revokeObjectURL(link.href);
		});
	});
}
