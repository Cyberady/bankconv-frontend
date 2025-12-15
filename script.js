const API_URL = "https://bank-statement-converter-moih.onrender.com/upload";

function scrollToApp() {
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}

async function upload() {
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");
  const downloads = document.getElementById("downloads");

  if (!fileInput.files.length) {
    alert("Please select a PDF");
    return;
  }

  status.innerText = "⏳ Processing...";
  downloads.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.detail || "Failed");

    status.innerText = "✅ Done!";

    document.getElementById("csvLink").href = data.download_csv;
    document.getElementById("excelLink").href = data.download_excel;

    downloads.classList.remove("hidden");

  } catch (err) {
    status.innerText = "❌ Error: " + err.message;
  }
}
