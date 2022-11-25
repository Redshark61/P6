import { renderTagsData } from "../controllers/setTagData.js";
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

/**
 * @param {{type: string, element: {text: string, type: string} | string}} filterType
 */
export const render = async (filterType = null) => {
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

	const $main = document.querySelector("#recipes-root");
	$main.innerHTML = "";

	recipes.forEach((recipe) => {
		const $article = document.createElement("article");
		$article.classList.add("dish");
		$article.innerHTML = /*html*/ `
			<div class="top"></div>
			<div class="bottom grid grid-2-2">
				<h2>${recipe.name}</h2>
				<h2 class="text-r"><i class="fa-regular fa-clock"></i> ${recipe.time} min</h2>
				<ul>
					${recipe.ingredients
						.map(
							(ingredient) =>
								`<li><strong>${ingredient.ingredient}</strong>: ${ingredient.quantity}</li>`
						)
						.join("")}
				</ul>
				<p>${recipe.description}</p>
			</div>
		`;
		$main.appendChild($article);
	});

	return recipes;
};
