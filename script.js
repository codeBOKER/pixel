document.addEventListener('DOMContentLoaded', function() {
    // Optional: Adjust animation speed based on screen width
    function adjustScrollSpeed() {
        const container = document.querySelector('.images-container');
        if (container) {
            const speed = window.innerWidth < 768 ? '20s' : '30s';
            container.style.animationDuration = speed;
        }
    }

    adjustScrollSpeed();
    window.addEventListener('resize', adjustScrollSpeed);

    // Initialize tag rotation
    initTagRotation();

    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements with animation classes
    document.querySelectorAll('.animate-from-left, .animate-from-right').forEach((el) => {
        observer.observe(el);
    });

    // Add intersection observer for service cards
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove existing animation classes first
                const cards = document.querySelectorAll('.service-grid-card');
                cards.forEach(card => {
                    card.classList.remove('animate');
                });

                // Trigger animation
                animateServiceCards();

                // Don't unobserve - let it trigger every time
                // serviceObserver.unobserve(entry.target); // Remove this line
            } else {
                // When section is out of view, remove animation classes
                const cards = document.querySelectorAll('.service-grid-card');
                cards.forEach(card => {
                    card.classList.remove('animate');
                });
            }
        });
    }, {
        threshold: 0.1,
        // Add root margin to trigger slightly before the section comes into view
        rootMargin: '50px'
    });

    // Observe the service grid
    const serviceGrid = document.querySelector('.service-grid');
    if (serviceGrid) {
        serviceObserver.observe(serviceGrid);
    }

    // Add intersection observer for the headphones image
    const headphonesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Reset animation to ensure it plays again
                img.style.animation = 'none';
                void img.offsetWidth; // Force reflow
                img.style.animation = 'wiggle 1s ease-in-out';
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '50px'
    });

    // Observe the headphones image
    const headphonesImg = document.querySelector('.whatsup-img');
    if (headphonesImg) {
        headphonesObserver.observe(headphonesImg);
    }

    // Store original numbers when page loads
    const numberElements = document.querySelectorAll('.numbers');
    numberElements.forEach(numberElement => {
        const originalText = numberElement.textContent;
        const hasPlus = originalText.includes('+');
        const targetNumber = parseInt(originalText);
        // Store the original values as data attributes
        numberElement.setAttribute('data-target', targetNumber);
        numberElement.setAttribute('data-has-plus', hasPlus);
        // Initialize hasAnimated property
        numberElement.hasAnimated = false;
    });

    // Add intersection observer for numbers section
    const numbersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all number elements
                const numberElements = document.querySelectorAll('.numbers');
                numberElements.forEach(numberElement => {
                    const targetNumber = parseInt(numberElement.getAttribute('data-target'));
                    const hasPlus = numberElement.getAttribute('data-has-plus') === 'true';
                    // Start animation from current value
                    animateNumber(numberElement, targetNumber, hasPlus);
                });
            }
            // Removed the else block that was resetting numbers to 0
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe the numbers section
    const numbersSection = document.querySelector('.numbers-section');
    if (numbersSection) {
        numbersObserver.observe(numbersSection);
    }
});

// Show More/Less functionality
function showMore() {
    document.querySelector('.service-grid.hide')?.classList.remove('hide');

    // Get all hidden cards
    const hiddenCards = document.querySelectorAll('.service-grid-card.hide');
    hiddenCards.forEach((card, index) => {
        card.classList.remove('hide');
        card.classList.add('new-card');
        // Animate new cards with delay
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });

    document.querySelector('.show-more').textContent = 'رؤية اقل';
    document.querySelector('.show-more').setAttribute('onclick', 'showLess()');
}

function showLess() {
    // Add hide class to grid
    document.querySelector('.service-grid')?.classList.add('hide');

    // Hide cards and remove new-card class
    document.querySelectorAll('.service-grid-card.new-card').forEach(card => {
        card.classList.remove('new-card');
        card.classList.add('hide');
    });

    // Reset button text and onclick handler
    document.querySelector('.show-more').textContent = 'رؤية المزيد';
    document.querySelector('.show-more').setAttribute('onclick', 'showMore()');
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.w-nav-menu');
    const menuButton = document.querySelector('.menu-button');

    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
        menuButton.classList.remove('w--open');
    } else {
        navMenu.style.display = 'flex';
        menuButton.classList.add('w--open');

        // Position the menu below navbar
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.alignItems = 'center';
        navMenu.style.backgroundColor = '#2e2d2bcf';
        navMenu.style.borderRadius = '8px';
        navMenu.style.padding = '10px 0';
        navMenu.style.zIndex = '1000';
    }
}

// Tag rotation functionality
function initTagRotation() {
    const serviceTags = document.querySelectorAll('.service-words');
    if (serviceTags.length === 0) return;

    // Hide all tags except the first one
    let currentTagIndex = 0;
    serviceTags.forEach((tag, index) => {
        if (index === 0) {
            tag.style.display = 'block';
            tag.style.animation = 'elementor-headline-slide-in 1s';
        } else {
            tag.style.display = 'none';
        }
    });

    // Function to rotate to the next tag
    function rotateToNextTag() {
        // Get current and next tag
        const currentTag = serviceTags[currentTagIndex];
        const nextIndex = (currentTagIndex + 1) % serviceTags.length;
        const nextTag = serviceTags[nextIndex];

        // Start slide-out animation for current tag
        currentTag.style.animation = 'elementor-headline-slide-out 1s';

        // Show and animate next tag
        nextTag.style.display = 'block';
        nextTag.style.animation = 'elementor-headline-slide-in 1s';

        // After animation completes, hide the current tag
        setTimeout(() => {
            currentTag.style.display = 'none';
            // Update current index
            currentTagIndex = nextIndex;
        }, 1000); // Wait for 1s (animation duration)
    }

    // Set interval to rotate tags every 3 seconds
    setInterval(rotateToNextTag, 3000);
}

function animateServiceCards() {
    const cards = document.querySelectorAll('.service-grid-card');
    cards.forEach((card, index) => {
        // Reset the animation by removing the class
        card.classList.remove('animate');

        // Force a reflow to ensure the animation triggers again
        void card.offsetWidth;

        // Add the animation with delay
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200);
    });
}



function animateNumber(element, targetNumber) {
    // Check if animation has already played
    if (element.hasAnimated) return;

    // Remove the '+' symbol temporarily
    const originalText = element.textContent;
    const hasPlus = originalText.includes('+');

    let startNumber = 0;
    const duration = 2000; // 2 seconds
    const steps = 60; // Smooth animation with 60 steps
    const increment = targetNumber / steps;
    let currentStep = 0;

    // Clear any existing animation
    if (element.countInterval) {
        clearInterval(element.countInterval);
    }

    element.countInterval = setInterval(() => {
        currentStep++;
        let currentNumber = Math.floor(increment * currentStep);

        if (currentStep >= steps) {
            currentNumber = targetNumber;
            clearInterval(element.countInterval);
            // Mark animation as completed
            element.hasAnimated = true;
        }

        // Add back the '+' if it existed in the original
        element.textContent = hasPlus ? `+${currentNumber}` : currentNumber;
    }, duration / steps);
}
