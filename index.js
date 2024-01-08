let cart = [];
const cartLengthElement = document.getElementById('item-length');
const itemLengthElement = document.getElementById('items-length');

function addToCart(itemId, itemName, itemPrice, itemImage,button) {
    // Checking if item is already in the cart
    const existingItem = cart.find(item => item.id === itemId);

    if (!existingItem) {
        // Add item to the cart
        cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1, image: itemImage });

        updateCartLength();
        updateItemLength(); 
    }

    if (button) {
        button.style.backgroundColor = 'gray';
    }

    // Update the cart 
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    // Clear the current content
    cartItemsElement.innerHTML = '';

    let totalPrice = 0;

    // cart section
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="flex border border-white relative rounded p-2 mt-4">
        <div>
        <img class="h-[100px] w-[80px] rounded" src="${item.image}" alt="${item.name}"  >
        </div>
        <div>
       <p class="font-bold text-white text-xl"> ${item.name} </p>
       <p class=" text-white mb-2 text-xs  font-bold">${item.price}$/each</p>
        <button class="bg-white py-1 px-2 rounded absolute -top-3 left-[250px]" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash text-red-600"></i></button>
        <input class="w-20 rounded p-1" type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
        <p class="absolute text-white top-24 left-[230px]  font-bold">${item.price* item.quantity}$</p>
        </div>
        </div>
    `;

        cartItemsElement.appendChild(li);

        totalPrice += item.price * item.quantity;
    });

    // Update the total price
    totalElement.textContent = totalPrice;

    // Disable the 'Add to Cart' button after order 
    disableAddToCartButtons();
}

function updateQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        updateCart();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    updateCartLength();
}

function updateCartLength() {
    if (cartLengthElement) {
        cartLengthElement.textContent = cart.length.toString();
    }
}
function updateItemLength() {
    if (itemLengthElement) {
        itemLengthElement.textContent = cart.length.toString();
    }
}

function disableAddToCartButtons() {
    // Disable the 'Add to Cart' button after order 
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        const itemId = button.parentNode.id;
        const isInCart = cart.some(item => item.id === itemId);
        button.disabled = isInCart;
    });
}