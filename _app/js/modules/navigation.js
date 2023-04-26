export default function Navigation() {
	const menu = document.querySelector('#menu-bars');
	const navigation = document.querySelector('.header__navigation-links');

	menu.addEventListener('click', function() {
		menu.classList.toggle('fa-times');
		navigation.classList.toggle('active');
	});

	window.addEventListener('scroll', function() {
		menu.classList.remove('fa-times');
		navigation.classList.remove('active');
	});
}