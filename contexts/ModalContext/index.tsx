'use client'

import { Modal } from '@/types'
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	PropsWithChildren
} from 'react'


interface ModalContextProps {
	modal: Modal
	sidebarOpen: boolean
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
	setModal: (modal: Modal) => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const useModalContext = () => {
	const context = useContext(ModalContext)
	if (context === undefined) {
		throw new Error('useModalContext must be used within a ModalContextProvider')
	}
	return context
}


export const ModalContextProvider = ({ children }: PropsWithChildren) => {
	const [modal, setModal] = useState<Modal>(null)
	const [sidebarOpen, setSidebarOpen] = useState(true)

	useEffect(() => {
		document.body.style.overflow = modal ? 'hidden' : 'auto'
	}, [modal])

	return (
		<ModalContext.Provider
			value={{
				modal,
				setModal,
				setSidebarOpen,
				sidebarOpen,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
