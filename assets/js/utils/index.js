import { toast } from "./alert.js";
import { getCurrentUsers } from "./storage.js";

const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const apply = document.querySelectorAll("#apply");

loginBtn.addEventListener("click", () => {
  window.location.href = "login.html";
});

signupBtn.addEventListener("click", () => {
  window.location.href = "register.html";
});

apply.forEach((button) => {
  button.addEventListener("click", () => {
    const users = getCurrentUsers();

    if (users.length === 0) {
      toast("Please login first");
      return;
    }

    window.location.href = "jobs.html";
  });
});
