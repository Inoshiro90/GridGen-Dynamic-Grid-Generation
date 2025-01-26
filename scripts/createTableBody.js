function createTableBody(dimension, firstTableData, xMax, yMax, lineData) {
    const tbody = document.createElement('tbody');
    generateTableRows(dimension, firstTableData, xMax, yMax, lineData, tbody);
    return tbody;
}