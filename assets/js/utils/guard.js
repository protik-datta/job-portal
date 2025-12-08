import { getCurrentUsers } from "../utils/storage.js";

const currentUsers = getCurrentUsers();
const adminPages = ["admin-dashboard.html"];
const currentPage = window.location.pathname.split("/").pop();

// Not logged in
if (currentUsers.length === 0) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// Admin-only access
if (
  adminPages.includes(currentPage) &&
  !currentUsers.some((u) => u.role === "admin")
) {
  alert("Access denied! Admins only.");
  window.location.href = "index.html";
}

// User-only access
const userPages = ["jobs.html", "profile.html"];
if (
  userPages.includes(currentPage) &&
  currentUsers.some((u) => u.role === "admin")
) {
  window.location.href = "admin-dashboard.html";
}
