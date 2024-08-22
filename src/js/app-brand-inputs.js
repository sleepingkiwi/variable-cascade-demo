export const view = (state) => {
	if (
		!state?.sharedState?.branding?.base
	) {
		return state.HTML`<h3>👻 Have you deleted the base branding from state?</h3>`;
	}

	const baseBrandingKeys = Object.keys(state.sharedState.branding.base);

	const fontSizesKeys = baseBrandingKeys.filter((brandVariableKey) => (state.sharedState.branding.base[brandVariableKey] || {})?.type === 'px');
	const coloursKeys = baseBrandingKeys.filter((brandVariableKey) => (state.sharedState.branding.base[brandVariableKey] || {}).type === 'colour');

	// TODO - it's sloppy to do this for fonts and colours seperately
	const fontSizeInputs = (fontSizesKeys || []).map((brandVariableKey) => {
		const brandVariable = (state.sharedState.branding.base[brandVariableKey] || {});

		return state.HTML`<li>
			<div>
				<label>
					<span>Friendly Name</span>
					<input type="text" onblur=${(e) => {
						const updatedBrandingBase = {
							...state.sharedState.branding.base,
						};
						updatedBrandingBase[brandVariableKey].name = e.currentTarget.value;
						state.Update({
							sharedState: {
								...state.sharedState,
								branding: {
									...state.sharedState.branding,
									base: updatedBrandingBase,
								},
							},
						});
					}} value=${brandVariable.name || ''}>
				</label>
			</div>
			<div>
				<label>
					<span>Value in px <small>(just numbers pls)</small></span>
					<input type="number" min="0" onblur=${(e) => {
						const updatedBrandingBase = {
							...state.sharedState.branding.base,
						};
						updatedBrandingBase[brandVariableKey].value = e.currentTarget.value;
						state.Update({
							sharedState: {
								...state.sharedState,
								branding: {
									...state.sharedState.branding,
									base: updatedBrandingBase,
								},
							},
						});
					}} value=${brandVariable.value || ''}>
				</label>
			</div>
			<div>
				--${brandVariableKey}
			</div>
			${
				!brandVariable.removable ? null : state.HTML`
				<button onclick=${() => {
					const updatedBrandingBase = { ...state.sharedState.branding.base };
					delete updatedBrandingBase[brandVariableKey];
					state.Update({
						sharedState: {
							...state.sharedState,
							branding: {
								...state.sharedState.branding,
								base: updatedBrandingBase,
							},
						},
					});
				}}>❌</button>
				`
			}
		</li>`;
	});

	const colourInputs = (coloursKeys || []).map((brandVariableKey) => {
		const brandVariable = (state.sharedState.branding.base[brandVariableKey] || {});

		return state.HTML`<li>
			<div>
				<label>
					<span>Friendly Name</span>
					<input type="text" onblur=${(e) => {
						const updatedBrandingBase = {
							...state.sharedState.branding.base,
						};
						updatedBrandingBase[brandVariableKey].name = e.currentTarget.value;
						state.Update({
							sharedState: {
								...state.sharedState,
								branding: {
									...state.sharedState.branding,
									base: updatedBrandingBase,
								},
							},
						});
					}} value=${brandVariable.name || ''}>
				</label>
			</div>
			<div>
				<label>
					<span>Hex code <small>(with the #)</small></span>
					<input type="text" onblur=${(e) => {
						const updatedBrandingBase = {
							...state.sharedState.branding.base,
						};
						updatedBrandingBase[brandVariableKey].value = e.currentTarget.value;
						state.Update({
							sharedState: {
								...state.sharedState,
								branding: {
									...state.sharedState.branding,
									base: updatedBrandingBase,
								},
							},
						});
					}} value=${brandVariable.value || ''}>
				</label>
			</div>
			<div>
				--${brandVariableKey}
			</div>
			${
				!brandVariable.removable ? null : state.HTML`
				<button onclick=${() => {
					const updatedBrandingBase = { ...state.sharedState.branding.base };
					delete updatedBrandingBase[brandVariableKey];
					state.Update({
						sharedState: {
							...state.sharedState,
							branding: {
								...state.sharedState.branding,
								base: updatedBrandingBase,
							},
						},
					});
				}}>❌</button>
				`
			}
		</li>`;
	});


	return state.HTML`
		<div class="brand-inputs">
			<div class="settings-group js--font-size-group">
				<h3>
					Font Sizes
				</h3>
				<ul>
					${fontSizeInputs}
				</ul>
				<button class="js--add-new-setting" onclick=${() => {
						const newBaseStyle = {
							name: '',
							value: '',
							type: 'px',
							removable: true,
						};
						const newBaseStyleId = `s${Date.now()}`;
						const updatedBrandingBase = {
							...state.sharedState.branding.base,
						};
						updatedBrandingBase[newBaseStyleId] = newBaseStyle;
						state.Update({
							sharedState: {
								...state.sharedState,
								branding: {
									...state.sharedState.branding,
									base: updatedBrandingBase,
								},
							},
						});
				}}>Add a new one</button>
				<details>
					<summary>What?</summary>
					<ul>
						<li>Here you can customise all of our default font size variables</li>
						<li>Or add some new ones if you want</li>
						<li>The default ones are all required</li>
						<li>You can see the CSS vars they map to on the side</li>
						<li>Entry in px but converted to rem before being rendered to css</li>
						<li>You can add and <small>(needs consideration)</small> remove the extra ones</li>
					</ul>
				</details>
			</div>
			<div class="settings-group js--colours-group">
				<h3>
					Colours
				</h3>
				<ul>
					${colourInputs}
				</ul>
				<button class="js--add-new-setting" onclick=${() => {
						const newBaseStyle = {
							name: '',
							value: '',
							type: 'colour',
							removable: true,
						};
						const newBaseStyleId = `colour-${Date.now()}`;
						const updatedBrandingBase = {
							...state.sharedState.branding.base,
						};
						updatedBrandingBase[newBaseStyleId] = newBaseStyle;
						state.Update({
							sharedState: {
								...state.sharedState,
								branding: {
									...state.sharedState.branding,
									base: updatedBrandingBase,
								},
							},
						});
				}}>Add a new one</button>
			</div>
		</div>
	`;
};

export default view;
