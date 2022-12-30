import { ALL } from "../../../@types/constants.js";
import { render } from "../views/recipe.js";
import { searchTag } from "./setTagData.js";

let previous = "";

export const search = () => {
	const $input = document.querySelector("#search>input");

	render({ type: ALL, element: $input.value.toLowerCase() });

	$input.onkeyup = (e) => {
		const value = e.target.value.trim();
		if (!value.length || value.length < previous.length) {
			// if we are deleting the search, we need to reset the recipes, and search using the tags.
			// in searchTag(), this current function is called again
			searchTag();
		} else if (value.length >= 3) {
			// otherwise, we can search using the value
			render({ type: ALL, element: value.toLowerCase() });
		}
		previous = value;
	};
};
