import { fetchRecipes } from "../models/recipe.js";
import { render } from "../views/recipe.js";

/** @type {{text: string, type:string}[]} */
let tags = [];
let data;

export const renderTagsData = async (recipes = null) => {
	console.info("rendering tags data");
	if (!recipes) {
		data = await fetchRecipes();
	} else {
		await recipes.then((response) => {
			data = response;
			console.log(data);
		});
	}

	const ingredients = data
		.map((recipe) =>
			recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase())
		)
		.flat();
	// remove duplicates
	const uniqueIngredients = [...new Set(ingredients)];
	// sort alphabetically
	uniqueIngredients.sort((a, b) => a.localeCompare(b));
	const $ulIngredients = document.querySelector("ul.tag-ingredients");
	$ulIngredients.innerHTML = "";
	$ulIngredients.append(
		...uniqueIngredients.map((ingredient) => {
			return createLi({ text: ingredient, type: "ingredients" }, () =>
				render({ type: "ingredients", element: ingredient })
			);
		})
	);

	const appliances = data.map((recipe) => recipe.appliance.toLowerCase());
	const uniqueAppliances = [...new Set(appliances)];
	uniqueAppliances.sort((a, b) => a.localeCompare(b));
	const $ulAppliances = document.querySelector("ul.tag-machine");

	$ulAppliances.innerHTML = "";
	$ulAppliances.append(
		...uniqueAppliances.map((appliance) => {
			return createLi({ text: appliance, type: "appliances" }, () =>
				render({ type: "appliances", element: appliance })
			);
		})
	);

	const ustensils = data
		.map((recipe) => recipe.ustensils.map((ustensil) => ustensil.toLowerCase()))
		.flat();
	const uniqueUstensils = [...new Set(ustensils)];
	uniqueUstensils.sort((a, b) => a.localeCompare(b));
	const $ulUstensils = document.querySelector("ul.tag-tools");

	$ulUstensils.innerHTML = "";
	$ulUstensils.append(
		...uniqueUstensils.map((ustensil) => {
			return createLi({ text: ustensil, type: "ustensils" }, () =>
				render({ type: "ustensils", element: ustensil })
			);
		})
	);
};

/**
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

		$button.onclick = (e) => {
			tags.splice(
				tags.findIndex((object) => object.text === text),
				1
			);
			const recipes = render({ type: "remove", element: tags });
			e.target.closest("button").remove();
			renderTagsData(recipes);
		};
		$tagResult.appendChild($button);
		renderTagsData(recipes);
	};
	return $li;
};
