export const setWidthTag = ($list = null, $span = null) => {
	if (!$list) {
		$list = document.querySelector(".tag-wrapper.active ul");
	}
	if (!$span) {
		$span = document.querySelector(".tag-wrapper.active span");
	}
	if ($list) {
		const width = $list.clientWidth <= 300 ? 300 : $list.clientWidth;
		$span.style.width = `${width}px`;
	}
};
