document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('bugReportForm');
    const successMessage = document.getElementById('successMessage');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const serverInput = document.getElementById('server');
    const descriptionInput = document.getElementById('bugDescription');
    const followUpCheckbox = document.getElementById('followUp');
    const returnButton = document.getElementById('returnButton');
    
    // Error message elements
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const serverError = document.getElementById('server-error');
    const descriptionError = document.getElementById('description-error');
    
    // Create error element for checkbox if it doesn't exist
    let checkboxError = document.getElementById('followUp-error');
    if (!checkboxError) {
        checkboxError = document.createElement('div');
        checkboxError.id = 'followUp-error';
        checkboxError.className = 'error-message';
        document.querySelector('.checkbox-group').appendChild(checkboxError);
    }

    // Auto-expanding textarea functionality
    descriptionInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Enforce max-height
        if (this.scrollHeight > 300) {
            this.style.overflowY = 'auto';
        } else {
            this.style.overflowY = 'hidden';
        }
    });

    // Validation functions
    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            usernameInput.classList.add('error');
            usernameError.textContent = 'Username cannot be blank';
            return false;
        }
        usernameInput.classList.remove('error');
        usernameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            emailInput.classList.add('error');
            emailError.textContent = 'Email cannot be blank';
            return false;
        } else if (!email.includes('@') || !email.includes('.')) {
            emailInput.classList.add('error');
            emailError.textContent = 'Please enter a valid email';
            return false;
        }
        emailInput.classList.remove('error');
        emailError.textContent = '';
        return true;
    }

    function validateServer() {
        if (serverInput.value === '') {
            serverInput.classList.add('error');
            serverError.textContent = 'Please select a server region';
            return false;
        }
        serverInput.classList.remove('error');
        serverError.textContent = '';
        return true;
    }

    function validateDescription() {
        if (descriptionInput.value.trim() === '') {
            descriptionInput.classList.add('error');
            descriptionError.textContent = 'Description cannot be blank';
            return false;
        } else if (descriptionInput.value.trim().length < 20) {
            descriptionInput.classList.add('error');
            descriptionError.textContent = 'Description must be at least 20 characters';
            return false;
        }
        descriptionInput.classList.remove('error');
        descriptionError.textContent = '';
        return true;
    }

    function validateCheckbox() {
        if (!followUpCheckbox.checked) {
            checkboxError.textContent = 'You must agree to receive follow-up emails';
            document.querySelector('.checkbox-group').classList.add('error');
            return false;
        }
        checkboxError.textContent = '';
        document.querySelector('.checkbox-group').classList.remove('error');
        return true;
    }

    // Event listeners for real-time validation
    usernameInput.addEventListener('blur', validateUsername);
    emailInput.addEventListener('blur', validateEmail);
    serverInput.addEventListener('change', validateServer);
    descriptionInput.addEventListener('blur', validateDescription);
    followUpCheckbox.addEventListener('change', validateCheckbox);

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isServerValid = validateServer();
        const isDescriptionValid = validateDescription();
        const isCheckboxValid = validateCheckbox();
        
        if (isUsernameValid && isEmailValid && isServerValid && 
            isDescriptionValid && isCheckboxValid) {
            // Form is valid - show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Here you would typically send the data to your server
            // Example: sendBugReport(formData);
        }
    });

    // Return button functionality
    returnButton.addEventListener('click', function() {
        form.style.display = 'block';
        successMessage.style.display = 'none';
        form.reset();
        
        // Reset textarea height
        descriptionInput.style.height = 'auto';
        
        // Clear all errors
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelector('.checkbox-group').classList.remove('error');
    });
});