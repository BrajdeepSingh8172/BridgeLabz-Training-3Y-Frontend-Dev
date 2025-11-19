// q6.js - Real-time table filter (case-insensitive)
const searchBox = document.getElementById('searchBox');
const studentsTable = document.getElementById('studentsTable').tBodies[0];
const noResultsBox = document.getElementById('noResults');

searchBox.addEventListener('input', () => {
  const query = searchBox.value.trim().toLowerCase();
  let visibleCount = 0;
  Array.from(studentsTable.rows).forEach(row => {
    const rowText = row.textContent.toLowerCase();
    const match = rowText.includes(query);
    row.style.display = match ? '' : 'none';
    if(match) visibleCount++;
  });
  noResultsBox.classList.toggle('hidden', visibleCount > 0);
});
