const toastEl = document.querySelector("#toast-default");
const closeBtn = document.querySelector("#close-toast");
const toastMsg = document.querySelector("#toastMsg");

closeBtn.addEventListener("click", () => {
  toastEl.classList.remove("translate-y-0", "opacity-100");
  toastEl.classList.add("-translate-y-12", "opacity-0");
});

/**
 * Show toast message
 * @param {string} message
 */
export function toast(message) {
  toastMsg.textContent = message;

  toastEl.classList.remove("-translate-y-12", "opacity-0");
  toastEl.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toastEl.classList.remove("translate-y-0", "opacity-100");
    toastEl.classList.add("-translate-y-12", "opacity-0");
  }, 5000);
}
