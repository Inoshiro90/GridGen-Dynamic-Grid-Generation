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

// // Funktion zum Generieren zusätzlicher Tabellen mit Rotationsmustern
// function generateTableValues(
//     dimension,
//     firstTableData,
//     numberOfTables,
//     tableContainer,
//     xMax,
//     yMax,
//     corners,
//     rotationPattern // Das Muster als String, z. B. "++++", "+-0-", etc.
// ) {
//     // Prüfen, ob rotationPattern definiert ist
//     if (!rotationPattern) {
//         console.error('Das Rotationsmuster wurde nicht übergeben.');
//         return;
//     }

//     // Muster interpretieren
//     const rotationChanges = Array.isArray(rotationPattern)
//         ? rotationPattern
//         : rotationPattern.split('').map((char) => {
//             console.log('rotationChanges', rotationChanges)
//             if (char === '+') return 1;   // +1 Rotation
//             if (char === '-') return -1;  // -1 Rotation            
//             return 0;  // Keine Rotation (0)
//         });

//         console.log('rotationChanges:',rotationChanges)
//     // Prüfen, ob das Muster korrekt ist
//     if (rotationChanges.length !== 6) {
//         console.error('Das Rotationsmuster muss genau 4 Änderungen enthalten (A, B, C, D).');
//         return;
//     }

//     for (let t = 1; t <= numberOfTables; t++) {
//         const newTableData = firstTableData.map((value, index) => {
//             // Bestimme die aktuelle Seite (A, B, C, D) basierend auf der Position
//             const sideIndex = Math.floor(index / (dimension.pointTotal / 4)) % 4;
//             let change = rotationChanges[sideIndex] * t; // Änderung basierend auf dem Muster

//             // Aktualisiere den Wert für die aktuelle Seite
//             let newValue = value + change;

//             // Wenn der Wert den maximalen Punktwert überschreitet
//             if (newValue > dimension.pointTotal) {
//                 newValue = newValue % dimension.pointTotal;
//             } else if (newValue < 1) {
//                 newValue = dimension.pointTotal + newValue;
//             }

//             // Neue Logik: Wenn Startpunkt = Endpunkt
//             if (newValue === index + 1) {
//                 newValue += dimension.pointTotal / 2;
//                 if (newValue > dimension.pointTotal) {
//                     newValue = newValue - dimension.pointTotal;
//                 }
//             }

//             return newValue;
//         });

//         // Tabelle mit neuen Werten erstellen
//         createTable(dimension, newTableData, tableContainer, t + 1, xMax, yMax, corners);
//     }
// }
