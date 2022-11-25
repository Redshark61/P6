import { filterRecipes } from "./filterRecipes.js";

/**
 * @param {{type: string, element: {text: string, type: string} | string}} filterType
 */
export const render = async (filterType = null) => {
	const recipes = await filterRecipes(filterType);

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
