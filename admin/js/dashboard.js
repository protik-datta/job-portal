import { getJobList } from "../../assets/js/utils/api.js";
import { getCurrentUsers, getUsers } from "../../assets/js/utils/storage.js";

const totalUsers = document.querySelector("#totalUsers");
const activeJobs = document.querySelector("#activeJobs");
const activeUsers = document.querySelector("#activeUsers");
const tableBodyUsers = document.querySelector("#tableBodyUsers");

function dashboardDetails() {
  const users = getUsers();
  const currentUsers = getCurrentUsers()
  totalUsers.textContent = users.length;

  getJobList.then((dataNum) => {
    activeJobs.textContent = dataNum.length;
  });

  activeUsers.textContent = currentUsers.length;
}

dashboardDetails();

function showUsers() {
  const users = getUsers();
  const currentUsers = getCurrentUsers();

  tableBodyUsers.innerHTML = "";

  users.forEach((user) => {
    const isActive = currentUsers.some((u) => u.email === user.email);

    tableBodyUsers.innerHTML += `
      <tr class="border-b">
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
      </tr>
    `;
  });
}

showUsers();
lucide.replace();
