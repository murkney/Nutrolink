export default function Navigation() {
	const menu = document.querySelector('#menu-bars');
	const generalNavigation = document.querySelector('.general-navigation');
	const productNavigation = document.querySelector('.product-navigation');

	menu.addEventListener('click', function() {
		menu.classList.toggle('fa-times');
		generalNavigation.classList.toggle('active');
		productNavigation.classList.toggle('active');
	});

	window.addEventListener('scroll', function() {
		menu.classList.remove('fa-times');
		generalNavigation.classList.remove('active');
		productNavigation.classList.remove('active');
	});
}