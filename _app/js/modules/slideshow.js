export default function Slideshow() {
	document.addEventListener('DOMContentLoaded', function() {
		const slides = Array.from(document.querySelectorAll('.slide'));
		const dots = Array.from(document.querySelectorAll('.dot'));
		const prevButton = document.querySelector('.prev');
		const nextButton = document.querySelector('.next');

		let currentIndex = 0;
		let timer = null;
		let slideInterval = 5000; // 5 seconds

		// Function to show the current slide
		function showSlide(index) {
			slides.forEach(function(slide) {
				slide.removeAttribute('data-active');
			});
			dots.forEach(function(dot) {
				dot.classList.remove('dot--active');
			});

			slides[index].setAttribute('data-active', '');
			dots[index].classList.add('dot--active');
		}

		// Function to go to the next slide
		function nextSlide() {
			currentIndex = (currentIndex + 1) % slides.length;
			showSlide(currentIndex);
		}

		// Function to go to the previous slide
		function prevSlide() {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
			showSlide(currentIndex);
		}

		// Attach click event listeners to the previous and next buttons
		prevButton.addEventListener('click', prevSlide);
		nextButton.addEventListener('click', nextSlide);

		// Function to start the slideshow timer
		function startTimer() {
			timer = setInterval(nextSlide, slideInterval);
		}

		// Function to stop the slideshow timer
		function stopTimer() {
			clearInterval(timer);
		}

		// Attach click event listeners to the dots
		dots.forEach(function(dot, index) {
			dot.addEventListener('click', function() {
				currentIndex = index;
				showSlide(currentIndex);
			});
		});

		// Show the initial slide and start the slideshow timer
		showSlide(currentIndex);
		startTimer();
	});
}