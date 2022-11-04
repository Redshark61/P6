/**
 * @typedef {{
 * ingredient: string,
 * quantity?: number | string,
 * unit?: string
 * }} Ingredient
 * @typedef {{
 * id:number,
 * name:string,
 * servings:number,
 * ingredients:Ingredient[],
 * time:number,
 * description:string,
 * appliance:string,
 * ustensils:string[]
 * }} Recipe
 */

let recipes = [];
/**
 * @returns {Promise<Recipe[]>}
 */
export const fetchRecipes = async () => {
	if (recipes.length === 0) {
		console.log("fetching recipes");
		const response = await fetch("../../../data/recipes.json");
		const data = await response.json();
		recipes = data;
	} else {
		console.log("recipes already fetched, returning cached data");
	}
	return recipes;
};
