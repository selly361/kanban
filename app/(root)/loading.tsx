'use client'

import Lottie from 'lottie-react'
import animation from '@/assets/animations/loading.json'

function loading() {
	return (
		<div className='w-full h-full grid place-items-center'>
			<Lottie animationData={animation} loop={true} />
		</div>
	)
}

export default loading
