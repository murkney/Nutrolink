export default function Navigation() {
	const menu = document.querySelector('#menu-bars');
	const generalNavigation = document.querySelector('.general-navigation');
	const productNavigation = document.querySelector('.product-navigation');
	const navigation = document.querySelector('.menu');

	menu.addEventListener('click', function() {
		menu.classList.toggle('fa-times');
		navigation.classList.toggle('active');
		generalNavigation.classList.toggle('active');
		productNavigation.classList.toggle('active');
	});

	window.addEventListener('scroll', function() {
		menu.classList.remove('fa-times');
		navigation.classList.remove('active');
		generalNavigation.classList.remove('active');
		productNavigation.classList.remove('active');
	});
}