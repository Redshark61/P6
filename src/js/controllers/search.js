import { ALL } from "../../../@types/constants.js";
import { render } from "../views/recipe.js";
import { renderTagsData, searchTag } from "./setTagData.js";
import { formatValue } from "../../utils/formatValue.js";

let previous = "";

export const search = async () => {
	const $input = document.querySelector("#search>input");

	const recipes = render({ type: ALL, element: formatValue($input.value) });

	$input.onkeyup = async (e) => {
		const value = formatValue(e.target.value);
		if (!value.length || value.length < previous.length) {
			// if we are deleting the search, we need to reset the recipes, and search using the tags.
			// in searchTag(), this current function is called again
			searchTag();
		} else if (value.length >= 3) {
			// otherwise, we can search using the value
			const recipes = render({ type: ALL, element: value.toLowerCase() });
		}
		previous = value;
	};
};
