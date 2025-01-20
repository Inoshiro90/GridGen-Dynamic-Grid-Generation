function createTableTitle(tableNumber) {
    const title = document.createElement('div');
    title.innerHTML = `<h3>Rotation +${tableNumber - 1}</h3>`;
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.style.textAlign = 'left';
    return title;
}