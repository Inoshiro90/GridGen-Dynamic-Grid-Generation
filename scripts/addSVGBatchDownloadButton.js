// Batch-Download-Button hinzufügen
function addSVGBatchDownloadButton(container, dimension) {
	const batchDownloadButton = document.createElement('button');
	batchDownloadButton.innerText = 'Download All SVGs';
	batchDownloadButton.id = 'btn-download-all-svgs';
	batchDownloadButton.classList.add('btn', 'btn-primary', 'mt-2');
	batchDownloadButton.style.display = 'block';

	batchDownloadButton.onclick = () => downloadAllSVGsAsZip(dimension);

	container.appendChild(batchDownloadButton);
}
