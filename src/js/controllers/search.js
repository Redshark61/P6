import { ALL } from "../../../@types/constants.js";
import { render } from "../views/recipe.js";
import { searchTag } from "./setTagData.js";

let previous = "";

export const search = () => {
	const $input = document.querySelector("#search>input");

	render({ type: ALL, element: $input.value.toLowerCase() });

	$input.onkeyup = (e) => {
		const value = e.target.value.trim();
		if (!value.length) {
			searchTag();
		} else if (value.length < previous.length) {
			searchTag();
			render({ type: ALL, element: value.toLowerCase() });
		} else if (value.length >= 3) {
			render({ type: ALL, element: value.toLowerCase() });
		}
		previous = value;
	};
};
