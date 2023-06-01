import { readURL } from "./util/read-url.js";
import renderProductPage from "./modules/render-product.js";
import renderCategoryPage from "./modules/render-category.js";
import renderSubCategoryPage from "./modules/render-subcategory.js";

if (readURL() !== undefined) {
	renderProductPage();
	renderCategoryPage();
	renderSubCategoryPage();
};