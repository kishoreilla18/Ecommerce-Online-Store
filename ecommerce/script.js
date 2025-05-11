const items = [
    { id: 1, name: 'Mango', price: 70 },
    { id: 2, name: 'Apple', price: 40 },
    { id: 3, name: 'Pineapple', price: 140 },
    { id: 4, name: 'Blueberry', price: 100 },
    { id: 5, name: 'Watermelon', price: 20 },
    { id: 6, name: 'Kiwi', price: 100 },
    { id: 7, name: 'Orange', price: 50 },
    { id: 8, name: 'Grapes', price: 40 },
    { id: 9, name: 'Banana', price: 50 },
    { id: 10, name: 'Papaya', price: 30 },
    { id: 11, name: 'Muskmelon', price: 35 },
    { id: 12, name: 'Pomegranate', price: 80 }
    
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card text-center">
                <img src="./IMAGES/${item.name.toLowerCase()}.jpg" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">₹${item.price}</p>
                    <button class="btn btn-success" onclick="addToCart(${item.id})">Buy</button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
}

function addToCart(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

function loadCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'col';
        cartItem.innerHTML = `
            <div class="card text-center">
                <img src="./IMAGES/${item.name.toLowerCase()}.jpg" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">₹${item.price}</p>
                </div>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
}

function checkout() {
    // Calculate the total price of items in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // Display the total price in the checkout section
    const checkoutSection = document.getElementById('checkoutTotal');
    checkoutSection.innerHTML = `
    <h3 class="m-3 text-center">Total Price: ₹${totalPrice}</h3>
    <a href="#payment" style="text-decoration: none;"><button class="btn btn-success" onclick="checkout()" style="display: block; margin: 20px auto;">Total amount to Payable</button></a>
`;

    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    // Clear the cart and update local storage
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    alert('Checkout successful. Your cart is now empty.');
}

function searchItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInput));
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card text-center">
                <img src="${item.name.toLowerCase()}.jpg" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">₹${item.price}</p>
                    <button class="btn btn-success" onclick="addToCart(${item.id})">Buy</button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
}

function payment(event){
    alert("Payment Successful, ThankYou");
}

function send(event){
    alert("Sent Successfull");
}

// Load products and cart on page load
window.onload = () => {
    loadProducts();
    loadCart();
};
