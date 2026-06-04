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
});

resetButton.addEventListener('click', () => {
  form.reset();
  summarySection.classList.add('hidden');
});
