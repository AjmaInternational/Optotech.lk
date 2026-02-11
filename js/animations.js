// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Function to animate elements
function initFadeAnimations() {
    const fadeUps = document.querySelectorAll('.fade-up');
    fadeUps.forEach((el) => {
        // If already animated, skip
        if (el.classList.contains('animated')) return;

        gsap.fromTo(el,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    toggleActions: "play none none none"
                },
                onComplete: () => el.classList.add('animated')
            }
        );
    });
}

// Initial run
initFadeAnimations();

// Subtle Image Parallax for Hero
const heroBg = document.querySelector('#hero-bg');
if (heroBg) {
    gsap.to(heroBg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: heroBg,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// Subtle Hover Zoom for images
document.addEventListener('mouseover', (e) => {
    const img = e.target.closest('.overflow-hidden img');
    if (img) {
        gsap.to(img, { scale: 1.05, duration: 1, ease: "power2.out" });
    }
});

document.addEventListener('mouseout', (e) => {
    const img = e.target.closest('.overflow-hidden img');
    if (img) {
        gsap.to(img, { scale: 1, duration: 1, ease: "power2.out" });
    }
});

// Export for dynamic content
window.initFadeAnimations = initFadeAnimations;
