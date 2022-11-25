export function setWidth($list, $span) {
	// debugger;
	const width = $list.clientWidth;
	$span.style.width = `${width}px`;
}
