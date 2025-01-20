// Funktion zur Bestimmung der Koordinaten basierend auf der Seite
function calculateCoordinates(point, side, xMax, yMax, dimension) {
	switch (side) {
		case 'bottom':
			return {x: point - 1, y: 0};
		case 'right':
			return {x: xMax, y: point - dimension.pointWidth};
		case 'top':
			return {
				x: xMax - 1 - (point - (dimension.pointWidth + dimension.pointLength)),
				y: yMax,
			};
		case 'left':
			return {x: 0, y: yMax - (point - dimension.C4)};
		case 'corner':
			if (point === dimension.C1) return {x: 0, y: 0};
			if (point === dimension.C2) return {x: xMax, y: 0};
			if (point === dimension.C3) return {x: xMax, y: yMax};
			if (point === dimension.C4) return {x: 0, y: yMax};
		default:
			return {x: 0, y: 0};
	}
}
