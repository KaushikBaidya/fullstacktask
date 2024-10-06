import EditBookForm from '@/components/EditBookForm';
import Library, { LibraryDocument } from '@/models/libraryModel';
import { connectToMongoDB } from '@/lib/db';

interface EditBookPageProps {
	params: { id: string };
}

export default async function EditBookPage({ params }: EditBookPageProps) {
	const { id } = params;

	await connectToMongoDB();

	const book: LibraryDocument | null = await Library.findById(id).lean();

	if (!book) {
		return <p>Book not found</p>;
	}

	const plainBook = JSON.parse(JSON.stringify(book));

	return (
		<div className='py-28'>
			<EditBookForm initialData={plainBook} />
		</div>
	);
}
