import { inlineComponentStyles } from '../utils/inlineComponentStyles.js';

export const Paragraph = (state, { styleProps = false, content = '' }) => {
	const myType = 'Paragraph';
	const inlineStyleString = inlineComponentStyles({ type: myType, styleProps });

	const classString = 'Paragraph';

	return state.HTML`<p
		class=${classString}
		style=${inlineStyleString.length > 0 ? inlineStyleString : null}
	>
		${content}
	</p>`;
};

export default Paragraph;
