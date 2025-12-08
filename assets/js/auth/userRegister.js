import { toast } from "../utils/alert.js";
import { getUsers, saveUser } from "../utils/storage.js";

const registerForm = document.querySelector("#registerForm");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// ---------- Validation Function ----------
function checkAuth(name, email, password) {
  if (!name || !email || !password) {
    toast("Please fill all fields!");
    return false;
  }

  if (name.length < 3) {
    toast("Name must be at least 3 characters");
    return false;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    toast("Invalid email address!");
    return false;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    toast(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character!"
    );
    return false;
  }

  const users = getUsers();
  const existName = users.find(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );
  const existEmail = users.find((u) => u.email === email);

  if (existName || existEmail) {
    toast("User with this name or email already exists!");
    return false;
  }

  return true;
}

// ---------- Submit Handler ----------
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameEl = username.value.trim();
  const emailEl = email.value.trim();
  const passwordEl = password.value.trim();

  if (!checkAuth(nameEl, emailEl, passwordEl)) return;

  const newUser = {
    name: nameEl,
    email: emailEl,
    password: passwordEl,
    role: "user",
  };

  saveUser(newUser);

  toast("Registration successful!");

  registerForm.reset();

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
