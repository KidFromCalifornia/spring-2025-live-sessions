document.addEventListener('DOMContentLoaded', () => {
  const introSection = document.getElementById('introduction');
  const userInfoSection = document.getElementById('user-info');
  const announcer = document.getElementById('announcer');

  const introContinueButton = document.getElementById('intro-continue');

  introContinueButton.addEventListener('click', () => {
    introSection.hidden = true;
    userInfoSection.hidden = false;
    window.location.hash = '#user-info';
    document.getElementById('name').focus();
    announcer.textContent = 'Moved to user information section';
  });

  const userInfoForm = document.getElementById('user-info-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  let userName = '';

  function clearError(input, errorElement) {
    input.removeAttribute('aria-invalid');
    errorElement.textContent = '';
    errorElement.hidden = true;
  }

  function showError(input, errorElement, message) {
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    }
  });

  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your name');
      isValid = false;
      nameInput.focus();
    } else {
      clearError(nameInput, nameError);
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email address');
      isValid = false;
      if (!nameError.textContent) {
        emailInput.focus();
      }
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
      if (!nameError.textContent) {
        emailInput.focus();
      }
    } else {
      clearError(emailInput, emailError);
    }

    if (isValid) {
      userName = nameInput.value.trim();
      userInfoSection.hidden = true;
      feedbackSection.hidden = false;
      feedbackSection.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('#feedback-form input[type="radio"]').focus();
      announcer.textContent = 'Moved to feedback form section';
    }
  });

  const feedbackSection = document.getElementById('feedback');
  const resultsSection = document.getElementById('results');

  const form = document.getElementById('feedback-form');
  const resultsContent = document.getElementById('results-content');
  const feedbackDetails = document.querySelector('.feedback-details');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  let answeredQuestions = new Set();

  function updateProgress() {
    const totalQuestions = 2;
    const answeredCount = answeredQuestions.size;
    const percentage = (answeredCount / totalQuestions) * 100;

    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${answeredCount} of ${totalQuestions} sections completed`;
    announcer.textContent = `${answeredCount} of ${totalQuestions} sections completed`;
  }

  form.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const questionName = radio.name;
      answeredQuestions.add(questionName);
      updateProgress();
    });
  });
});
