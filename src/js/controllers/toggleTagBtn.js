import { renderTagsData } from "./setTagData.js";
import { setWidth } from "./setWidth.js";

/**
 * @description Create the three tags buttons (ingredients, appliance & ustensils) + their event listeners
 */
export const handleTags = () => {
	const $tagBtns = document.querySelectorAll(".tag-wrapper > span");
	// this object make the link between the button's name and the class name of the list
	const buttons = {
		"tag-tools": "Ustensiles",
		"tag-ingredients": "Ingrédients",
		"tag-machine": "Appareils",
	};

	$tagBtns.forEach(($tagBtn) => {
		$tagBtn.addEventListener("click", (e) => {
			// first need to close all the other opened lists
			e.target
				.closest(".tag-wrapper")
				.parentElement.querySelectorAll(".active")
				.forEach((el) => {
					if (el !== e.target.closest(".tag-wrapper")) toggle(el.children[0]);
				});
			// then toggle the current list
			toggle($tagBtn);
		});
	});

	/**
	 * @description Open or close the list
	 * @param {HTMLElement} $tagBtn
	 */
	const toggle = ($tagBtn) => {
		let $parent, $list, $button, $span;

		// need to adapt the vars depending on what's clicked (the button or the i (the arrow))
		if ($tagBtn.tagName === "I") {
			$parent = $tagBtn.parentElement.parentElement;
			$list = $tagBtn.parentElement.nextElementSibling;
			$button = $tagBtn.previousElementSibling;
			$span = $tagBtn.parentElement;
		} else {
			$parent = $tagBtn.parentElement;
			$list = $tagBtn.nextElementSibling;
			$button = $tagBtn.querySelector("button");
			$span = $tagBtn;
		}

		$parent.classList.toggle("active");

		if ($parent.classList.contains("active")) {
			// need to replace the button by an input
			const $input = document.createElement("input");
			$input.classList.add("no-btn", "input-light");
			$input.type = "text";
			const content = $tagBtn.textContent.trim().toLowerCase();
			$input.placeholder = `Rechercher un ${content
				.split("")
				.splice(0, content.length - 1)
				.join("")}`;
			setWidth($list, $span);
			$button.replaceWith($input);
			$input.addEventListener("click", (e) => {
				e.stopPropagation();
			});
			$input.onkeyup = listOnkeyup;
		} else {
			// need to replace the input by a button
			$span.style.width = "auto";
			const $button = document.createElement("button");
			$button.classList.add("no-btn", "c-white");
			$button.textContent =
				buttons[Array.from($span.classList).filter((c) => c.startsWith("tag-"))[0]];
			const $input = $span.querySelector("input");
			$input.replaceWith($button);
		}
	};
};

/**
 * @description Filter the tags list depending on the input value
 * @param {KeyboardEvent} e
 */
function listOnkeyup(e) {
	const tagFilter = {
		type: e.target.closest(".tag-wrapper").getAttribute("data-tag-type"),
		callback:
			/**
			 * @param {string} tag
			 * @returns boolean
			 */
			(tag) => {
				return tag.toLowerCase().startsWith(e.target.value.toLowerCase());
			},
	};

	renderTagsData({ tagFilter });
}
