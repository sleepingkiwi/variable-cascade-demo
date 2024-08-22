export const view = (state) => {
	if (
		!state?.sharedState?.branding?.base
		|| !state?.sharedState?.branding?.variants
	) {
		return state.HTML`<h3>👻 Have you deleted the base or the variants branding from state?</h3>`;
	}

	const variantKeys = Object.keys(state.sharedState.branding.variants);
	const baseBrandingKeys = Object.keys(state.sharedState.branding.base);
	const variants = [];

	(variantKeys || []).forEach((variantKey) => {
		const variant = (state.sharedState.branding.variants[variantKey] || {});
		const editedParamKeys = Object.keys(variant);
		const editedParamHtml = (editedParamKeys || []).map((editedKey) => {
			const options = baseBrandingKeys.map((baseBrandingKey) => state.HTML`
				<option value=${baseBrandingKey} selected=${baseBrandingKey === editedKey}>${state.sharedState.branding.base[baseBrandingKey].name || baseBrandingKey} (${state.sharedState.branding.base[baseBrandingKey].type === 'px' ? 'Font Size' : 'Colour'})</option>
			`);
			return state.HTML`<li>
			<div>
				<label>
					<span>What Are You Customising?</span>
					<select
						onchange=${(e) => {
							const updatedVariants = {
								...state.sharedState.branding.variants,
							};
							delete updatedVariants[variantKey][editedKey];
							if (!updatedVariants[variantKey][e.currentTarget.value]) {
								updatedVariants[variantKey][e.currentTarget.value] = { value: '' };
							}
							state.Update({
								sharedState: {
									...state.sharedState,
									branding: {
										...state.sharedState.branding,
										variants: updatedVariants,
									},
								},
							});
						}}
					>
						<option><small>Select something to customise...</small></option>
						${options}
					</select>
				</label>
			</div>
			<div>
				<label>
					<span>New Value <small>Enter full values for the moment... i.e. 3rem</small></span>
					<input type="text" value=${variant[editedKey].value || ''} onblur=${(e) => {
						const updatedVariants = {
								...state.sharedState.branding.variants,
							};
							updatedVariants[variantKey][editedKey] = {
								value: e.currentTarget.value || '',
							};
							state.Update({
								sharedState: {
									...state.sharedState,
									branding: {
										...state.sharedState.branding,
										variants: updatedVariants,
									},
								},
							});
					}}>
				</label>
			</div>
		</li>`;
		});
		const variantHtml = state.HTML`<div class="settings-group">
			<h3>
				${variantKey}
			</h3>
			<ul>
				${editedParamHtml}
			</ul>
			<button class="js--add-new-setting" onclick=${() => {
				const updatedVariants = {
					...state.sharedState.branding.variants,
				};
				updatedVariants[variantKey].tmp = { value: '' };
				state.Update({
					sharedState: {
						...state.sharedState,
						branding: {
							...state.sharedState.branding,
							variants: updatedVariants,
						},
					},
				});
			}}>Customise Something Else</button>
		</div>`;
		variants.push(variantHtml);
	});

	return state.HTML`
	<div class="brand-variants">
		${variants}
	</div>
	`;
};

export default view;
