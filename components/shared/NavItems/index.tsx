import { BoardIcon } from '@/assets/icons'
import { Tabs, Sidebarcontrols } from '@/components'
import { useFormContext, useModalContext } from '@/contexts'


interface Props {
	tabs: string[] | undefined
}

const NavItems = ({ tabs }: Props) => {
	const { setModal } = useModalContext()

	return (
		<div className='flex flex-col justify-between h-full border-r border-border pb-12 pt-6'>
			<div className='pr-6'>
				<h6 className='text-gray-500 tracking-wider pl-8'>
					All Boards ({tabs?.length || 0})
				</h6>
				<div className='mt-4 flex flex-col'>
					<Tabs tabs={tabs} />
					<button
						onClick={() => setModal('addBoard')}
						className='button-tab text-blue'
					>
						<BoardIcon />+ Create New Board
					</button>
				</div>
			</div>
			<Sidebarcontrols />
		</div>
	)
}

export default NavItems
