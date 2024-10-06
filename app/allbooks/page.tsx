import { connectToMongoDB } from '@/lib/db';
import Library from '@/models/libraryModel';
import BooksTable from './BooksTable';

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
				Book List
			</h2>
			<BooksTable books={books} />
		</section>
	);
}
