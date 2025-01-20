function generateDownloadButtons(svg, tableNumber, dimension) {
    const downloadSVGButton = document.createElement('button');
    downloadSVGButton.innerText = 'Download SVG';
    downloadSVGButton.id = 'btn-download-svg';
    downloadSVGButton.classList.add('btn', 'btn-secondary', 'mt-1', 'mr-2');
    downloadSVGButton.style.display = 'block';
    downloadSVGButton.style.marginBottom = '20px';
    downloadSVGButton.onclick = () => downloadSVG(svg, tableNumber, dimension);

    const downloadPNGButton = document.createElement('button');
    downloadPNGButton.innerText = 'Download PNG';
    downloadPNGButton.id = 'btn-download-png';
    downloadPNGButton.classList.add('btn', 'btn-secondary', 'mt-1', 'mr-2');
    downloadPNGButton.style.display = 'block';
    downloadPNGButton.style.marginBottom = '20px';
    downloadPNGButton.onclick = () => downloadPNG(svg, tableNumber, dimension);

    return [downloadSVGButton, downloadPNGButton];
}