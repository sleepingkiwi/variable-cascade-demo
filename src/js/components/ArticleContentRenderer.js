import { Heading } from './Heading.js';
import { Paragraph } from './Paragraph.js';

// this is a lzy way to do this but it works!
const componentMap = {
	Heading,
	Paragraph,
};

export const ArticleContentRenderer = (state, content) => {
	if (
		!Array.isArray(content)
		|| (content || []).length === 0
	) {
		return state.HTML`<h2 class="Heading">This article is empty...</h2>`;
	}

	const contentBlocks = content.map((contentBlock) => {
		const { type } = contentBlock;
		return state.HTML`${componentMap[type] ? componentMap[type](state, contentBlock) : null}`;
	});

	return state.HTML`${contentBlocks}`;
};

export default ArticleContentRenderer;
