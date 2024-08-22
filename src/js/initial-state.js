/** Default, illustrative, state...
 *  ------------------------------------------------------------------------------------------------
**/
export const state = {
	count: 0,
	branding: {
		base: {
			's-1': {
				name: 'smaller',
				value: 12.8,
				type: 'px',
				removable: false,
			},
			s0: {
				name: 'normal',
				value: 16,
				type: 'px',
				removable: false,
			},
			s1: {
				name: 'bigger',
				value: 20,
				type: 'px',
				removable: false,
			},
			s2: {
				name: 'subheadings',
				value: 25,
				type: 'px',
				removable: false,
			},
			s3: {
				name: 'headings',
				value: 31.25,
				type: 'px',
				removable: false,
			},
			'colour-primary': {
				name: 'primary',
				value: '#42505d',
				type: 'colour',
				removable: false,
			},
			'colour-highlight': {
				name: 'highlight',
				value: '#e57066',
				type: 'colour',
				removable: false,
			},
			'colour-background-primary': {
				name: 'background',
				value: '#f7f7f7',
				type: 'colour',
				removable: false,
			},
		},
		variants: {
			variantOne: {
				'colour-primary': {
					value: '#42505d',
				},
			},
			variantTwo: {
				s0: {
					value: '1.3rem',
				},
			},
		},
	},
	digitalEdition: {
		// I actually don't know if we want to allow brand variant selection at the DE level?
		brandVariant: 'base', // 'base' would also apply by omission at this level
	},
	issues: {
		issueOne: {
			title: 'April 2025',
			brandVariant: 'variantOne',
			articles: [
				'articleOne',
				'articleTwo',
			],
		},
		issueTwo: {
			title: 'The Second Issue',
			brandVariant: '', // omission here means no overrides apply at the issue level
			articles: [
				'articleThree',
				'articleFour',
			],
		},
	},
	articles: {
		articleOne: {
			brandVariant: '', // omission here means no overrides apply at the article level
			issue: 'issueOne', // we use this to apply styling and any other rules we may want to grab
			title: 'Article One',
			content: [
				{
					type: 'Heading',
					props: {},
					content: 'This is a heading',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'This is a paragraph - lorem ipsum...',
				},
				{
					type: 'Heading',
					props: {
						underline: false,
					},
					styleProps: {
						'sm-color': 'var(--colour-highlight)',
						'lg-color': 'purple',
					},
					content: 'This is a heading that is not underlined',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'This is a paragraph - lorem ipsum...',
				},
				{
					// this is WIP - not rendering these guys yet!
					type: 'ContentArea',
					props: {
						'--ContentArea--columns': {
							value: '1fr 1fr 1fr 1fr',
							type: 'string',
						},
						'--ContentArea--rows': {
							value: '1fr 1fr 1fr 1fr',
							type: 'string',
						},
						'--ContentArea--sm-gap': {
							value: 's0',
							type: 'var',
						},
						stackOnMobile: true,
						hideOnMobile: false,
						hideOnDesktop: false,
					},
					areas: [
						{
							'grid-row-start': 1,
							'grid-row-end': 3,
							'grid-column-start': 1,
							'grid-column-end': 3,
							background: {
								value: 'wheat',
								type: 'string',
							},
							children: [
								{
									type: 'Heading',
									props: {},
									content: 'This is a heading',
								},
								{
									type: 'Paragraph',
									props: {},
									content: 'This is a paragraph - lorem ipsum...',
								},
							],
						},
					],
				},
			],
		},
		articleTwo: {
			brandVariant: '',
			issue: 'issueOne',
			title: 'Article Two',
			content: [],
		},
		articleThree: {
			brandVariant: '',
			issue: 'issueTwo',
			title: 'Article Three',
			content: [],
		},
		articleFour: {
			brandVariant: '',
			issue: 'issueTwo',
			title: 'Article Four',
			content: [],
		},
	},
};

export default state;
