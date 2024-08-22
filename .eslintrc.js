// eslint-disable-next-line no-undef
module.exports = {
	extends: ['airbnb-base'],
	plugins: [],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	globals: {
		KEYRING_BUILD_ENV: 'readonly',
	},
	rules: {
		// two line breaks max - airbnb says one but I like having two to help divide bigger files
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
			},
		],
		// tabs not spaces
		indent: [
			'error',
			'tab',
			// eslint indent is bad at handling indentation inside functions nested in template literals
			// https://stackoverflow.com/questions/52178093/ignore-the-indentation-in-a-template-literal-with-the-eslint-indent-rule
			{
				ignoredNodes: [
					'TemplateLiteral *',
				],
			},
		],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		// don't throw an error for `/*****lol` but do for `//lol`
		'spaced-comment': [
			'error',
			'always',
			{
				exceptions: [
					'*',
				],
			},
		],
		'function-paren-newline': [
			'error',
			'consistent',
		],
		// allow us to import our local components with extensions and still ommit them for packages
		'import/extensions': [
			'error',
			'ignorePackages',
		],
		// I don't like the ambiguity of unwrapped strings in jsx
		// 'react/jsx-curly-brace-presence': [
		//   'error',
		//   {
		//     props: 'never',
		//     children: 'never',
		//   },
		// ],
		// // I want to use .js as the extension for everything. airbnb default is to only allow .jsx
		// 'react/jsx-filename-extension': [
		//   'error',
		//   {
		//     extensions: [
		//       '.js',
		//     ],
		//   },
		// ],
	},
	settings: {
		// react: {
		//   pragma: 'h',
		// },
	},
	env: {
		browser: true,
		// needed for globals like `require` and `process` (i.e. process.env.NODE_ENV)
		node: false,
		// new syntax gets transpiled for us by esbuild
		// we don't want them to throw eslint errors
		// also see ecmaVersion under `parserOptions`
		es6: true,
	},
}; // returned config object
