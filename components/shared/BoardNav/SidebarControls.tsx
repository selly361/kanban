import { HideIcon } from "@/assets/icons"
import ThemeSwitcher from "../ThemeSwitcher"
import { useModalContext } from "@/contexts"

function SidebarControls() {
    const { setSidebarOpen } = useModalContext()
	return (
		<div className='flex flex-col gap-4 px-8 py-4'>
			<ThemeSwitcher />
			<button
				className='transition-opacity duration-500 ease-in-out font-bold text-lg text-gray-500 flex gap-4 items-center hover:opacity-60'
				onClick={() => setSidebarOpen((e) => !e)}
			>
				<HideIcon />
				Hide Sidebar
			</button>
		</div>
	)
}

export default SidebarControls