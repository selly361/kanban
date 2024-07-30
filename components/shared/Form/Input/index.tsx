import { useFormContext } from '@/contexts'
import { FormValues } from '@/types'
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import { FieldError, Path, RegisterOptions } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: Path<FormValues>
	error?: FieldError | undefined
	options?: RegisterOptions<FormValues>
}

const Input = ({ options, name, className, error, ...rest }: InputProps) => {
	const { register } = useFormContext()

	return (
		<div className='w-full h-10 relative '>
			<input
				className={clsx('field', className, error && 'error')}
				{...rest}
				{...register(name, options)}
			/>
			{error && <p className='text-red absolute bg-inherit h-full top-0 bottom-0 flex flex-col justify-center z-10 right-0 pr-4'>{error.message}</p>}
		</div>
	)
}

export default Input
