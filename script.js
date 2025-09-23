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

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe right to open menu
    if (deltaX > 50 && Math.abs(deltaY) < 100) {
        if (!navMenu.classList.contains('active')) {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
        }
    }
    
    // Swipe left to close menu
    if (deltaX < -50 && Math.abs(deltaY) < 100) {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}

// Mobile-specific interactions
if (window.innerWidth <= 768) {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .social-link, .project-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', () => {
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
    
    // Add touch feedback to cards
    const cards = document.querySelectorAll('.project-card, .skill-item, .contact-item');
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
}

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .about-text, .contact-info');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact section interactions
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
`;
document.head.appendChild(style);

// Typing animation for hero title
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Only run typing animation on desktop
        if (window.innerWidth > 768) {
            typeWriter(heroTitle, originalText, 50);
        }
    }
    
    // Initialize dynamic animations
    initializeDynamicAnimations();
});

// Dynamic animations for better user experience
function initializeDynamicAnimations() {
    // Add mouse movement effects (desktop only)
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Add scroll-based animations (desktop only)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            const floatingElements = document.querySelectorAll('.code-element');
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
            
            const techIcons = document.querySelectorAll('.tech-icon');
            techIcons.forEach((icon, index) => {
                const speed = (index + 1) * 0.05;
                icon.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
    
    // Add random movement to tech icons
    setInterval(() => {
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach(icon => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            icon.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            
            setTimeout(() => {
                icon.style.transform = icon.style.transform.replace(/translate\([^)]*\)/g, '');
            }, 2000);
        });
    }, 3000);
    
    // Add interactive emoji effects
    const emojis = document.querySelectorAll('.emoji-float');
    emojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', () => {
            emoji.style.transform += ' scale(1.5)';
            emoji.style.filter = 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.8))';
        });
        
        emoji.addEventListener('mouseleave', () => {
            emoji.style.transform = emoji.style.transform.replace(/scale\([^)]*\)/g, '');
            emoji.style.filter = 'none';
        });
    });
    
    // Add click effects to project emojis
    const projectEmojis = document.querySelectorAll('.project-emoji');
    projectEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            emoji.style.animation = 'none';
            emoji.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                emoji.style.animation = 'bounceEmoji 2s ease-in-out infinite';
                emoji.style.transform = '';
            }, 1000);
        });
    });
    
    // Add hover effects to skill emojis
    const skillEmojis = document.querySelectorAll('.skill-emoji');
    skillEmojis.forEach(emoji => {
        emoji.addEventListener('mouseenter', () => {
            emoji.style.animation = 'none';
            emoji.style.transform = 'scale(1.3) rotate(15deg)';
            emoji.style.filter = 'drop-shadow(0 0 25px rgba(96, 165, 250, 0.8))';
        });
        
        emoji.addEventListener('mouseleave', () => {
            emoji.style.animation = 'pulseEmoji 3s ease-in-out infinite';
            emoji.style.transform = '';
            emoji.style.filter = 'drop-shadow(0 0 15px rgba(96, 165, 250, 0.4))';
        });
    });
    
    // Create floating particles on click
    document.addEventListener('click', (e) => {
        createClickParticle(e.clientX, e.clientY);
    });
    
    function createClickParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #60a5fa, #3b82f6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: clickParticle 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
    
    // Add CSS for click particles
    const clickParticleStyle = document.createElement('style');
    clickParticleStyle.textContent = `
        @keyframes clickParticle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(3) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(clickParticleStyle);
    
    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        // Disable heavy animations on mobile
        const heavyElements = document.querySelectorAll('.particle, .floating-elements, .tech-icons, .floating-emojis');
        heavyElements.forEach(element => {
            element.style.display = 'none';
        });
        
        // Add mobile-specific touch events
        addMobileTouchEvents();
        
        // Optimize performance for mobile
        optimizeForMobile();
    }
}

// Mobile-specific touch events
function addMobileTouchEvents() {
    // Add haptic feedback simulation
    const touchElements = document.querySelectorAll('.btn, .social-link, .project-link, .nav-link');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
            element.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
            setTimeout(() => {
                element.style.transition = '';
            }, 100);
        });
    });
    
    // Add pull-to-refresh gesture
    let startY = 0;
    let currentY = 0;
    let isPulling = false;
    
    document.addEventListener('touchstart', (e) => {
        if (window.scrollY === 0) {
            startY = e.touches[0].clientY;
            isPulling = true;
        }
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isPulling) {
            currentY = e.touches[0].clientY;
            const pullDistance = currentY - startY;
            
            if (pullDistance > 0) {
                e.preventDefault();
                document.body.style.transform = `translateY(${pullDistance * 0.5}px)`;
            }
        }
    });
    
    document.addEventListener('touchend', () => {
        if (isPulling) {
            document.body.style.transform = '';
            isPulling = false;
        }
    });
}

// Optimize performance for mobile
function optimizeForMobile() {
    // Reduce animation frequency
    const originalSetInterval = window.setInterval;
    window.setInterval = function(func, delay) {
        if (delay < 100) {
            delay = 100; // Minimum 100ms for mobile
        }
        return originalSetInterval(func, delay);
    };
    
    // Disable parallax on mobile
    window.removeEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'none';
        }
    });
    
    // Add mobile-specific CSS
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            * {
                -webkit-tap-highlight-color: transparent;
            }
            
            .btn, .social-link, .project-link {
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        }
    `;
    document.head.appendChild(mobileStyle);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'bounceIn 0.6s ease';
        }
    });
}, { threshold: 0.5 });

skillItems.forEach(item => {
    skillObserver.observe(item);
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(bounceStyle);

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links animation
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// GitHub API integration for dynamic project data
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/thibrown1/repos');
        const repos = await response.json();
        
        // Update project cards with real data
        const projectCards = document.querySelectorAll('.project-card');
        repos.forEach((repo, index) => {
            if (projectCards[index]) {
                const title = projectCards[index].querySelector('h3');
                const description = projectCards[index].querySelector('p');
                const link = projectCards[index].querySelector('.project-link');
                
                if (title) title.textContent = repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                if (description) description.textContent = repo.description || 'Projeto desenvolvido com tecnologias modernas.';
                if (link) link.href = repo.html_url;
            }
        });
    } catch (error) {
        console.log('GitHub API not available, using static data');
    }
}

// Call GitHub API
fetchGitHubRepos();

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.background = '#1d4ed8';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.background = '#2563eb';
});
