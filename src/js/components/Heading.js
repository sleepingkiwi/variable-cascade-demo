import { inlineComponentStyles } from '../utils/inlineComponentStyles.js';

export const Heading = (state, { props = {}, styleProps = false, content = '' }) => {
	const myType = 'Heading';
	const inlineStyleString = inlineComponentStyles({ type: myType, styleProps });

	const classString = `Heading Heading--${props.underline === false ? 'no-underline' : 'underline'}`;

	return state.HTML`<h2
		class=${classString}
		style=${inlineStyleString.length > 0 ? inlineStyleString : null}
	>
		${content}
	</h2>`;
};

export default Heading;
