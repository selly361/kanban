'use client'

import Lottie from 'lottie-react'
import animation from '@/assets/animations/loading.json'
import { motion } from 'framer-motion'

function Loading() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 0.8 }}
			exit={{ opacity: 0 }}
			className='fixed inset-0 z-50 w-screen h-screen bg-black opacity-80 flex items-center justify-center'
		>
			<Lottie animationData={animation} loop={true} />
		</motion.div>
	)
}

export default Loading
