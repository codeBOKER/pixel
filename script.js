document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.images-container');
    if (container) {
        // Clone all items
        const items = container.innerHTML;
        container.innerHTML = items + items;
    }

    // Optional: Adjust animation speed based on screen width
    function adjustScrollSpeed() {
        const container = document.querySelector('.images-container');
        if (container) {
            const speed = window.innerWidth < 768 ? '10s' : '20s';
            container.style.animationDuration = speed;
        }
    }

    adjustScrollSpeed();
    window.addEventListener('resize', adjustScrollSpeed);
});

// Show More/Less functionality
function showMore() {
    // Remove hide class from grid
    document.querySelector('.service-grid.hide')?.classList.remove('hide');

    // Remove hide class from all hidden cards
    document.querySelectorAll('.service-grid-card.hide').forEach(card => {
        card.classList.remove('hide');
        card.classList.add('new-card');
    });

    // Change button text and onclick handler
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
