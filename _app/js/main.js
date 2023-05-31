import Navigation from "./modules/navigation.js";
import Slideshow from "./modules/slideshow.js";
import ProductList from "./modules/main-products.js";
import renderProductPage from "./modules/render-product.js";
import renderCategoryPage from "./modules/render-category.js";
import renderSubCategoryPage from "./modules/render-subcategory.js";
import { readURL } from "./util/read-url.js";

const mainPage = document.querySelector('.slideshow');

Navigation();

if (mainPage) {
	Slideshow();
	ProductList();
}

if (readURL() !== undefined) {
	renderProductPage();
	renderCategoryPage();
	renderSubCategoryPage();
}