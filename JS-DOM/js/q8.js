// q8.js - Custom dropdown using capturing phase for outside click close
const dropdown = document.getElementById('customDropdown');
const btn = document.getElementById('dropdownButton');
const optionsPanel = document.getElementById('dropdownOptions');

btn.addEventListener('click', (e) => {
  optionsPanel.classList.toggle('hidden');
});

// clicking an option updates button text
optionsPanel.addEventListener('click', (e) => {
  const option = e.target.closest('.option');
  if(!option) return;
  btn.textContent = option.textContent;
  optionsPanel.classList.add('hidden');
});

// use capturing on document to close dropdown when clicking outside
document.addEventListener('click', (e) => {
  // handler in capturing phase (default here is bubble) - emulate by checking target path
}, true);

// We still need a capturing phase handler: addEventListener third arg true
document.addEventListener('click', function capturingClose(e){
  if(dropdown.contains(e.target)) return; // click inside dropdown
  optionsPanel.classList.add('hidden');
}, true);
