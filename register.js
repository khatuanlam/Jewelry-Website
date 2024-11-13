document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formRegister');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmpw');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            simulateFormSubmission();
        }
    });

    function validateForm() {
        let isValid = true;

        // Username validation
        if (username.value.trim() === '') {
            setError(username, 'Username is required');
            isValid = false;
        } else {
            setSuccess(username);
        }

        // Email validation
        if (email.value.trim() === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        // Password validation
        if (password.value.trim() === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 8) {
            setError(password, 'Password must be at least 8 characters');
            isValid = false;
        } else {
            setSuccess(password);
        }

        // Confirm password validation
        if (confirmPassword.value.trim() === '') {
            setError(confirmPassword, 'Please confirm your password');
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            setError(confirmPassword, 'Passwords do not match');
            isValid = false;
        } else {
            setSuccess(confirmPassword);
        }

        return isValid;
    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message') || document.createElement('small');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        formControl.appendChild(errorMessage);
        formControl.className = 'input-name error';
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        if (errorMessage) {
            formControl.removeChild(errorMessage);
        }
        formControl.className = 'input-name success';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function simulateFormSubmission() {
        const submitButton = form.querySelector('.btn');
        submitButton.disabled = true;
        submitButton.innerText = 'Signing Up...';
        
        setTimeout(() => {
            alert('Registration successful! Welcome to Charrisma.');
            window.location.href = "login.html";
            form.reset();
            submitButton.disabled = false;
            submitButton.innerText = 'Sign Up';
            
        }, 2000);
    }
});