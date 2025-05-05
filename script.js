// DOM Elements
const themeSwitch = document.getElementById('checkbox');
const body = document.body;
const animatedElement = document.getElementById('animatedElement');
const resetBtn = document.getElementById('resetBtn');
const cards = document.querySelectorAll('.card');

// Function to toggle theme
function toggleTheme() {
    // Toggle dark theme class
    body.classList.toggle('dark-theme');
    
    // Add animation class (will be removed after animation completes)
    body.classList.add('theme-transition');
    
    // Store user preference in localStorage
    const isDarkMode = body.classList.contains('dark-theme');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Apply animation to cards when theme changes
    cards.forEach(card => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'slideIn 0.5s ease-out';
        }, 10);
    });
}

// Check for stored user preference
function checkUserPreference() {
    const darkMode = localStorage.getItem('darkMode');
    
    // If preference exists in localStorage
    if (darkMode !== null) {
        // Convert string to boolean and set theme accordingly
        const isDarkMode = darkMode === 'true';
        themeSwitch.checked = isDarkMode;
        
        if (isDarkMode) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    }
}

// Toggle animation on interactive element
function toggleAnimation() {
    this.classList.toggle('active');
    
    // Store animation state in localStorage
    const isActive = this.classList.contains('active');
    localStorage.setItem('elementActive', isActive);
}

// Reset all preferences
function resetPreferences() {
    localStorage.removeItem('darkMode');
    localStorage.removeItem('elementActive');
    
    // Reset UI state
    body.classList.remove('dark-theme');
    themeSwitch.checked = false;
    animatedElement.classList.remove('active');
    
    // Add animation feedback
    this.classList.add('pulse');
    setTimeout(() => {
        this.classList.remove('pulse');
    }, 1000);
    
    // Feedback message
    alert('All preferences have been reset!');
}

// Clean up animation classes
function handleAnimationEnd() {
    body.classList.remove('theme-transition');
}

// Event Listeners
themeSwitch.addEventListener('change', toggleTheme);
animatedElement.addEventListener('click', toggleAnimation);
resetBtn.addEventListener('click', resetPreferences);
body.addEventListener('animationend', handleAnimationEnd);

// Check for user preference on page load
document.addEventListener('DOMContentLoaded', () => {
    checkUserPreference();
    
    // Check for interactive element state
    const elementActive = localStorage.getItem('elementActive') === 'true';
    if (elementActive) {
        animatedElement.classList.add('active');
    }
});
