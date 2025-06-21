// Template and Color Customization JavaScript

// Template switching functionality
function changeTemplate(templateClass) {
    const preview = document.getElementById('preview-sc');
    const templateClasses = ['template-left-sidebar', 'template-centered-header'];
    
    // Remove all possible template classes
    templateClasses.forEach(c => {
        preview.classList.remove(c);
    });

    // Add the new template class
    if (templateClass) {
        preview.classList.add(templateClass);
    }
}

// Color theme switching functionality
function changeColor(colorClass) {
    const preview = document.getElementById('preview-sc');
    const colorOptions = document.querySelectorAll('.color-option');
    
    // Remove all color theme classes
    preview.classList.forEach(c => {
        if (c.startsWith('theme-')) {
            preview.classList.remove(c);
        }
    });

    // Add new color class
    preview.classList.add(colorClass);

    // Update active state
    colorOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.color-option.${colorClass.split('-')[1]}`).classList.add('active');
}

function toggleZoom() {
    const zoomBtn = document.getElementById('zoom-btn');
    const previewContainer = document.querySelector('.preview-container');
    const zoomIcon = zoomBtn.querySelector('i');
    const zoomText = zoomBtn.querySelector('.zoom-text');

    if (previewContainer && zoomIcon && zoomText) {
        const isZoomed = previewContainer.classList.toggle('zoomed');
            
        if (isZoomed) {
            zoomIcon.classList.remove('fa-search-plus');
            zoomIcon.classList.add('fa-search-minus');
            zoomText.textContent = 'Zoom Out';
        } else {
            zoomIcon.classList.remove('fa-search-minus');
            zoomIcon.classList.add('fa-search-plus');
            zoomText.textContent = 'Zoom In';
            // Reset scroll position when zooming out
            previewContainer.scrollTop = 0;
            previewContainer.scrollLeft = 0;
        }
    }
}

// Toggle customization panel visibility
function toggleCustomizationPanel() {
    const panel = document.querySelector('.customization-panel');
    const button = event.target;
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        button.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Panel';
    } else {
        panel.style.display = 'none';
        button.innerHTML = '<i class="fas fa-eye"></i> Show Panel';
    }
}

// Authentication functionality
function toggleAuthDropdown() {
    document.getElementById("authDropdown").classList.toggle("show");
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function switchTab(tab) {
    if (tab === 'form') {
        document.getElementById('formSection').style.display = 'block';
        document.getElementById('customizationSection').style.display = 'none';
        document.querySelector('.tab-btn.active').classList.remove('active');
        document.querySelector('.tab-btn:first-child').classList.add('active');
    } else {
        document.getElementById('formSection').style.display = 'none';
        document.getElementById('customizationSection').style.display = 'block';
        document.querySelector('.tab-btn.active').classList.remove('active');
        document.querySelector('.tab-btn:last-child').classList.add('active');
    }
}

// Load sample data for demonstration
function loadSampleData() {
    // Sample personal information
    document.querySelector('input[name="firstname"]').value = 'Sarah';
    document.querySelector('input[name="lastname"]').value = 'Johnson';
    document.querySelector('input[name="designation"]').value = 'Senior Software Engineer';
    document.querySelector('input[name="email"]').value = 'sarah.johnson@email.com';
    document.querySelector('input[name="phoneno"]').value = '(555) 123-4567';
    document.querySelector('input[name="address"]').value = 'San Francisco, CA';
    document.querySelector('input[name="summary"]').value = 'Experienced software engineer with 5+ years developing scalable web applications using modern technologies. Passionate about clean code and user experience.';
    
    // Trigger CV generation
    if (typeof generateCV === 'function') {
        generateCV();
    }
}

// Close dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.auth-btn, .auth-btn *')) {
        var dropdowns = document.getElementsByClassName("auth-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    // Close modals if clicked outside
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Initialize customization features
document.addEventListener('DOMContentLoaded', () => {
    // Set default theme and template
    changeTemplate('template-left-sidebar'); // Default template
    changeColor('theme-green');
}); 