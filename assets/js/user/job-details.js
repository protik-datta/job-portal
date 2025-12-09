import { seeJobDetails } from "../utils/api.js";

const params = new URLSearchParams(window.location.search);
const jobId = parseInt(params.get("id"));

const jobDetails = document.querySelector("#jobDetails");

seeJobDetails(jobId).then((j) => {
  function jobSkills() {
    if (!j.tags || j.tags.length === 0) return "<li>Not specified</li>";
    return j.tags.map((tag) => `<li>${tag}</li>`).join("");
  }

  jobDetails.innerHTML = `
    <h2 class="text-3xl font-bold mb-4" id="jobTitle">
            ${j.title}
          </h2>
          <p class="text-gray-600 mb-2" id="companyName">${j.company_name}</p>
          <p class="text-sm text-gray-500 mb-4" id="jobLocation">
            Location: ${j.candidate_required_location}
          </p>

          <div class="mb-4">
            <span
              class="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium"
            >
              ${j.job_type
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace(/[_-]/g, " ")}
            </span>
            <span class="ml-4 text-sm font-medium text-gray-700" id="salary">
              Salary : ${j.salary ? `${j.salary}` : `Not Mentioned`}
            </span>
          </div>

          <h3 class="text-xl font-semibold">Job Description</h3>
          <p class="text-gray-700 mb-4" id="jobDescription">
            ${j.description}
          </p>

          <h3 class="text-xl font-semibold mb-2 mt-5">Required Skills</h3>
          <ul
            class="list-disc list-inside text-gray-700 mb-6"
          >
            ${jobSkills()}
          </ul>

          <a
            href = "${j.url}"
            class="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold transition"
          >
            Apply Now
          </a>
    `;
});