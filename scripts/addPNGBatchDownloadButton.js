// Batch-Download-Button hinzufügen
function addPNGBatchDownloadButton(container, dimension) {
	const batchDownloadButton = document.createElement('button');
	batchDownloadButton.innerText = 'Download All PNGs';
	batchDownloadButton.id = 'btn-download-all-pngs';
	batchDownloadButton.classList.add('btn', 'btn-primary', 'mt-2');
	batchDownloadButton.style.display = 'block';

	batchDownloadButton.onclick = () => downloadAllPNGsAsZip(dimension);

	container.appendChild(batchDownloadButton);
}
