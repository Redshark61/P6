import { filterRecipes } from "../controllers/filterRecipes.js";

/**
 * @param {{type: string, element: {text: string, type: string} | string}} filterType
 */
export const render = async (filterType = null) => {
	const recipes = await filterRecipes(filterType);
	const $main = document.querySelector("#recipes-root");
	$main.innerHTML = "";

	if (!recipes.length) {
		$main.innerHTML = `<p class="no-recipes
		">Aucune recette ne correspond à votre critère... vous pouvez
chercher «tarte aux pommes», «poisson», etc</p>`;
		$main.classList.remove("flex-w-3");
		return recipes;
	}

	if (!$main.classList.contains("flex-w-3")) {
		$main.classList.add("flex-w-3");
	}

	const ul = (recipe) =>
		recipe.ingredients
			.map(
				(ingredient) =>
					`<li><strong>${ingredient.ingredient}</strong>${
						ingredient.quantity ? " : " + ingredient.quantity : ""
					} ${ingredient.unit ?? ""}</li>`
			)
			.join("");

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
								`<li><strong>${ingredient.ingredient}</strong>${
									ingredient.quantity ? " : " + ingredient.quantity : ""
								} ${ingredient.unit ?? ""}</li>`
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
