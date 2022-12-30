import { ALL, APPLIANCES, INGREDIENTS, REMOVE, USTENSILS } from "../../../@types/constants.js";
import { fetchRecipes } from "../models/recipe.js";
import { search } from "./search.js";
/** @typedef {import('../../../@types/index.js').Recipe} Recipe*/

/** @type {Recipe[]} */
let recipes = [];
/** @type {Recipe[]} */
let allRecipes = [];

/**
 * @description filter recipes based on the type of filter
 */
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
	/** @param {string} element */
	all(element) {
		return (
			/** @param {Recipe} recipe*/
			(recipe) =>
				recipe.name.toLowerCase().includes(element) ||
				recipe.ingredients.some((i) => i.ingredient.toLowerCase().startsWith(element)) ||
				recipe.description.toLowerCase().includes(element)
		);
	},
};

/**
 * @description filter recipes based on the type of filter
 * @param {{type: string, element: {text: string, type: string} | string}} filterType
 * @returns {Promise<Recipe[]>} recipes
 */
export async function filterRecipes(filterType) {
	// sort of proxy, if allRecipes is empty, fetch recipes
	if (allRecipes.length === 0) {
		allRecipes = await fetchRecipes();
		recipes = allRecipes;
	}

	if (filterType) {
		switch (filterType.type) {
			// filtering the current recipes based on their ingredients
			case INGREDIENTS:
				recipes = recipes.filter(filterCallbacks.ingredients(filterType.element));
				break;
			// filtering the current recipes based on their appliances
			case APPLIANCES:
				recipes = recipes.filter(filterCallbacks.appliances(filterType.element));
				break;
			// filtering the current recipes based on their ustensils
			case USTENSILS:
				recipes = recipes.filter(filterCallbacks.ustensils(filterType.element));
				break;
			// filetring when you remove a tag (filter every recipes again)
			case REMOVE:
				recipes = allRecipes;
				// filter is an object like {text: "tomato", type: "INGREDIENTS"}
				filterType.element.forEach((filter) => {
					recipes = recipes.filter(filterCallbacks[filter.type](filter.text));
				});
				// search() will cause the current recipes to be filtered again, but using the search input
				search();
				break;
			case ALL: {
				if (!filterType.element) {
					break;
				}
				const newRecipes = [];
				// filtering the current recipes based on their name, ingredients or description
				// passed in the search input
				for (let i = 0; i < recipes.length; i++) {
					if (
						recipes[i].name.toLowerCase().includes(filterType.element) ||
						recipes[i].ingredients.some((i) =>
							i.ingredient.toLowerCase().startsWith(filterType.element)
						) ||
						recipes[i].description.toLowerCase().includes(filterType.element)
					) {
						newRecipes.push(recipes[i]);
					}
				}
				recipes = newRecipes;
				break;
			}
			default:
				console.error("Invalid filter type");
				break;
		}
	}

	return recipes;
}
