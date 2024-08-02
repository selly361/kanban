'use client'

import { VariantWrapper, Button } from '@/components'
import { PropsWithChildren } from 'react'
import { useFormContext, useModalContext } from '@/contexts'

function ModalWrapper({ children }: PropsWithChildren) {
	const { modal, setModal } = useModalContext()
	const { handleFormSubmit, handleSubmit, reset, clearErrors } = useFormContext()

	const text =
		modal === 'addBoard'
			? 'Create Board'
			: modal === 'editBoard'
			? 'Edit Board'
			: modal === 'newTask'
			? 'Create New Task'
			: modal === 'editTask'
			? 'Edit Task'
			: modal === 'addColumn'
			? 'Create New Column'
			: null

	const handleCloseModal = () => {
		setModal(null)
		clearErrors()
		reset()
	}

	return (
		<VariantWrapper className='modal-container h-max' animation='modal'>
			<form
				className='h-full flex flex-col justify-between gap-6'
				onSubmit={handleSubmit(handleFormSubmit)}
			>
				<div className='h-full flex flex-col gap-6'>
					<h2 className='text-heading-l text-textPrimary'>{text}</h2>
					{children}
				</div>
				<fieldset className='fieldset-sm h-max w-full self-end'>
					<Button type='submit'>{text}</Button>
					<Button variant='secondary' onClick={handleCloseModal}>Close</Button>
				</fieldset>
			</form>
		</VariantWrapper>
	)
}

export default ModalWrapper
