// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
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

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.custom-bar');
const circles = document.querySelectorAll('.circle');

function animateOnScroll() {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        
        if (isVisible) {
            const width = bar.parentElement.nextElementSibling.textContent;
            bar.style.width = width;
        }
    });

    circles.forEach(circle => {
        const rect = circle.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
        
        if (isVisible) {
            circle.style.animation = 'none';
            circle.offsetHeight; // Trigger reflow
            circle.style.animation = 'circleAnimation 1s ease-in-out forwards';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Typing effect for header
const headerText = document.querySelector('.header__all-bg-tittle h1');
const text = headerText.textContent;
headerText.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        headerText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when header is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(headerText);

// Project cards hover effect
const projectCards = document.querySelectorAll('.my__project-cocacola');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(157, 5, 5, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Form validation
const contactForm = document.querySelector('.contact__form form');
const nameInput = contactForm.querySelector('input[type="text"]');
const emailInput = contactForm.querySelector('input[type="email"]');
const messageTextarea = document.querySelector('.contact__message textarea');
const sendButton = document.querySelector('.contact__message button');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    let isValid = true;
    
    if (nameInput.value.trim() === '') {
        nameInput.style.borderColor = '#9d0505';
        isValid = false;
    } else {
        nameInput.style.borderColor = 'transparent';
    }

    if (!validateEmail(emailInput.value)) {
        emailInput.style.borderColor = '#9d0505';
        isValid = false;
    } else {
        emailInput.style.borderColor = 'transparent';
    }

    if (messageTextarea.value.trim() === '') {
        messageTextarea.style.borderColor = '#9d0505';
        isValid = false;
    } else {
        messageTextarea.style.borderColor = 'transparent';
    }

    return isValid;
}

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Here you can add your form submission logic
        alert('Message sent successfully!');
        contactForm.reset();
        messageTextarea.value = '';
    } else {
        alert('Please fill in all fields correctly!');
    }
});

// Add animation to skills section
const skillsSection = document.querySelector('#skils');
const skillItems = document.querySelectorAll('.html, .css, .js, .python');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, index * 200);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

skillsObserver.observe(skillsSection);

// Initialize skill items with initial styles
skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
});

// Add CSS animation for circles
const style = document.createElement('style');
style.textContent = `
    @keyframes circleAnimation {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Burger Menu Functionality
const burgerMenu = document.querySelector('.burger__menu');
const burgerMenuContent = document.querySelector('.BURGER__MENU');
const burgerMenuLinks = document.querySelectorAll('.BURGER__MENU nav ul li a');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    burgerMenuContent.classList.toggle('active');
    document.body.style.overflow = burgerMenuContent.classList.contains('active') ? 'hidden' : '';
});

burgerMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close burger menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !burgerMenuContent.contains(e.target) && burgerMenuContent.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close burger menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && burgerMenuContent.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        burgerMenuContent.classList.remove('active');
        document.body.style.overflow = '';
    }
}); 