// q3.js - 3-step form with validation and navigation
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const summaryBox = document.getElementById('summary');

document.getElementById('next1').addEventListener('click', () => {
  if(!nameInput.value.trim()){ alert('Enter name'); return; }
  step1.classList.add('hidden'); step2.classList.remove('hidden');
});
document.getElementById('back2').addEventListener('click', () => {
  step2.classList.add('hidden'); step1.classList.remove('hidden');
});
document.getElementById('next2').addEventListener('click', () => {
  const email = emailInput.value.trim();
  if(!email || !email.includes('@')){ alert('Enter valid email'); return; }
  step2.classList.add('hidden'); step3.classList.remove('hidden');
});
document.getElementById('back3').addEventListener('click', () => {
  step3.classList.add('hidden'); step2.classList.remove('hidden');
});
document.getElementById('finish').addEventListener('click', () => {
  if(passwordInput.value.length < 6){ alert('Password must be at least 6 chars'); return; }
  // show summary
  summaryBox.classList.remove('hidden');
  summaryBox.innerHTML = `<h3>Summary</h3>
    <p><strong>Name:</strong> ${escapeHtml(nameInput.value)}</p>
    <p><strong>Email:</strong> ${escapeHtml(emailInput.value)}</p>
    <p><strong>Password:</strong> ${'*'.repeat(passwordInput.value.length)}</p>
  `;
  // hide form area
  step1.classList.add('hidden'); step2.classList.add('hidden'); step3.classList.add('hidden');
});

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
