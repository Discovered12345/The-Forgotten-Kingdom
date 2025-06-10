// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 24, 16, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 24, 16, 0.95)';
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

function animateTimeline() {
    timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        
        if (itemTop < window.innerHeight * 0.8 && itemBottom > 0) {
            setTimeout(() => {
                item.classList.add('animate');
            }, index * 200);
        }
    });
}

window.addEventListener('scroll', animateTimeline);
window.addEventListener('load', animateTimeline);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe cards and achievement items
document.querySelectorAll('.about-card, .kingdom-card, .achievement-item, .contact-card').forEach(card => {
    observer.observe(card);
});

// Citation toggle functionality
function toggleCitation(id) {
    const content = document.getElementById(id);
    const arrow = content.previousElementSibling.querySelector('.citation-arrow');
    
    // Close all other citations
    document.querySelectorAll('.citation-content').forEach(citation => {
        if (citation.id !== id) {
            citation.classList.remove('active');
            citation.previousElementSibling.querySelector('.citation-arrow').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current citation
    content.classList.toggle('active');
    
    if (content.classList.contains('active')) {
        arrow.style.transform = 'rotate(180deg)';
    } else {
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Add click animation to interactive elements
document.querySelectorAll('.cta-button, .contact-link, .kingdom-card, .about-card').forEach(element => {
    element.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(218, 165, 32, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button, .contact-link, .kingdom-card, .about-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-header, .about-card, .kingdom-card, .achievement-item, .timeline-item, .contact-card');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Typewriter effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add floating animation to achievement icons
document.querySelectorAll('.achievement-icon').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

// Add hover sound effect (optional - requires audio files)
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.cta-button, .nav-link, .kingdom-card, .about-card, .contact-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'all 0.3s ease';
        });
    });
}

// Initialize hover effects
addHoverEffects();

// Parallax effect for multiple elements
function parallaxElements() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.about-card, .kingdom-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', parallaxElements);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    const animateSequence = [
        '.hero-content',
        '.nav-container',
        '.section-header',
        '.about-grid',
        '.timeline',
        '.kingdoms-grid',
        '.achievements-grid',
        '.citations-container',
        '.contact-grid'
    ];
    
    animateSequence.forEach((selector, index) => {
        setTimeout(() => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }, index * 200);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Your scroll functions here
    animateTimeline();
    revealOnScroll();
}, 16)); // ~60fps