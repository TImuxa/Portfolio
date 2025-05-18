/**
 * Portfolio Main Script
 * - Language switching (EN/RU)
 * - Smooth page transitions
 * - Form handling
 * - Animations on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initLanguage();
    setupNavigation();
    setupAnimations();
    setupFormHandling();
    highlightActiveLink();
  });
  
  // Language support configuration
  const translations = {
    en: {
      // Main pages
      "about-title": "Hi, I'm <span>Temo</span>",
      "about-text": "Front-end developer crafting beautiful digital experiences",
      "projects-title": "My Projects",
      "skills-title": "My Skills",
      "contact-title": "Get In Touch",
      
      // Contact form
      "name-label": "Your Name",
      "name-placeholder": "Enter your name",
      "email-label": "Your Email",
      "email-placeholder": "Enter your email",
      "message-label": "Your Message",
      "message-placeholder": "Type your message here...",
      "submit-btn": "Send Message",
      "form-success": "Thank you! Your message has been sent.",
      
      // Footer
      "footer-text": "© 2025 Temo Diasamidze. All rights reserved."
    },
    ru: {
      // Main pages
      "about-title": "Привет, я <span>Темо</span>",
      "about-text": "Фронтенд-разработчик, создаю красивые цифровые продукты",
      "projects-title": "Мои проекты",
      "skills-title": "Мои навыки",
      "contact-title": "Связаться со мной",
      
      // Contact form
      "name-label": "Ваше имя",
      "name-placeholder": "Введите ваше имя",
      "email-label": "Ваш Email",
      "email-placeholder": "Введите ваш email",
      "message-label": "Ваше сообщение",
      "message-placeholder": "Напишите ваше сообщение...",
      "submit-btn": "Отправить",
      "form-success": "Спасибо! Ваше сообщение отправлено.",
      
      // Footer
      "footer-text": "© 2025 Темо Диасамидзе. Все права защищены."
    }
  };
  
  // Initialize language functionality
  function initLanguage() {
    // Set default language from localStorage or browser preference
    const savedLang = localStorage.getItem('portfolio-lang');
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
    const defaultLang = savedLang || browserLang;
    
    setLanguage(defaultLang);
    
    // Setup language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = defaultLang === 'en' ? 'RU' : 'EN';
      langToggle.addEventListener('click', toggleLanguage);
    }
  }
  
  // Set current language
  function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('portfolio-lang', lang);
    
    // Update all translatable elements
    Object.keys(translations[lang]).forEach(key => {
      const elements = document.querySelectorAll(`[data-translate="${key}"]`);
      
      elements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else if (element.hasAttribute('data-translate-html')) {
          element.innerHTML = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      });
    });
    
    // Update toggle button text
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'RU' : 'EN';
    }
  }
  
  // Toggle between languages
  function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    setLanguage(newLang);
  }
  
  // Setup smooth navigation
  function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Handle internal page links
        if (this.getAttribute('href').endsWith('.html')) {
          e.preventDefault();
          
          // Add fade-out animation
          document.body.classList.add('fade-out');
          
          // Navigate after animation completes
          setTimeout(() => {
            window.location.href = this.getAttribute('href');
          }, 300);
        }
        // Handle same-page anchor links
        else if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  // Setup scroll animations
  function setupAnimations() {
    const animateElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Add delay for staggered animations
          const delay = entry.target.dataset.animationDelay || '0s';
          entry.target.style.animationDelay = delay;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));
  }
  
  // Highlight active navigation link
  function highlightActiveLink() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      
      if (currentPage === linkPage || 
          (currentPage === 'index.html' && linkPage === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Handle contact form submission
  function setupFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // In a real scenario, you would use FormSubmit or fetch()
        setTimeout(() => {
          // Show success message
          const successMsg = document.createElement('div');
          successMsg.className = 'form-success show';
          successMsg.setAttribute('data-translate', 'form-success');
          successMsg.textContent = translations[document.documentElement.lang]['form-success'];
          
          contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
          contactForm.reset();
          
          submitBtn.disabled = false;
          submitBtn.innerHTML = translations[document.documentElement.lang]['submit-btn'];
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => successMsg.remove(), 300);
          }, 5000);
        }, 1500);
      });
    }
  }
  
  // Handle page transitions
  window.addEventListener('load', () => {
    document.body.classList.remove('fade-out');
    
    // Add fade-in effect when page loads
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });
  function initTypewriter() {
    const titleElement = document.getElementById('about-title');
    if (!titleElement) return;
  
    const texts = {
      en: ["Hi, I'm Temo", "Front-end Developer", "Web Creator"],
      ru: ["Привет, я Темо", "Фронтенд-разработчик", "Создатель сайтов"]
    };
  
    let currentLang = document.documentElement.lang;
    let phrases = texts[currentLang] || texts.en;
    let currentPhrase = 0;
    let isDeleting = false;
    let text = '';
    let typingSpeed = 100;
    let pauseBetween = 2000;
  
    function typeWriter() {
      const fullTxt = phrases[currentPhrase];
      
      if (isDeleting) {
        text = fullTxt.substring(0, text.length - 1);
        typingSpeed = 50;
      } else {
        text = fullTxt.substring(0, text.length + 1);
        typingSpeed = 100;
      }
  
      titleElement.innerHTML = text.replace('Temo', '<span>Temo</span>');
  
      if (!isDeleting && text === fullTxt) {
        typingSpeed = pauseBetween;
        isDeleting = true;
      } else if (isDeleting && text === '') {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 500;
      }
  
      setTimeout(typeWriter, typingSpeed);
    }
  
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
  }
  
  // Добавьте вызов функции в DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    setupNavigation();
    setupAnimations();
    setupFormHandling();
    highlightActiveLink();
    initTypewriter(); // <-- Добавьте эту строку
  });
  const translationss = {
  en: {
    // ... остальные переводы ...
    "typewriter-texts": JSON.stringify([
      "Hi, I'm Temo", 
      "Front-end Developer", 
      "Web Creator"
    ])
  },
  ru: {
    // ... остальные переводы ...
    "typewriter-texts": JSON.stringify([
      "Привет, я Темо",
      "Фронтенд-разработчик",
      "Создатель сайтов"
    ])
  }
};