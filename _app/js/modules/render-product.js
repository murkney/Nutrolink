import { sanity } from "../sanity.js";
import { readURL } from "../util/read-url.js";

export default async function renderProductPage() {
	const slug = readURL();
	console.log(slug)

	const query = `*[slug.current == '${slug}'] {
		_id,
		title,
		'slug': slug.current,
		"image": image.asset->url,
		price,
		description
	}`;

	const staticProductItems = await sanity.fetch(query);

	function createProductContainerDOM() {
		for (const staticProductItem of staticProductItems) {
			const staticProductContainer = document.getElementById('product-container');
			
			const staticProduct = document.createElement('div');
			const staticProductTitle = document.createElement('h2');
			const staticProductImage = document.createElement('img');
			const staticProductPrice = document.createElement('h2');
			const staticProductAddCart = document.createElement('i');
			
			staticProduct.className = 'static-product';
			staticProductTitle.className = 'static-product__title';
			staticProductImage.className = 'static-product__image';
			staticProductPrice.className = 'static-product__price';
			staticProductAddCart.className = 'bx bx-shopping-bag static-product__add';

			// staticProduct.href = `/product/?${product.slug}`;

			staticProductTitle.innerText = staticProductItem.title;
			staticProductImage.src = staticProductItem.image;
			staticProductPrice.innerText = `${staticProductItem.price},- kr`;

			staticProductContainer.appendChild(staticProduct);
			staticProduct.append(
				staticProductTitle,
				staticProductImage,
				staticProductPrice,
				staticProductAddCart
			);	
		};	
	};

	function renderHTML() {
		createProductContainerDOM();
	};

	renderHTML();

}