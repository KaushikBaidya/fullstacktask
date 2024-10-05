import Image from 'next/image';
import React from 'react';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import LogoPic from '../../assets/logo.png';
import MobileLogoPic from '../../assets/mobile-logo.png';

const Navbar: React.FC = () => {
	return (
		<nav className='p-4 shadow-sm bg-white fixed top-0 w-full z-50'>
			<div className='container mx-auto flex justify-between items-center p-2'>
				<div className='text-xl font-bold'>
					<Image
						src={LogoPic}
						width={200}
						height={100}
						className='hidden md:block w-36'
						alt='Libaria'
					/>
					<Image
						src={MobileLogoPic}
						width={200}
						height={100}
						className=' md:hidden w-10'
						alt='Libaria'
					/>
				</div>

				<div className='hidden md:flex flex-1 justify-center'>
					<div className='relative w-1/2'>
						<input
							type='text'
							placeholder='Search...'
							className='w-full p-2 pl-10 text-black border-2 border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400'
						/>
						<FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600' />
					</div>
				</div>

				<div>
					<button className='bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-slate-600'>
						<FiLogIn className='mr-2' />
						Login
					</button>
				</div>
			</div>

			{/* Mobile Search Bar */}
			<div className='md:hidden mt-4 relative'>
				<input
					type='text'
					placeholder='Search...'
					className='w-full p-2 pl-10 text-black border-2 border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400'
				/>
				<FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600' />
			</div>
		</nav>
	);
};

export default Navbar;
