// Funktion zur Farbzuweisung
function getCellColor(value, dimension) {
	if (value === dimension.C1) {
		return '#c0392b'; // =C1
	} else if (value > dimension.C1 && value < dimension.C2) {
		return '#e74c3c'; // >C1 <C2
	} else if (value === dimension.C2) {
		return '#d35400'; // =C2
	} else if (value > dimension.C2 && value < dimension.C3) {
		return '#e67e22'; // >C2 <C3
	} else if (value === dimension.C3) {
		return '#f39c12'; // =C3
	} else if (value > dimension.C3 && value < dimension.C4) {
		return '#f1c40f'; // >C3 <C4
	} else if (value === dimension.C4) {
		return '#27ae60'; // =C4
	} else if (value > dimension.C4) {
		return '#2ecc71'; // >C4
	}
}
