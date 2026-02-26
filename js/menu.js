document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    const navbar = document.getElementById('navbar');
    const logoImg = navbar.querySelector('img');

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

                // Switch navbar to light mode for menu
                navbar.classList.remove('mix-blend-difference', 'text-white');
                navbar.classList.add('text-brand-text');
                bar1.classList.remove('bg-white');
                bar1.classList.add('bg-brand-text');
                bar2.classList.remove('bg-white');
                bar2.classList.add('bg-brand-text');
                bar3.classList.remove('bg-white');
                bar3.classList.add('bg-brand-text');
                logoImg.classList.remove('invert', 'brightness-0');
            } else {
                // Close menu
                mobileMenu.classList.add('translate-x-full');
                bar1.classList.remove('rotate-45', 'translate-y-2');
                bar2.classList.remove('opacity-0');
                bar3.classList.remove('-rotate-45', '-translate-y-2');
                document.body.style.overflow = '';

                updateNavbarState();
            }
        });
    }

    function updateNavbarState() {
        if (isMenuOpen) return;

        if (window.scrollY > 50) {
            navbar.classList.add('bg-white', 'shadow-sm', 'py-4');
            navbar.classList.remove('mix-blend-difference', 'text-white', 'py-6');
            navbar.classList.add('text-brand-text');
            bar1.classList.remove('bg-white');
            bar1.classList.add('bg-brand-text');
            bar2.classList.remove('bg-white');
            bar2.classList.add('bg-brand-text');
            bar3.classList.remove('bg-white');
            bar3.classList.add('bg-brand-text');
            logoImg.classList.remove('invert', 'brightness-0');
        } else {
            navbar.classList.remove('bg-white', 'shadow-sm', 'text-brand-text', 'py-4');
            navbar.classList.add('mix-blend-difference', 'text-white', 'py-6');
            bar1.classList.add('bg-white');
            bar1.classList.remove('bg-brand-text');
            bar2.classList.add('bg-white');
            bar2.classList.remove('bg-brand-text');
            bar3.classList.add('bg-white');
            bar3.classList.remove('bg-brand-text');
            logoImg.classList.add('invert', 'brightness-0');
        }
    }

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

    // Handle Dropdown for touch devices
    const dropdownToggle = document.querySelector('.group > span');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth < 768) {
                const menu = dropdownToggle.nextElementSibling;
                menu.classList.toggle('hidden');
            }
        });
    }

    updateNavbarState();
});
