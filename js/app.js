// Swift Reply Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const waitlistForm = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('success-message');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                timestamp: new Date().toISOString()
            };
            
            // Validate form data
            if (!validateForm(formData)) {
                return;
            }
            
            // Save the data (will be replaced with actual API call)
            saveToDatabase(formData)
                .then(() => {
                    // Show success message
                    waitlistForm.style.display = 'none';
                    successMessage.classList.remove('hidden');
                    
                    // Reset form
                    waitlistForm.reset();
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                    alert('There was an error submitting your information. Please try again.');
                });
        });
    }
    
    // Admin link handling
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple password protection
            const password = prompt('Enter admin password:');
            if (password === 'swiftreply2025') { // This would be more secure in a real implementation
                window.location.href = '/admin.html';
            } else {
                alert('Invalid password');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    function validateForm(formData) {
        let isValid = true;
        
        // Reset previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (!formData.name.trim()) {
            displayError('name', 'Name is required');
            isValid = false;
        }
        
        // Validate email
        if (!formData.email.trim()) {
            displayError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(formData.email)) {
            displayError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Display error message
    function displayError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--color-error)';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            errorElement.textContent = message;
            
            field.parentNode.appendChild(errorElement);
            field.style.borderColor = 'var(--color-error)';
        }
    }
    
    // Email validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Save to database (placeholder for actual API call)
    function saveToDatabase(formData) {
        return new Promise((resolve, reject) => {
            // In a real implementation, this would be an API call to the server
            // For now, we'll use localStorage as a simple demonstration
            try {
                // Get existing data
                const existingData = JSON.parse(localStorage.getItem('swiftReplyWaitlist') || '[]');
                
                // Check for duplicate email
                const isDuplicate = existingData.some(entry => entry.email === formData.email);
                if (isDuplicate) {
                    reject(new Error('This email is already registered'));
                    return;
                }
                
                // Add new entry
                existingData.push(formData);
                
                // Save back to localStorage
                localStorage.setItem('swiftReplyWaitlist', JSON.stringify(existingData));
                
                // Simulate network delay
                setTimeout(() => {
                    resolve();
                }, 1000);
            } catch (error) {
                reject(error);
            }
        });
    }
});
