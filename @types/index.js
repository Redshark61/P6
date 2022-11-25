/**
 * @typedef {{
 * ingredient: string,
 * quantity?: number | string,
 * unit?: string
 * }} Ingredient
 */
export const Ingredient = {};

/**
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
export const Recipe = {};
