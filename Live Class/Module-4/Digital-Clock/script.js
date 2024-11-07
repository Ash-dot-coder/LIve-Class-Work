const clock = document.querySelector(".clock");

clock.addEventListener("load", tick);

function tick() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  const period = h >= 12 ? "PM" : "AM";

  if (h > 12) h -= 12;
  if (h === 0) h = 12;

  const html = `
   <div class="time-block">
      <span class="time-value">${h}</span>
      <span class="time-label">Hour</span>
    </div>
    <div class="time-block">
      <span class="time-value">${m}</span>
      <span class="time-label">Minute</span>
    </div>
    <div class="time-block">
      <span class="time-value">${s}</span>
      <span class="time-label">Second</span>
    </div>
    <div class="period">${period}</div>
  `;
  clock.innerHTML = html;
}

tick();

setInterval(tick, 1000);
