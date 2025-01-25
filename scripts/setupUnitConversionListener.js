function setupUnitConversionListener() {
	const cellSizeInput = document.getElementById('input-field-cell-size');
	const unitDropdown = document.getElementById('cell-size-unit-dropdown');

	// Event-Listener für Änderungen am Dropdown hinzufügen
	unitDropdown.addEventListener('change', () => {
		const currentUnit = unitDropdown.value;

		// Setze den Wert des Input-Feldes basierend auf der Einheit
		if (currentUnit === 'mm') {
			cellSizeInput.value = 5; // Standardwert für mm
		}
		if (currentUnit === 'px') {
			cellSizeInput.value = 19; // Standardwert für px
		} else if (currentUnit === 'inch') {
			cellSizeInput.value = 0.2; // Standardwert für inch
		}
	});
}

// Rufe die Funktion auf, um den Listener zu aktivieren
setupUnitConversionListener();
