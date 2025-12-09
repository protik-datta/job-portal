import { getJobList } from "../utils/api.js";
import {
  getCurrentUsers,
  getSavedJobs,
  logoutUser,
  saveJobForUser,
} from "../utils/storage.js";

const profileBtn = document.querySelector("#profileBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const profileModal = document.querySelector("#profileModal");
const closeModal = document.querySelector("#closeModal");
const userData = document.querySelector("#userData");

const savedJobsBtn = document.querySelector("#savedJobsBtn");
const savedJobsModal = document.querySelector("#savedJobsModal");
const savedJobsList = document.querySelector("#savedJobsList");
const closeSavedJobs = document.querySelector("#closeSavedJobs");

const jobCards = document.querySelector("#jobCards");

const currentUsers = getCurrentUsers();
if (!currentUsers.length) window.location.replace("index.html");
const currentUser = currentUsers[0];

// -------------- SAVED JOBS --------------

function openSavedJobs() {
  renderSavedJobs();
  savedJobsModal.classList.remove("opacity-0", "pointer-events-none");
  setTimeout(() => {
    savedJobsModal.querySelector("div").classList.remove("scale-90");
    savedJobsModal.querySelector("div").classList.add("scale-100");
  }, 10);
}

savedJobsBtn.addEventListener("click", openSavedJobs);

closeSavedJobs.addEventListener("click", () => {
  savedJobsModal.querySelector("div").classList.remove("scale-100");
  savedJobsModal.querySelector("div").classList.add("scale-90");
  setTimeout(() => {
    savedJobsModal.classList.add("opacity-0", "pointer-events-none");
  }, 200);
});

function renderSavedJobs() {
  const jobs = getSavedJobs(currentUser.email);
  savedJobsList.innerHTML = "";

  if (!jobs.length) {
    savedJobsList.innerHTML = `<p>No saved jobs yet.</p>`;
    return;
  }

  jobs.forEach((job) => {
    savedJobsList.innerHTML += `
      <div class="p-4 border rounded-lg shadow-sm hover:shadow transition bg-white">
        <h3 class="font-semibold text-gray-800">${job.title}</h3>
        <p class="text-sm text-gray-600">Company: ${job.company_name}</p>
        <p class="text-sm text-gray-500 mb-2">Location: ${job.candidate_required_location}</p>
        <button class="text-red-600 hover:underline text-sm font-medium remove-btn" data-id="${job.id}">Remove</button>
      </div>
    `;
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const jobId = String(e.target.dataset.id);
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find((u) => u.email === currentUser.email);
      user.savedJobs = user.savedJobs.filter((j) => String(j.id) !== jobId);
      localStorage.setItem("users", JSON.stringify(users));
      renderSavedJobs();
      updateSavedJobsCount();
    });
  });
}

function updateSavedJobsCount() {
  const counter = savedJobsBtn.nextElementSibling;
  if (!counter) return;
  const total = getSavedJobs(currentUser.email).length;
  counter.textContent = total;
}

updateSavedJobsCount();

// -------------- SAVED JOBS --------------

// -------------- PROFILE BUTTON --------------

profileBtn.addEventListener("click", () => {
  profileModal.classList.remove("opacity-0", "pointer-events-none");
  profileModal.querySelector("div").classList.remove("scale-90");
  profileModal.querySelector("div").classList.add("scale-100");

  const user = currentUser;
  userData.innerHTML = `
    <p><span class="font-medium">Name:</span> ${user.name}</p>
    <p><span class="font-medium">Email:</span> ${user.email}</p>
    <p><span class="font-medium">Password:</span> ${user.password}</p>
  `;
});

closeModal.addEventListener("click", () => {
  profileModal.querySelector("div").classList.remove("scale-100");
  profileModal.querySelector("div").classList.add("scale-90");
  profileModal.classList.add("opacity-0", "pointer-events-none");
});

// -------------- PROFILE BUTTON --------------

// -------------- LOGOUT BUTTON --------------

logoutBtn.addEventListener("click", () => logoutUser(currentUser.email));

window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", () => {
  if (!getCurrentUsers().length) window.location.replace("index.html");
});

// -------------- LOGOUT BUTTON--------------

// -------------- JOB LIST RENDER --------------

getJobList
  .then((jobs) => {
    jobCards.innerHTML = "";
    jobs.forEach((job) => {
      const card = document.createElement("div");
      card.className =
        "bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border";
      card.innerHTML = `
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-lg font-semibold">${job.title}</h4>
          <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 whitespace-nowrap">
            ${job.job_type.replace(/[_-]/g, " ")}
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-3">${job.company_name}</p>
        <p class="text-sm text-gray-500 mb-6">Location: ${
          job.candidate_required_location
        }</p>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700">${
            job.salary || "Not Mentioned"
          }</span>
          <div class="flex gap-3">
            <button class="text-green-600 font-semibold hover:underline flex items-center gap-1 saveBtn">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/>
                <path d="m9 10 2 2 4-4"/>
              </svg>
              Save
            </button>
            <button class="text-blue-600 font-semibold hover:underline flex items-center gap-1 applyBtn" data-id="${
              job.id
            }">
              Apply →
            </button>
          </div>
        </div>
      `;
      jobCards.appendChild(card);

      card.querySelector(".saveBtn").addEventListener("click", () => {
        saveJobForUser(currentUser.email, job);
        updateSavedJobsCount();
      });

      card.querySelector(".applyBtn").addEventListener("click", (e) => {
        window.location.href = `job-details.html?id=${e.currentTarget.dataset.id}`;
      });
    });
  })
  .catch(console.log);

// -------------- JOB LIST RENDER --------------

lucide.replace();
