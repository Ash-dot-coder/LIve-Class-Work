document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("autoSaveTextarea");
  const status = document.getElementById("status");
  const storeText = "autosave-text";
  const clearBtn = document.getElementById("clearButton");

  const savedText = localStorage.getItem(storeText);
  if (savedText) {
    textArea.value = savedText;
  }

  const saveToLocalStorage = () => {
    localStorage.setItem(storeText, textArea.value);
    status.textContent = "Saved!";
    setTimeout(() => (status.textContent = ""), 1000);
  };

  textArea.addEventListener("input", () => {
    saveToLocalStorage();
  });

  clearBtn.addEventListener("click", () => {
    textArea.value = "";
    localStorage.removeItem(storeText);
    status.textContent = "Cleared!";
    setTimeout(() => (status.textContent = ""), 1000);
  });

  window.addEventListener("beforeunload", saveToLocalStorage);
  console.log(status);
});
