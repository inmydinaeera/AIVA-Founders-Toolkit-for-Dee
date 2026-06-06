const form = document.getElementById('feedback-form');
const resetButton = document.getElementById('reset-button');
const summarySection = document.getElementById('summary-section');
const summaryProblem = document.getElementById('summary-problem');
const summaryResonate1 = document.getElementById('summary-resonate1');
const summaryMatter1 = document.getElementById('summary-matter1');
const summaryQuestions1 = document.getElementById('summary-questions1');
const summaryMissing1 = document.getElementById('summary-missing1');
const summaryResonate2 = document.getElementById('summary-resonate2');
const summaryMatter2 = document.getElementById('summary-matter2');
const summaryQuestions2 = document.getElementById('summary-questions2');
const summaryMissing2 = document.getElementById('summary-missing2');
const recordsList = document.getElementById('records-list');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const problem = document.getElementById('problem').value.trim();
  const resonate1 = document.getElementById('resonate1').value.trim();
  const matter1 = document.getElementById('matter1').value.trim();
  const questions1 = document.getElementById('questions1').value.trim();
  const missing1 = document.getElementById('missing1').value.trim();
  const resonate2 = document.getElementById('resonate2').value.trim();
  const matter2 = document.getElementById('matter2').value.trim();
  const questions2 = document.getElementById('questions2').value.trim();
  const missing2 = document.getElementById('missing2').value.trim();

  if (!problem || !resonate1 || !matter1 || !questions1 || !missing1 || !resonate2 || !matter2 || !questions2 || !missing2) {
    return;
  }

  summaryProblem.textContent = problem;
  summaryResonate1.textContent = resonate1;
  summaryMatter1.textContent = matter1;
  summaryQuestions1.textContent = questions1;
  summaryMissing1.textContent = missing1;
  summaryResonate2.textContent = resonate2;
  summaryMatter2.textContent = matter2;
  summaryQuestions2.textContent = questions2;
  summaryMissing2.textContent = missing2;

  summarySection.classList.remove('hidden');
  summarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // create structured record and save to localStorage
  const record = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    problem,
    stakeholders: [
      { resonate: resonate1, matter: matter1, questions: questions1, missing: missing1 },
      { resonate: resonate2, matter: matter2, questions: questions2, missing: missing2 }
    ]
  };

  const existing = JSON.parse(localStorage.getItem('feedbackRecords') || '[]');
  existing.push(record);
  localStorage.setItem('feedbackRecords', JSON.stringify(existing));
  renderRecords();
});

resetButton.addEventListener('click', () => {
  form.reset();
  summarySection.classList.add('hidden');
});

// helpers for storage and rendering
function renderRecords() {
  if (!recordsList) return;
  const records = JSON.parse(localStorage.getItem('feedbackRecords') || '[]');
  recordsList.innerHTML = '';
  if (records.length === 0) {
    recordsList.innerHTML = '<p>No saved records yet.</p>';
    return;
  }

  // newest first
  records.slice().reverse().forEach((r) => {
    const el = document.createElement('div');
    el.className = 'record';
    const ts = new Date(r.timestamp).toLocaleString();
    el.innerHTML = `
      <div class="record-header"><strong>Saved:</strong> ${ts} <button class="delete-btn" data-id="${r.id}">Delete</button></div>
      <div class="record-body">
        <p><strong>Problem:</strong> ${escapeHtml(r.problem)}</p>
        <h4>Stakeholder 1</h4>
        <p><strong>Resonate:</strong> ${escapeHtml(r.stakeholders[0].resonate)}</p>
        <p><strong>What matters most:</strong> ${escapeHtml(r.stakeholders[0].matter)}</p>
        <p><strong>Questions / concerns:</strong> ${escapeHtml(r.stakeholders[0].questions)}</p>
        <p><strong>Missing:</strong> ${escapeHtml(r.stakeholders[0].missing)}</p>
        <h4>Stakeholder 2</h4>
        <p><strong>Resonate:</strong> ${escapeHtml(r.stakeholders[1].resonate)}</p>
        <p><strong>What matters most:</strong> ${escapeHtml(r.stakeholders[1].matter)}</p>
        <p><strong>Questions / concerns:</strong> ${escapeHtml(r.stakeholders[1].questions)}</p>
        <p><strong>Missing:</strong> ${escapeHtml(r.stakeholders[1].missing)}</p>
      </div>
    `;
    recordsList.appendChild(el);
  });
}

// simple escape to avoid injecting HTML
function escapeHtml(str) {
  if (!str) return '';
  return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

// handle delete clicks
if (recordsList) {
  recordsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = Number(e.target.dataset.id);
      const records = JSON.parse(localStorage.getItem('feedbackRecords') || '[]');
      const filtered = records.filter(r => r.id !== id);
      localStorage.setItem('feedbackRecords', JSON.stringify(filtered));
      renderRecords();
    }
  });
}

// initial render
renderRecords();
