function convertToRar() {
  const pdfInput = document.getElementById('pdfInput');
  const files = pdfInput.files;

  if (files.length === 0) {
    alert('Por favor, selecione pelo menos um arquivo PDF.');
    return;
  }

  const zipPromises = [];
  const totalFilesToProcess = Math.min(files.length, 300); // Define o limite de 300 arquivos

  async function processFiles() {
    for (let i = 0; i < totalFilesToProcess; i++) {
      const file = files[i];
      const fileName = file.name.replace('.pdf', ''); // Removendo a extensão .pdf

      const zip = new JSZip();
      zip.file(`${fileName}.pdf`, file);

      const content = await zip.generateAsync({ type: 'blob' });
      const zipFileName = `${fileName}.rar`;
      saveAs(content, zipFileName); // Salva o arquivo RAR no cliente

      if (i < totalFilesToProcess - 1) {
        await new Promise((resolve) => setTimeout(resolve, 250)); // Aguarda 0.25 segundos
      }
    }
  }

  processFiles();
}
