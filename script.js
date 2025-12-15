const API_URL = "https://bank-statement-converter-moih.onrender.com";

function scrollToConverter() {
  document.getElementById("converter").scrollIntoView({ behavior: "smooth" });
}

async function upload() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const csv = document.getElementById("csvLink");
  const excel = document.getElementById("excelLink");

  if (!fileInput.files.length) {
    status.innerText = "❌ Please select a PDF";
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  status.innerText = "⏳ Processing...";
  csv.style.display = "none";
  excel.style.display = "none";

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      status.innerText = "❌ Failed to process file";
      return;
    }

    status.innerText = "✅ Done!";
    csv.href = API_URL + data.download_csv;
    excel.href = API_URL + data.download_excel;

    document.querySelector(".downloads").style.display = "block";

  } catch (err) {
    status.innerText = "❌ Server error";
  }
}
