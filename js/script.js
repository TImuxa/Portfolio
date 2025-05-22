document.addEventListener('DOMContentLoaded', function() {
    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav ul');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('show');
            burger.classList.toggle('active');
        });
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            console.log({ name, email, message });
            
            // Show success message
            alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check on load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation delay to elements
    const skillCards = document.querySelectorAll('.skill-card');
    const serviceCards = document.querySelectorAll('.service-card');
    
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.skill-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('.btn.pulse');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 500);
        }, 2000);
    }
});