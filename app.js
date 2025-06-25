// DOM Elements
const navTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');
const contactForm = document.querySelector('.contact-form');

// Tab Navigation
function initTabNavigation() {
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            navTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Smooth scroll to top of content
                targetContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
            
            // Update URL hash
            window.location.hash = targetTab;
        });
    });
}

// Handle URL hash on page load
function handleInitialHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetTab = document.querySelector(`[data-tab="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

// Contact Form Handling
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email) {
        showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-error)' : 'var(--color-info)'};
        color: white;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
    });
    
    // Add animation styles
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
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// KPI Card Hover Effects
function initKPIHoverEffects() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scroll for timeline items
function initTimelineEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for timeline animation
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach((item, index) => {
        // Initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        timelineObserver.observe(item);
    });
}

// Table responsive handling
function initResponsiveTables() {
    const tables = document.querySelectorAll('.budget-table table, .comparison-table table');
    
    tables.forEach(table => {
        // Add scroll hint for mobile
        const wrapper = table.parentNode;
        if (window.innerWidth <= 768) {
            wrapper.style.position = 'relative';
            
            const scrollHint = document.createElement('div');
            scrollHint.textContent = '← Deslize para ver mais →';
            scrollHint.style.cssText = `
                position: absolute;
                bottom: -25px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 12px;
                color: var(--color-text-secondary);
                pointer-events: none;
            `;
            
            wrapper.appendChild(scrollHint);
            
            // Hide hint after user scrolls
            wrapper.addEventListener('scroll', () => {
                scrollHint.style.opacity = '0.5';
            });
        }
    });
}

// Pricing card highlight effect
function initPricingEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            pricingCards.forEach(c => c.classList.remove('pricing-selected'));
            
            // Add active class to clicked card
            card.classList.add('pricing-selected');
            
            // Add selection styles
            const style = document.createElement('style');
            style.textContent = `
                .pricing-selected {
                    transform: scale(1.02);
                    box-shadow: 0 8px 25px rgba(33, 128, 141, 0.3) !important;
                }
            `;
            
            if (!document.querySelector('#pricing-styles')) {
                style.id = 'pricing-styles';
                document.head.appendChild(style);
            }
        });
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Navigate tabs with arrow keys when focused on nav
        if (document.activeElement.classList.contains('nav-tab')) {
            const currentIndex = Array.from(navTabs).indexOf(document.activeElement);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % navTabs.length;
                navTabs[nextIndex].focus();
                navTabs[nextIndex].click();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = (currentIndex - 1 + navTabs.length) % navTabs.length;
                navTabs[prevIndex].focus();
                navTabs[prevIndex].click();
            }
        }
    });
}

// Initialize tooltips for KPIs
function initTooltips() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    const tooltipTexts = {
        'Impressões': 'Número total de vezes que seus anúncios são exibidos para usuários',
        'CTR': 'Taxa de cliques - porcentagem de pessoas que clicam no seu anúncio',
        'Custo por Lead': 'Valor médio pago por cada lead qualificado gerado',
        'ROAS': 'Retorno sobre investimento em publicidade - receita gerada por cada dollar gasto',
        'Engajamento': 'Taxa de interação dos usuários com seu conteúdo (curtidas, comentários, compartilhamentos)'
    };
    
    kpiCards.forEach(card => {
        const title = card.querySelector('h4').textContent;
        const tooltipText = tooltipTexts[title];
        
        if (tooltipText) {
            card.setAttribute('title', tooltipText);
            card.style.cursor = 'help';
        }
    });
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-primary);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize all functionality
function init() {
    // Core functionality
    initTabNavigation();
    initContactForm();
    handleInitialHash();
    
    // Enhanced UX
    initKPIHoverEffects();
    initTimelineEffects();
    initResponsiveTables();
    initPricingEffects();
    initKeyboardNavigation();
    initTooltips();
    initScrollProgress();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        initResponsiveTables();
    });
    
    console.log('Proposta Malbor Coatings - Aplicação inicializada com sucesso!');
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}