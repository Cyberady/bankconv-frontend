async function uploadPDF() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const downloads = document.getElementById("downloads");

  if (!fileInput.files.length) {
    status.innerHTML = "❌ Please select a PDF file";
    return;
  }

  status.innerHTML = "⏳ Processing statement...";
  downloads.style.display = "none";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch(
      "https://bank-statement-converter-moih.onrender.com/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      status.innerHTML = "❌ Failed to process statement";
      return;
    }

    status.innerHTML = "✅ Done!";

    document.getElementById("csvLink").href = data.download_csv;
    document.getElementById("excelLink").href = data.download_excel;

    downloads.style.display = "flex";
  } catch (err) {
    status.innerHTML = "❌ Server error";
  }
}
