document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.input-box');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('pass');
    const submitButton = document.getElementById('submit');

    // Redirect if already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'trangchu.html';
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
            login();
        }
    });

    function validateForm() {
        let isValid = true;

        // Validate email
        if (emailInput.value.trim() === '') {
            setError(emailInput, 'Email không được để trống');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            setError(emailInput, 'Email không hợp lệ');
            isValid = false;
        } else {
            setSuccess(emailInput);
        }

        // Validate password
        if (passwordInput.value.trim() === '') {
            setError(passwordInput, 'Mật khẩu không được để trống');
            isValid = false;
        } else {
            setSuccess(passwordInput);
        }

        return isValid;
    }

    function setError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'input-field error';

        let errorDisplay = formControl.querySelector('.error-message');
        if (!errorDisplay) {
            errorDisplay = document.createElement('small');
            errorDisplay.className = 'error-message';
            formControl.appendChild(errorDisplay);
        }
        errorDisplay.innerText = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'input-field success';

        const errorDisplay = formControl.querySelector('.error-message');
        if (errorDisplay) {
            formControl.removeChild(errorDisplay);
        }
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function login() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        submitButton.disabled = true;
        submitButton.value = 'Đang đăng nhập...';

        setTimeout(() => {
            // Simulate stored user data
            const storedUserInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {
            
                email: email.value,
                password: password.value,
            };
            if (storedUserInfo && email  === storedUserInfo.email && password === storedUserInfo.password) {
                // Store session data
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('currentUser', JSON.stringify({
                    email: storedUserInfo.email,
                    username: storedUserInfo.username
                }));

                alert('Đăng nhập thành công! Chào mừng đến với Charisma.');
                window.location.href = 'trangchu.html';
            } else {
                alert('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
            }

            submitButton.disabled = false;
            submitButton.value = 'Đăng Nhập';
        }, 2000);
    }
});
