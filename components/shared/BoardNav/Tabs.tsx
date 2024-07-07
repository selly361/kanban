import React from 'react'
import Tab from './Tab'
import { BoardIcon } from '@/assets/icons'

function Tabs({ tabs }: { tabs: string[] }) {
	return (
		<div className='mt-4 flex flex-col'>
			{tabs.map((tab) => (
				<Tab key={tab} tab={tab} />
			))}
			<button onClick={() => {}} className='button-tab text-blue'>
				<BoardIcon />+ Create New Board
			</button>
		</div>
	)
}

export default Tabs
