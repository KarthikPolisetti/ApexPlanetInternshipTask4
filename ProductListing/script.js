const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 999, rating: 4.5 },
    { id: 2, name: 'T-Shirt', category: 'clothing', price: 19, rating: 3.8 },
    { id: 3, name: 'Book', category: 'books', price: 29, rating: 4.2 },
    { id: 4, name: 'Headphones', category: 'electronics', price: 89, rating: 4.0 },
    { id: 5, name: 'Jeans', category: 'clothing', price: 49, rating: 4.1 },
    { id: 6, name: 'Novel', category: 'books', price: 15, rating: 4.7 }
];

function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: $${product.price}</p>
            <p>Rating: ${product.rating}/5</p>
        `;
        productGrid.appendChild(card);
    });
}

function filterAndSortProducts() {
    const category = document.getElementById('category-filter').value;
    const sortBy = document.getElementById('sort-by').value;

    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    filteredProducts = filteredProducts.sort((a, b) => {
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
    });

    displayProducts(filteredProducts);
}

document.getElementById('category-filter').addEventListener('change', filterAndSortProducts);
document.getElementById('sort-by').addEventListener('change', filterAndSortProducts);

// Initial display
document.addEventListener('DOMContentLoaded', filterAndSortProducts);