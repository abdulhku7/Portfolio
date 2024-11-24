// Sample portfolio items - Replace with your actual work
const portfolioItems = [
    {
        image: './images/portfolio1.jpg',
        alt: 'Portfolio Item 1',
        fallbackImage: 'https://via.placeholder.com/400x300/18181b/fafafa?text=Project+1'
    },
    {
        image: './images/portfolio2.jpg',
        alt: 'Portfolio Item 2',
        fallbackImage: 'https://via.placeholder.com/400x300/18181b/fafafa?text=Project+2'
    },
    {
        image: './images/portfolio3.jpg',
        alt: 'Portfolio Item 3',
        fallbackImage: 'https://via.placeholder.com/400x300/18181b/fafafa?text=Project+3'
    },
    {
        image: './images/portfolio4.jpg',
        alt: 'Portfolio Item 4',
        fallbackImage: 'https://via.placeholder.com/400x300/18181b/fafafa?text=Project+4'
    }
];

// Create portfolio grid with error handling and loading states
function createPortfolioGrid() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    // Clear existing items
    grid.innerHTML = '';

    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        const img = new Image();
        img.alt = item.alt;
        
        // Add loading state
        portfolioItem.style.opacity = '0.5';
        
        // Handle successful image load
        img.onload = () => {
            portfolioItem.style.opacity = '1';
            portfolioItem.style.transitionDelay = `${index * 0.1}s`;
        };
        
        // Handle image load error
        img.onerror = () => {
            img.src = item.fallbackImage;
            portfolioItem.style.opacity = '1';
        };
        
        // Set image source after setting up handlers
        img.src = item.image;
        
        portfolioItem.appendChild(img);
        grid.appendChild(portfolioItem);
    });
}

// Stats popup functionality
function initStatsPopup() {
    const popup = document.querySelector('.stats-popup');
    const closeBtn = document.querySelector('.close-stats');
    
    if (!popup || !closeBtn) {
        console.error('Stats popup elements not found');
        return;
    }
    
    // Show popup after a short delay
    setTimeout(() => {
        popup.classList.add('show');
        initCounters();
    }, 1000);
    
    // Close popup when clicking close button
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    });
    
    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });

    // Prevent closing when clicking inside the content
    const content = popup.querySelector('.stats-content');
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Counter animation with improved performance
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / speed;
        let current = 0;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        
        requestAnimationFrame(updateCount);
    });
}

// Initialize reveal animations with better performance
function initRevealAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.classList.add('visible');
                    });
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '50px'
        }
    );

    document.querySelectorAll('.portfolio-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        createPortfolioGrid();
        // Initialize stats popup
        initStatsPopup();
        // Initialize portfolio animations
        setTimeout(initRevealAnimations, 100);
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});
