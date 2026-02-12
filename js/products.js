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
            productCard.className = 'product-card group fade-up bg-white rounded-[3rem] p-12 hover:shadow-xl transition-all duration-700';

            const whatsappMessage = encodeURIComponent(`Hi Optotech, I am interested in the ${product.brand} ${product.model} eyewear.`);
            const whatsappLink = `https://wa.me/94770000000?text=${whatsappMessage}`;

            productCard.innerHTML = `
                <div class="overflow-hidden aspect-square bg-[#F6F6F4] mb-12 rounded-[2rem]">
                    <img src="${product.image}" alt="${product.model}" class="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000">
                </div>
                <div class="space-y-6 text-center">
                    <div>
                        <p class="text-[9px] uppercase tracking-[0.4em] text-brand-gray mb-2 font-bold">${product.brand}</p>
                        <h3 class="text-xl font-heading tracking-tighter mb-2">${product.model}</h3>
                        <p class="text-sm font-medium text-brand-accent">${product.price}</p>
                    </div>
                    <div class="border-t border-black/5 pt-6">
                        <p class="text-[10px] text-brand-gray uppercase tracking-widest leading-relaxed mb-8 line-clamp-1">${product.description}</p>
                        <a href="${whatsappLink}" target="_blank" class="btn-outline inline-block px-12 py-4 text-[9px] tracking-[0.2em] font-bold">Inquire</a>
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
