// q7.js - Mouse path & coordinates logger inside a box
const box = document.getElementById('mouseBox');
const coords = document.getElementById('coords');

box.addEventListener('mousemove', (e) => {
  // clientX/clientY relative to viewport
  coords.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
});

// on double-click, drop a red dot (absolute positioned within box)
box.addEventListener('dblclick', (e) => {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const dot = document.createElement('div');
  dot.className = 'red-dot';
  dot.style.left = x + 'px';
  dot.style.top = y + 'px';
  box.appendChild(dot);
});
