/** @typedef {import('../../../@types/index.js').Recipe} Recipe*/

let recipes = [];
/**
 * @returns {Promise<Recipe[]>} recipes
 */
export const fetchRecipes = async () => {
	if (recipes.length === 0) {
		const response = await fetch("../../../data/recipes.json");
		const data = await response.json();
		recipes = data;
	}
	return recipes;
};
