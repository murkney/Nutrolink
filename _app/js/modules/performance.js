import { sanity } from "../sanity.js";

export default async function performanceList() {

	const query = `*[_type == 'product'] | order(title asc) {
		_id,
		title,
		"image": image.asset->url,
		"subCategory": reference.title.performance,
		price,
		description
  	}`;
	
	const products = await sanity.fetch(query);

	function createPerformanceContainerDOM() {
		for (const product of products) {
			const productContainer = document.getElementById('performance-container');
			
			const productItem = document.createElement('div');
			const productTitle = document.createElement('h2');
			const productImage = document.createElement('img');
			const productPrice = document.createElement('h2');
			const productAddCart = document.createElement('i');
			
			productItem.className = 'product-item';
			productTitle.className = 'product-item__title';
			productImage.className = 'product-item__image';
			productPrice.className = 'product-item__price';
			productAddCart.className = 'bx bx-shopping-bag product-item__add';

			productTitle.innerText = product.title;
			productImage.src = product.image;
			productPrice.innerText = `${product.price},- kr`;

			productContainer.appendChild(productItem);
			productItem.append(
				productTitle,
				productImage,
				productPrice,
				productAddCart
			);
		};		
	};

	function renderHTML() {
		createPerformanceContainerDOM();
	};

	renderHTML();
};