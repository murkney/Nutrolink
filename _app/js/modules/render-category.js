import { sanity } from "../sanity.js";
import { readURL } from "../util/read-url.js";

export default async function renderCategoryPage() {
	const slug = readURL();
	const query = `*[_type == 'product' && category->slug.current == '${slug}'] {
		_id,
		title,
		'slug': slug.current,
		'image': image.asset->url,
		price,
		description
	}`;

	const staticCategoryItems = await sanity.fetch(query);

	function createCategoryContainerDOM() {
		for (const staticCategoryItem of staticCategoryItems) {

			const categoryContainer = document.getElementById('category-container');
			
			const staticCategoryProductItemContainer = document.createElement('div')
			const staticCategoryProductItem = document.createElement('a');
			const staticCategoryProductTitle = document.createElement('h2');
			const staticCategoryProductImage = document.createElement('img');
			const staticCategoryProductPrice = document.createElement('h2');
			const staticCategoryProductAddCart = document.createElement('button');
			
			staticCategoryProductItemContainer.className = 'product-item__container';
			staticCategoryProductItem.className = 'product-item';
			staticCategoryProductTitle.className = 'product-item__title';
			staticCategoryProductImage.className = 'product-item__image';
			staticCategoryProductPrice.className = 'product-item__price';
			staticCategoryProductAddCart.className = 'bx bx-shopping-bag product-item__add';

			staticCategoryProductItem.href = `/product/?${staticCategoryItem.slug}`;
			staticCategoryProductTitle.innerText = staticCategoryItem.title;
			staticCategoryProductImage.src = staticCategoryItem.image;
			staticCategoryProductPrice.innerText = `${staticCategoryItem.price},- kr`;

			categoryContainer.appendChild(staticCategoryProductItemContainer);

			staticCategoryProductItemContainer.append(
				staticCategoryProductItem,
				staticCategoryProductAddCart
			);

			staticCategoryProductItem.append(
				staticCategoryProductTitle,
				staticCategoryProductImage,
				staticCategoryProductPrice
			);
		};		
	};

	function renderHTML() {
		createCategoryContainerDOM();
	};

	renderHTML();

}