/* eslint-disable max-len */
export const inlineComponentStyles = ({ type, styleProps }) => {
	// styleProps is expected to be a one dimensional object
	// with shape: { key(String): value(String) }
	// keys are named [sm/lg]-[css property name]
	// values are the specific value to set, this may be a css variable or any valid value
	// the expectation is that the cms will have validated these
	// but some degree of escaping may still be prudent?
	// on the front-end these objects are flattened to inline css variable definitions
	// using the component type as a prefix. i.e. style="--Heading-sm-color: var(--colour-highlight);"
	/* an example
	type = 'Heading';
	styleProps = {
		'sm-color': 'red',
		'lg-color': 'var(--colour-primary)',
		'sm-backdrop-filter': 'blur(2px)',
		'lg-text-underline-offset': 'var(--sp3)',
	}

	output:
	'--Heading-sm-color: red; --Heading-lg-color: var(--colour-primary); --Heading-sm-backdrop-filter: blur(2px);--Heading-lg-text-underline-offset: var(--sp3);'
	*/

	if (
		!type
		|| !styleProps
	) {
		return '';
	}

	const keys = Object.keys(styleProps);
	if (keys && keys.length) {
		return keys.map((key) => `--${type}-${key}: ${styleProps[key] || ''};`).join(' ');
	}

	return '';
};

export default inlineComponentStyles;
