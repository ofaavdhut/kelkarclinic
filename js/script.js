document.addEventListener('DOMContentLoaded', function() {
    
    navbarScroll();
    mobileMenuToggle();
    scrollAnimations();
    lightboxGallery();
    contactFormValidation();
});

function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

function mobileMenuToggle() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

function scrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

function lightboxGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-page-grid .gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

function contactFormValidation() {
    const contactForm = document.getElementById('whatsappForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            let isValid = true;
            let errorMessage = '';
            
            if (!name || !name.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your name';
                if (name) name.style.borderColor = '#e74c3c';
            } else {
                if (name) name.style.borderColor = '#e2e8f0';
            }
            
            if (!phone || !phone.value.trim()) {
                isValid = false;
                if (!errorMessage) errorMessage = 'Please enter your phone number';
                if (phone) phone.style.borderColor = '#e74c3c';
            } else if (!validatePhone(phone.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
                if (phone) phone.style.borderColor = '#e74c3c';
            } else {
                if (phone) phone.style.borderColor = '#e2e8f0';
            }
            
            if (!message || !message.value.trim()) {
                isValid = false;
                if (!errorMessage) errorMessage = 'Please enter your message';
                if (message) message.style.borderColor = '#e74c3c';
            } else {
                if (message) message.style.borderColor = '#e2e8f0';
            }
            
            if (isValid) {
                const waMessage = `Hello Kelkar Clinic, I want to contact you.%0A%0AName: ${encodeURIComponent(name.value)}%0APhone: ${encodeURIComponent(phone.value)}%0AMessage: ${encodeURIComponent(message.value)}`;
                const waUrl = `https://wa.me/919975726202?text=${waMessage}`;
                window.open(waUrl, '_blank');
                contactForm.reset();
            } else {
                alert(errorMessage);
            }
        });
    }
}

function validatePhone(phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
});