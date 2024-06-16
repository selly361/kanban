'use client'

import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger'
	size?: 'md' | 'lg'
}

const Button = ({
	variant = 'primary',
	size = 'md',
	children,
	className,
	...props
}: ButtonProps) => {
	const sizeStyles = {
		md: 'py-2 text-body-m rounded-button-md',
		lg: 'py-3.5 text-heading-m rounded-button-lg'
	}

	const variantClasses = {
		primary: 'button-primary',
		secondary: 'button-secondary',
		danger: 'button-danger'
	}

	return (
		<button
			type='button'
			{...props}
			className={clsx(
				sizeStyles[size],
				variantClasses[variant],
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button