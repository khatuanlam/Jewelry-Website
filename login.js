document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-login');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const rememberMeCheckbox = document.querySelector('input[type="checkbox"]');
    const forgotPasswordLink = document.querySelector('.remember-forgot a');
    const submitButton = form.querySelector('.btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            simulateLogin();
        }
    });

    function validateForm() {
        let isValid = true;

        if (email.value.trim() === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            setError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (password.value.trim() === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else {
            setSuccess(password);
        }

        return isValid;
    }

    function setError(input, message) {
        const formGroup = input.parentElement;
        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('small');
            errorMessage.className = 'error-message';
            input.insertAdjacentElement('afterend', errorMessage);
        }
        errorMessage.innerText = message;
        formGroup.className = 'form-group error';
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.innerText = '';
        }
        formGroup.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function simulateLogin() {
        submitButton.disabled = true;
        submitButton.innerText = 'Signing In...';

        setTimeout(() => {
            const isLoginSuccessful = Math.random() < 0.8; // 80% chance of successful login

            if (isLoginSuccessful) {
                alert('Login successful! Welcome to Charrisma.');
                window.location.href = "after.html";
            } else {
                alert('Login failed. Please check your credentials and try again.');
                setError(email, 'Invalid email or password');
                setError(password, 'Invalid email or password');
            }

            submitButton.disabled = false;
            submitButton.innerText = 'Sign In';
        }, 2000);
    }

    rememberMeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('rememberedEmail', email.value);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('rememberedEmail');
        }
    });

    if (localStorage.getItem('rememberMe') === 'true') {
        rememberMeCheckbox.checked = true;
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            email.value = rememberedEmail;
        }
    }

    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Password reset functionality would be implemented here.');
    });

    // Add password visibility toggle
    const togglePassword = document.createElement('i');
    togglePassword.className = 'bx bx-hide password-toggle';
    password.parentElement.appendChild(togglePassword);

    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.className = `bx ${type === 'password' ? 'bx-hide' : 'bx-show'} password-toggle`;
    });
});