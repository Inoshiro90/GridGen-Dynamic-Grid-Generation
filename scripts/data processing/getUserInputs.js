// Holt die Eingabewerte aus dem Formular und konvertiert diese in ein einheitliches Format.
function getUserInputs() {
	// Sammle die Eingabewerte aus den Feldern
	const pointWidth = parseInt(document.getElementById('input-field-point-width').value, 10);
	const pointLength = parseInt(document.getElementById('input-field-point-length').value, 10);
	const pointDistanceInput = document.getElementById('input-field-cell-size').value;
	const pointDistanceUnit = document.getElementById('cell-size-unit-dropdown').value;
	const lineWidthInput = document.getElementById('input-field-line-width').value;
	const dpi = parseFloat(document.getElementById('input-field-dpi').value);

	// Konvertiere den Punktabstand, falls notwendig
	const pointDistance = parseFloat(pointDistanceInput.replace(',', '.'));

	// Konvertiere die Eingabe von lineWidth, falls notwendig (Ersetze "," durch ".")
	const lineWidth = parseFloat(lineWidthInput.replace(',', '.'));

	// Validierung der Eingaben
	if (isNaN(pointWidth) || pointWidth < 3) {
		alert('Bitte geben Sie eine gültige Zahl für die Breite ein (mindestens 3).');
		return null;
	}
	if (isNaN(pointLength) || pointLength < 3) {
		alert('Bitte geben Sie eine gültige Zahl für die Länge ein (mindestens 3).');
		return null;
	}
	if (isNaN(pointDistance) || pointDistance <= 0.00) {
		alert('Bitte geben Sie eine gültige Zahl für den Punktabstand ein (größer als 0).');
		return null;
	}
	if (isNaN(lineWidth) || lineWidth < 0.2) {
		alert('Bitte geben Sie eine gültige Linienbreite ein (mindestens 0.2).');
		return null;
	}

	// Speichere die Eingaben in einem Objekt
	const userInputs = {
		pointWidth: pointWidth,
		pointLength: pointLength,
		pointDistance: pointDistance,
		pointDistanceUnit: pointDistanceUnit,
		lineWidth: lineWidth,
		dpi: dpi,
	};

	// console.log('Inputs successful:', userInputs); // Für Debugging-Zwecke
	return userInputs;
}
