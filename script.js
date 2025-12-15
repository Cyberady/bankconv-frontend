const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const statusText = document.getElementById("status");
const downloads = document.getElementById("downloads");
const csvLink = document.getElementById("csvLink");
const excelLink = document.getElementById("excelLink");

uploadBtn.onclick = () => fileInput.click();

fileInput.onchange = async () => {
  const file = fileInput.files[0];
  if (!file) return;

  statusText.innerText = "⏳ Processing...";
  downloads.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("https://bank-statement-converter-moih.onrender.com/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      statusText.innerText = "❌ Failed to convert";
      return;
    }

    statusText.innerText = "✅ Done!";
    csvLink.href = "https://bank-statement-converter-moih.onrender.com" + data.download_csv;
    excelLink.href = "https://bank-statement-converter-moih.onrender.com" + data.download_excel;
    downloads.classList.remove("hidden");

  } catch (err) {
    statusText.innerText = "❌ Server error";
  }
};
