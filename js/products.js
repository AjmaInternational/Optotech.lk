
fetch('data/products.json')
.then(response => response.json())
.then(products => {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const card = `
        <div class="col-md-4 mb-4">
            <div class="card p-3">
                <img src="${product.image}" class="img-fluid mb-3"/>
                <h6>${product.brand}</h6>
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <h5>${product.price}</h5>
                <a href="https://wa.me/94700000000?text=Hi%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}" 
                   class="btn btn-whatsapp w-100 mt-2">More Info</a>
            </div>
        </div>`;
        container.innerHTML += card;
    });
});
