import categories from "./categories";
import { prepareBlocks } from "./prepareBlocks";

const blocks = prepareBlocks(categories);

export { categories, blocks };

console.log(blocks);
