import { renderTagsData } from "./controllers/setTagData.js";
import { handleTags } from "./controllers/toggleTagBtn.js";
import { render } from "./views/recipe.js";

render();
handleTags();
renderTagsData({});
