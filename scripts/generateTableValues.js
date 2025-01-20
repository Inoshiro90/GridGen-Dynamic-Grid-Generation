// Funktion zum Generieren zusätzlicher Tabellen
function generateTableValues(dimension, firstTableData, numberOfTables, tableContainer, xMax, yMax, corners) {
    for (let t = 1; t <= numberOfTables; t++) {
        const newTableData = firstTableData.map((value, index) => {
            let newValue = value + t;

            // Wenn der Wert den maximalen Punktwert überschreitet
            if (newValue > dimension.pointTotal) {
                newValue = newValue % dimension.pointTotal;
            }

            // Neue Logik: Wenn Startpunkt = Endpunkt
            if (newValue === index + 1) {
                newValue += dimension.pointTotal / 2;
                if (newValue > dimension.pointTotal) {
                    newValue = newValue - dimension.pointTotal;
                }
            }

            return newValue;
        });

        createTable(dimension, newTableData, tableContainer, t + 1, xMax, yMax, corners);
    }
}