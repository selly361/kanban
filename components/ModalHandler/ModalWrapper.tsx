'use client'

import { VariantWrapper, Button } from '@/components'
import { PropsWithChildren } from 'react'
import { useFormContext, useModalContext } from '@/contexts'

function ModalWrapper({ children }: PropsWithChildren) {
	const { modal } = useModalContext()
	const { handleFormSubmit, handleSubmit, reset, clearErrors } = useFormContext()

	const title =
		modal === 'addBoard'
			? 'Create Board'
			: modal === 'editBoard'
			? 'Edit Board'
			: modal === 'newTask'
			? 'Create New Task'
			: modal === 'editTask'
			? 'Edit Task'
			: null


	const handleCloseModal = () => { 
		reset()
    }

	return (
		<VariantWrapper className='modal-container h-max' animation='modal'>
			<form
				className='h-full flex flex-col justify-between gap-6'
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<div className='h-full flex flex-col gap-6'>
					<h2 className='text-heading-l text-textPrimary'>{title}</h2>
					{children}
				</div>
				<fieldset className='fieldset-sm h-max w-full self-end'>
					<Button variant='secondary' onClick={handleCloseModal}>Close</Button>
					<Button type='submit'>{title}</Button>
				</fieldset>
			</form>
		</VariantWrapper>
	)
}

export default ModalWrapper
