import Image from 'next/image';
import { connectToMongoDB } from '@/lib/db';
import Library from '@/models/libraryModel';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

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

			<div className='w-full mx-auto mt-10'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Author</TableHead>
							<TableHead>Published Date</TableHead>
							<TableHead>Genres</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>
								<span className='sr-only'>Actions</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{books.map((book, index) => (
							<TableRow key={index}>
								<TableCell>{book.title}</TableCell>
								<TableCell>{book.author}</TableCell>
								<TableCell>{book.publishedDate.toString()}</TableCell>
								<TableCell>
									<ul>
										{book.genres.map((genre, i) => (
											<li key={i}>{genre}</li>
										))}
									</ul>
								</TableCell>
								<TableCell>
									<a
										href={book.image}
										target='_blank'
										rel='noopener noreferrer'
									>
										View Image
									</a>
								</TableCell>
								<TableCell>{book.description || 'N/A'}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button aria-haspopup='true' size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
												<span className='sr-only'>Toggle menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
