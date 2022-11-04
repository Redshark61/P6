import { fetchRecipes } from "../models/recipe.js";

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

	$ulIngredients.innerHTML = uniqueIngredients
		.map((ingredient) => `<li>${ingredient}</li>`)
		.join("");

	const appliances = data.map((recipe) => recipe.appliance.toLowerCase());
	const uniqueAppliances = [...new Set(appliances)];
	uniqueAppliances.sort((a, b) => a.localeCompare(b));
	const $ulAppliances = document.querySelector("ul.tag-machine");

	$ulAppliances.innerHTML = uniqueAppliances.map((appliance) => `<li>${appliance}</li>`).join("");

	const ustensils = data
		.map((recipe) => recipe.ustensils.map((ustensil) => ustensil.toLowerCase()))
		.flat();
	const uniqueUstensils = [...new Set(ustensils)];
	uniqueUstensils.sort((a, b) => a.localeCompare(b));
	const $ulUstensils = document.querySelector("ul.tag-tools");

	$ulUstensils.innerHTML = uniqueUstensils.map((ustensil) => `<li>${ustensil}</li>`).join("");
};
