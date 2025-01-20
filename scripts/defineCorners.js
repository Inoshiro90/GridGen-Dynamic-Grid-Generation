function defineCorners(xMax, yMax) {
	const corners = {
		C1: {x: 0, y: 0},
		C2: {x: xMax, y: 0},
		C3: {x: xMax, y: yMax},
		C4: {x: 0, y: yMax},
	};
	return corners;
}
