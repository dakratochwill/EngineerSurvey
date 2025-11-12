/* ======================
   CONFIG & DATA
   ====================== */

const PROGRAMS = {
  biomedical: {
    id: "biomedical",
    label: "Biomedical Engineering",
    badge: "The Innovator for Health",
    blurb:
      "You love helping people through science and tech. You’re curious about the human body and excited by devices and medical advances.",
    link: "https://egr.vcu.edu/departments/biomedical-engineering/"
  },
  chemical: {
    id: "chemical",
    label: "Chemical & Life Science Engineering",
    badge: "The Problem-Solving Chemist",
    blurb:
      "You enjoy experiments, reactions, and material science — solving problems at the molecular level to make a big impact.",
    link: "https://egr.vcu.edu/departments/chemical-life-science-engineering/"
  },
  cs: {
    id: "cs",
    label: "Computer Science",
    badge: "The Coder & Creator",
    blurb:
      "You think in logic and patterns. Building apps, automations, and clever solutions gets you fired up.",
    link: "https://egr.vcu.edu/departments/computer-science/"
  },
  ece: {
    id: "ece",
    label: "Electrical & Computer Engineering",
    badge: "The Tech Tinkerer",
    blurb:
      "You’re fascinated by circuits, electronics, and embedded systems — making the devices behind modern life.",
    link: "https://egr.vcu.edu/departments/electrical-computer-engineering/"
  },
  mech: {
    id: "mech",
    label: "Mechanical & Nuclear Engineering",
    badge: "The Builder & Designer",
    blurb:
      "You love creating physical systems, testing prototypes, and designing things that move or deliver energy.",
    link: "https://egr.vcu.edu/departments/mechanical-nuclear-engineering/"
  }
};

/* ======================
   QUESTIONS
   ====================== */

const QUESTIONS = [
  {
    q: "When something breaks, or is broken, what’s your first move?",
    a: [
      { text: "Take it apart, figure out how it works, put it back together.", score: { mech: 2, ece: 1 } },
      { text: "Find an online tutorial and figure out how to fix it yourself.", score: { cs: 1, ece: 1, mech: 1 } },
      {
        text: "Do some research to understand why it broke in the first place.",
        score: { biomedical: 2, chemical: 2 }
      },
      {
        text: "Say 'Oh well' and replace it with a better, upgraded version.",
        score: { biomedical: 1, chemical: 1, cs: 1, ece: 1, mech: 1 }
      }
    ]
  },
  {
    q: "Which high-school subject do you secretly (or not so secretly) enjoy most?",
    a: [
      { text: "Biology or Anatomy — the human body fascinates me.", score: { biomedical: 2 } },
      { text: "Chemistry or Science — I like reactions and experiments.", score: { chemical: 2 } },
      { text: "Math or Statistics — logic and algorithms just click.", score: { cs: 2, ece: 1 } },
      { text: "Physics or Engineering — I like seeing how motion and energy work.", score: { mech: 2, ece: 1 } }
    ]
  },
  {
    q: "How do you usually approach a big project or challenging task?",
    a: [
      { text: "Think about the big picture first, then dive into the finer details.", score: { mech: 2 } },
      {
        text: "Build a prototype or create multiple interations until I get it right.",
        score: { biomedical: 1, mech: 1, chemical: 1 }
      },
      { text: "Use technology to make the whole process easier.", score: { cs: 2, ece: 1 } },
      { text: "Gather data, test hypotheses, and tweak the formula.", score: { chemical: 2, biomedical: 1 } }
    ]
  },
  {
    q: "Your friends might describe you as a...",
    a: [
      { text: "Fixer - If it's supposed to move, but doesn't, you need to figure out why.", score: { ece: 2, cs: 1 } },
      { text: "Experimenter - You're always ready to dive in, test and solve problems.", score: { chemical: 2, biomedical: 1 } },
      { text: "Innovator - You love to find new ways to do things.", score: { mech: 2, biomedical: 1 } },
      { text: "Techie - If it involves a computer or technology, you're all in.", score: { cs: 2, ece: 1 } }
    ]
  },
  {
    q: "If you could spend a day shadowing someone, who would it be?",
    a: [
      { text: "A surgeon using robotics in the operating room.", score: { biomedical: 2, mech: 1 } },
      { text: "A software developer working on an AI project.", score: { cs: 2, ece: 1 } },
      { text: "A scientist experimenting with new materials for clean energy.", score: { chemical: 2, mech: 1 } },
      { text: "An engineer designing drones or electric vehicles.", score: { ece: 2, mech: 1 } }
    ]
  },
  {
    q: "If you could improve one of these, which would it be?",
    a: [
      { text: "Medical Devices & Assistive Technology", score: { biomedical: 2, ece: 1, chemical: 1 } },
      {
        text: "Renewable Energy & Materials Science",
        score: { mech: 2, ece: 1, chemical: 2 }
      },
      { text: "Computers & Technology", score: { ece: 2, cs: 1, mech: 1 } },
      { text: "Software Applications & Programs", score: { cs: 2 } },
      { text: "Robotics & Mechanical Devices", score: { ece: 2, mech: 2, cs: 1 } }
    ]
  },
  {
    q: "What excites you most about engineering?",
    a: [
      { text: "Making tech that improves health and saves lives.", score: { biomedical: 2 } },
      { text: "Discovering how chemical and biological systems can help solve global problems.", score: { chemical: 2 } },
      { text: "Building machines and systems that move the world.", score: { mech: 2, ece: 1 } },
      { text: "Creating the next big app, algorithm, or breakthrough in computing.", score: { cs: 2 } },
      { text: "Powering the future with smarter electronics and energy solutions.", score: { ece: 2, mech: 1 } }
    ]
  }
];

/* ======================
   STATE
   ====================== */

let state = {
  position: -1,
  scores: { biomedical: 0, chemical: 0, cs: 0, ece: 0, mech: 0 },
  selections: []
};

/* ======================
   UI ELEMENTS
   ====================== */

const startBtn = document.getElementById("startBtn");
const introView = document.getElementById("introView");
const questionView = document.getElementById("questionView");
const qText = document.getElementById("qText");
const answersList = document.getElementById("answersList");
const qCounter = document.getElementById("qCounter");
const cardArea = document.getElementById("cardArea");
const progressFill = document.getElementById("progressFill");
const resultView = document.getElementById("resultView");
const resultContent = document.getElementById("resultContent");

/* ======================
   UTILITIES
   ====================== */

function updateProgress() {
  const pct = ((state.position + 1) / QUESTIONS.length) * 100;
  progressFill.style.width = pct + "%";
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function topProgramFromScores() {
  const entries = Object.entries(state.scores);
  let max = -Infinity;
  let tops = [];
  entries.forEach(([k, v]) => {
    if (v > max) {
      max = v;
      tops = [k];
    } else if (v === max) tops.push(k);
  });
  return PROGRAMS[tops[0]];
}

/* ======================
   RENDER LOGIC
   ====================== */

function showIntro() {
  introView.style.display = "";
  questionView.style.display = "none";
  resultView.style.display = "none";
  state.position = -1;
  updateProgress();
}

function startQuiz() {
  introView.style.display = "none";
  questionView.style.display = "";
  resultView.style.display = "none";
  state.position = 0;
  state.scores = { biomedical: 0, chemical: 0, cs: 0, ece: 0, mech: 0 };
  state.selections = [];
  renderQuestion();
  updateProgress();
}

function renderQuestion() {
  const i = state.position;
  const q = QUESTIONS[i];
  qText.textContent = q.q;
  qCounter.textContent = `Question ${i + 1} of ${QUESTIONS.length}`;
  answersList.innerHTML = "";

  q.a.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerText = ans.text;
    btn.addEventListener("click", async () => {
      if (btn.classList.contains("disabled")) return;
      handleAnswer(idx, btn, ans.score);
    });
    answersList.appendChild(btn);
  });

  cardArea.animate([{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }], {
    duration: 260,
    easing: "ease-out"
  });

  updateProgress();
}

async function handleAnswer(choiceIndex, btn, scoreObj) {
  const all = answersList.querySelectorAll(".answer");
  all.forEach((a) => a.classList.add("disabled"));
  btn.classList.add("selected");

  state.selections[state.position] = choiceIndex;

  for (const [k, v] of Object.entries(scoreObj)) {
    state.scores[k] += v;
  }

  await sleep(320);

  if (state.position < QUESTIONS.length - 1) {
    state.position++;
    renderQuestion();
  } else {
    updateProgress();
    await sleep(200);
    showResult();
  }
}

/* ======================
   RESULT
   ====================== */

function showResult() {
  questionView.style.display = "none";
  resultView.style.display = "";

  const program = topProgramFromScores();

  resultContent.innerHTML = `
      <p>You are the...</p>
      <p class="badge">${program.badge}</h1>
      <p>and would be most interested in...</p>
      <p class="label">${program.label}</h2>
      <p style="max-width:500px;margin:0 auto;">${program.blurb}</p>
      <a class="learn-more" href="${program.link}" aria-label="Learn more about ${program.label}">Learn more</a>
      <a class="retake" href="#" id="retakeBtn">Retake Quiz</a>
  `;

  resultContent.animate(
    [
      { opacity: 0, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 320, easing: "ease-out" }
  );

  document.getElementById("retakeBtn").addEventListener("click", (e) => {
    e.preventDefault();
    showIntro();
  });
}

/* ======================
   INIT
   ====================== */

startBtn.addEventListener("click", startQuiz);
showIntro();