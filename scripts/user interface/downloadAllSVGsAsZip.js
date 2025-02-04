// Funktion, um alle SVGs in einer ZIP-Datei herunterzuladen
function downloadAllSVGsAsZip(folderName) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');

	svgElements.forEach((svg, index) => {
		const i = String(index + 1).padStart(3, '0');
		const svgContent = new XMLSerializer().serializeToString(svg);
		zip.file(`grid_${folderName}_${i}.svg`, svgContent);
	});

	zip.generateAsync({type: 'blob'}).then((content) => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `SVGs_${folderName}.zip`;
		link.click();
		URL.revokeObjectURL(link.href);
	});
}
