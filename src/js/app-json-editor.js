export const view = (state) => state.HTML`
	<div class=${`json-editor ${state.open ? 'json-editor--open' : 'json-editor--closed'}`}>
		<button
			onclick=${() => {
				state.Update({
					open: !state.open,
				});
			}}
		>
			<span>🚀</span>
		</button>
		<div>
			<textarea
				class="debug-output"
				onblur=${(e) => {
					let jsonIsValid = false;
					let decodedJson = '{}';
					try {
						decodedJson = JSON.parse((e.currentTarget.value || '{}'));
						jsonIsValid = true;
					} catch (error) {
						console.warn('👻 Your JSON is invalid!');
						console.log(error);
					}
					if (jsonIsValid) {
						console.log(decodedJson);
						state.Update({
							sharedState: decodedJson,
						});
					}
				}}
				onfocus=${() => {
					state.Update({
						open: true,
					});
				}}
				value=${JSON.stringify((state.sharedState || {}), null, 2)}
			></textarea>
		</div>
	</div>
`;

export default view;
