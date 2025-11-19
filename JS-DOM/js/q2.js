// q2.js - Live Character Counter with warning colors and prevention at 0
const maxChars = 100;
const textarea = document.getElementById('liveTextarea');
const counter = document.getElementById('charCounter');
const resetBtn = document.getElementById('resetBtn');

function updateCounter(){
  const remaining = maxChars - textarea.value.length;
  counter.textContent = remaining;
  counter.classList.remove('highlight-yellow','highlight-red');
  if(remaining <= 0){ counter.classList.add('highlight-red'); }
  else if(remaining <= 20){ counter.classList.add('highlight-yellow'); }
}

textarea.addEventListener('input', updateCounter);

// prevent further typing when at limit (extra safety for older browsers)
textarea.addEventListener('keydown', (e) => {
  const remaining = maxChars - textarea.value.length;
  // allow control keys like Backspace, Arrow keys
  const allowedControl = ['Backspace','ArrowLeft','ArrowRight','Delete','Tab','Home','End'];
  if(remaining <= 0 && !allowedControl.includes(e.key)){
    e.preventDefault();
  }
});

// Reset button clears everything
resetBtn.addEventListener('click', () => {
  textarea.value = '';
  updateCounter();
});

// initialize
updateCounter();
