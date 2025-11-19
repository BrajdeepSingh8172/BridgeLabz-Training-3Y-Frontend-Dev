// q4.js - Theme switcher using setAttribute and data-theme on body
const themeButtons = document.querySelectorAll('[data-theme-btn]');
const bodyEl = document.body;

// apply theme by setting data-theme attribute
function applyTheme(themeName){
  bodyEl.setAttribute('data-theme', themeName);
  // also add a class (per requirement) via setAttribute to className
  bodyEl.setAttribute('class', `theme-${themeName}`);
}

// wire buttons
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme-btn')));
});

// initial default theme
if(!bodyEl.getAttribute('data-theme')) applyTheme('light');
