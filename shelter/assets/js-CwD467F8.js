//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/js/modules/burger.js
var nav = document.querySelector("nav.navigation");
var showMenu = (e) => {
	if (window.innerWidth <= 767) {
		window.addEventListener("resize", closeMenu);
		if (e.target.closest(".mobile") || e.target.classList.contains("show-menu") || e.target.classList.contains("active") || e.target.hasAttribute("href")) {
			nav.classList.toggle("show-menu");
			document.body.classList.toggle("scroll-lock");
		}
		if (e.target.hasAttribute("href")) {
			e.preventDefault();
			setTimeout(() => {
				window.location = e.target.href;
			}, 600);
		}
		if (!nav.classList.contains("show-menu")) window.removeEventListener("resize", closeMenu);
	}
};
var closeMenu = () => {
	nav.classList.remove("show-menu");
	document.body.classList.remove("scroll-lock");
	window.removeEventListener("resize", closeMenu);
};
nav.addEventListener("click", showMenu);
//#endregion
//#region src/js/common/functions.js
async function loadPets(url) {
	return await fetch(url).then((response) => response.json()).then((data) => petsWithId(data)).catch((error) => console.log(`error: ${error.message}`));
}
var petsWithId = (pets) => {
	return pets.map((pet, id) => {
		pet.id = id;
		return pet;
	});
};
function cleanDOM(parent) {
	while (parent.firstChild) parent.firstChild.remove();
}
function createMyElement(element, classElement = "", textElement = "") {
	const myElement = document.createElement(element);
	if (textElement) myElement.textContent = textElement;
	if (classElement) myElement.className = classElement;
	return myElement;
}
function createModal(pet) {
	const { name, img, type, breed, description, age, inoculations, diseases, parasites } = pet;
	const overlay = createMyElement("div", "overlay");
	const wrapper = createMyElement("div", "wrapper");
	const closeBtn = createMyElement("button", "btn sldr-pgntn-btn close-modal-btn");
	const modal = createMyElement("div", "modal");
	const imgBlock = createMyElement("div", "modal__img");
	const petPicture = createMyElement("img");
	petPicture.src = img;
	petPicture.width = 500;
	petPicture.height = 500;
	petPicture.alt = `Pet ${type}`;
	const aboutPet = createMyElement("div", "modal__info");
	const title = createMyElement("h3", "modal__title", name);
	const typeBreed = createMyElement("p", "modal__type", `${type} - ${breed}`);
	const desc = createMyElement("p", "modal__description", description);
	const list = createMyElement("ul", "modal__list");
	const itemAge = createMyElement("li", "", age);
	const ageLabel = createMyElement("span", "", "Age: ");
	itemAge.prepend(ageLabel);
	const itemInoculations = createMyElement("li", "", inoculations.join(", "));
	const inoculationsLabel = createMyElement("span", "", "Inoculations: ");
	itemInoculations.prepend(inoculationsLabel);
	const itemDiseases = createMyElement("li", "", diseases.join(", "));
	const diseasesLabel = createMyElement("span", "", "Diseases: ");
	itemDiseases.prepend(diseasesLabel);
	const itemParasites = createMyElement("li", "", parasites.join(", "));
	const parasitesLabel = createMyElement("span", "", "Parasites: ");
	itemParasites.prepend(parasitesLabel);
	list.append(itemAge, itemInoculations, itemDiseases, itemParasites);
	imgBlock.append(petPicture);
	aboutPet.append(title, typeBreed, desc, list);
	modal.append(imgBlock, aboutPet);
	wrapper.append(closeBtn, modal);
	overlay.append(wrapper);
	return overlay;
}
var createGroups = (groupsCount, groupName) => {
	return Array.from({ length: groupsCount }, () => {
		const group = document.createElement("div");
		group.classList.add(groupName);
		return group;
	});
};
var createCards = (pets) => {
	return pets.map(({ id, name, img }) => {
		const card = createMyElement("div", "card");
		card.dataset.petId = id;
		const image = createMyElement("img");
		image.src = img;
		image.alt = `pet ${name}`;
		image.width = 270;
		image.height = 270;
		const title = createMyElement("p", "card__title", name);
		const btn = createMyElement("button", "btn card__btn", "Learn more");
		card.append(image, title, btn);
		return card;
	});
};
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
function getCardsFragment(pets, groupSize, groupName) {
	const fragment = document.createDocumentFragment();
	const groupsElement = createGroups(Math.ceil(pets.length / groupSize), groupName);
	const cards = createCards(pets);
	let groupId = 0;
	cards.forEach((card) => {
		if (groupsElement[groupId].children.length === groupSize) groupId += 1;
		groupsElement[groupId].append(card);
	});
	groupsElement.forEach((group) => fragment.append(group));
	return fragment;
}
var newPetsSizeCard = (pets) => [
	...pets,
	...pets,
	...pets,
	...pets,
	...pets,
	...pets
];
//#endregion
//#region src/js/modules/modal.js
function openModal(event) {
	if (!event.target.closest(".card")) return;
	document.body.classList.add("scroll-lock");
	const petId = event.target.closest(".card").dataset.petId;
	loadPets("./pets/pets.json").then((pets) => {
		const overlay = createModal(pets[petId]);
		const closeModal = (e) => {
			if (e.target.closest(".modal")) return;
			document.body.classList.remove("scroll-lock");
			document.body.querySelector(".overlay").remove();
		};
		document.body.append(overlay);
		overlay.addEventListener("click", closeModal);
	});
}
//#endregion
//#region src/js/modules/slider.js
var petsPage$1 = document.querySelector(".pets-page");
loadPets("./pets/pets.json").then((pets) => slider(pets, petsPage$1));
function slider(pets, isWork) {
	if (isWork) return;
	const slider = document.querySelector(".pets-slider__slider");
	const slides = document.querySelector(".pets-slider__slides");
	const renderSlides = (cardsPerSlide) => {
		if (slides.hasChildNodes() && slides.lastChild && slides.lastChild.children.length === cardsPerSlide) return;
		const fragment = getCardsFragment(pets, cardsPerSlide, "pets-slider__slide");
		cleanDOM(slides);
		slides.append(fragment);
		slides.querySelectorAll(".pets-slider__slide").forEach((slide) => {
			if (slide.children.length < cardsPerSlide) {
				slide.classList.add("last-slide");
				slides.prepend(slide);
			}
		});
	};
	const drawCards = () => {
		if (slides) renderSlides(window.innerWidth >= 1140 ? 3 : window.innerWidth >= 755 ? 2 : 1);
	};
	drawCards();
	window.addEventListener("resize", drawCards);
	slides.addEventListener("click", openModal);
	const slidesChildren = (currentPosition) => {
		[...slides.children].forEach((slide) => {
			slide.style.transition = "transform .6s ease";
			slide.style.transform = `translateX(${currentPosition}%)`;
		});
	};
	const noSlidesChildren = (currentPosition) => {
		[...slides.children].forEach((slide) => {
			slide.style.transition = "none";
			slide.style.transform = `translateX(${currentPosition}%)`;
		});
	};
	let currentPosition = 0;
	const moveSlider = (e) => {
		if (e.target.closest(".left-arrow")) {
			const leftBtn = e.target.closest(".left-arrow");
			leftBtn.classList.add("no-click");
			currentPosition += 100;
			slidesChildren(currentPosition);
			setTimeout(() => {
				currentPosition = 0;
				noSlidesChildren(currentPosition);
				const lastSlide = slides.lastChild;
				slides.lastChild.remove();
				slides.prepend(lastSlide);
				leftBtn.classList.remove("no-click");
			}, 500);
		}
		if (e.target.closest(".right-arrow")) {
			const rigthBtn = e.target.closest(".right-arrow");
			rigthBtn.classList.add("no-click");
			currentPosition -= 100;
			slidesChildren(currentPosition);
			setTimeout(() => {
				currentPosition = 0;
				noSlidesChildren(currentPosition);
				const firstSlide = slides.firstChild;
				slides.firstChild.remove();
				const cardsPerSlide = window.innerWidth >= 1140 ? 3 : window.innerWidth >= 755 ? 2 : 1;
				if (cardsPerSlide > 1) {
					const currentPetId = [...slides.lastChild.children].map((pet) => Number(pet.dataset.petId));
					const fragment = getCardsFragment(shuffle([...pets.filter(({ id }) => !currentPetId.includes(id))]), cardsPerSlide, "pets-slider__slide").children[0];
					slides.append(fragment);
				} else slides.append(firstSlide);
				rigthBtn.classList.remove("no-click");
			}, 500);
		}
	};
	slider.addEventListener("click", moveSlider);
}
//#endregion
//#region src/js/modules/pagination.js
var petsPage = document.querySelector(".pets-page");
loadPets("./pets/pets.json").then((pets) => paginationPets(pets, petsPage));
function paginationPets(pets, isWork) {
	if (!isWork) return;
	const newPets = newPetsSizeCard(pets);
	const petsLists = document.querySelector(".pets__lists");
	const pagination = document.querySelector(".pagination");
	const setCurrentPage = (currentPage) => {
		[...petsLists.children].forEach((page, id) => {
			page.classList.remove("active-pagination-page");
			page.dataset.pageId = id + 1;
		});
		currentPage.classList.add("active-pagination-page");
		pagination.querySelector(".active").textContent = currentPage.dataset.pageId;
		if (!currentPage.previousSibling) {
			pagination.querySelector(".first").classList.add("inactive");
			pagination.querySelector(".prev").classList.add("inactive");
			pagination.querySelector(".next").classList.remove("inactive");
			pagination.querySelector(".last").classList.remove("inactive");
		}
		if (!currentPage.nextSibling) {
			pagination.querySelector(".first").classList.remove("inactive");
			pagination.querySelector(".prev").classList.remove("inactive");
			pagination.querySelector(".next").classList.add("inactive");
			pagination.querySelector(".last").classList.add("inactive");
		}
		if (currentPage.previousSibling && currentPage.nextSibling) {
			pagination.querySelector(".first").classList.remove("inactive");
			pagination.querySelector(".prev").classList.remove("inactive");
			pagination.querySelector(".next").classList.remove("inactive");
			pagination.querySelector(".last").classList.remove("inactive");
		}
	};
	const renderCards = (cardsPerPage) => {
		if (petsLists.hasChildNodes() && petsLists.firstChild && petsLists.firstChild.children.length === cardsPerPage) return;
		const fragment = getCardsFragment(newPets, cardsPerPage, "pets__list");
		cleanDOM(petsLists);
		petsLists.append(fragment);
		setCurrentPage(petsLists.firstChild);
		petsLists.querySelectorAll(".pets__list").forEach((page, id) => {
			if (id % 2 === 0) {
				const reversed = [...page.children].reverse();
				cleanDOM(page);
				page.append(...reversed);
			}
		});
	};
	const drawCards = () => {
		renderCards(window.innerWidth > 970 ? 8 : window.innerWidth > 530 ? 6 : 3);
	};
	drawCards();
	window.addEventListener("resize", drawCards);
	petsLists.addEventListener("click", openModal);
	const moveToFirst = () => {
		setCurrentPage(petsLists.firstChild);
	};
	const moveToPrev = () => {
		setCurrentPage(petsLists.querySelector(".active-pagination-page").previousElementSibling);
	};
	const moveToNext = () => {
		setCurrentPage(petsLists.querySelector(".active-pagination-page").nextElementSibling);
	};
	const moveToLast = () => {
		setCurrentPage(petsLists.lastChild);
	};
	const changePage = (e) => {
		if (e.target.closest(".first")) moveToFirst();
		if (e.target.closest(".prev")) moveToPrev();
		if (e.target.closest(".next")) moveToNext();
		if (e.target.closest(".last")) moveToLast();
	};
	pagination.addEventListener("click", changePage);
}
//#endregion
//#region src/js/index.js
console.log(`
self-assessment - 120 / 120.
Burger menu (25 / 25)
 - The menu opens by clicking the burger icon +5
 - The menu opens with a smooth animation +5
 - The burger icon transforms into a close icon when the menu is open +5
 - The menu closes when clicking the close icon, the overlay area outside the menu, or any navigation link inside it +5
 - The page behind the menu does not scroll while the menu is open +5
Infinite carousel slider on Main (40 / 40)
 - The slider displays the correct number of cards per breakpoint: 3 / 2 / 1 +5
 - The slider has working left and right arrow controls +5
 - After a switch, the next group contains no pet from the previously visible group +10
 - All pets within the next group are unique +5
 - The order of cards in the next group is random within the above rules +5
 - Card switching is animated (slide) +5
 - During the slide animation, additional arrow clicks are ignored - animations do not stack +5
Pagination on Pets (40 / 40)
 - The block contains 48 cards: 6 pages × 8 on desktop, 8 × 6 on tablet, 16 × 3 on mobile +10
 - The 48 cards are built from pets.json so that all pets appear an equal number of times +5
 - No two adjacent cards (in linear order) show the same pet +5
 - Pagination controls present: first, previous, current page indicator, next, last +5
 - Disabled controls (e.g. "previous" on page 1) are visually inactive and don't respond to clicks +5
 - Page switching is animated +10
Popup (15 / 15)
 - Clicking a pet card opens a popup with that pet's details from pets.json +5
 - The popup has a darkened backdrop covering the page, and closes when clicking the close button or the backdrop area outside the popup +5
 - The page behind the popup does not scroll while the popup is open +5
`);
//#endregion

//# sourceMappingURL=js-CwD467F8.js.map