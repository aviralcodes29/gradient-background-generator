// Base inputs
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const color1HexInput = document.getElementById("color1Hex");
const color2HexInput = document.getElementById("color2Hex");
const gradientTypeSelect = document.getElementById("gradientType");
const angleRange = document.getElementById("angleRange");
const angleInput = document.getElementById("angleInput");
const angleValue = document.getElementById("angleValue");

const preview = document.getElementById("preview");
const codeOutput = document.getElementById("codeOutput");

const copyBtn = document.getElementById("copyBtn");
const randomBtn = document.getElementById("randomBtn");
const resetBtn = document.getElementById("resetBtn");

const stopsContainer = document.getElementById("stopsContainer");
const addStopBtn = document.getElementById("addStopBtn");

const presetsContainer = document.getElementById("presetsContainer");

// Constants
const DEFAULT_COLOR_1 = "#ff7b7b";
const DEFAULT_COLOR_2 = "#6a5af9";
const DEFAULT_DIRECTION = "to right";
const DEFAULT_ANGLE = 90;
const MAX_STOPS = 5;

// State
let colorStops = [
  { id: 1, color: DEFAULT_COLOR_1, position: 0 },
  { id: 2, color: DEFAULT_COLOR_2, position: 100 },
];

let nextStopId = 3;

// Presets
const presets = [
  {
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ff7b7b", position: 0 },
      { color: "#6a5af9", position: 100 },
    ],
  },
  {
    type: "linear",
    angle: 120,
    stops: [
      { color: "#0ea5e9", position: 0 },
      { color: "#22c55e", position: 50 },
      { color: "#eab308", position: 100 },
    ],
  },
  {
    type: "radial",
    angle: 0,
    stops: [
      { color: "#1d4ed8", position: 0 },
      { color: "#9333ea", position: 100 },
    ],
  },
  {
    type: "conic",
    angle: 0,
    stops: [
      { color: "#22c55e", position: 0 },
      { color: "#f97316", position: 40 },
      { color: "#ef4444", position: 70 },
      { color: "#22c55e", position: 100 },
    ],
  },
];

// Helpers

function isValidHex(value) {
  return /^#([0-9A-Fa-f]{6})$/.test(value);
}

function syncHexInputs() {
  color1HexInput.value = color1Input.value;
  color2HexInput.value = color2Input.value;
}

function updateInputsFromHex() {
  if (isValidHex(color1HexInput.value)) {
    color1Input.value = color1HexInput.value;
  }
  if (isValidHex(color2HexInput.value)) {
    color2Input.value = color2HexInput.value;
  }
  setGradient();
}

function randomColor() {
  const hex = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + hex.padStart(6, "0");
}

function syncAngleInputs(fromRange = true) {
  if (fromRange) {
    angleInput.value = angleRange.value;
  } else {
    let val = parseInt(angleInput.value, 10);
    if (isNaN(val)) val = DEFAULT_ANGLE;
    val = Math.max(0, Math.min(360, val));
    angleInput.value = val;
    angleRange.value = val;
  }
  angleValue.textContent = angleInput.value;
  setGradient();
}

// Color stops rendering

function renderStops() {
  stopsContainer.innerHTML = "";

  colorStops.forEach((stop) => {
    const row = document.createElement("div");
    row.className = "stop-row";
    row.dataset.id = stop.id;

    row.innerHTML = `
      <div class="stop-color">
        <label>Color</label>
        <input type="color" value="${stop.color}" class="stop-color-input" />
      </div>
      <div class="stop-position">
        <label>Position</label>
        <input type="range" min="0" max="100" value="${stop.position}" class="stop-position-range" />
        <span class="stop-position-value">${stop.position}%</span>
      </div>
      <button class="delete-stop-btn">Remove</button>
    `;

    stopsContainer.appendChild(row);
  });
}

// Presets

function renderPresets() {
  presetsContainer.innerHTML = "";

  presets.forEach((preset, index) => {
    const div = document.createElement("div");
    div.className = "preset-swatch";
    div.dataset.index = index;

    const stopsStr = preset.stops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");

    let bg = "";
    if (preset.type === "linear") {
      bg = `linear-gradient(${preset.angle}deg, ${stopsStr})`;
    } else if (preset.type === "radial") {
      bg = `radial-gradient(circle, ${stopsStr})`;
    } else if (preset.type === "conic") {
      bg = `conic-gradient(from ${preset.angle}deg, ${stopsStr})`;
    }

    div.style.background = bg;
    presetsContainer.appendChild(div);
  });
}

// Gradient construction

function getGradientString() {
  const type = gradientTypeSelect.value;
  const angle = parseInt(angleInput.value, 10) || DEFAULT_ANGLE;

  const stopsStr = [...colorStops]
    .sort((a, b) => a.position - b.position)
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  let gradient = "";

  if (type === "linear") {
    gradient = `linear-gradient(${angle}deg, ${stopsStr})`;
  } else if (type === "radial") {
    gradient = `radial-gradient(circle, ${stopsStr})`;
  } else if (type === "conic") {
    gradient = `conic-gradient(from ${angle}deg, ${stopsStr})`;
  }

  return gradient;
}

function setGradient() {
  const gradient = getGradientString();

  preview.style.background = gradient;
  document.body.style.background = gradient;

  const cssCode = `background: ${gradient};`;
  codeOutput.textContent = cssCode;
  syncHexInputs();
}

function setRandomGradient() {
  color1Input.value = randomColor();
  color2Input.value = randomColor();

  // Reset stops to 2 with random colors at 0% and 100%
  colorStops = [
    { id: 1, color: color1Input.value, position: 0 },
    { id: 2, color: color2Input.value, position: 100 },
  ];
  nextStopId = 3;

  // Random angle and type
  const types = ["linear", "radial", "conic"];
  const randomType = types[Math.floor(Math.random() * types.length)];
  gradientTypeSelect.value = randomType;

  const randomAngle = Math.floor(Math.random() * 361);
  angleInput.value = randomAngle;
  angleRange.value = randomAngle;
  angleValue.textContent = randomAngle;

  renderStops();
  setGradient();
}

function resetGradient() {
  color1Input.value = DEFAULT_COLOR_1;
  color2Input.value = DEFAULT_COLOR_2;
  gradientTypeSelect.value = "linear";

  angleInput.value = DEFAULT_ANGLE;
  angleRange.value = DEFAULT_ANGLE;
  angleValue.textContent = DEFAULT_ANGLE;

  colorStops = [
    { id: 1, color: DEFAULT_COLOR_1, position: 0 },
    { id: 2, color: DEFAULT_COLOR_2, position: 100 },
  ];
  nextStopId = 3;
  renderStops();
  setGradient();
}

function copyCss() {
  const text = codeOutput.textContent.trim();
  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy CSS"), 1500);
    })
    .catch(() => {
      copyBtn.textContent = "Error";
      setTimeout(() => (copyBtn.textContent = "Copy CSS"), 1500);
    });
}

// Event listeners

color1Input.addEventListener("input", () => {
  colorStops[0].color = color1Input.value;
  setGradient();
});

color2Input.addEventListener("input", () => {
  colorStops[colorStops.length - 1].color = color2Input.value;
  setGradient();
});

color1HexInput.addEventListener("input", updateInputsFromHex);
color2HexInput.addEventListener("input", updateInputsFromHex);

gradientTypeSelect.addEventListener("change", setGradient);
angleRange.addEventListener("input", () => syncAngleInputs(true));
angleInput.addEventListener("input", () => syncAngleInputs(false));

randomBtn.addEventListener("click", setRandomGradient);
resetBtn.addEventListener("click", resetGradient);
copyBtn.addEventListener("click", copyCss);

// Stops events
stopsContainer.addEventListener("input", (e) => {
  const row = e.target.closest(".stop-row");
  if (!row) return;
  const id = parseInt(row.dataset.id, 10);
  const stop = colorStops.find((s) => s.id === id);
  if (!stop) return;

  if (e.target.classList.contains("stop-color-input")) {
    stop.color = e.target.value;
  }

  if (e.target.classList.contains("stop-position-range")) {
    const value = parseInt(e.target.value, 10);
    stop.position = value;
    row.querySelector(".stop-position-value").textContent = `${value}%`;
  }

  setGradient();
});

stopsContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-stop-btn")) return;
  const row = e.target.closest(".stop-row");
  const id = parseInt(row.dataset.id, 10);

  if (colorStops.length <= 2) return; // keep at least 2 stops

  colorStops = colorStops.filter((s) => s.id !== id);
  renderStops();
  setGradient();
});

addStopBtn.addEventListener("click", () => {
  if (colorStops.length >= MAX_STOPS) return;

  colorStops.splice(colorStops.length - 1, 0, {
    id: nextStopId++,
    color: randomColor(),
    position: 50,
  });

  renderStops();
  setGradient();
});

// Preset click
presetsContainer.addEventListener("click", (e) => {
  const swatch = e.target.closest(".preset-swatch");
  if (!swatch) return;
  const preset = presets[parseInt(swatch.dataset.index, 10)];
  if (!preset) return;

  gradientTypeSelect.value = preset.type;
  angleInput.value = preset.angle;
  angleRange.value = preset.angle;
  angleValue.textContent = preset.angle;

  colorStops = preset.stops.map((s, i) => ({
    id: i + 1,
    color: s.color,
    position: s.position,
  }));
  nextStopId = colorStops.length + 1;

  renderStops();
  setGradient();
});

// Initial render
renderStops();
renderPresets();
resetGradient();