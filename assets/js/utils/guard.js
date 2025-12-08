import { getCurrentUsers } from "../utils/storage.js";
import { toast } from "./alert.js";

const currentUsers = getCurrentUsers();
const adminPages = "admin-dashboard.html";
const userPages = "jobs.html";

// Not logged in
if (currentUsers.length === 0) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// Admin-only access
if (
  (window.location.href =
    adminPages && !currentUsers.some((u) => u.role === "admin"))
) {
  toast("Access denied! Admins only.");
  window.location.href = "index.html";
}

// User-only access
if (
  (window.location.href =
    userPages && currentUsers.some((u) => u.role === "admin"))
) {
  window.location.href = "admin-dashboard.html";
}
