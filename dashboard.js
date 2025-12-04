// Sidebar Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const toggleIcon = document.querySelector(".toggle-icon");

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("collapsed");

      // Change arrow direction
      if (sidebar.classList.contains("collapsed")) {
        toggleIcon.textContent = "›";
      } else {
        toggleIcon.textContent = "‹";
      }
    });
  }
});

// dashboard.js - Main Dashboard Functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard loaded");

  // Check if user is logged in
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log("Current user from session", currentUser);

  if (!currentUser) {
    console.log("No user found in sessionStorage");
    alert("Please log in first");
    window.location.href = "index.html";
    return;
  }

  console.log("User found:", currentUser);

  // Set user info
  const userNameElement = document.getElementById("userName");
  const userInitialsElement = document.getElementById("userInitials");
  const userEmailElement = document.getElementById("userEmail");

  console.log("Elements found:", {
    userNameElement: !!userNameElement,
    userInitialsElement: !!userInitialsElement,
    userEmailElement: !!userEmailElement,
  });

  if (userNameElement) {
    userNameElement.textContent = currentUser.name;
    console.log("Set username to:", currentUser.name);
  }
  if (userInitialsElement) {
    userInitialsElement.textContent = currentUser.initials || "U";
    console.log("Set initials to:", currentUser.initials);
  }

  if (userEmailElement) {
    userEmailElement.textContent = currentUser.email;
    console.log("Set email to:", currentUser.email);
  }
});
// Initialize stats from localStorage
const userStats = JSON.parse(
  localStorage.getItem(`stats_${currentUser.email}`)
) || {
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  overdueTasks: 0,
};

// Update stats display
updateStatsDisplay(userStats);

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
}

// Load recent tasks
loadRecentTasks(currentUser.email);

function updateStatsDisplay(stats) {
  const elements = {
    totalTasks: document.getElementById("totalTasks"),
    completedTasks: document.getElementById("completedTasks"),
    pendingTasks: document.getElementById("pendingTasks"),
    overdueTasks: document.getElementById("overdueTasks"),
  };

  for (const [key, element] of Object.entries(elements)) {
    if (element) {
      element.textContent = stats[key] || 0;
    }
  }
}

function loadRecentTasks(userEmail) {
  const tasks = JSON.parse(localStorage.getItem(`tasks_${userEmail}`)) || [];
  const recentTasksContainer = document.getElementById("recentTasks");

  if (!recentTasksContainer) return;

  recentTasksContainer.innerHTML = "";

  const recentTasks = tasks
    .slice(0, 3)
    .map(
      (task) => `
    <div class="recent-task-item">
      <div class="task-info">
        <h4>${task.title}</h4>
        <p>Due: ${task.dueDate}</p>
      </div>
      <span class="task-status ${task.status.toLowerCase()}">${
        task.status
      }</span>
    </div>
  `
    )
    .join("");

  recentTasksContainer.innerHTML = recentTasks;
}
