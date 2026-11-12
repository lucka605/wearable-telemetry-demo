const pulse = document.querySelector("#pulse");
const chart = document.querySelector("#chart");
const context = chart.getContext("2d");
const toggle = document.querySelector("#toggle");
const status = document.querySelector("#status");
const samples = [];
const historySize = 60;
let tick = 0;

function addSample() {
  const bpm = Math.round(74 + 9 * Math.sin(tick / 7) + 3 * Math.sin(tick / 2));
  tick += 1;
  samples.push({ timestamp: new Date().toISOString(), bpm });
  if (samples.length > historySize) samples.shift();
  pulse.textContent = `${bpm} bpm`;
  context.clearRect(0, 0, chart.width, chart.height);
  context.strokeStyle = "#a5f3d0";
  context.lineWidth = 3;
  context.beginPath();
  samples.forEach(({ bpm }, index) => {
    const x = 4 + index * (chart.width - 8) / (historySize - 1);
    const y = (95 - bpm) * chart.height / 40;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
}

addSample();
let timer = setInterval(addSample, 1000);

toggle.addEventListener("click", () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
    toggle.textContent = "Resume simulation";
    status.textContent = "Simulation paused";
  } else {
    addSample();
    timer = setInterval(addSample, 1000);
    toggle.textContent = "Pause simulation";
    status.textContent = "Simulation running";
  }
});

document.querySelector("#export").addEventListener("click", () => {
  const rows = samples.map(({ timestamp, bpm }) => `${timestamp},${bpm}`);
  const csv = ["timestamp_utc,simulated_bpm", ...rows].join("\n") + "\n";
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "simulated-pulse.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
