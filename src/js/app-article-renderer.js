export const view = (state) => {
	if (
		!state?.sharedState?.branding?.base
		|| !state?.sharedState?.branding?.variants
		|| !state?.sharedState?.issues
		|| !state?.sharedState?.articles
	) {
		return state.HTML`<h3>👻 Have you deleted one of the following things from state?</h3><ul>
			<li>branding.base</li>
			<li>branding.variants</li>
			<li>issues</li>
			<li>articles</li>
		</ul>`;
	}

	const baseBrandingKeys = Object.keys(state.sharedState.branding.base);
	const bodyRules = baseBrandingKeys.map((brandingKey) => {
		const brandingKeyObj = state.sharedState.branding.base[brandingKey] || {};
		const val = brandingKeyObj.type === 'px' ? `${(brandingKeyObj.value || 0) / 16}rem` : brandingKeyObj.value || 'inherit';
		return `--${brandingKey}: ${val};`;
	});
	const bodyStyles = state.HTML`<style>
		${`body {${bodyRules.join(' ')}}`}
	</style>`;

	const variantBrandingKeys = Object.keys(state.sharedState.branding.variants);
	const variantRules = variantBrandingKeys.map((variantKey) => {
		const variantObj = state.sharedState.branding.variants[variantKey] || {};
		const classes = `.has-bv--${variantKey}, article.has-bv--${variantKey}, article .has-bv--${variantKey}.has-bv--${variantKey}`;
		const variantRuleKeys = Object.keys(variantObj);
		const rules = variantRuleKeys.map((brandingKey) => {
			const brandingKeyObj = state.sharedState.branding.variants[variantKey][brandingKey] || {};
			const val = brandingKeyObj.value || 'inherit';
			return `--${brandingKey}: ${val};`;
		});

		return `${classes}{ ${rules} }`;
	});
	const variantStyles = state.HTML`<style>
		${variantRules.join(' ')}
	</style>`;

	const renderedStyles = state.HTML`${bodyStyles} ${variantStyles}`;

	let articleHtml = state.HTML`<h4>Please Select An Article</h4>`;
	const { currentArticle } = state;
	const articleKeys = (Object.keys(state.sharedState.articles) || []);
	const articleOptions = articleKeys.map((articleKey) => {
		let issueName = '';
		if (
			state.sharedState.articles[articleKey].issue
			&& state.sharedState.issues[state.sharedState.articles[articleKey].issue]
			&& state.sharedState.issues[state.sharedState.articles[articleKey].issue].title
		) {
			issueName = `${state.sharedState.issues[state.sharedState.articles[articleKey].issue].title} - `;
		}
		return state.HTML`
		<option value=${articleKey} selected=${articleKey === currentArticle}>
			${issueName}${state.sharedState.articles[articleKey].title || articleKey}
		</option>
		`;
	});

	const articleSelector = state.HTML`
	<div class="settings-group">
		<select onchange=${(e) => {
			state.Update({
				currentArticle: (e.currentTarget.value || ''),
			});
		}}>
			${articleOptions}
		</select>
	</div>
	`;

	/*
	const Button = (state, props) => {
		// eslint-disable-next-line no-unused-vars
		const incrementCount = (n) => (event) => state.Update({
			sharedState: {
				...state.sharedState,
				count: state.sharedState.count + n,
			},
		});
		return state.HTML`<button onclick=${incrementCount(props.n)}>${props.text}</button>`;
	};

	const View = (state) => state.HTML`
	<h1>${state.sharedState.count}</h1>
	<div>
		${Button(state, { text: '+1', n: 1 })}
		${Button(state, { text: '+2', n: 2 })}
		${Button(state, { text: '-1', n: -1 })}
	</div>`;
	*/

	// Rendering the actual article!
	if (
		currentArticle
		&& state.sharedState.articles[currentArticle]
	) {
		const currentArticleObject = state.sharedState.articles[currentArticle];
		const breadcrumbs = state.HTML`<ul class="article-breadcrumbs">
			<li>
				Issue:
				<em>${state.sharedState.issues[currentArticleObject.issue].title}</em>
				- Brand Variant:
				<code>${state.sharedState.issues[currentArticleObject.issue].brandVariant || '[ No Brand Variant Selected ]'}</code>
			</li>
			<li>
				Article:
				<em>${currentArticleObject.title}</em>
				- Brand Variant:
				<code>${currentArticleObject.brandVariant || '[ No Brand Variant Selected ]'}</code>
			</li>
		</ul>`;

		articleHtml = state.HTML`
		${breadcrumbs}
		<h2 class="Heading">${currentArticleObject.title}</h2>
		`;
	}

	return state.HTML`
		${articleSelector}
		<div class="article-content">
		${renderedStyles}
		${articleHtml}
		</div>
	`;
};

export default view;
