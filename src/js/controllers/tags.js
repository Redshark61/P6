export const handleTags = () => {
	const $tagBtns = document.querySelectorAll(".tag-wrapper > span");
	const buttons = {
		"tag-tools": "Ustensiles",
		"tag-ingredients": "Ingrédients",
		"tag-machine": "Appareils",
	};

	$tagBtns.forEach(($tagBtn) => {
		$tagBtn.addEventListener("click", (e) => {
			console.log("click on span 1");
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
		const width = $list.clientWidth;

		if ($parent.classList.contains("active")) {
			const $input = document.createElement("input");
			$input.classList.add("no-btn", "input-light");
			$input.type = "text";
			const content = $tagBtn.textContent.trim().toLowerCase();
			$input.placeholder = `Rechercher un ${content
				.split("")
				.splice(0, content.length - 1)
				.join("")}`;
			$span.style.width = `${width}px`;
			$button.replaceWith($input);
			$input.addEventListener("click", (e) => {
				e.stopPropagation();
			});
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
