const $tagBtns = document.querySelectorAll(".tag-wrapper > span");
const $is = Array.from($tagBtns).map((e) => e.querySelector("i"));
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

function toggle($tagBtn) {
	let $parent;
	let $list;
	let $button;
	let $span;
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
		$input.setAttribute("type", "text");
		$input.placeholder = `Rechercher un ${$tagBtn.textContent.trim().toLowerCase()}`;
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
}
