import { getCurrentUsers, getUsers } from "../js/utils/storage.js";

const user = JSON.parse(localStorage.getItem("selectedUser"));

const userDetails = document.querySelector("#userDetails");

if(user){
    const currentUser = getCurrentUsers()
    const users = getUsers()
    const isActive = currentUser.some((u) => u.email === user.email);
    userDetails.innerHTML = `
    <div class="flex items-center mb-6 gap-6">
            <div>
              <h4 class="text-lg font-bold" id="userName">${user.name}</h4>
              <p class="text-gray-500 mb-2" id="userEmail">${user.email}</p>
              <p class="text-gray-500" id="userRole">Role: ${user.role}</p>
              <p class="text-gray-500" id="userStatus">Status: ${
                isActive ? "Active" : "Inactive"
              }</p>
            </div>
          </div>

          <div class="mt-6 flex gap-4">
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit User
            </button>
            <button
              class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete User
            </button>
    </div>
    `;
}