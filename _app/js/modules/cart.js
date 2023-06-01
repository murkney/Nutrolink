import { sanity } from "../sanity.js";

export default async function Cart() {
	const query = `*[_type == 'product'] {
		_id,
		title,
		"image": image.asset->url,
		price
	}`;
	
	const output = await sanity.fetch(query);

	// Cart
	let cartIcon = document.querySelector("#cart-icon");
	let cart = document.querySelector(".cart");
	let closeCart = document.querySelector("#close-cart");

	// Open cart
	cartIcon.addEventListener('click', handleCartIconClick);

	function handleCartIconClick() {
		cart.classList.add("active");
	};

	// Close cart
	closeCart.addEventListener('click', handleCloseCartClick);

	function handleCloseCartClick() {
		cart.classList.remove("active");
	};

	// Cart working JS
	if (document.readyState == "loading") {
		document.addEventListener("DOMContentLoaded", ready);
	} else {
		ready();
	};
	
	// Making Ready Function
	function ready() {
		// Remove items from cart
		var removeCartButtons = document.getElementsByClassName("cart-remove");
		for (var i = 0; i < removeCartButtons.length; i++) {
			var button = removeCartButtons[i];
			button.addEventListener("click", removeCartItem);
		}
		var quantityInputs = document.getElementsByClassName('cart-quantity');
		for (var i = 0; i < quantityInputs.length; i++) {
			var input = quantityInputs[i];
			input.addEventListener("change", quantityChanged);
		}

		// Add to cart
		var addCart = document.getElementsByClassName("product-item__add");
		for (var i = 0; i < addCart.length; i++) {
			var button = addCart[i];
			button.addEventListener("click", addCartClicked);
		}

		// Buy button Work
		document
			.getElementsByClassName("btn-buy")[0]
			.addEventListener("click", buyButtonClicked);

		// Clear button Work
		document
			.getElementsByClassName("btn-clear")[0]
			.addEventListener("click", clearButtonClicked);

		// Load cart items from local storage
		loadCartItems();
	};

	// Making Function for buy button
	function buyButtonClicked() {
		alert('Your order is placed')
		var cartContent = document.getElementsByClassName("cart-content")[0];
		while (cartContent.hasChildNodes()) {
			cartContent.removeChild(cartContent.firstChild);
		}
		updateTotal();

		// Clear cart items from local storage
		clearCartItems();

		cart.classList.remove("active");
	}

	// Making function for clear cart button
	function clearButtonClicked() {
		var cartContent = document.getElementsByClassName("cart-content")[0];
		while (cartContent.hasChildNodes()) {
			cartContent.removeChild(cartContent.firstChild);
		}
		updateTotal();

		// Clear cart items from local storage
		clearCartItems();

		cart.classList.remove("active");

	}

	// Making Function to remove items from cart 
	function removeCartItem(event) {
		var buttonClicked = event.target;
		buttonClicked.parentElement.remove();
		updateTotal();

		// Update cart items in local storage
		updateCartItems();

	};

	// Quantity changes
	function quantityChanged(event) {
		var input = event.target;
		if (isNaN(input.value) || input.value <= 0) {
			input.value = 1;
		}
		updateTotal();

		// Update cart items in local storage
		updateCartItems();

	};

	// Add To Cart
	function addCartClicked(event) {
		var button = event.target;
		var shopProducts = button.parentElement;
		var title = shopProducts.getElementsByClassName("product-item__title")[0].innerText;
		var price = shopProducts.getElementsByClassName("product-item__price")[0].innerText;
		var productImg = shopProducts.getElementsByClassName("product-item__image")[0].src;
		addProductToCart(title, price, productImg);
		updateTotal();
		cart.classList.add("active");

		// Update cart items in local storage
		updateCartItems();

	};

	function addProductToCart(title, price, productImg) {
		var cartShopBox = document.createElement("div");
		cartShopBox.classList.add("cart-box");
		var cartItems = document.getElementsByClassName("cart-content")[0];
		var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
		
		for (var i = 0; i < cartItemsNames.length; i++) {
			if (cartItemsNames[i].innerText === title) {
				alert("You have already add this item to cart");
				return;
			}
		};

		var cartBoxContent = 
		`
			<img src="${productImg}" alt="" class="cart-img">
			<div class="detail-box">
				<div class="cart-product-title">${title}</div>
				<div class="cart-price">${price}</div>
				<input type="number" value="1" class="cart-quantity">
			</div>
			<i class='bx bxs-trash-alt cart-remove' ></i>
		`;
		
		cartShopBox.innerHTML = cartBoxContent;
		cartItems.append(cartShopBox);
		cartShopBox
			.getElementsByClassName("cart-remove")[0]
			.addEventListener("click", removeCartItem);
		cartShopBox
			.getElementsByClassName("cart-quantity")[0]
			.addEventListener("change", quantityChanged);
	};

	// Function to Update Total
	function updateTotal() {
		var cartContent = document.getElementsByClassName("cart-content")[0];
		var cartBoxes = cartContent.getElementsByClassName("cart-box");
		var total = 0;
		
		for (var i = 0; i < cartBoxes.length; i++) {
			var cartBox = cartBoxes[i];
			var priceElement = cartBox.getElementsByClassName("cart-price")[0];
			var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
			var price = parseFloat(priceElement.innerText.replace(",- NOK", ""));
			var quantity = quantityElement.value;
			total = total + price * quantity;
		}
		
		total = Math.round(total * 100) / 100;

		document.getElementsByClassName("total-price")[0].innerText = total + ",- NOK";

		// Update total in local storage
		localStorage.setItem("cartTotal", total);
	};

	// Function to load cart items from local storage
	function loadCartItems() {
		var cartItems = localStorage.getItem("cartItems");
		if (cartItems) {
		var cartContent = document.getElementsByClassName("cart-content")[0];
		cartContent.innerHTML = cartItems;
			updateTotal();
			attachCartEvents();
		}
	}
	
	// Function to update cart items in local storage
	function updateCartItems() {
		var cartContent = document.getElementsByClassName("cart-content")[0];
		var cartItems = cartContent.innerHTML;
		localStorage.setItem("cartItems", cartItems);
	}
	
	// Function to clear cart items from local storage
	function clearCartItems() {
		localStorage.removeItem("cartItems");
		localStorage.removeItem("cartTotal");
	}
	
	// Attach events to cart items after loading from local storage
	function attachCartEvents() {
		var removeCartButtons = document.getElementsByClassName("cart-remove");
		for (var i = 0; i < removeCartButtons.length; i++) {
		var button = removeCartButtons[i];
		button.addEventListener("click", removeCartItem);
		}
		var quantityInputs = document.getElementsByClassName('cart-quantity');
		for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
		}
	}
	
	// Load cart total from local storage on page load
	window.addEventListener("load", function () {
		var cartTotal = localStorage.getItem("cartTotal");
		if (cartTotal) {
		document.getElementsByClassName("total-price")[0].innerText = cartTotal + ",- NOK";
		}
 	});
};