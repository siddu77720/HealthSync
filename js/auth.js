// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (validateLoginForm(email, password)) {
                simulateLogin(email);
            }
        });
    }
    
    if (signupForm) {
        // Password strength indicator
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        // Confirm password validation
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                validatePasswordMatch();
            });
        }
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            if (validateSignupForm(fullName, email, password, confirmPassword, agreeTerms)) {
                simulateSignup(fullName, email);
            }
        });
    }
    
    // Data source connection
    document.querySelectorAll('.source-card').forEach(card => {
        card.addEventListener('click', function() {
            const source = this.getAttribute('data-source');
            connectDataSource(source, this);
        });
    });

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

    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }

    // Auto-focus on first input
    const firstInput = document.querySelector('input[type="email"], input[type="text"]');
    if (firstInput) {
        firstInput.focus();
    }
});

function validateLoginForm(email, password) {
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

function validateSignupForm(fullName, email, password, confirmPassword, agreeTerms) {
    clearErrors();
    
    let isValid = true;
    
    // Full name validation
    if (!fullName) {
        showError('fullName', 'Full name is required');
        isValid = false;
    } else if (fullName.length < 2) {
        showError('fullName', 'Full name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showError('signupEmail', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('signupEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Password validation
    if (!password) {
        showError('signupPassword', 'Password is required');
        isValid = false;
    } else if (password.length < 8) {
        showError('signupPassword', 'Password must be at least 8 characters');
        isValid = false;
    }
    
    // Confirm password
    if (!validatePasswordMatch()) {
        isValid = false;
    }
    
    // Terms agreement
    if (!agreeTerms) {
        showNotification('Please agree to the Terms of Service and Privacy Policy', 'error');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.style.borderColor = 'var(--danger)';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.cssText = `
        color: var(--danger);
        font-size: 0.875rem;
        margin-top: 0.5rem;
        font-weight: 500;
    `;
    errorElement.textContent = message;
    
    formGroup.appendChild(errorElement);
}

function clearErrors() {
    // Remove all error messages
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    
    // Reset border colors and shadows
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
    field.style.boxShadow = '';
}

function simulateLogin(email) {
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Connecting to HealthSync...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        // Store user session
        localStorage.setItem('healthSyncUser', JSON.stringify({
            email: email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString(),
            dataSources: ['hospital', 'wearable'] // Default connected sources for demo
        }));
        
        showNotification('Successfully connected to your health data!', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

function simulateSignup(fullName, email) {
    const submitBtn = document.querySelector('#signupForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Creating Your Health Profile...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate API call
    setTimeout(() => {
        // Store user data
        localStorage.setItem('healthSyncUser', JSON.stringify({
            name: fullName,
            email: email,
            signupTime: new Date().toISOString(),
            dataSources: []
        }));
        
        showNotification('HealthSync account created successfully!', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

function updatePasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let color = 'var(--danger)';
    let text = 'Very Weak';
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Lowercase and uppercase
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    
    // Numbers and special characters
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Update UI
    strengthBar.style.width = strength + '%';
    strengthBar.style.transition = 'width 0.3s ease, background-color 0.3s ease';
    
    if (strength >= 80) {
        color = 'var(--success)';
        text = 'Strong';
    } else if (strength >= 60) {
        color = 'var(--warning)';
        text = 'Good';
    } else if (strength >= 40) {
        color = 'var(--warning)';
        text = 'Fair';
    } else if (strength >= 20) {
        color = 'var(--danger)';
        text = 'Weak';
    }
    
    strengthBar.style.background = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

function validatePasswordMatch() {
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (!password || !confirmPassword) return true;
    
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        return false;
    } else {
        clearError('confirmPassword');
        return true;
    }
}

function connectDataSource(source, element) {
    const statusElement = element.querySelector('.source-status');
    const originalText = statusElement.textContent;
    const originalBackground = statusElement.style.background;
    
    // Show connecting state
    statusElement.textContent = 'Connecting...';
    statusElement.style.background = 'var(--warning)';
    element.style.borderColor = 'var(--warning)';
    element.style.background = 'rgba(245, 158, 11, 0.05)';
    
    // Simulate connection process
    setTimeout(() => {
        statusElement.textContent = 'Connected ✓';
        statusElement.style.background = 'var(--success)';
        element.style.borderColor = 'var(--success)';
        element.style.background = 'rgba(16, 185, 129, 0.05)';
        
        // Store connected source
        const userData = JSON.parse(localStorage.getItem('healthSyncUser') || '{}');
        if (!userData.dataSources) userData.dataSources = [];
        if (!userData.dataSources.includes(source)) {
            userData.dataSources.push(source);
            localStorage.setItem('healthSyncUser', JSON.stringify(userData));
        }
        
        showNotification(`Successfully connected ${getSourceName(source)}!`, 'success');
        
        // Update onboarding steps
        updateOnboardingProgress();
        
    }, 2000);
}

function getSourceName(source) {
    const sources = {
        'hospital': 'Hospital Records',
        'clinic': 'Clinic Data',
        'wearable': 'Wearable Device',
        'pharmacy': 'Pharmacy Records'
    };
    return sources[source] || source;
}

function updateOnboardingProgress() {
    const userData = JSON.parse(localStorage.getItem('healthSyncUser') || '{}');
    const connectedSources = userData.dataSources || [];
    
    // Update step 2 if we have at least one connected source
    if (connectedSources.length > 0) {
        const step2 = document.querySelector('.step:nth-child(2)');
        if (step2 && !step2.classList.contains('active')) {
            step2.classList.add('active');
        }
    }
}

function handleForgotPassword() {
    const email = document.getElementById('email')?.value;
    
    if (email && validateEmail(email)) {
        showNotification(`Password reset instructions sent to ${email}`, 'success');
        
        // Simulate sending reset email
        setTimeout(() => {
            showNotification('Check your email for password reset instructions', 'success');
        }, 1000);
    } else {
        // Show email input modal
        const modalHTML = `
            <div id="forgotPasswordModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Reset Password</h3>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <p>Enter your email address and we'll send you instructions to reset your password.</p>
                        <div class="form-group">
                            <label for="reset-email">Email Address</label>
                            <input type="email" id="reset-email" placeholder="Enter your email">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
                            <button type="button" class="btn btn-primary" id="send-reset-btn">Send Instructions</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('forgotPasswordModal');
        const closeBtn = modal.querySelector('.close');
        const cancelBtn = modal.querySelector('.cancel-btn');
        const sendBtn = modal.querySelector('#send-reset-btn');
        
        closeBtn.addEventListener('click', () => modal.remove());
        cancelBtn.addEventListener('click', () => modal.remove());
        
        sendBtn.addEventListener('click', function() {
            const resetEmail = document.getElementById('reset-email').value;
            if (resetEmail && validateEmail(resetEmail)) {
                showNotification(`Password reset instructions sent to ${resetEmail}`, 'success');
                modal.remove();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Focus on email input
        const resetEmailInput = document.getElementById('reset-email');
        if (resetEmailInput) {
            resetEmailInput.focus();
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'success') {
    // Check if notification function exists in main.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
        return;
    }
    
    // Fallback notification implementation
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Enhanced form validation with real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    // Real-time email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError(this.id, 'Please enter a valid email address');
            } else {
                clearError(this.id);
            }
        });
    });
    
    // Real-time password confirmation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            validatePasswordMatch();
        });
    }
    
    // Enter key submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    e.preventDefault();
                    submitBtn.click();
                }
            }
        });
    });
});

// Demo data pre-fill for testing (remove in production)
function fillDemoCredentials() {
    // Only fill if in development and no data exists
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const emailInput = document.getElementById('email') || document.getElementById('signupEmail');
        const passwordInput = document.getElementById('password') || document.getElementById('signupPassword');
        
        if (emailInput && !emailInput.value) {
            emailInput.value = 'demo@healthsync.com';
        }
        if (passwordInput && !passwordInput.value) {
            passwordInput.value = 'demo1234';
        }
    }
}

// Initialize demo data on load
document.addEventListener('DOMContentLoaded', fillDemoCredentials);