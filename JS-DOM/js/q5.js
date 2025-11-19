// q5.js - Image gallery with modal preview
const gallery = document.getElementById('gallery');
const modalBackdrop = document.getElementById('modalBackdrop');
const images = Array.from(gallery.querySelectorAll('img'));

// Build modal element (created once)
const modal = document.createElement('div');
modal.className = 'modal';
modal.addEventListener('click', (e) => e.stopPropagation()); // clicking inside shouldn't close
modalBackdrop.appendChild(modal);

// clicking an image opens modal with larger image
gallery.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if(!img) return;
  openModal(img.src);
});

function openModal(src){
  modal.innerHTML = `<img src="$" alt="preview" style="max-width:80vw; max-height:80vh;">`;
  // update src after insertion
  modal.querySelector('img').src = src;
  modalBackdrop.classList.remove('hidden');
  modalBackdrop.classList.add('modal-backdrop');
}

// clicking outside modal closes it
modalBackdrop.addEventListener('click', () => {
  modalBackdrop.classList.add('hidden');
  modalBackdrop.classList.remove('modal-backdrop');
});

// initially hidden
modalBackdrop.classList.add('hidden');
