import { toast } from "../utils/alert.js";
import { getUsers, addCurrentUser } from "../utils/storage.js";
import { admins } from "./adminLogin.js";

const loginForm = document.querySelector("#signupForm");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameVal = username.value.trim();
  const passwordVal = password.value.trim();

  if (!nameVal || !passwordVal) {
    toast("Please fill all fields!");
    return;
  }

  const adminUser = admins.find(
    (a) => a.name === nameVal && a.password === passwordVal
  );

  if (adminUser) {
    addCurrentUser(adminUser);
    toast("Admin login successful!");
    setTimeout(() => {
      window.location.href = "admin-dashboard.html";
    }, 1200);
    return;
  }

  const users = getUsers();
  const foundUser = users.find(
    (u) => u.name === nameVal && u.password === passwordVal
  );

  if (!foundUser) {
    toast("Invalid username or password!");
    return;
  }

  addCurrentUser(foundUser);
  toast("User login successful!");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);

  loginForm.reset();
});
