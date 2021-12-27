import {animeTitle} from './animetitle.js'

/* Show/Hide navigation */
const showMenu = (toggleId, navId, navCloser) => {
	const toggle = document.getElementById(toggleId);
	const nav = document.getElementById(navId);
	const navcloser = document.getElementById(navCloser);

	/* Validate if constant exists */
	if (toggle && nav && navcloser) {
		toggle.addEventListener("click", (e) => {
			nav.classList.add("menu-visible");
		});

		navcloser.addEventListener("click", (e) => {
			nav.classList.remove("menu-visible");
		});
	}
};

showMenu("nav-toggle", "navigation", "nav-closer");

/* Cusor pointer*/
if (
	!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
	document.querySelector(".hdc-cursor") !== null
) {
	(function cursorPointer() {
		let cursor = document.querySelector(".hdc-cursor");
		let body = document.body;

		let cursorPos = { x: 0, y: 0 };

		body.addEventListener("mouseenter", handleMouseEnter);
		body.addEventListener("mouseleave", handleMouseLeave);
		body.addEventListener("mousemove", handleMouseMove);

		function handleMouseEnter() {
			cursor.classList.add("-visible");
		}

		function handleMouseLeave() {
			cursor.classList.remove("-visible");
		}

		function handleMouseMove(event) {
			cursor.classList.add("-visible");
			cursorPos.x = event.pageX;
			cursorPos.y = event.pageY;

			setCursorPosition();
		}

		function setCursorPosition() {
			let centerCursorPos = {
				x: cursor.getBoundingClientRect().width / 2,
				y: cursor.getBoundingClientRect().height / 2,
			};

			let calcX = cursorPos.x - centerCursorPos.x - (window.scrollX ? window.scrollX : 0);
			let calcY = cursorPos.y - centerCursorPos.y - (window.scrollY ? window.scrollY : 0);

			cursor.setAttribute("style", `transform: translate(${calcX}px, ${calcY}px)`);

			Array.from(document.querySelectorAll("a")).forEach((a) => {
				a.addEventListener("mouseenter", function (e) {
					cursor.classList.add("-exclusion");
					cursor.classList.add("-pointer");
				});

				a.addEventListener("mouseleave", function (e) {
					cursor.classList.remove("-exclusion");
					cursor.classList.remove("-pointer");
				});
			});
		}

		window.onresize = () => {
			cursorPointer();
		};
	})();
}

/* Gsap animation */

var options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.2,
};

let callback = (entries, observer) => {
	let targets = entries.map((entry) => {
		if (entry.isIntersecting) {
			observer.unobserve(entry.target);
			return entry.target;
		}
	});

	gsap.to(targets, {
		y: 0,
		opacity: 1,
		duration: 1,
		stagger: {
			each: 0.5,
		},
	});
};

var observer = new IntersectionObserver(callback, options);

let targetobserv = document.querySelectorAll(".grid-item");
targetobserv.forEach((element) => {
	observer.observe(element);
});


//Anime title on page load
animeTitle('animated-title')
