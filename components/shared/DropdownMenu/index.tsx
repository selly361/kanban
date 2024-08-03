'use client'

import { useEffect, useRef, useState } from 'react'
import { VerticalDotsIcon } from '@/assets/icons'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { useModalContext } from '@/contexts'

interface Props {
	type: 'task' | 'board'
	position: 'left' | 'center' | 'right'
}

const DropdownMenu: React.FC<Props> = ({ type, position }) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const { setModal } = useModalContext()

	const toggleMenu = () => setIsOpen(!isOpen)

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleEdit = () => {
		setIsOpen(false)
		if (type === 'task') {
			setModal('editTask')
		} else {
			setModal('editBoard')
		}
	}

	const handleDelete = () => {
		setIsOpen(false)
		if (type === 'task') {
			setModal('deleteTask')
		} else {
			setModal('deleteBoard')
		}
	}

	return (
		<div className='relative' ref={menuRef}>
			<button onClick={toggleMenu}>
				<VerticalDotsIcon />
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className={clsx(
							'absolute mt-8 w-48 p-4 bg-dropDownBg flex flex-col gap-4 rounded-lg shadow-lg z-50',
							{
								'left-0': position === 'left',
								'left-1/2 transform -translate-x-1/2': position === 'center',
								'right-0': position === 'right'
							}
						)}
					>
						<button onClick={handleEdit} className='text-left text-grey'>
							{type === 'task' ? 'Edit Task' : 'Edit Board'}
						</button>
						<button onClick={handleDelete} className='text-left text-red'>
							{type === 'task' ? 'Delete Task' : 'Delete Board'}
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default DropdownMenu
