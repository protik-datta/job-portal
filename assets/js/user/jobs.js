import { getJobList } from "../utils/api.js";
import { getCurrentUsers, logoutUser } from "../utils/storage.js";

const profileBtn = document.querySelector("#profileBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const profileModal = document.querySelector("#profileModal");
const closeModal = document.querySelector("#closeModal");
const userData = document.querySelector("#userData");

const savedJobsBtn = document.querySelector("#savedJobsBtn");
const savedJobsModal = document.querySelector("#savedJobsModal");
const closeSavedJobs = document.querySelector("#closeSavedJobs");
const savedJobsList = document.querySelector("#savedJobsList");

const jobCards = document.querySelector("#jobCards");

// ------------------- saved jobs modal -----------------

// savedJobsBtn.addEventListener("click", () => {
//   savedJobsModal.classList.remove("opacity-0", "pointer-events-none");
//   savedJobsModal.querySelector("div").classList.remove("scale-90");
//   savedJobsModal.querySelector("div").classList.add("scale-100");

//   const savedJobs = [

//   ];

//   // Inject saved jobs dynamically
//   if (savedJobs.length > 0) {
//     savedJobsList.innerHTML = savedJobs
//       .map(
//         (job) => `
//       <div class="border-b pb-2 last:border-b-0">
//         <p class="font-medium text-gray-700">${job.title}</p>
//         <p class="text-gray-500 text-sm">${job.company} • ${job.type}</p>
//       </div>
//     `
//       )
//       .join("");
//   } else {
//     savedJobsList.innerHTML = "<p>No saved jobs yet.</p>";
//   }
// });

// // Close modal
// function hideSavedJobs() {
//   savedJobsModal.querySelector("div").classList.remove("scale-100");
//   savedJobsModal.querySelector("div").classList.add("scale-90");
//   savedJobsModal.classList.add("opacity-0", "pointer-events-none");
// }

// closeSavedJobs.addEventListener("click", hideSavedJobs);
// savedJobsModal.addEventListener("click", (e) => {
//   if (e.target === savedJobsModal) hideSavedJobs();
// });

// -------------------- Profile Modal --------------------
const currentUsers = getCurrentUsers();
if (currentUsers.length === 0) {
  window.location.replace("index.html");
}

profileBtn.addEventListener("click", () => {
  profileModal.classList.remove("opacity-0", "pointer-events-none");
  profileModal.querySelector("div").classList.remove("scale-90");
  profileModal.querySelector("div").classList.add("scale-100");

  const user = currentUsers[0];

  if (user) {
    userData.innerHTML = `
      <p><span class="font-medium">Name:</span> ${user.name}</p>
      <p><span class="font-medium">Email:</span> ${user.email}</p>
      <p><span class="font-medium">Password:</span> ${user.password}</p>
    `;
  }
});

function hideModal() {
  profileModal.querySelector("div").classList.remove("scale-100");
  profileModal.querySelector("div").classList.add("scale-90");
  profileModal.classList.add("opacity-0", "pointer-events-none");
}

closeModal.addEventListener("click", hideModal);

// -------------------- Logout --------------------
const currentUser = currentUsers[0];

logoutBtn.addEventListener("click", () => {
  logoutUser(currentUser.email);
});
// -------------------- Prevent Back Button ---------
window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", () => {
  const users = getCurrentUsers();
  if (users.length === 0) {
    window.location.replace("index.html");
  }
});

// fetching jobs data and display

getJobList
  .then((jobs) => {
    jobs.forEach((job) => {
      jobCards.innerHTML += `<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border">
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-lg font-semibold">${job.title}</h4>
          <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 whitespace-nowrap">
            ${job.job_type
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
              .replace(/[_-]/g, " ")}
          </span>
        </div>
        <p class="text-sm text-gray-600 mb-3">${job.company_name}</p>
        <p class="text-sm text-gray-500 mb-6">
          Candidate required location : ${job.candidate_required_location}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700 whitespace-wrap">
            ${job.salary ? `${job.salary}` : `Not Mentioned`}
          </span>
          <div class="flex gap-3">
            <button
              class="text-green-600 font-semibold hover:underline flex items-center gap-1"
              id="savedJobsBtn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-bookmark-check"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
                <path d="m9 10 2 2 4-4" />
              </svg>
              Save
            </button>
            <button class="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Apply →
            </button>
          </div>
        </div>
      </div>`;
      console.log(job);
    });
  })
  .catch((err) => console.log(err));

// Activate lucide icons
lucide.replace();
