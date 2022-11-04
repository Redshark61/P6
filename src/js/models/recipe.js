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

/**
 * @returns {Promise<Recipe[]>}
 */
export const fetchRecipes = async () => {
	const response = await fetch("../../../data/recipes.json");
	const data = await response.json();
	return data;
};
