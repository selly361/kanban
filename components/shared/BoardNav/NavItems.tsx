import {
	Tabs,
	Sidebarcontrols
} from '@/components'
import { useModalContext } from '@/contexts'

const NavItems = ({ tabs }: { tabs: string[] }) => {

	return (
		<div className='flex flex-col justify-between h-full border-r border-border pb-12 pt-6'>
			<div className='pr-6'>
				<h6 className='text-gray-500 tracking-wider pl-8'>All Boards ({tabs.length})</h6>
				<Tabs tabs={tabs} />
			</div>
			<Sidebarcontrols />
		</div>
	)
}

export default NavItems
