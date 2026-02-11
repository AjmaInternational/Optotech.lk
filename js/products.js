document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    if (!container) return;

    fetch('data/products.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(products => {
            container.innerHTML = ''; // Clear container
            products.forEach((product, index) => {
                const card = `
                <div class="group fade-up">
                    <div class="overflow-hidden mb-10 aspect-[4/5] bg-white">
                        <img src="${product.image}"
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                             alt="${product.name}">
                    </div>
                    <div class="space-y-6">
                        <div class="flex justify-between items-start">
                            <div class="space-y-1">
                                <p class="text-[10px] uppercase tracking-[0.2em] text-brand-gray font-medium">${product.brand}</p>
                                <h4 class="text-2xl font-bold font-sans">${product.name}</h4>
                            </div>
                            <p class="text-sm font-medium tracking-tighter">${product.price}</p>
                        </div>
                        <p class="text-brand-gray text-sm leading-relaxed">${product.description}</p>
                        <hr class="border-black/5">
                        <a href="https://wa.me/94700000000?text=Hi%20I%20am%20interested%20in%20the%20${encodeURIComponent(product.brand + ' ' + product.name)}"
                           class="btn-outline w-full text-center py-4">
                           Inquire
                        </a>
                    </div>
                </div>`;
                container.innerHTML += card;
            });

            // Re-trigger animations for dynamic content
            if (window.initFadeAnimations) {
                window.initFadeAnimations();
            }
        })
        .catch(error => console.error('Error loading products:', error));
});
