import { renderTagsData } from "./setTagData.js";
import { setWidthTag } from "../../utils/setWidth.js";

export const handleTags = () => {
	const $tagBtns = document.querySelectorAll(".tag-wrapper > span");
	const buttons = {
		"tag-tools": "Ustensiles",
		"tag-ingredients": "Ingrédients",
		"tag-machine": "Appareils",
	};

	$tagBtns.forEach(($tagBtn) => {
		$tagBtn.addEventListener("click", (e) => {
			e.target
				.closest(".tag-wrapper")
				.parentElement.querySelectorAll(".active")
				.forEach((el) => {
					if (el !== e.target.closest(".tag-wrapper")) toggle(el.children[0]);
				});
			toggle($tagBtn);
		});
	});

	const toggle = ($tagBtn) => {
		let $parent, $list, $button, $span;

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
			const $input = document.createElement("input");
			$input.classList.add("no-btn", "input-light");
			$input.type = "text";
			const content = $tagBtn.textContent.trim().toLowerCase();
			$input.placeholder = `Rechercher un ${content
				.split("")
				.splice(0, content.length - 1)
				.join("")}`;
			setWidthTag($list, $span);
			$button.replaceWith($input);
			$input.addEventListener("click", (e) => {
				e.stopPropagation();
			});
			$input.onkeyup = listOnkeyup;
		} else {
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
	setWidthTag();
}
