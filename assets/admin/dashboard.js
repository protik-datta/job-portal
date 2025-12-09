import { getJobList, getJobSearch, loadAllIndustryJob } from "../js/utils/api.js";
import { getCurrentUsers, getUsers } from "../js/utils/storage.js";

const totalUsers = document.querySelector("#totalUsers");
const activeJobs = document.querySelector("#activeJobs");
const activeUsers = document.querySelector("#activeUsers");
const tableBodyUsers = document.querySelector("#tableBodyUsers");

function dashboardDetails() {
  const users = getUsers();
  const currentUsers = getCurrentUsers();
  totalUsers.textContent = users.length;
  activeUsers.textContent = currentUsers.length;

  loadAllIndustryJob()
    .then((allData) => {
      const totalJobs = allData.reduce((sum, item) => sum + item.total, 0);
      if(totalJobs){
        activeJobs.textContent = totalJobs;
      }else{
        activeJobs.textContent = 'Loading...'
      }
    })
    .catch((err) => console.error(err));
}

dashboardDetails();


function showUsers() {
  const users = getUsers();
  const currentUsers = getCurrentUsers();

  tableBodyUsers.innerHTML = "";

  users.forEach((user) => {
    const isActive = currentUsers.some((u) => u.email === user.email);

    const row = document.createElement("tr");
    row.classList.add("border-b");

    row.innerHTML = `
      <td class="px-4 py-2">${user.name}</td>
      <td class="px-4 py-2">${user.email}</td>
      <td class="px-4 py-2">${user.role.toUpperCase()}</td>
      <td class="px-4 py-2">
          <span class="font-medium ${
            isActive ? "text-green-600" : "text-red-600"
          }">
            ${isActive ? "Active" : "Inactive"}
          </span>
      </td>
      <td class="px-4 py-2">
          <button class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition infoBtn">
            Info
          </button>
      </td>
    `;

    tableBodyUsers.appendChild(row);

    // Add event listener for info button
    row.querySelector(".infoBtn").addEventListener("click", () => {
      localStorage.setItem("selectedUser", JSON.stringify(user));
      window.location.href = "admin-user-details.html";
    });
  });
}

showUsers();
lucide.replace();
