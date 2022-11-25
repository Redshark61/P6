import { fetchRecipes } from "../models/recipe.js";

let recipes = [];
let allRecipes = [];

const filterCallbacks = {
	ingredients(element) {
		return (recipe) => recipe.ingredients.some((i) => i.ingredient.toLowerCase() === element);
	},
	appliances(element) {
		return (recipe) => recipe.appliance.toLowerCase() === element;
	},
	ustensils(element) {
		return (recipe) => recipe.ustensils.some((u) => u.toLowerCase() === element);
	},
};

export async function filterRecipes(filterType) {
	if (allRecipes.length === 0) {
		allRecipes = await fetchRecipes();
		recipes = allRecipes;
	} else {
		console.log("recipes already fetched, returning cached data");
	}

	if (filterType) {
		switch (filterType.type) {
			case "ingredients":
				recipes = recipes.filter(filterCallbacks.ingredients(filterType.element));
				break;
			case "appliances":
				recipes = recipes.filter(filterCallbacks.appliances(filterType.element));
				break;
			case "ustensils":
				recipes = recipes.filter(filterCallbacks.ustensils(filterType.element));
				break;
			case "remove":
				recipes = allRecipes;
				filterType.element.forEach((filter) => {
					recipes = recipes.filter(filterCallbacks[filter.type](filter.text));
				});
				break;
			default:
				console.error("Invalid filter type");
				break;
		}
	}

	return recipes;
}
