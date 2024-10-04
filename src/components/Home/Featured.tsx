import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { FiCompass } from 'react-icons/fi';
import Link from 'next/link';

// Mock book data (replace this with actual data or props)
const books = [
	{
		id: 1,
		title: 'The Great Gatsby',
		author: 'F. Scott Fitzgerald',
		image:
			'https://images.unsplash.com/photo-1726999884199-f17b04eeb5f5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	},
];

export function Featured() {
	return (
		<section className='container mx-auto my-8 py-5'>
			<h2 className='text-3xl lg:text-5xl font-bold mb-4 text-center'>
				Featured Books
			</h2>

			<Carousel className='w-full max-w-4xl mx-auto'>
				<CarouselContent className='-ml-1'>
					{books.map((book) => (
						<CarouselItem
							key={book.id}
							className='pl-1 md:basis-1/2 lg:basis-1/3'
						>
							<div className='p-2'>
								<Card>
									<CardContent className='flex flex-col items-center justify-center p-4'>
										{/* Book Image */}
										<Image
											src={book.image}
											alt={book.title}
											width={150}
											height={200}
											className='rounded-md mb-4'
										/>
										{/* Book Title */}
										<h3 className='text-lg font-semibold text-center'>
											{book.title}
										</h3>
										{/* Author */}
										<p className='text-sm text-gray-600 text-center'>
											{book.author}
										</p>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<div className='flex justify-center py-5 mx-auto'>
				<Link href='allbooks'>
					<button className='bg-black text-white px-4 py-2 flex items-center hover:bg-slate-600'>
						<FiCompass className='mr-2' />
						Browse All Collection
					</button>
				</Link>
			</div>
		</section>
	);
}
