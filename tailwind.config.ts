import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: 'class',
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
				'heading-l': [
					'36px',
					{
						lineHeight: '33px',
						letterSpacing: '-1.125px',
						fontWeight: '700'
					}
				],
				'heading-m': [
					'24px',
					{
						lineHeight: '22px',
						letterSpacing: '-0.75px',
						fontWeight: '700'
					}
				],
				'heading-s': [
					'15px',
					{
						lineHeight: '24px',
						letterSpacing: '-0.25px',
						fontWeight: '700'
					}
				],
				'heading-s-variant': [
					'15px',
					{
						lineHeight: '15px',
						letterSpacing: '-0.25px',
						fontWeight: '700'
					}
				],
				body: [
					'13px',
					{
						lineHeight: '18px',
						letterSpacing: '-0.1px',
						fontWeight: '500'
					}
				],
				'body-variant': [
					'13px',
					{
						lineHeight: '15px',
						letterSpacing: '-0.1px',
						fontWeight: '500'
					}
				]
			},
			backgroundImage: {
				NewColumn: 'var(--NewColumn)'
			}
		}
	},
	plugins: []
}

export default config
