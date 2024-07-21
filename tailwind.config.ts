import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				bodyBg: 'var(--bodyBg)',
				navBarBg: 'var(--navBarBg)',
				asideBg: 'var(--asideBg)',
				taskBg: 'var(--taskBg)',
				scrollBg: 'var(--scrollBg)',

				subTaskCheckBoxBg: 'var(--subTaskCheckBoxBg)',
				subTaskCheckBoxHover: 'var(--subTaskCheckBoxHover)',
				checkBoxBg: 'var(--checkBoxBg)',
				checkBoxBorder: '#828fa3',
				completedCheckBoxBg: 'var(--completedCheckBoxBg)',
				textFieldError: 'var(--textFieldError)',

				dropDownBorder: 'var(--dropDownBorder)',
				dropDownActive: 'var(--dropDownActive)',
				dropDownBg: 'var(--dropDownBg)',

				buttonPrimaryBg: 'var(--buttonPrimaryBg)',
				buttonPrimaryHover: 'var(--buttonPrimaryHover)',
				buttonPrimaryText: 'var(--buttonPrimaryText)',
				buttonSecondaryBg: 'var(--buttonSecondaryBg)',
				buttonSecondaryText: 'var(--buttonSecondaryText)',
				buttonSecondaryHover: 'var(--buttonSecondaryHover)',
				deleteButtonBg: 'var(--deleteButtonBg)',
				deleteButtonText: 'var(--deleteButtonText)',
				deleteButtonHover: 'var(--deleteButtonHover)',
				tabButtonHover: 'var(--tabButtonHover)',

				googleButtonBg: '#fff',
				googleButtonText: '#1e293b',
				googleButtonBorder: '#e2e8f0',
				githubButtonBg: '#fff',
				githubButtonText: '#1e293b',
				githubButtonBorder: '#e2e8f0',

				textPrimary: 'var(--textPrimary)',

				border: 'var(--border)',
				grey: 'var(--grey)',
				blue: 'var(--blue)',
				lightBlue: 'var(--lightBlue)',
				red: 'var(--red)',
				normalTheme: 'var(--normalTheme)',
				editDropDown: 'var(--editDropDown)'
			},
			fontSize: {
				'heading-xl': ['24px', { fontWeight: '700' }],
				'heading-l': ['18px', { fontWeight: '700' }],
				'heading-m': ['15px', { fontWeight: '700' }],
				'body-l': ['13px', { lineHeight: '23px', fontWeight: '500' }],
				'body-m': ['12px', { fontWeight: '700' }]
			},
			backgroundImage: {
				NewColumn: 'var(--NewColumn)',
				textGradient: 'var(--text-gradient)',
				checkBox: "url('/check-icon.svg')"
			},

			borderRadius: {
				'button-md': '20px',
				'button-lg': '24px',
				'subtask': '4px'
			}
		}
	},
	plugins: []
}

export default config
