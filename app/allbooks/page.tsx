import Image from 'next/image';
import { connectToMongoDB } from '@/lib/db';
import Library from '@/models/libraryModel';

async function fetchBooks() {
	await connectToMongoDB();
	const books = await Library.find();
	return books;
}

export default async function FeaturedBooks() {
	const books = await fetchBooks();

	return (
		<section className='container mx-auto my-8 py-28'>
			<h2 className='text-3xl lg:text-5xl font-bold mb-4 text-center'>
				All Books
			</h2>

			<div className='max-w-4xl mx-auto'>
				<div className='flex flex-wrap justify-center items-center'>
					{books.map((book) => (
						<div key={book._id} className='pl-1 md:basis-1/2 lg:basis-1/3'>
							<div className='p-2'>
								<div className='card'>
									<div className='card-content flex flex-col items-center justify-center p-4'>
										<Image
											src={book.image}
											alt={book.title}
											width={150}
											height={200}
											className='rounded-md mb-4'
										/>
										<h3 className='text-lg font-semibold text-center'>
											{book.title}
										</h3>
										<p className='text-sm text-gray-600 text-center'>
											{book.author}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
