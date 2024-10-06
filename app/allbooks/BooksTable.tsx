'use client';

import { useState } from 'react';
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
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { deleteBook } from '@/lib/delete';
import { updateBook } from '@/lib/update';
import { LibraryDocument } from '@/models/libraryModel';
import toast from 'react-hot-toast';

interface BooksTableProps {
	books: LibraryDocument[];
}

export default function BooksTable({ books }: BooksTableProps) {
	const [selectedBook, setSelectedBook] = useState<LibraryDocument | null>(
		null
	);
	const [formData, setFormData] = useState({
		title: '',
		author: '',
		publishedDate: '',
		genres: '',
		image: '',
		description: '',
	});

	const handleEditClick = (book: LibraryDocument) => {
		setSelectedBook(book);
		setFormData({
			title: book.title,
			author: book.author,
			publishedDate: new Date(book.publishedDate).toISOString().slice(0, 10),
			genres: book.genres.join(', '),
			image: book.image,
			description: book.description || '',
		});
	};

	const handleDelete = async (id: string) => {
		const response = await deleteBook(id);
		if (response.success) {
			window.location.reload();

			toast.success('book deleted.');
		} else {
			toast.error('Failed to delete the book.');
		}
	};

	const handleUpdate = async () => {
		const updatedData = { ...formData, genres: formData.genres.split(', ') };
		if (selectedBook) {
			const response = await updateBook(selectedBook._id, updatedData);
			if (response.success) {
				window.location.reload();

				toast.success('Book successfully updated!');
			} else {
				toast.error('Failed to create the book.');
			}
		}
	};

	return (
		<>
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
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{books.map((book) => (
							<TableRow key={book._id}>
								<TableCell>{book.title}</TableCell>
								<TableCell>{book.author}</TableCell>

								<TableCell>
									{new Date(book.publishedDate).toISOString().slice(0, 10)}
								</TableCell>

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
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuItem onClick={() => handleEditClick(book)}>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => handleDelete(book._id)}>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{selectedBook && (
				<Dialog>
					<DialogTrigger asChild>
						<button>Edit Book</button>
					</DialogTrigger>
					<DialogContent>
						<h3>Edit Book: {selectedBook.title}</h3>
						<div className='space-y-4'>
							<Label htmlFor='title'>Title</Label>
							<Input
								id='title'
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
							<Label htmlFor='author'>Author</Label>
							<Input
								id='author'
								value={formData.author}
								onChange={(e) =>
									setFormData({ ...formData, author: e.target.value })
								}
							/>
							<Label htmlFor='publishedDate'>Published Date</Label>
							<Input
								id='publishedDate'
								type='date'
								value={formData.publishedDate}
								onChange={(e) =>
									setFormData({ ...formData, publishedDate: e.target.value })
								}
							/>
							<Label htmlFor='genres'>Genres (comma separated)</Label>
							<Input
								id='genres'
								value={formData.genres}
								onChange={(e) =>
									setFormData({ ...formData, genres: e.target.value })
								}
							/>
							<Label htmlFor='image'>Image URL</Label>
							<Input
								id='image'
								value={formData.image}
								onChange={(e) =>
									setFormData({ ...formData, image: e.target.value })
								}
							/>
							<Label htmlFor='description'>Description</Label>
							<Input
								id='description'
								value={formData.description}
								onChange={(e) =>
									setFormData({ ...formData, description: e.target.value })
								}
							/>
							<button onClick={handleUpdate} className='btn btn-primary'>
								Update Book
							</button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
}
