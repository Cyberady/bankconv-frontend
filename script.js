const BACKEND_URL = "https://bank-statement-converter-moih.onrender.com";

async function convert() {
  const fileInput = document.getElementById("pdfFile");
  const status = document.getElementById("status");
  const csvLink = document.getElementById("csvLink");
  const excelLink = document.getElementById("excelLink");

  if (!fileInput.files.length) {
    alert("Please select a PDF file");
    return;
  }

  status.textContent = "⏳ Processing...";
  csvLink.hidden = true;
  excelLink.hidden = true;

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      status.textContent = "❌ Failed";
      return;
    }

    status.textContent = "✅ Done!";

    csvLink.href = BACKEND_URL + data.download_csv;
    excelLink.href = BACKEND_URL + data.download_excel;

    csvLink.hidden = false;
    excelLink.hidden = false;

  } catch (err) {
    status.textContent = "❌ Server not reachable";
  }
}
