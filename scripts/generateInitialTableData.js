function generateInitialTableData(dimension) {
	const tableData = [];
	for (let i = 1; i <= dimension.pointTotal; i++) {
		let value;

		if (i === dimension.C1) {
			value = dimension.C2;
		} else if (i === dimension.C2) {
			value = dimension.C3;
		} else if (i === dimension.C3) {
			value = dimension.C4;
		} else if (i === dimension.C4) {
			value = dimension.C1;
		} else if (i > dimension.C1 && i < dimension.C2) {
			value = dimension.C4 - (i - dimension.C1);
		} else if (i > dimension.C2 && i < dimension.C3) {
			value = dimension.pointTotal + 1 - (i - dimension.C2);
		} else if (i > dimension.C3 && i < dimension.C4) {
			value = dimension.C2 - (i - dimension.C3);
		} else {
			value = dimension.C3 - (i - dimension.C4);
		}

		tableData.push(value);
	}
	return tableData;
}
