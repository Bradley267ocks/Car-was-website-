document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Review Slider
    const reviewSlides = document.querySelector('.review-slides');
    const reviewSlideItems = document.querySelectorAll('.review-slide');
    const prevBtn = document.querySelector('.review-nav-btn.prev');
    const nextBtn = document.querySelector('.review-nav-btn.next');
    let currentReviewSlide = 0;
    
    function showReviewSlide(index) {
        if (index < 0) index = reviewSlideItems.length - 1;
        if (index >= reviewSlideItems.length) index = 0;
        
        reviewSlides.style.transform = `translateX(-${index * 100}%)`;
        currentReviewSlide = index;
    }
    
    prevBtn.addEventListener('click', () => showReviewSlide(currentReviewSlide - 1));
    nextBtn.addEventListener('click', () => showReviewSlide(currentReviewSlide + 1));
    
    // Auto slide reviews every 5 seconds
    setInterval(() => showReviewSlide(currentReviewSlide + 1), 5000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lightbox Functions
    function openLightbox(img) {
        document.getElementById("lightbox").style.display = "flex";
        document.getElementById("lightbox-img").src = img.src;
    }

    function closeLightbox() {
        document.getElementById("lightbox").style.display = "none";
    }
    
    // Add event listener for lightbox close
    document.querySelector('.close-btn').addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('washForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your request for ${service} has been received. We'll contact you at ${email} shortly.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .offer-card, .about-image, .contact-form, .review-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .offer-card, .about-image, .contact-form, .review-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Optional script — adds a simple log to confirm it's running
    console.log("Wash and Glow website is fully loaded and functional.");
});
