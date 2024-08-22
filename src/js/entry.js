/** Please don't pay too much attention to this top-level code!
 *  ------------------------------------------------------------------------------------------------
 *  It was written hastily and I wanted to prove a concept
 *  and test peformance of the shared state thing below, before I use it on another project...
**/
import Nanny from 'nanny-state';

// grab an initial, example, state object
import { state as sharedState } from './initial-state.js';

// import top level views
import { view as jsonEditorView } from './app-json-editor.js';
import { view as brandInputsView } from './app-brand-inputs.js';
import { view as brandVariantsView } from './app-brand-variants.js';
import { view as articleRendererView } from './app-article-renderer.js';

// store a reference to anyone who wants to opt into cross-app state sharing (everyone in this demo)
const shareWithMe = [];

// utility function to share state across the above array...
let globalUpdateRunning = false;
const shareState = (state) => {
	if (!globalUpdateRunning) {
		globalUpdateRunning = true;
		// console.log('state being shared');
		shareWithMe.forEach((statefulInstance) => {
			if (statefulInstance.myName !== state.myName) {
				statefulInstance.Update({
					sharedState: state.sharedState,
				});
			}
		});
		globalUpdateRunning = false;
	}
};

// JSON EDITOR
const stateJsonEditor = {
	myName: 'stateJsonEditor',
	sharedState,
	View: jsonEditorView,
	Element: document.getElementById('jsonEditor'),
	open: false,
};
// initiate the json editor 'app'
Nanny(stateJsonEditor);
// opt it into receiving shared state
shareWithMe.push(stateJsonEditor);
// share own state when it updates
stateJsonEditor.Effect((state) => {
	shareState(state);
}, 'sharedState');


// PRIMARY BRAND INPUTS
const stateBrandInputs = {
	myName: 'stateBrandInputs',
	sharedState,
	View: brandInputsView,
	Element: document.getElementById('brandInputs'),
};
Nanny(stateBrandInputs);
shareWithMe.push(stateBrandInputs);
stateBrandInputs.Effect((state) => {
	shareState(state);
}, 'sharedState');


// BRAND VARIANT INPUTS
const stateBrandVariants = {
	myName: 'stateBrandVariants',
	sharedState,
	View: brandVariantsView,
	Element: document.getElementById('variantInputs'),
};
Nanny(stateBrandVariants);
shareWithMe.push(stateBrandVariants);
stateBrandVariants.Effect((state) => {
	shareState(state);
}, 'sharedState');


// ARTICLE RENDERER
const stateArticleRenderer = {
	myName: 'stateArticleRenderer',
	currentArticle: 'articleOne',
	sharedState,
	View: articleRendererView,
	Element: document.getElementById('articleRenderer'),
};
Nanny(stateArticleRenderer);
shareWithMe.push(stateArticleRenderer);
stateArticleRenderer.Effect((state) => {
	shareState(state);
}, 'sharedState');
