// Sample data
const skills = [
    'Web Development',
    'Video Production',
    'UI/UX Design',
    'Content Creation',
    'JavaScript',
    'HTML/CSS'
];

const projects = [
    {
        title: 'Project Name',
        description: 'Project description goes here. Explain what you built and what technologies you used.',
        image: './images/project1.jpg', // Update this path with your actual image
        link: 'https://your-project-url.com',
        tags: ['HTML', 'CSS', 'JavaScript']
    }
];

const videos = [
    {
        title: 'Video Title',
        description: 'Video description goes here. Explain what the video is about.',
        thumbnail: 'C:/Code Projects/Codium/IMAGES/RIMG0131.jpg',
        link: 'https://youtube.com/your-video',
        tags: ['Editing', 'Motion Graphics']
    }
];

// Function to handle image loading errors
function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = './images/placeholder.jpg'; // Default to placeholder image
}

// Function to create project cards
function createProjectCards() {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;
    
    projectGrid.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" onerror="handleImageError(this)">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" target="_blank" class="view-project">View Project</a>
            </div>
        `;
        projectGrid.appendChild(card);
    });
}

// Function to create video cards
function createVideoCards() {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    
    videoGrid.innerHTML = '';
    videos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" onerror="handleImageError(this)">
            <div class="card-content">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <div class="tags">
                    ${video.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${video.link}" target="_blank" class="view-project">Watch Video</a>
            </div>
        `;
        videoGrid.appendChild(card);
    });
}

// Update statistics
function updateStats() {
    const stats = {
        projects: projects.length,
        videos: videos.length,
        websites: projects.filter(p => p.tags.includes('HTML')).length,
        active: Math.min(3, projects.length) // Example: showing up to 3 active projects
    };

    document.querySelectorAll('.stat-card').forEach((card, index) => {
        const valueEl = card.querySelector('.stat-value');
        if (valueEl) {
            valueEl.textContent = Object.values(stats)[index] || '0';
        }
    });
}

// Function to show popup
function showPopup(title, message) {
    // Create popup elements
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    const content = `
        <div class="popup-content">
            <div class="popup-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="popup-close">Close</button>
        </div>
    `;
    
    popup.innerHTML = content;
    
    // Add to document
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    // Show with animation
    setTimeout(() => {
        overlay.classList.add('show');
        popup.classList.add('show');
    }, 10);
    
    // Handle close button
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('show');
        popup.classList.remove('show');
        
        // Remove elements after animation
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.removeChild(popup);
        }, 300);
    });
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic validation
    let isValid = true;
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear previous errors
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
    
    // Validate required fields
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'This field is required';
            field.parentNode.appendChild(error);
        }
    });
    
    // Validate email format
    if (email && !emailRegex.test(email)) {
        isValid = false;
        const emailField = form.querySelector('[name="email"]');
        emailField.classList.add('error');
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Please enter a valid email address';
        emailField.parentNode.appendChild(error);
    }
    
    if (isValid) {
        // Simulate form submission (replace with actual submission logic)
        const submitButton = form.querySelector('.submit-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showPopup(
                'Thank You!',
                'Your message has been sent successfully. I will get back to you soon!'
            );
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    }
}

// Reveal animation functionality
function initRevealAnimations() {
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all cards
    document.querySelectorAll('.project-card, .video-card').forEach(card => {
        observer.observe(card);
    });

    // Add stagger effect to grids
    const projectGrid = document.getElementById('projectGrid');
    const videoGrid = document.getElementById('videoGrid');

    if (projectGrid) {
        projectGrid.classList.add('reveal-stagger');
        observer.observe(projectGrid);
    }

    if (videoGrid) {
        videoGrid.classList.add('reveal-stagger');
        observer.observe(videoGrid);
    }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize components
    createProjectCards();
    createVideoCards();
    updateStats();
    
    // Initialize reveal animations after creating cards
    setTimeout(initRevealAnimations, 100);
});
