document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const passwordToggle = document.getElementById('passwordToggle');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const loader = submitBtn.querySelector('.loader');

  // Password Visibility Toggle Logic
  passwordToggle.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    // Toggle SVGs inside the button
    const eyeOpenPaths = passwordToggle.querySelectorAll('.eye-open');
    const eyeClosedPath = passwordToggle.querySelector('.eye-closed');
    
    if (isPassword) {
      eyeOpenPaths.forEach(path => path.classList.add('hidden'));
      eyeClosedPath.classList.remove('hidden');
    } else {
      eyeOpenPaths.forEach(path => path.classList.remove('hidden'));
      eyeClosedPath.classList.add('hidden');
    }
  });

  // Basic Email Regex Pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation function for a single field
  const validateField = (input, errorEl, isValid) => {
    const group = input.closest('.input-group');
    if (isValid) {
      group.classList.remove('invalid');
      return true;
    } else {
      group.classList.add('invalid');
      return false;
    }
  };

  // Live input validations to clear error indicators on user action
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() === '' || emailPattern.test(emailInput.value.trim())) {
      emailInput.closest('.input-group').classList.remove('invalid');
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length >= 6 || passwordInput.value.length === 0) {
      passwordInput.closest('.input-group').classList.remove('invalid');
    }
  });

  // Handle Form Submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value;
    
    // Perform validations
    const isEmailValid = validateField(emailInput, emailError, emailPattern.test(emailValue));
    const isPasswordValid = validateField(passwordInput, passwordError, passwordValue.length >= 6);

    if (isEmailValid && isPasswordValid) {
      // Simulate login request (mock loader transition)
      setLoadingState(true);
      
      setTimeout(() => {
        setLoadingState(false);
        alert('Successfully logged in! (Simulation)');
        console.log('Login Payload:', {
          email: emailValue,
          password: passwordValue,
          remember: document.getElementById('remember').checked
        });
      }, 1500);
    }
  });

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.classList.add('hidden');
      loader.classList.remove('hidden');
    } else {
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      loader.classList.add('hidden');
    }
  }
});
