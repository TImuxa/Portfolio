/**
 * Основной скрипт портфолио
 * - Переключение языков (EN/RU)
 * - Плавные переходы между страницами
 * - Обработка форм
 * - Анимации при скролле
 */

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация всей функциональности
  initLanguage();
  setupNavigation();
  setupAnimations();
  setupFormHandling();
  highlightActiveLink();
  initTypewriter();
});

// Конфигурация поддержки языков
const translations = {
  en: {
    // Основные страницы
    "about-title": "Hi, I'm <span>Temo</span>",
    "about-text": "Front-end developer crafting beautiful digital experiences",
    "projects-title": "My Projects",
    "skills-title": "My Skills",
    "contact-title": "Get In Touch",
    
    // Форма обратной связи
    "name-label": "Your Name",
    "name-placeholder": "Enter your name",
    "email-label": "Your Email",
    "email-placeholder": "Enter your email",
    "message-label": "Your Message",
    "message-placeholder": "Type your message here...",
    "submit-btn": "Send Message",
    "form-success": "Thank you! Your message has been sent.",
    
    // Подвал сайта
    "footer-text": "© 2025 Temo Diasamidze. All rights reserved.",
    
    // Тексты для эффекта печатной машинки
    "typewriter-texts": JSON.stringify([
      "Hi, I'm Temo", 
      "Front-end Developer", 
      "Web Creator"
    ])
  },
  ru: {
    // Основные страницы
    "about-title": "Привет, я <span>Темо</span>",
    "about-text": "Фронтенд-разработчик, создаю красивые цифровые продукты",
    "projects-title": "Мои проекты",
    "skills-title": "Мои навыки",
    "contact-title": "Связаться со мной",
    
    // Форма обратной связи
    "name-label": "Ваше имя",
    "name-placeholder": "Введите ваше имя",
    "email-label": "Ваш Email",
    "email-placeholder": "Введите ваш email",
    "message-label": "Ваше сообщение",
    "message-placeholder": "Напишите ваше сообщение...",
    "submit-btn": "Отправить",
    "form-success": "Спасибо! Ваше сообщение отправлено.",
    
    // Подвал сайта
    "footer-text": "© 2025 Темо Диасамидзе. Все права защищены.",
    
    // Тексты для эффекта печатной машинки
    "typewriter-texts": JSON.stringify([
      "Привет, я Темо",
      "Фронтенд-разработчик",
      "Создатель сайтов"
    ])
  }
};

// Инициализация языковых настроек
function initLanguage() {
  // Установка языка из localStorage или предпочтений браузера
  const savedLang = localStorage.getItem('portfolio-lang');
  const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en';
  const defaultLang = savedLang || browserLang;
  
  setLanguage(defaultLang);
  
  // Настройка кнопки переключения языка
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = defaultLang === 'en' ? 'RU' : 'EN';
    langToggle.addEventListener('click', toggleLanguage);
  }
}

// Установка текущего языка
function setLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('portfolio-lang', lang);
  
  // Обновление всех переводимых элементов
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
  
  // Обновление текста кнопки переключения
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'RU' : 'EN';
  }
}

// Переключение между языками
function toggleLanguage() {
  const currentLang = document.documentElement.lang;
  const newLang = currentLang === 'en' ? 'ru' : 'en';
  setLanguage(newLang);
}

// Настройка плавной навигации
function setupNavigation() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Обработка внутренних ссылок на страницы
      if (this.getAttribute('href').endsWith('.html')) {
        e.preventDefault();
        
        // Добавление анимации исчезновения
        document.body.classList.add('fade-out');
        
        // Переход после завершения анимации
        setTimeout(() => {
          window.location.href = this.getAttribute('href');
        }, 300);
      }
      // Обработка якорных ссылок на текущей странице
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

// Настройка анимаций при скролле
function setupAnimations() {
  const animateElements = document.querySelectorAll('.animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Добавление задержки для ступенчатых анимаций
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

// Подсветка активной ссылки в навигации
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

// Обработка отправки формы обратной связи
function setupFormHandling() {
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Имитация отправки формы
      const submitBtn = this.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
        translations[document.documentElement.lang]['submit-btn'];
      
      // В реальном сценарии следует использовать FormSubmit или fetch()
      setTimeout(() => {
        // Показ сообщения об успехе
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success show';
        successMsg.setAttribute('data-translate', 'form-success');
        successMsg.textContent = translations[document.documentElement.lang]['form-success'];
        
        contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
        contactForm.reset();
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = translations[document.documentElement.lang]['submit-btn'];
        
        // Скрытие сообщения через 5 секунд
        setTimeout(() => {
          successMsg.classList.remove('show');
          setTimeout(() => successMsg.remove(), 300);
        }, 5000);
      }, 1500);
    });
  }
}

// Инициализация эффекта печатной машинки
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

  // Запуск эффекта печатной машинки
  setTimeout(typeWriter, 1000);
}

// Обработка переходов между страницами
window.addEventListener('load', () => {
  document.body.classList.remove('fade-out');
  
  // Эффект плавного появления при загрузке страницы
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});