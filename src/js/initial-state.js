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
					value: '#50425d',
				},
				'colour-highlight': {
					value: '#66ff66',
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
					styleProps: {},
					content: 'This is a heading for Article One in Issue One',
				},
				{
					type: 'Paragraph',
					props: {},
					styleProps: {},
					content: 'Issue One has opted into the brand variant `variantOne` so the styles here should mostly reflect what you have defined as a base style, with any customisations made in `variantOne` applied over the top (using the default JSON you should see a green underline on the heading above, this is defined in the `variantOne` brand variant)!',
				},
				{
					type: 'Paragraph',
					props: {},
					styleProps: {},
					content: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Malesuada id elit metus purus finibus platea sem. Metus finibus tortor blandit porttitor non metus ex. Urna ligula tempor feugiat primis posuere. Semper velit natoque nunc montes libero. Eleifend consequat dignissim condimentum vitae praesent ac. Nisl pretium gravida pulvinar elit imperdiet et eleifend. Interdum vestibulum venenatis felis ultricies curabitur, fermentum phasellus tempus gravida. Maximus quam adipiscing maecenas inceptos class vitae orci cubilia.',
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
					styleProps: {},
					content: 'The heading above should have the colour of `--colour-highlight` on small screens and `purple` on desktop! These customisations would have been made in the layout builder via the CMS - see the `props` and `styleProps` in the JSON',
				},
				{
					// this is WIP - not rendering these guys at all yet!
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
			content: [
				{
					type: 'Heading',
					props: {},
					content: 'This is Article Two, from Issue One',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Malesuada id elit metus purus finibus platea sem. Metus finibus tortor blandit porttitor non metus ex. Urna ligula tempor feugiat primis posuere. Semper velit natoque nunc montes libero. Eleifend consequat dignissim condimentum vitae praesent ac. Nisl pretium gravida pulvinar elit imperdiet et eleifend. Interdum vestibulum venenatis felis ultricies curabitur, fermentum phasellus tempus gravida. Maximus quam adipiscing maecenas inceptos class vitae orci cubilia.',
				},
				{
					type: 'Paragraph',
					props: {},
					styleProps: {
						'sm-font-size': 'var(--s1)',
					},
					content: 'This paragraph has opted itself into a bigger font size (look at the styleProps in the json). This would have been chosen at the CMS level',
				},
			],
		},
		articleThree: {
			brandVariant: '',
			issue: 'issueTwo',
			title: 'Article Three',
			content: [
				{
					type: 'Heading',
					props: {},
					content: 'This is Article One, from Issue Two',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'This issue hasn\'t opted into a brand variant. Neither has this article. All styles in this article should reflect what you have set up as a base brand!',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'Commodo mi tortor hac viverra maximus sit. Tristique himenaeos curabitur molestie tristique dictum sollicitudin imperdiet. Orci orci pulvinar senectus facilisis in mattis nisi tincidunt. Convallis lobortis ipsum interdum pellentesque facilisi in sed. Ligula venenatis congue pretium class aenean habitant sapien varius? Congue curae curae porttitor ac commodo potenti quisque velit primis. Consequat finibus ullamcorper vulputate efficitur non at tortor gravida nec. Taciti id odio lacinia magnis nostra. Lectus magnis suscipit enim posuere nullam dolor orci turpis.',
				},
			],
		},
		articleFour: {
			brandVariant: 'variantTwo',
			issue: 'issueTwo',
			title: 'Article Four',
			content: [
				{
					type: 'Heading',
					props: {},
					content: 'This is Article Two, from Issue Two',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'This issue hasn\'t opted into a brand variant. However, article two has opted into the `variantTwo` brand variant! Based on the default settings in this JSON file, that means you should see slightly bigger paragraph font sizing here!',
				},
				{
					type: 'Paragraph',
					props: {},
					content: 'Commodo mi tortor hac viverra maximus sit. Tristique himenaeos curabitur molestie tristique dictum sollicitudin imperdiet. Orci orci pulvinar senectus facilisis in mattis nisi tincidunt. Convallis lobortis ipsum interdum pellentesque facilisi in sed. Ligula venenatis congue pretium class aenean habitant sapien varius? Congue curae curae porttitor ac commodo potenti quisque velit primis. Consequat finibus ullamcorper vulputate efficitur non at tortor gravida nec. Taciti id odio lacinia magnis nostra. Lectus magnis suscipit enim posuere nullam dolor orci turpis.',
				},
			],
		},
	},
};

export default state;
