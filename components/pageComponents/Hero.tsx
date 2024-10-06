import * as React from 'react';
import { connectToMongoDB } from '@/lib/db';
import Library from '@/models/libraryModel';

import { Card, CardContent } from '@/components/ui/card';

import Image from 'next/image';
import { FiCompass } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '../ui/button';

async function fetchBooks() {
	await connectToMongoDB();
	const books = await Library.find();
	return books;
}

export async function Hero() {
	const response = await fetchBooks();
	const books = response.slice(0, 8);
	return (
		<section className='container mx-auto my-8 pt-20'>
			<h2 className='text-3xl font-bold mb-4 text-center'>Featured Books</h2>

			<div className='w-full max-w-6xl mx-auto'>
				<div className='w-full flex flex-wrap items-center justify-center gap-5'>
					{books.map((book) => (
						<div key={book.id} className='flex'>
							<Card className='w-56 h-full flex flex-col items-center shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
								<div className='flex-shrink-0 h-52'>
									<Image
										src={book.image}
										alt={book.title}
										width={150}
										height={200}
										className='w-full h-48 object-cover'
									/>
								</div>
								<CardContent className='flex flex-col justify-between p-4 h-full'>
									<h3 className='font-semibold text-center mb-2'>
										{book.title}
									</h3>
									<p className='text-sm text-gray-600 text-center mb-4'>
										{book.author}
									</p>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>

			<div className='flex justify-center py-5 mx-auto'>
				<Link href='allbooks'>
					<button className='bg-black text-white px-4 py-2 rounded-md flex items-center hover:bg-slate-600'>
						<FiCompass className='mr-2' />
						Browse All Collection
					</button>
				</Link>
			</div>
		</section>
	);
}
