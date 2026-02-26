document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allProducts = [];

    // Fetch and display products
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error loading products:', error));

    function displayProducts(products) {
        if (!productContainer) return;

        productContainer.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card group fade-up';

            const whatsappMessage = encodeURIComponent(`Hi Optotech, I am interested in the ${product.brand} ${product.model} eyewear.`);
            const whatsappLink = `https://wa.me/94770000000?text=${whatsappMessage}`;

            productCard.innerHTML = `
                <div class="overflow-hidden aspect-[4/5] bg-white mb-8 md:mb-12 border border-black/5">
                    <img src="${product.image}" alt="${product.model}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
                </div>
                <div class="space-y-4 md:space-y-8 text-center px-4 md:px-0">
                    <div>
                        <p class="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-gray mb-2 md:mb-4">${product.brand}</p>
                        <h3 class="text-xl md:text-4xl font-heading tracking-tight mb-2 md:mb-4 italic">${product.model}</h3>
                        <p class="text-sm md:text-xl font-light text-brand-accent uppercase tracking-[0.2em]">${product.price}</p>
                    </div>
                    <div class="border-t border-black/5 pt-6 md:pt-10 max-w-sm mx-auto">
                        <p class="hidden md:block text-xs text-brand-gray uppercase tracking-widest leading-relaxed mb-12">${product.description}</p>
                        <a href="${whatsappLink}" target="_blank" class="inline-block w-full border border-black px-8 py-4 md:py-6 text-[10px] tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all duration-500">Inquire</a>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        });

        // Initialize GSAP fade-up for dynamically added elements
        if (window.initFadeAnimations) {
            window.initFadeAnimations();
        }
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'border-black');
                btn.classList.add('border-black/5');
            });
            button.classList.add('active', 'border-black');
            button.classList.remove('border-black/5');

            const brand = button.getAttribute('data-brand').toLowerCase();
            const filteredProducts = brand === 'all'
                ? allProducts
                : allProducts.filter(p => p.brand.toLowerCase() === brand);

            displayProducts(filteredProducts);
        });
    });
});
