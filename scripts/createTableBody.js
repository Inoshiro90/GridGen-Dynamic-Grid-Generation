function createTableBody(dimension, tableData, xMax, yMax, lineData) {
    const tbody = document.createElement('tbody');
    generateTableRows(dimension, tableData, xMax, yMax, lineData, tbody);
    return tbody;
}