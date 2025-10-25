async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  msg.innerText = "Logging in...";

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const text = await res.text();

  if (text.includes("Dashboard") || text.includes("index.php")) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    msg.innerText = "Invalid credentials!";
  }
}

async function loadDashboard() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
    return;
  }

  const res = await fetch("/api/dashboard");
  const html = await res.text();

  // Example: Extract balance from old portal page
  const balanceMatch = html.match(/Balance:\s*₹?(\d+(\.\d+)?)/i);
  document.getElementById("balance").innerText = balanceMatch ? balanceMatch[1] : "N/A";

  // Add any other parsing logic (e.g., username, last recharge)
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
