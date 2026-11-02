const planForm = document.querySelector("#plan-form");
const energyInput = document.querySelector("#energy");
const timeInput = document.querySelector("#time");
const deadlineInput = document.querySelector("#deadline");
const resultBox = document.querySelector("#result");
const resultTitle = document.querySelector("#result-title");
const resultText = document.querySelector("#result-text");
const resultIcon = document.querySelector("#result-icon");
const resultSteps = document.querySelector("#result-steps");
const previousPlanText = document.querySelector("#previous-plan");
const planCountText = document.querySelector("#plan-count");

let currentPlan = "";
let previousPlan = "";
let plansCreated = 0;

const plans = {
  reset: {
    title: "Reset Break",
    icon: "R",
    text: "Your energy matters. Recharge first so the next study session is more useful.",
    steps: [
      "Step away from the screen for ten minutes.",
      "Drink water and have a small snack.",
      "Return for one easy review task.",
    ],
  },
  priority: {
    title: "Priority Sprint",
    icon: "!",
    text: "A deadline is close, so use your time on the most urgent task first.",
    steps: [
      "Write down the one thing due today.",
      "Work on it without switching tasks.",
      "Submit or save your progress before stopping.",
    ],
  },
  focus: {
    title: "Deep Focus Session",
    icon: "F",
    text: "You have the energy and time for a longer, distraction-free work session.",
    steps: [
      "Choose one important assignment.",
      "Set a 45-minute focus timer.",
      "Use the final 15 minutes to review your work.",
    ],
  },
  review: {
    title: "Quick Review",
    icon: "Q",
    text: "A short review will keep you moving without making today feel overwhelming.",
    steps: [
      "Open your notes from the latest class.",
      "Highlight three important ideas.",
      "Write one question to revisit later.",
    ],
  },
};

function choosePlan(energy, availableTime, deadline) {
  if (energy === "low") {
    return "reset";
  } else if (deadline === "today" && availableTime >= 30) {
    return "priority";
  } else if (energy === "high" && availableTime >= 60) {
    return "focus";
  } else {
    return "review";
  }
}

function showPlan(planName) {
  const selectedPlan = plans[planName];

  previousPlan = currentPlan;
  currentPlan = selectedPlan.title;
  plansCreated += 1;

  resultBox.className = `result result-${planName}`;
  resultTitle.textContent = selectedPlan.title;
  resultText.textContent = selectedPlan.text;
  resultIcon.textContent = selectedPlan.icon;
  resultSteps.innerHTML = "";

  selectedPlan.steps.forEach((step) => {
    const listItem = document.createElement("li");
    listItem.textContent = step;
    resultSteps.appendChild(listItem);
  });

  previousPlanText.textContent = previousPlan
    ? `Previous plan: ${previousPlan}`
    : "This is your first plan.";
  planCountText.textContent = `Plans created: ${plansCreated}`;
}

planForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const energy = energyInput.value;
  const availableTime = Number(timeInput.value);
  const deadline = deadlineInput.value;
  const selectedPlan = choosePlan(energy, availableTime, deadline);

  showPlan(selectedPlan);
});
