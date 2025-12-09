import { seeJobDetails } from "../utils/api.js";

const jobDetails = document.querySelector("#jobDetails");
const backBtn = document.querySelector("#backBtn");

// Check sessionStorage first
let j = JSON.parse(sessionStorage.getItem("selectedJob"));

if (!j) {
  const params = new URLSearchParams(window.location.search);
  const jobId = parseInt(params.get("id"));

  seeJobDetails(jobId)
    .then((job) => renderJobDetails(job))
    .catch((err) => console.log(err));
} else {
  renderJobDetails(j);
}

function renderJobDetails(j) {
  function jobSkills() {
    if (!j.tags || j.tags.length === 0) return "<li>Not specified</li>";
    return j.tags.map((tag) => `<li>${tag}</li>`).join("");
  }

  jobDetails.innerHTML = `
    <h2 class="text-3xl font-bold mb-4">${j.title || j.jobTitle}</h2>
    <p class="text-gray-600 mb-2">${j.company_name || j.companyName}</p>
    <p class="text-sm text-gray-500 mb-4">Location: ${
      j.candidate_required_location || j.jobGeo
    }</p>

    <div class="mb-4">
      <span class="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
        ${j.job_type ? j.job_type.replace(/[_-]/g, " ") : "N/A"}
      </span>
      <span class="ml-4 text-sm font-medium text-gray-700">
        Salary : ${j.salary || "Not Mentioned"}
      </span>
    </div>

    <h3 class="text-xl font-semibold">Job Description</h3>
    <p class="text-gray-700 mb-4">${j.description || j.jobDescription}</p>

    <h3 class="text-xl font-semibold mb-2 mt-5">Required Skills</h3>
    <ul class="list-disc list-inside text-gray-700 mb-6">
      ${jobSkills()}
    </ul>

    <a href="${
      j.url
    }" class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold transition">
      Apply Now
    </a>
  `;
}

backBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  window.location.href = 'jobs.html'
})