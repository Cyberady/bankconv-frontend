const API_BASE = "https://bank-statement-converter-moih.onrender.com";

async function convert() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const downloads = document.getElementById("downloads");

  if (!fileInput.files.length) {
    status.innerText = "Please upload a PDF file";
    return;
  }

  status.innerText = "⏳ Converting...";
  downloads.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail || "Failed");

    document.getElementById("csvLink").href = API_BASE + data.download_csv;
    document.getElementById("excelLink").href = API_BASE + data.download_excel;

    downloads.classList.remove("hidden");
    status.innerText = "✅ Done!";
  } catch (err) {
    status.innerText = "❌ Conversion failed";
  }
}
