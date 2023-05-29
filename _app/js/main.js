import Navigation from "./modules/navigation.js";
import Slideshow from "./modules/slideshow.js";
import ProductList from "./modules/main-products.js";
import renderProductPage from "./modules/render-product.js";
// import supplementList from "./modules/supplements.js";
// import performanceList from "./modules/performance.js";
import { readURL } from "./util/read-url.js";

Navigation();
Slideshow();
ProductList();
// renderProductPage();
// supplementList();
// performanceList();

if (readURL() !== undefined) {
	renderProductPage()
}