// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".slider").forEach((slider) => {
        let slides = slider.querySelector(".slides");
        let prevBtn = slider.querySelector(".prev");
        let nextBtn = slider.querySelector(".next");
        let images = slides.querySelectorAll("img");

        let index = 0;
        const totalSlides = images.length;
        let autoSlide;
        let isTransitioning = false;

        // Preload images
        images.forEach(img => {
            const tempImage = new Image();
            tempImage.src = img.src;
            tempImage.onload = () => {
                img.style.opacity = '1';
            };
        });

        function showSlide(i) {
            if (isTransitioning) return;
            isTransitioning = true;

            if (i < 0) {
                index = totalSlides - 1;
            } else if (i >= totalSlides) {
                index = 0;
            } else {
                index = i;
            }

            slides.style.transform = `translateX(-${index * 100}%)`;

            // Update active state of controls
            updateControls();

            // Reset transition flag after animation
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }

        function updateControls() {
            // Add active state to current slide
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlide = setInterval(() => {
                if (!isTransitioning) {
                    index++;
                    showSlide(index);
                }
            }, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlide);
        }

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slides.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        slides.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left
                    index++;
                } else {
                    // Swipe right
                    index--;
                }
                showSlide(index);
            }
        }

        // Mouse events for desktop
        slides.addEventListener('mouseenter', stopAutoSlide);
        slides.addEventListener('mouseleave', startAutoSlide);

        prevBtn.addEventListener("click", () => {
            stopAutoSlide();
            index--;
            showSlide(index);
            startAutoSlide();
        });

        nextBtn.addEventListener("click", () => {
            stopAutoSlide();
            index++;
            showSlide(index);
            startAutoSlide();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                index--;
                showSlide(index);
            } else if (e.key === 'ArrowRight') {
                index++;
                showSlide(index);
            }
        });

        // Initialize
        showSlide(0);
        startAutoSlide();
    });
});

// Phone number copy functionality
function copyPhoneNumber(event) {
    event.preventDefault();
    const phoneNumber = "+201227218710";
    
    // Create a temporary notification element
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 z-50';
    notification.textContent = 'Phone number copied to clipboard!';
    document.body.appendChild(notification);

    // Show notification
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
    });

    // Try to copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        // For HTTPS
        navigator.clipboard.writeText(phoneNumber)
            .then(() => {
                showSuccessNotification();
            })
            .catch(() => {
                fallbackCopy();
            });
    } else {
        // Fallback for HTTP
        fallbackCopy();
    }

    function showSuccessNotification() {
        notification.textContent = 'Phone number copied to clipboard!';
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 z-50';
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
    }

    function showErrorNotification() {
        notification.textContent = 'Failed to copy phone number';
        notification.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 opacity-0 z-50';
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
    }

    function fallbackCopy() {
        // Create a temporary input element
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showSuccessNotification();
            } else {
                showErrorNotification();
            }
        } catch (err) {
            showErrorNotification();
        }

        document.body.removeChild(textArea);
    }

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mobile menu toggle functionality
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    menuLinks.classList.toggle('active');
    hamburgerIcon.classList.toggle('active');
}

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const menuLinks = document.querySelector('.menu-links');
            const hamburgerIcon = document.querySelector('.hamburger-icon');
            if (menuLinks.classList.contains('active')) {
                menuLinks.classList.remove('active');
                hamburgerIcon.classList.remove('active');
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// App features modal functionality
function showAppFeatures(title, description) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg p-8 max-w-md mx-4 relative';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-4 right-4 text-gray-500 hover:text-gray-700';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.fontSize = '24px';
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'text-2xl font-bold mb-4';
    titleElement.textContent = title;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'text-gray-600';
    descriptionElement.textContent = description;
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(titleElement);
    modalContent.appendChild(descriptionElement);
    modal.appendChild(modalContent);
    
    // Add to document
    document.body.appendChild(modal);
    
    // Close modal on click outside or close button
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal is closed
    modal.addEventListener('click', () => {
        document.body.style.overflow = '';
    });
}

// Enhanced Slider Functionality
function nextSlide(button) {
    const slider = button.closest('.slider');
    const slides = slider.querySelector('.slides');
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(slides).transform);
    const currentX = currentTransform.m41;
    const slideWidth = slides.firstElementChild.offsetWidth;
    
    if (Math.abs(currentX) >= slideWidth * (slides.children.length - 1)) {
        slides.style.transform = 'translateX(0)';
    } else {
        slides.style.transform = `translateX(${currentX - slideWidth}px)`;
    }
}

function prevSlide(button) {
    const slider = button.closest('.slider');
    const slides = slider.querySelector('.slides');
    const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(slides).transform);
    const currentX = currentTransform.m41;
    const slideWidth = slides.firstElementChild.offsetWidth;
    
    if (currentX >= 0) {
        slides.style.transform = `translateX(-${slideWidth * (slides.children.length - 1)}px)`;
    } else {
        slides.style.transform = `translateX(${currentX + slideWidth}px)`;
    }
}

// Initialize sliders on page load
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const slideWidth = slides.firstElementChild.offsetWidth;
        slides.style.width = `${slideWidth * slides.children.length}px`;
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.classList.add('dark');
    updateThemeIcons(true);
}

// Theme toggle click handlers
themeToggle.addEventListener('click', () => toggleTheme());
themeToggleMobile.addEventListener('click', () => toggleTheme());

function toggleTheme() {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.fa-sun');
    const moonIcons = document.querySelectorAll('.fa-moon');
    
    sunIcons.forEach(icon => {
        icon.style.display = isDark ? 'none' : 'block';
    });
    
    moonIcons.forEach(icon => {
        icon.style.display = isDark ? 'block' : 'none';
    });
}

// Project image interactions
document.addEventListener('DOMContentLoaded', function() {
    // Handle thumbnail clicks
    document.querySelectorAll('.image-grid img').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = this.closest('.project-images').querySelector('.main-image');
            const tempSrc = mainImage.src;
            mainImage.src = this.src;
            this.src = tempSrc;
        });
    });

    // Add hover effect for main image
    document.querySelectorAll('.main-image').forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Gallery functionality
let currentGalleryImages = [];
let currentImageIndex = 0;

function openGallery(projectFolder) {
    const modal = document.getElementById('galleryModal');
    const galleryImage = document.getElementById('galleryImage');
    
    // Get all images from the project folder
    const projectImages = [];
    const folderPath = `assets/${projectFolder}/`;
    
    // Special handling for Fruits Hub project
    const imageSuffix = projectFolder === 'fruits_hub' ? '-portrait' : '';
    
    // Add images to the array (assuming images are numbered sequentially)
    for (let i = 1; i <= 10; i++) {
        const imagePath = `${folderPath}${i}${imageSuffix}.png`;
        const img = new Image();
        img.src = imagePath;
        
        img.onload = function() {
            projectImages.push(imagePath);
            if (i === 1) {
                // Show first image when it loads
                galleryImage.src = imagePath;
                currentGalleryImages = projectImages;
                currentImageIndex = 0;
                modal.classList.remove('hidden');
            }
        };
        
        img.onerror = function() {
            // Stop if image doesn't exist
            if (i === 1) {
                alert('No images found for this project.');
            }
        };
    }
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.add('hidden');
    currentGalleryImages = [];
    currentImageIndex = 0;
}

function prevImage() {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    document.getElementById('galleryImage').src = currentGalleryImages[currentImageIndex];
}

function nextImage() {
    if (currentGalleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
    document.getElementById('galleryImage').src = currentGalleryImages[currentImageIndex];
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('galleryModal').classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'Escape') {
        closeGallery();
    }
});

// Add click event listener to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const overlay = card.querySelector('.overlay');
        const isActive = overlay.style.opacity === '1';

        // Toggle the overlay visibility
        overlay.style.opacity = isActive ? '0' : '1';

        // Toggle the transform effect
        const elementsToTransform = overlay.querySelectorAll('h3, p, .project-tags, .project-buttons');
        elementsToTransform.forEach(el => {
            el.style.transform = isActive ? 'translateY(20px)' : 'translateY(0)';
        });

        // Toggle the card shadow and transform
        card.style.transform = isActive ? 'none' : 'translateY(-10px)';
        card.style.boxShadow = isActive ? 'none' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
}); 
