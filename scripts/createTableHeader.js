function createTableHeader() {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['Start', 'Side', 'X1', 'Y1', 'End', 'Side', 'X2', 'Y2'];
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.innerText = header;
        th.style.textAlign = 'center';
        th.style.border = '1px solid black';
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    return thead;
}