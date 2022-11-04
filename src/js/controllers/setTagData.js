import { fetchRecipes } from "../models/recipe.js";
import { render } from "../views/recipe.js";

export const renderTagsData = async () => {
	const data = await fetchRecipes();
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
			return createLi(ingredient, () =>
				render((recipe) =>
					recipe.ingredients.some((i) => i.ingredient.toLowerCase() === ingredient)
				)
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
			return createLi(appliance, () =>
				render((recipe) => recipe.appliance.toLowerCase() === appliance)
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
			return createLi(ustensil, () =>
				render((recipe) => recipe.ustensils.some((u) => u.toLowerCase() === ustensil))
			);
		})
	);
};

const createLi = (text, callback) => {
	const $li = document.createElement("li");
	$li.classList.add("cursor-pointer", "hover");
	$li.textContent = text;
	$li.onclick = callback;
	return $li;
};
