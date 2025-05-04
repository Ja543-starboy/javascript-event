// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Event Handling ==========
    
    // 1. Button Click
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        setTimeout(() => {
            clickOutput.textContent = '';
        }, 2000);
    });
    
    // 2. Hover Effects
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse entered!';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Mouse left!';
    });
    
    // 3. Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
    });
    
    // 4. Secret Action (Double click or long press)
    const secretBox = document.querySelector('.secret-box');
    let pressTimer;
    
    // Long press detection
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            showSecret("Long press detected! Here's your secret!");
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Double click detection
    secretBox.addEventListener('dblclick', function() {
        showSecret("Double click detected! Here's your secret!");
    });
    
    function showSecret(message) {
        alert(message);
    }
    
    // ========== Interactive Elements ==========
    
    // 1. Button that changes text or color
    const colorButton = document.getElementById('color-button');
    const colorBox = document.getElementById('color-box');
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorButton.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorBox.style.backgroundColor = colors[colorIndex];
    });
    
    // 2. Image Gallery/Slideshow
    const galleryImages = document.querySelectorAll('.gallery-container img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
    }
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance slideshow every 3 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 3000);
    
    // 3. Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panes
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        const errorElement = nameInput.nextElementSibling;
        if (nameInput.value.trim() === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else {
            clearError(nameInput, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const errorElement = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            clearError(emailInput, errorElement);
            return true; // Email is optional in this example
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, errorElement, 'Please enter a valid email');
            return false;
        } else {
            clearError(emailInput, errorElement);
            return true;
        }
    }
    
    function validatePassword() {
        const errorElement = passwordInput.nextElementSibling;
        if (passwordInput.value.length < 8 && passwordInput.value.length > 0) {
            showError(passwordInput, errorElement, 'Password must be at least 8 characters');
            return false;
        } else {
            clearError(passwordInput, errorElement);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.style.borderColor = 'red';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearError(input, errorElement) {
        input.style.borderColor = '';
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Please fix the errors in the form');
        }
    });
});