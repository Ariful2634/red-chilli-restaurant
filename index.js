let cart = [];

    function addToCart(itemId, itemName, itemPrice) {
        // Check if item is already in the cart
        const existingItem = cart.find(item => item.id === itemId);

        if (!existingItem) {
            // Add item to the cart
            cart.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1 });

            // Display confirmation message
            document.getElementById('confirmation').style.display = 'block';
            setTimeout(() => {
                document.getElementById('confirmation').style.display = 'none';
            }, 2000);
        }

        // Update the cart display
        updateCart();
    }

    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        const totalElement = document.getElementById('total');

        // Clear the current content
        cartItemsElement.innerHTML = '';

        let totalPrice = 0;

        // Populate the cart
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="removeFromCart('${item.id}')">Remove</button>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">`;

            cartItemsElement.appendChild(li);

            totalPrice += item.price * item.quantity;
        });

        // Update the total price
        totalElement.textContent = totalPrice.toFixed(2);

        // Disable the 'Add to Cart' button for added items
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
    }

    function disableAddToCartButtons() {
        // Disable the 'Add to Cart' button for items already in the cart
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            const itemId = button.parentNode.id;
            const isInCart = cart.some(item => item.id === itemId);
            button.disabled = isInCart;
        });
    }