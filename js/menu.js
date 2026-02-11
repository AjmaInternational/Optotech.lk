document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    const navbar = document.getElementById('navbar');

    let isMenuOpen = false;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                // Open menu
                mobileMenu.classList.remove('translate-x-full');
                bar1.classList.add('rotate-45', 'translate-y-2');
                bar2.classList.add('opacity-0');
                bar3.classList.add('-rotate-45', '-translate-y-2');
                document.body.style.overflow = 'hidden';

                // When menu is open, we want the bars to be visible on the light background
                navbar.classList.remove('mix-blend-difference', 'text-white');
                navbar.classList.add('text-brand-text');
                bar1.classList.remove('bg-white');
                bar1.classList.add('bg-brand-text');
                bar2.classList.remove('bg-white');
                bar2.classList.add('bg-brand-text');
                bar3.classList.remove('bg-white');
                bar3.classList.add('bg-brand-text');
            } else {
                // Close menu
                mobileMenu.classList.add('translate-x-full');
                bar1.classList.remove('rotate-45', 'translate-y-2');
                bar2.classList.remove('opacity-0');
                bar3.classList.remove('-rotate-45', '-translate-y-2');
                document.body.style.overflow = '';

                // Restore navbar state based on scroll
                updateNavbarState();
            }
        });
    }

    function updateNavbarState() {
        if (isMenuOpen) return;

        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-sm');
            navbar.classList.remove('mix-blend-difference', 'text-white');
            navbar.classList.add('text-brand-text');
            bar1.classList.remove('bg-white');
            bar1.classList.add('bg-brand-text');
            bar2.classList.remove('bg-white');
            bar2.classList.add('bg-brand-text');
            bar3.classList.remove('bg-white');
            bar3.classList.add('bg-brand-text');
        } else {
            navbar.classList.remove('bg-white', 'shadow-sm', 'text-brand-text');
            navbar.classList.add('mix-blend-difference', 'text-white');
            bar1.classList.add('bg-white');
            bar1.classList.remove('bg-brand-text');
            bar2.classList.add('bg-white');
            bar2.classList.remove('bg-brand-text');
            bar3.classList.add('bg-white');
            bar3.classList.remove('bg-brand-text');
        }
    }

    // Handle scroll for navbar background
    window.addEventListener('scroll', updateNavbarState);

    // Close menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                menuToggle.click();
            }
        });
    });

    // Initial state check
    updateNavbarState();
});
