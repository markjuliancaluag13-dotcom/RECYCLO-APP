// Basic data
let ecoPoints = 0;
let badge = "None";
const tips = [
  "Recycling 1 ton of paper saves 17 trees.",
  "Plastic takes 450 years to decompose.",
  "Rinse containers before putting them in the bin.",
  "Separate plastic and paper for easy recycling."
];

const leaderboard = [
  { name: "School A", points: 120 },
  { name: "School B", points: 90 },
  { name: "School C", points: 75 }
];

// Parental control
function checkAge() {
  const age = parseInt(document.getElementById("age").value);
  const msg = document.getElementById("age-msg");
  if (isNaN(age)) {
    msg.textContent = "Please enter your age.";
    return;
  }
  if (age < 13) {
    msg.textContent = "Under 13: Parental controls ON.";
  } else {
    msg.textContent = "Access granted.";
  }
}

// Scan barcode
function scanBarcode() {
  const barcode = document.getElementById("barcode").value.trim();
  const result = document.getElementById("scan-result");

  // Validation checks
  if (!barcode) {
    result.textContent = "Please enter a barcode number.";
    result.style.color = "red";
    return;
  }

  // Check digits only
  if (!/^\d+$/.test(barcode)) {
    result.textContent = "Barcode must contain numbers only.";
    result.style.color = "red";
    return;
  }

  // Check if 13 numbers 
  if (barcode.length !== 13) {
    result.textContent = "Error: Barcode must be exactly 13 digits .";
    result.style.color = "red";
    return;
  }

  // --- Kung valid barcode ---
  const lastDigit = parseInt(barcode[barcode.length - 1]);
  let material = "";

  if (lastDigit % 2 === 0) {
    material = "Plastic";
    ecoPoints += 10;
  } else {
    material = "Paper";
    ecoPoints += 5;
  }

  result.textContent = `Material: ${material}. You earned ${material === "Plastic" ? 10 : 5} points!`;
  result.style.color = "green";

  updatePoints();
}

// Update eco-points and badge
function updatePoints() {
  document.getElementById("points").textContent = `Points: ${ecoPoints}`;

  if (ecoPoints >= 100) {
    badge = "Gold ";
  } else if (ecoPoints >= 50) {
    badge = "Silver ";
  } else if (ecoPoints >= 20) {
    badge = "Bronze ";
  } else {
    badge = "None";
  }

  document.getElementById("badge").textContent = `Badge: ${badge}`;
}

// Show leaderboard
function showLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  list.innerHTML = "";
  leaderboard.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.points} pts`;
    list.appendChild(li);
  });
}

// Show random tip
function showTip() {
  const random = Math.floor(Math.random() * tips.length);
  document.getElementById("tip").textContent = tips[random];
}
