import { admins } from "../js/auth/adminLogin.js";
import { toast } from "../js/utils/alert.js";
import { getCurrentUsers } from "../js/utils/storage.js";

const profileBtn = document.getElementById("profileBtn");
const logoutBtn = document.getElementById("logoutBtn");
const profileModal = document.getElementById("profileModal");
const closeModal = document.getElementById("closeModal");
const profileData = document.getElementById("profileData");
const adminProfile = document.getElementById("adminProfile");

const currentUsers = getCurrentUsers();
const currentAdmin = currentUsers.find((a) => a.role === "admin");
const admin = admins;

// inject profile info

if (currentAdmin) {
  profileData.innerHTML = `
        <p><span class="font-medium">Name:</span> ${currentAdmin.name}</p>
        <p><span class="font-medium">Email:</span> ${currentAdmin.email}</p>
    `;
}

// profile modal toggle

profileBtn.addEventListener("click", () => {
  profileModal.classList.remove("opacity-0", "pointer-events-none");
  profileModal.querySelector("div").classList.remove("scale-90");
  profileModal.querySelector("div").classList.add("scale-100");
});

closeModal.addEventListener("click", () => {
  profileModal.classList.add("opacity-0", "pointer-events-none");
  profileModal.querySelector("div").classList.remove("scale-100");
  profileModal.querySelector("div").classList.add("scale-90");
});

// all admin show

function allAdmin() {
  adminProfile.innerHTML = "";

  admins.forEach((admin) => {
    const isActive = currentUsers.some((u) => u.email === admin.email);

    adminProfile.innerHTML += `
      <div class="bg-white rounded-xl shadow-md p-6 border w-80">
        <h4 class="text-lg font-semibold mb-4">Admin Profile</h4>
        <div class="space-y-2">
        <p><span class="font-medium">ID:</span> ${admin.id}</p>
          <p>
            <span class="font-medium">Name:</span> ${admin.name}
            <span class="${
              isActive ? "text-green-600" : "text-red-600"
            } font-medium">(${isActive ? "Active" : "Inactive"})</span>
          </p>
          <p><span class="font-medium">Email:</span> ${admin.email}</p>
          <p><span class="font-medium">Role:</span> Admin</p>
        </div>
      </div>
    `;
  });
}

allAdmin();

// logout button

if (!currentAdmin) {
  toast("Please login first");
  window.location.href = "login.html";
}

logoutBtn.addEventListener("click", () => {
  const updatedUsers = currentUsers.filter(
    (u) => u.email !== currentAdmin.email
  );
  localStorage.setItem("currentUsers", JSON.stringify(updatedUsers));

  toast("Admin logged out successfully!");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
});

// prevent back button

window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", () => {
  const users = getCurrentUsers();
  const adminCheck = users.find((u) => u.role === "admin");
  if (!adminCheck) {
    window.location.href = "login.html";
  }
});
