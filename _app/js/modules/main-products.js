import { sanity } from "../sanity.js";

export default async function ProductList() {
	const query = `*[_type == 'product'] | order(title asc) {
		_id,
		title,
		"image": image.asset->url,
		'slug': slug.current,
		price,
		description
	}`;
	
	const products = await sanity.fetch(query);

	function createMainProductsContainerDOM() {
		for (const product of products) {
			const productContainer = document.getElementById('products-container');
			
			const productItemContainer = document.createElement('div')
			const productItem = document.createElement('a');
			const productTitle = document.createElement('h2');
			const productImage = document.createElement('img');
			const productPrice = document.createElement('h2');
			const productAddCart = document.createElement('button');
			
			productItemContainer.className = 'product-item__container';
			productItem.className = 'product-item';
			productTitle.className = 'product-item__title';
			productImage.className = 'product-item__image';
			productPrice.className = 'product-item__price';
			productAddCart.className = 'bx bx-shopping-bag product-item__add';

			productItem.href = `/product/?${product.slug}`;
			productTitle.innerText = product.title;
			productImage.src = product.image;
			productPrice.innerText = `${product.price},- kr`;

			productContainer.appendChild(productItemContainer);
			
			productItemContainer.append(
				productItem,
				productAddCart
			);

			productItem.append(
				productTitle,
				productImage,
				productPrice
			);
		};		
	};

	function renderHTML() {
		createMainProductsContainerDOM();
	};

	renderHTML();
	
};