import { sanity } from "../sanity.js";
import { readURL } from "../util/read-url.js";

export default async function renderProductPage() {
	const slug = readURL();
	const query = `*[_type == 'product' && slug.current == '${slug}'] {
		_id,
		title,
		'slug': slug.current,
		'image': image.asset->url,
		price,
		description,
		ingridients
	}`;

	const staticProductItems = await sanity.fetch(query);

	function createProductContainerDOM() {
		for (const staticProductItem of staticProductItems) {

			const staticProductContainer = document.getElementById('product-container');
			
			const staticProduct = document.createElement('div');
			const staticProductImage = document.createElement('img');
			const staticProductTitle = document.createElement('h2');
			const staticProductDivider = document.createElement('section');
			const staticProductDetails = document.createElement('section');
			const staticProductDescription = document.createElement('p');
			const staticProductPrice = document.createElement('h2');
			const staticProductAddCart = document.createElement('button');
			
			staticProduct.className = 'static-product';
			staticProductTitle.className = 'static-product__title';
			staticProductDivider.className = 'static-product__devider';
			staticProductImage.className = 'static-product__image';
			staticProductDetails.className = 'static-product__details';
			staticProductDescription.className = 'static-product__description';
			staticProductPrice.className = 'static-product__price';
			// staticProductAddCart.className = 'bx bx-shopping-bag static-product__add';
			staticProductAddCart.className = 'bx bx-shopping-bag product-item__add';


			staticProductTitle.innerText = staticProductItem.title;
			staticProductImage.src = staticProductItem.image;
			staticProductDescription.innerText = staticProductItem.description;
			staticProductPrice.innerText = `${staticProductItem.price},- kr`;

			staticProductContainer.appendChild(staticProduct);

			staticProduct.append(
				staticProductTitle,
				staticProductDivider,
				staticProductAddCart
			);
			
			staticProductDivider.append(
				staticProductImage,
				staticProductDetails
			);

			staticProductDetails.append(
				staticProductDescription,
				staticProductPrice
			);
		};	
	};

	function renderHTML() {
		createProductContainerDOM();
	};

	renderHTML();

}