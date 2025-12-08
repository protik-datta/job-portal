// save user
export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exist = users.find(
    (u) => u.email === user.email || u.name === user.name
  );
  if (exist) return false;
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

// get all users
export function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// add current logged-in user
export function addCurrentUser(user) {
  const currentUsers = JSON.parse(localStorage.getItem("currentUsers")) || [];
  const exists = currentUsers.find((u) => u.email === user.email);
  if (!exists) {
    currentUsers.push(user);
    localStorage.setItem("currentUsers", JSON.stringify(currentUsers));
  }
}

// get all current users
export function getCurrentUsers() {
  return JSON.parse(localStorage.getItem("currentUsers")) || [];
}

// remove a current user
export function removeCurrentUser(email) {
  let currentUsers = getCurrentUsers().filter((u) => u.email !== email);
  localStorage.setItem("currentUsers", JSON.stringify(currentUsers));
}

// logout a single user
export function logoutUser(email) {
  removeCurrentUser(email);
  window.location.href = "index.html";
}
