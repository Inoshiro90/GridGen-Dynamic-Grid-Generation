// Berechnet die maximalen Dimensionen basierend auf den Benutzereingaben.
function calculateDimensions(userInputs) {
	// Initialisiere das Objekt für die Dimensionen
	const dimensions = {};

	dimensions.pointWidth = userInputs.pointWidth;
	dimensions.pointLength = userInputs.pointLength;
	
	// Berechne die maximale X- und Y-Werte
	dimensions.maxX = dimensions.pointWidth - 1;
	dimensions.maxY = dimensions.pointLength - 1;

	// Berechne die Gesamtpunktzahl
	dimensions.pointTotal = 2 * dimensions.pointWidth + 2 * dimensions.pointLength - 4;

	// Definiere die Eckpunkte
	dimensions.corner1 = 1; // Untere linke Ecke
	dimensions.corner2 = dimensions.pointWidth; // Rechte untere Ecke
	dimensions.corner3 = dimensions.pointWidth + dimensions.pointLength - 1; // Rechte obere Ecke
	dimensions.corner4 = dimensions.corner3 + dimensions.pointWidth - 1; // Linke obere Ecke

	// console.log('dimensions:', dimensions)
	// Gebe das dimensions-Objekt zurück
	return dimensions;
}
