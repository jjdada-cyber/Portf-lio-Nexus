// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollIndicator();
    initializeTabNavigation();
    initializeAnimations();
    initializeTypingEffect();
    initializeParticles();
    initializeMobileMenu();
});


function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
           
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}


function initializeScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        tabsContainer.addEventListener('scroll', () => {
            const winScroll = tabsContainer.scrollTop;
            const height = tabsContainer.scrollHeight - tabsContainer.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollIndicator.style.width = scrolled + '%';
        });
    }
}


function resetMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.width = '';
        navMenu.style.background = '';
        navMenu.style.backdropFilter = '';
        navMenu.style.padding = '';
        navMenu.style.gap = '';
    }
}


function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
             
                if (entry.target.classList.contains('service-card')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out both';
                    }, Math.random() * 300);
                }
                
               
                if (entry.target.classList.contains('partnership-card')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out both';
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);

    
    const animatedElements = document.querySelectorAll('.service-card, .partnership-card, .contact-method, .contact-main');
    animatedElements.forEach(el => observer.observe(el));
}


function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-effect');
    const cursor = document.querySelector('.cursor');
    const text = 'Nexus';
    let index = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!isDeleting && index < text.length) {
            typingElement.textContent += text[index];
            index++;
            setTimeout(typeEffect, 150);
        } else if (isDeleting && index > 0) {
            typingElement.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(typeEffect, 100);
        } else if (!isDeleting && index === text.length) {
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2000);
        } else if (isDeleting && index === 0) {
            setTimeout(() => {
                isDeleting = false;
                typeEffect();
            }, 500);
        }
    }

 
    setTimeout(() => {
        typingElement.textContent = '';
        typeEffect();
    }, 1000);
}


function initializeParticles() {
    const particlesContainer = document.querySelector('.particles');
    const numberOfParticles = 15;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
       
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        
        const fireColors = ['#ff4500', '#ff6b35', '#ffa500', '#ff8c00'];
        particle.style.background = fireColors[Math.floor(Math.random() * fireColors.length)];
        
        particlesContainer.appendChild(particle);
        
        
        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle(); 
        });
    }

    // Criar partículas iniciais
    for (let i = 0; i < numberOfParticles; i++) {
        setTimeout(createParticle, i * 200);
    }
}


function optimizeResponsiveness() {
    const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Ajustar tamanhos baseados na resolução
        const container = document.querySelector('.container');
        const heroTitle = document.querySelector('.hero-title');
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (width <= 768) {
            // Mobile/Tablet
            if (container) {
                container.style.padding = '0 1rem';
            }
            if (navMenu) {
                navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : 'none';
            }
            if (hamburger) {
                hamburger.style.display = 'flex';
            }
        } else {
            // Desktop
            if (container) {
                container.style.padding = '0 2rem';
            }
            if (navMenu) {
                navMenu.style.display = 'flex';
                navMenu.style.position = 'static';
                navMenu.style.background = 'none';
                navMenu.style.backdropFilter = 'none';
                navMenu.style.padding = '0';
                navMenu.style.flexDirection = 'row';
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.style.display = 'none';
                hamburger.classList.remove('active');
                resetMobileMenu();
            }
        }
        
       
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.minHeight = `${height}px`;
        }
        
 
        const fireParticles = document.querySelectorAll('.fire-particle');
        fireParticles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.right > width) {
                particle.style.right = '0';
            }
        });
    };
    

    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
    });
    
    // Executar imediatamente
    handleResize();
}


function preventHorizontalScroll() {
    
    const checkOverflow = () => {
        const body = document.body;
        const html = document.documentElement;
        
        if (body.scrollWidth > window.innerWidth) {
     
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.right > window.innerWidth) {
                    element.style.maxWidth = '100%';
                    element.style.boxSizing = 'border-box';
                }
            });
        }
    };
    
    
    setInterval(checkOverflow, 1000);
    window.addEventListener('resize', checkOverflow);
}


function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
        
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'rgba(10, 10, 10, 0.95)';
                navMenu.style.backdropFilter = 'blur(10px)';
                navMenu.style.padding = '2rem';
                navMenu.style.gap = '1rem';
            } else {
                resetMobileMenu();
            }
        });

        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                resetMobileMenu();
            });
        });
    }
}


document.addEventListener('mousemove', (e) => {
   
    const interactiveElements = document.querySelectorAll('.btn, .tab-btn, .service-card, .partnership-card');
    
    interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            element.style.setProperty('--mouse-x', x + 'px');
            element.style.setProperty('--mouse-y', y + 'px');
        }
    });
});


function copyDiscordLink() {
    const discordLink = 'https://discord.gg/FYk5mzqAhd';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(discordLink).then(() => {
            showNotification('Link do Discord copiado!');
        });
    } else {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = discordLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link do Discord copiado!');
    }
}


function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff4500, #ff6b35);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        animation: slideInRight 0.5s ease-out, slideOutRight 0.5s ease-out 2.5s;
        box-shadow: 0 5px 20px rgba(255, 69, 0, 0.3);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
document.head.appendChild(notificationStyles);


function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


const throttledScrollHandler = throttle(() => {
   
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
  
    showNotification('🔥 Modo Desenvolvedor Ativado! 🔥');
    
   
    const rainbowStyles = document.createElement('style');
    rainbowStyles.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyles);
    
    setTimeout(() => {
        document.body.style.animation = '';
        rainbowStyles.remove();
    }, 2000);
}


function detectTouch() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        
  
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .btn:hover,
            .touch-device .nav-link:hover,
            .touch-device .skill-tag:hover {
                transform: none;
            }
            
            .touch-device .partnership-card:hover {
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }
}

detectTouch();


optimizeResponsiveness();
preventHorizontalScroll();


window.addEventListener('load', () => {
   
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 500);
    }
    

    document.body.classList.add('loaded');
    
   
    setTimeout(() => {
        optimizeResponsiveness();
    }, 100);
});


window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        optimizeResponsiveness();
        preventHorizontalScroll();
    }, 200);
});

// Otimizar performance
const optimizePerformance = () => {
 
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    
    const lazyElements = document.querySelectorAll('.service-card, .partnership-card');
    lazyElements.forEach(el => {
        observer.observe(el);
    });
};


window.addEventListener('DOMContentLoaded', optimizePerformance);


console.clear();
console.log('%c🔥 NEXUS PORTFOLIO 🔥', 'color: #ff4500; font-size: 24px; font-weight: bold;');
console.log('%cDesenvolvido com paixão por programação!', 'color: #ff6b35; font-size: 14px;');
console.log('%cInteressado em colaborar? Discord: https://discord.gg/FYk5mzqAhd', 'color: #ffa500; font-size: 12px;');
