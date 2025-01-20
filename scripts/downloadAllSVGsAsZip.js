// Funktion, um alle SVGs in einer ZIP-Datei herunterzuladen
function downloadAllSVGsAsZip(dimension) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');
	svgElements.forEach((svg, index) => {
		const svgContent = new XMLSerializer().serializeToString(svg);
		zip.file(
			`grid_${dimension.pointWidth}x${dimension.pointLength}_${index + 1}.svg`,
			svgContent
		);
	});

	zip.generateAsync({type: 'blob'}).then((content) => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `SVGs_${dimension.pointWidth}x${dimension.pointLength}.zip`;
		link.click();
		URL.revokeObjectURL(link.href);
	});
}
