// Funktion, um alle SVGs in einer ZIP-Datei herunterzuladen
function downloadAllSVGsAsZip(dimensions, userInputs) {
	const zip = new JSZip();
	const svgElements = document.querySelectorAll('svg');
	svgElements.forEach((svg, index) => {
		const svgContent = new XMLSerializer().serializeToString(svg);
		zip.file(
			`grid_${dimensions.pointWidth}x${dimensions.pointLength}_${userInputs.pointDistance}${userInputs.pointDistanceUnit}x${userInputs.dpi}dpi_${index + 1}.svg`,
			svgContent
		);
	});

	zip.generateAsync({type: 'blob'}).then((content) => {
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `SVGs_${dimensions.pointWidth}x${dimensions.pointLength}_${userInputs.pointDistance}${userInputs.pointDistanceUnit}x${userInputs.dpi}dpi.zip`;
		link.click();
		URL.revokeObjectURL(link.href);
	});
}
