import { fetchRecipes } from "../models/recipe.js";

export const render = async () => {
	/**
   * <article class="dish">
					<div class="top"></div>
					<div class="bottom grid grid-2-2">
						<h2>Limonade de Coco</h2>
						<h2 class="text-r"><i class="fa-regular fa-clock"></i> 10 min</h2>
						<ul>
							<li><strong>name</strong>: quantity</li>
							<li><strong>name</strong>: quantity</li>
							<li><strong>name</strong>: quantity</li>
							<li><strong>name</strong>: quantity</li>
						</ul>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
							repudiandae corporis distinctio esse ipsum itaque maiores sequi a
							repellat voluptatibus?poris distinctio esse ipsum itaque maiores sequi a
							repellat voluptati poris distinctio esse ipsum itaque maiores sequi a
							repellat voluptatiporis distinctio esse ipsum itaque maiores sequi a
							repellat voluptatiporis distinctio esse ipsum itaque maiores sequi a
							repellat voluptati
						</p>
					</div>
				</article>
   */
	const recipes = await fetchRecipes();

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
};
