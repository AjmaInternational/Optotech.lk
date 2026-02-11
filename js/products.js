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
                <div class="overflow-hidden aspect-[4/5] bg-white mb-10">
                    <img src="${product.image}" alt="${product.model}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
                </div>
                <div class="space-y-4">
                    <div class="flex justify-between items-start border-b border-black/5 pb-6">
                        <div>
                            <p class="text-[9px] uppercase tracking-[0.4em] text-brand-gray mb-1">${product.brand}</p>
                            <h3 class="text-2xl font-serif font-bold">${product.model}</h3>
                        </div>
                        <p class="text-sm font-medium tracking-tight">${product.price}</p>
                    </div>
                    <p class="text-xs text-brand-gray leading-relaxed max-w-sm">${product.description}</p>
                    <div class="pt-4">
                        <a href="${whatsappLink}" target="_blank" class="btn-outline w-full text-center py-4 text-[10px]">Inquire via WhatsApp</a>
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

            const brand = button.getAttribute('data-brand');
            const filteredProducts = brand === 'all'
                ? allProducts
                : allProducts.filter(p => p.brand === brand);

            displayProducts(filteredProducts);
        });
    });
});
