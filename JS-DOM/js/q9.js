// q9.js - Form submit blocker with live inline errors and preventDefault
const blockForm = document.getElementById('blockForm');
const nameField = document.getElementById('fName');
const emailField = document.getElementById('fEmail');
const passwordField = document.getElementById('fPassword');
const errName = document.getElementById('errName');
const errEmail = document.getElementById('errEmail');
const errPassword = document.getElementById('errPassword');
const submitMsg = document.getElementById('submitMsg');

function validateAll(){
  let ok = true;
  // Name required
  if(!nameField.value.trim()){ errName.textContent = 'Name is required'; ok = false; } else errName.textContent = '';
  // Email must contain @
  if(!emailField.value.trim() || !emailField.value.includes('@')){ errEmail.textContent = 'Valid email required'; ok = false; } else errEmail.textContent = '';
  // Password min 6
  if(!passwordField.value || passwordField.value.length < 6){ errPassword.textContent = 'Password must be at least 6 chars'; ok = false; } else errPassword.textContent = '';
  return ok;
}

// Live clearing of errors on input
[nameField, emailField, passwordField].forEach(field => {
  field.addEventListener('input', validateAll);
});

blockForm.addEventListener('submit', (e) => {
  e.preventDefault(); // always prevent for this demo
  const ok = validateAll();
  if(!ok) return;
  submitMsg.classList.remove('hidden');
  submitMsg.textContent = 'Form Submitted Successfully';
  blockForm.reset();
});
