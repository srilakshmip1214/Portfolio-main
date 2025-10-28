// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .experience-card, .skill-category, .cert-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (optional - if you want hamburger menu)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
        // Create hamburger button if it doesn't exist
        let hamburger = document.querySelector('.hamburger');
        if (!hamburger) {
            hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.8rem;
                color: #667eea;
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            const logo = document.querySelector('.logo');
            logo.parentNode.insertBefore(hamburger, navLinks);
            
            // Hide nav links by default on mobile
            navLinks.style.display = 'none';
            
            // Toggle menu
            hamburger.addEventListener('click', () => {
                if (navLinks.style.display === 'none' || navLinks.style.display === '') {
                    navLinks.style.display = 'flex';
                    hamburger.innerHTML = '✕';
                } else {
                    navLinks.style.display = 'none';
                    hamburger.innerHTML = '☰';
                }
            });
            
            // Close menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.style.display = 'none';
                    hamburger.innerHTML = '☰';
                });
            });
        }
    } else {
        // Remove hamburger on desktop
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.remove();
        }
        navLinks.style.display = 'flex';
    }
};

// Call on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #667eea;
        font-weight: 700;
    }
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);