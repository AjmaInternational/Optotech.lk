document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slider-track');
    const tabs = document.querySelectorAll('.brand-tab');
    let currentSlide = 0;
    const slideCount = tabs.length;
    let autoSlideInterval;

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        tabs.forEach((tab, i) => {
            if (i === currentSlide) {
                tab.classList.add('active', 'border-black');
                tab.classList.remove('border-black/10');
            } else {
                tab.classList.remove('active', 'border-black');
                tab.classList.add('border-black/10');
            }
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slideCount);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    startAutoSlide();
});
