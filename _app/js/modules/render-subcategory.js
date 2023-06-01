import { sanity } from "../sanity.js";
import { readURL } from "../util/read-url.js";

export default async function renderSubCategoryPage() {
	const slug = readURL();
	const query = `*[_type == 'product' && subcategory->slug.current == '${slug}'] {
		_id,
		title,
		'slug': slug.current,
		'image': image.asset->url,
		price,
		description
	}`;

	const staticSubCategoryItems = await sanity.fetch(query);

	function createSubCategoryContainerDOM() {
		for (const staticSubCategoryItem of staticSubCategoryItems) {

			const subCategoryContainer = document.getElementById('subcategory-container');
			
			const staticSubCategoryProductItemContainer = document.createElement('div')
			const staticSubCategoryProductItem = document.createElement('a');
			const staticSubCategoryProductTitle = document.createElement('h2');
			const staticSubCategoryProductImage = document.createElement('img');
			const staticSubCategoryProductPrice = document.createElement('h2');
			const staticSubCategoryProductAddCart = document.createElement('button');
			
			staticSubCategoryProductItemContainer.className = 'product-item__container';
			staticSubCategoryProductItem.className = 'product-item';
			staticSubCategoryProductTitle.className = 'product-item__title';
			staticSubCategoryProductImage.className = 'product-item__image';
			staticSubCategoryProductPrice.className = 'product-item__price';
			staticSubCategoryProductAddCart.className = 'bx bx-shopping-bag product-item__add';

			staticSubCategoryProductItem.href = `/product/?${staticSubCategoryItem.slug}`;
			staticSubCategoryProductTitle.innerText = staticSubCategoryItem.title;
			staticSubCategoryProductImage.src = staticSubCategoryItem.image;
			staticSubCategoryProductPrice.innerText = `${staticSubCategoryItem.price},- kr`;

			subCategoryContainer.appendChild(staticSubCategoryProductItemContainer);

			staticSubCategoryProductItemContainer.append(
				staticSubCategoryProductItem,
				staticSubCategoryProductAddCart
			);

			staticSubCategoryProductItem.append(
				staticSubCategoryProductTitle,
				staticSubCategoryProductImage,
				staticSubCategoryProductPrice
			);
		};		
	};

	function renderHTML() {
		createSubCategoryContainerDOM();
	};

	renderHTML();

}