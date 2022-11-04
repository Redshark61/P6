const $tagBtns = document.querySelectorAll(".tag-wrapper > button");

$tagBtns.forEach(($tagBtn) => {
	$tagBtn.addEventListener("click", (e) => {
		$tagBtn.parentElement.classList.toggle("active");
		const $list = $tagBtn.nextElementSibling;
		const width = $list.clientWidth;
		if ($tagBtn.parentElement.classList.contains("active")) {
			const $classes = $tagBtn.classList;
			const $input = document.createElement("input");
			$input.setAttribute("type", "text");
			$input.classList = $classes;
			$input.style.width = `${width}px`;
			$input.placeholder = `Rechercher un ${$tagBtn.textContent.trim().toLowerCase()}`;
			$tagBtn.replaceWith($input);
		} else {
			$tagBtn.setAttribute("style", "");
			$tagBtn.replaceWith(document.createElement("button"));
		}
	});
});
