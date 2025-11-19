// q1.js - Dynamic Product List Manager using Event Delegation
const productInput = document.getElementById('productInput');
const addProductBtn = document.getElementById('addProductBtn');
const productList = document.getElementById('productList');

// Helper to create a list item element
function createProductListItem(name) {
  const li = document.createElement('li');
  li.className = 'product-item';
  li.innerHTML = `
    <span class="product-name" data-editable>${escapeHtml(name)}</span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
  return li;
}

// escape to avoid HTML injection in demo
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

addProductBtn.addEventListener('click', () => {
  const name = productInput.value.trim();
  if(!name) return alert('Enter product name');
  productList.appendChild(createProductListItem(name));
  productInput.value = '';
});

// Event delegation: handle Edit/Delete clicks on the parent <ul>
productList.addEventListener('click', (ev) => {
  const li = ev.target.closest('li');
  if(!li) return;
  if(ev.target.classList.contains('delete-btn')){
    li.remove();
    return;
  }
  if(ev.target.classList.contains('edit-btn')){
    enterEditMode(li);
    return;
  }
});

// Keep track of current editing element
let currentEditing = null;

function enterEditMode(li){
  // if another item is being edited, save it first
  if(currentEditing && currentEditing !== li) saveEditing(currentEditing);

  const nameSpan = li.querySelector('[data-editable]');
  const currentText = nameSpan.textContent;
  // replace span with an input for inline editing
  const input = document.createElement('input');
  input.value = currentText;
  input.className = 'inline-edit';
  nameSpan.replaceWith(input);
  input.focus();
  currentEditing = li;

  // pressing Enter saves, Escape cancels
  input.addEventListener('keydown', function onKey(e){
    if(e.key === 'Enter'){ saveEditing(li); input.removeEventListener('keydown', onKey); }
    if(e.key === 'Escape'){ cancelEditing(li, currentText); input.removeEventListener('keydown', onKey); }
  });
}

// Save the edited value back to the list item
function saveEditing(li){
  const input = li.querySelector('.inline-edit');
  if(!input) return;
  const newValue = input.value.trim() || 'Untitled';
  const span = document.createElement('span');
  span.className = 'product-name';
  span.setAttribute('data-editable','');
  span.textContent = newValue;
  input.replaceWith(span);
  currentEditing = null;
}

// Cancel editing and restore old text
function cancelEditing(li, oldText){
  const input = li.querySelector('.inline-edit');
  if(!input) return;
  const span = document.createElement('span');
  span.className = 'product-name';
  span.setAttribute('data-editable','');
  span.textContent = oldText;
  input.replaceWith(span);
  currentEditing = null;
}

// clicking outside the list item while editing will auto-save
document.addEventListener('click', (ev) => {
  if(!currentEditing) return;
  // if click inside currentEditing, ignore
  if(currentEditing.contains(ev.target)) return;
  saveEditing(currentEditing);
});
