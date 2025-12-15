const API_URL = "https://bank-statement-converter-moih.onrender.com/upload";

async function uploadPDF() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const downloads = document.getElementById("downloads");

  if (!fileInput.files.length) {
    status.innerText = "❌ Please select a PDF file";
    return;
  }

  status.innerText = "⏳ Processing...";
  downloads.style.display = "none";

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    document.getElementById("csvLink").href =
      "https://bank-statement-converter-moih.onrender.com" + data.download_csv;

    document.getElementById("excelLink").href =
      "https://bank-statement-converter-moih.onrender.com" + data.download_excel;

    status.innerText = "✅ Conversion successful!";
    downloads.style.display = "block";

  } catch (err) {
    status.innerText = "❌ Server error. Try again.";
  }
}
