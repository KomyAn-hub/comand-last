document.addEventListener('DOMContentLoaded', function() {

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNavigation = document.getElementById('mainNavigation');
    
    if (mobileMenuToggle && mainNavigation) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNavigation.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            document.body.style.overflow = mainNavigation.classList.contains('active') ? 'hidden' : '';
        });
        
        const navLinks = mainNavigation.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNavigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        

        document.addEventListener('click', function(e) {
            if (!mainNavigation.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mainNavigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
 
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-link'); 
    
    allNavLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
  
    const siteHeader = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (siteHeader) { 
            if (scrollTop > 50) {
                siteHeader.style.boxShadow = '0 8px 40px rgba(0, 212, 255, 0.3)';
            } else {
                siteHeader.style.boxShadow = '0 5px 30px rgba(0, 212, 255, 0.2)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.subscribe-input');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                
                showNotification('Дякуємо за підписку! Ви отримали підтвердження на пошту.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Будь ласка, введіть коректну email адресу.', 'error');
            }
        });
    }
    
    const footerClock = document.getElementById('footerClock');
    const footerDate = document.getElementById('footerDate');
    
    if (footerClock && footerDate) {
        function updateClock() {
            const now = new Date();
        
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            footerClock.textContent = `${hours}:${minutes}:${seconds}`;
            
            
            const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];
            const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 
                          'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
            
            const dayName = days[now.getDay()];
            const day = now.getDate();
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            
            footerDate.textContent = `${dayName}, ${day} ${month} ${year}`;
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    const timeOnSiteElement = document.getElementById('timeOnSite');
    
    if (timeOnSiteElement) {
        let secondsOnSite = 0;
        
        setInterval(function() {
            secondsOnSite++;
            
            const hours = Math.floor(secondsOnSite / 3600);
            const minutes = Math.floor((secondsOnSite % 3600) / 60);
            const seconds = secondsOnSite % 60;
            
            let timeString = '';
            if (hours > 0) {
                timeString = `${hours} год ${minutes} хв`;
            } else if (minutes > 0) {
                timeString = `${minutes} хв ${seconds} сек`;
            } else {
                timeString = `${seconds} сек`;
            }
            
            timeOnSiteElement.textContent = timeString;
            if (secondsOnSite % 5 === 0) {
                timeOnSiteElement.style.transform = 'scale(1.2)';
                timeOnSiteElement.style.color = '#00d4ff';
                setTimeout(() => {
                    timeOnSiteElement.style.transform = 'scale(1)';
                    timeOnSiteElement.style.color = '#ba55d3';
                }, 300);
            }
        }, 1000);
    }
    
   
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #ba55d3);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
    

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #ba55d3);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(360deg)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
  
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 1.5rem';
        notification.style.borderRadius = '8px';
        notification.style.zIndex = '10000';
        notification.style.animation = 'slideInRight 0.3s ease';
        notification.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        notification.style.maxWidth = '300px';
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, rgba(0, 212, 255, 0.9), rgba(138, 43, 226, 0.9))';
            notification.style.color = '#fff';
            notification.style.border = '1px solid rgba(0, 212, 255, 0.5)';
        } else {
            notification.style.background = 'linear-gradient(135deg, rgba(255, 50, 50, 0.9), rgba(200, 0, 0, 0.9))';
            notification.style.color = '#fff';
            notification.style.border = '1px solid rgba(255, 50, 50, 0.5)';
        }
        
        document.body.appendChild(notification);
        
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    
    
    
    document.addEventListener('keydown', function(e) {
        const isMenuOpen = mainNavigation && mainNavigation.classList.contains('active');

      
        if (e.key === 'Escape' && isMenuOpen) {
            mainNavigation.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.focus(); 
            e.preventDefault(); 
            return;
        }

        if (isMenuOpen && e.key === 'Tab') {
            
            
            const focusableInMenu = mainNavigation.querySelectorAll(
                'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableInMenu.length === 0) return;

            const firstFocusable = focusableInMenu[0];
            const lastFocusable = focusableInMenu[focusableInMenu.length - 1];

            if (e.shiftKey) { 
                
                if (document.activeElement === firstFocusable || document.activeElement === mobileMenuToggle) {
                    lastFocusable.focus(); 
                    e.preventDefault();
                }
            } else { 
                
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus(); 
                    e.preventDefault();
                }
            }
        }
    });
    
    
    
    const copyrightText = document.querySelector('.copyright');
    if (copyrightText) {
        const currentYear = new Date().getFullYear();
        
        copyrightText.textContent = copyrightText.textContent.replace('2025', currentYear); 
    }
    
}); 



const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .scroll-to-top {
        transition: transform 0.3s ease !important;
    }
`;
document.head.appendChild(style);
