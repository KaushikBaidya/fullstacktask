'use client';
import React from 'react';
import Image from 'next/image';
import { FiCompass } from 'react-icons/fi';
import HeroImage from '@/assets/heroimg.png';

const Hero: React.FC = () => {
	return (
		<main className='pt-36 md:pt-28'>
			<section className='container mx-auto flex flex-col md:flex-row items-center justify-center'>
				<div className='text-center md:text-left md:w-1/2 px-2 md:pl-5 3xl:pl-0'>
					<h1 className='text-4xl md:text-7xl text-gray-800 font-bold mb-4'>
						Discover Your Next Favourite Book
					</h1>
					<p className='text-lg text-gray-500 mb-6'>
						Explore a growing collection of books, manage your personal library,
						and keep track of the books you have read or want to read.
					</p>
					<div className='flex justify-center md:justify-start'>
						<button className='bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-slate-600'>
							<FiCompass className='mr-2' />
							Browse All Collection
						</button>
					</div>
				</div>

				<div className='md:w-1/2 mt-6 md:mt-0 flex justify-center'>
					<Image
						src={HeroImage}
						width={600}
						height={500}
						className='hidden md:block w-full h-auto'
						alt='Libaria'
					/>
				</div>
			</section>
		</main>
	);
};

export default Hero;
