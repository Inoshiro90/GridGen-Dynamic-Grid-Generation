// Funktion, um die Dimensionen anzuzeigen
function displayDimensions(dimension, xMax, yMax, container) {
	const dimensionContainer = document.createElement('div');
	dimensionContainer.style.marginBottom = '20px';

	dimensionContainer.innerHTML = `
        <p><strong>Width:</strong> ${dimension.pointWidth}</p>
        <p><strong>Length:</strong> ${dimension.pointLength}</p>
        <p><strong>Points Total:</strong> ${dimension.pointTotal}</p>
        <p><strong>Corner 1:</strong> ${dimension.C1}</p>
        <p><strong>Corner 2:</strong> ${dimension.C2}</p>
        <p><strong>Corner 3:</strong> ${dimension.C3}</p>
        <p><strong>Corner 4:</strong> ${dimension.C4}</p>
        <p><strong>X Maximum:</strong> ${xMax}</p>
        <p><strong>Y Maximum:</strong> ${yMax}</p>
        <p><strong>Rotation Maximum:</strong> ${
			dimension.pointWidth < dimension.pointLength
				? dimension.pointWidth + 1
				: dimension.pointLength + 1
		}</p>
    `;

    const checkboxDimension = document.getElementById('checkbox-dimension');
	  if (checkboxDimension.checked) {
		// Tabelle nur hinzufügen, wenn die Checkbox ausgewählt ist
		container.appendChild(dimensionContainer);
	  };
	addSVGBatchDownloadButton(container, dimension);
	addPNGBatchDownloadButton(container, dimension);
}
