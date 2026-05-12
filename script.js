// ==================== ANIMATIONS & INTERACTIONS ====================

// 1. Плавное появление элементов при скролле (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Применить наблюдение к всем секциям и карточкам
document.querySelectorAll('section, .card, .btn').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// 2. FAQ Accordion функциональность
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', function() {
        // Закрыть все остальные
        faqItems.forEach(otherItem => {
            if (otherItem !== this) {
                otherItem.classList.remove('active');
                const answer = otherItem.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = '0px';
                }
            }
        });
        
        // Переключить текущий элемент
        this.classList.toggle('active');
        let answer = this.querySelector('.faq-answer');
        
        if (!answer) {
            // Создать элемент ответа если его нет
            answer = document.createElement('div');
            answer.className = 'faq-answer';
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            const faqAnswers = {
                0: 'Заполните форму на сайте, выберите терапевта из нашего каталога и назначьте подходящее время сеанса. Первичная консультация поможет определить ваши потребности.',
                1: 'Да, мы предлагаем полностью онлайн-сеансы через защищённую видеоконференцию. Вы можете выбрать как онлайн, так и очные консультации.',
                2: 'Терапия - это работа с психологическими проблемами и травмами с лицензированным специалистом. Коучинг - это личностное развитие и достижение целей. Оба подхода ценны.',
                3: 'Ваша конфиденциальность - наш приоритет. Все данные защищены согласно закону HIPAA и используются только для вашего лечения.'
            };
            
            const index = Array.from(faqItems).indexOf(this);
            answer.textContent = faqAnswers[index] || 'Информация недоступна';
            this.appendChild(answer);
        }
        
        if (this.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0px';
        }
    });
});

// 3. Smooth scroll для якорей навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 4. Анимация кнопок при клике
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// 5. Активная навигация при скролле
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
});

// 6. Форма отправки сообщения
const form = document.querySelector('.line-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('input[type="text"]').value;
        
        if (email && message) {
            // Анимация отправки
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '✓ Отправлено!';
            btn.style.background = '#4FB3A5';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 2000);
        }
    });
}

// 9. Счётчик с анимацией (если понадобится)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// 10. Анимация текста при загрузке героя
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.classList.add('hero-title-animate');
    }
});

// 11. Динамическое изменение класса элементов при скролле
const headerElement = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        headerElement?.classList.add('scrolled');
    } else {
        headerElement?.classList.remove('scrolled');
    }
});

// 12. Таймер для обновления статуса ответа (опционально)
function updateResponseTime() {
    const now = new Date();
    const hours = now.getHours();
    const statusElement = document.querySelector('.reply-note');
    
    if (statusElement) {
        if (hours >= 9 && hours < 18) {
            statusElement.textContent = '⚡ Мы онлайн! Ответим за 2 часа.';
        } else {
            statusElement.textContent = 'Мы ответим в течение 12 часов.';
        }
    }
}

updateResponseTime();

// 13. Добавить слушатели на кнопки для обратной связи
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

console.log('✓ Все анимации и интерактивность загружены!');
