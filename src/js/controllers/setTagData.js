import { APPLIANCES, INGREDIENTS, REMOVE, USTENSILS } from "../../../@types/constants.js";
import { fetchRecipes } from "../models/recipe.js";
import { render } from "../views/recipe.js";
import { setWidthTag } from "../../utils/setWidth.js";

/** @typedef {import('../../../@types/index.js').Recipe} Recipe*/
/** @type {{text: string, type:string}[]} */
let tags = [];
let data;

/**
 * @description Render the tags list item
 * @param {{
 * recipes: Recipe[],
 * callback: ()=>{},
 * tagFilter: {type: string, callback: ()=>{}}
 * }}
 */
export const renderTagsData = async ({
	recipes = null,
	callback = () => {},
	tagFilter = { type: "" },
}) => {
	if (!recipes && !data) {
		data = await fetchRecipes();
	} else if (recipes) {
		await recipes.then((response) => {
			data = response;
		});
	}

	// get all ingredients
	let ingredients = data
		.map((recipe) =>
			recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase())
		)
		.flat();
	// remove duplicates
	let uniqueIngredients = [...new Set(ingredients)];
	// sort alphabetically
	uniqueIngredients.sort((a, b) => a.localeCompare(b));
	const $ulIngredients = document.querySelector("ul.tag-ingredients");
	$ulIngredients.innerHTML = "";

	let appliances = data.map((recipe) => recipe.appliance.toLowerCase());
	let uniqueAppliances = [...new Set(appliances)];
	uniqueAppliances.sort((a, b) => a.localeCompare(b));
	const $ulAppliances = document.querySelector("ul.tag-machine");
	$ulAppliances.innerHTML = "";

	let ustensils = data
		.map((recipe) => recipe.ustensils.map((ustensil) => ustensil.toLowerCase()))
		.flat();
	let uniqueUstensils = [...new Set(ustensils)];
	uniqueUstensils.sort((a, b) => a.localeCompare(b));
	const $ulUstensils = document.querySelector("ul.tag-tools");
	$ulUstensils.innerHTML = "";

	ingredients = uniqueIngredients;
	appliances = uniqueAppliances;
	ustensils = uniqueUstensils;

	// reduce the number of item in the list according to what's type in the tag input
	switch (tagFilter.type) {
		case INGREDIENTS: {
			ingredients = uniqueIngredients.filter((element) => tagFilter.callback(element));
			break;
		}
		case APPLIANCES: {
			appliances = uniqueAppliances.filter((element) => tagFilter.callback(element));
			break;
		}
		case USTENSILS: {
			ustensils = uniqueUstensils.filter((element) => tagFilter.callback(element));
			break;
		}
		case "":
			break;
		default:
			console.warn("no tag type found");
			break;
	}

	$ulIngredients.append(
		...ingredients.map((ingredient) => {
			return createLi({ text: ingredient, type: INGREDIENTS }, () =>
				render({ type: INGREDIENTS, element: ingredient })
			);
		})
	);

	$ulAppliances.append(
		...appliances.map((appliance) => {
			return createLi({ text: appliance, type: APPLIANCES }, () =>
				render({ type: APPLIANCES, element: appliance })
			);
		})
	);

	$ulUstensils.append(
		...ustensils.map((ustensil) => {
			return createLi({ text: ustensil, type: USTENSILS }, () =>
				render({ type: USTENSILS, element: ustensil })
			);
		})
	);
	callback();
};

/**
 * @description Create a list item
 * @param {{text: string, type: string}} tagData
 * @param {()=>{}} callback
 * @returns {HTMLLIElement}
 */
const createLi = (tagData, callback) => {
	const $li = document.createElement("li");
	$li.classList.add("cursor-pointer", "hover");
	const text = tagData.text;
	$li.textContent = text;
	$li.onclick = (e) => {
		listOnclick(e, tagData, callback, text);
	};
	return $li;
};

/**
 * @param {MouseEvent} e
 * @param {{text: string, type: string}} tagData
 * @param {()=>{}} callback
 * @param {string} text
 */
function listOnclick(e, tagData, callback, text) {
	// add the clicked tag to the tag list
	tags.push(tagData);
	const recipes = callback();
	const $tagResult = document.querySelector("#tag-result");
	const classType = Array.from(e.target.parentElement.classList).find((className) =>
		className.includes("tag-")
	);
	const $button = document.createElement("button");
	$button.classList.add(classType, "tag");
	$button.textContent = text;
	const $i = document.createElement("i");
	$i.classList.add("fa-regular", "fa-circle-xmark");
	$button.appendChild($i);

	// remove the tag from the tag list when the button is clicked
	$button.onclick = (e) => {
		tags.splice(
			tags.findIndex((object) => object.text === text),
			1
		);
		e.target.closest("button").remove();
		// re-render all recipes since a tag has been removed
		searchTag();
	};
	e.target.closest(".tag-wrapper").querySelector("input").value = "";
	$tagResult.appendChild($button);
	renderTagsData({ recipes, callback: setWidthTag });
}

/**
 * Is used to re-render all recipes based on the selected tags + the search bar
 */
export function searchTag() {
	console.log(tags);
	const recipes = render({ type: REMOVE, element: tags });
	renderTagsData({ recipes, callback: setWidthTag });
}
