'use client'

import { Button } from '@/components'
import { useModalContext } from '@/contexts'

function EmptyBoard() {

    const { setModal } = useModalContext()

	return (
		<div className='flex flex-col gap-8 text-center items-center'>
			<p className='text-heading-l text-grey'>This board is empty. Create a new column to get started.</p>
			<Button className='w-max' size='lg' onClick={() => setModal('addColumn')}>+ Add New Column</Button>
		</div>
	)
}

export default EmptyBoard