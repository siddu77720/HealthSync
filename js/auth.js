// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (validateLoginForm(email, password)) {
                // Simulate login process
                simulateLogin(email);
            }
        });
    }
});

function validateLoginForm(email, password) {
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Email validation
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        showError('password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = 'var(--danger)';
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: var(--danger);
        font-size: 0.875rem;
        margin-top: 0.5rem;
    `;
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

function clearErrors() {
    // Remove all error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    
    // Reset border colors
    document.querySelectorAll('input').forEach(input => {
        input.style.borderColor = '';
    });
}

function simulateLogin(email) {
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Connecting to HealthSync...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // For demo purposes, always succeed
        showNotification('Successfully connected to your health data!', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

// Hospital account connection simulation
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', function() {
        const service = this.querySelector('.social-icon').nextSibling.textContent.trim();
        showNotification(`Connecting to ${service}...`, 'success');
        
        // Simulate connection process
        setTimeout(() => {
            showNotification(`Successfully connected to ${service}!`, 'success');
        }, 1500);
    });
});

// Enhanced email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}