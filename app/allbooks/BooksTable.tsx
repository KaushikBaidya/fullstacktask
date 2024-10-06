'use client';

import { useRouter } from 'next/navigation';
// import { useState } from 'react';
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
import { deleteBook } from '@/lib/delete';
import { LibraryDocument } from '@/models/libraryModel';
import toast from 'react-hot-toast';

interface BooksTableProps {
	books: LibraryDocument[];
}

export default function BooksTable({ books }: BooksTableProps) {
	const router = useRouter(); // Added useRouter to handle navigation

	const handleEditClick = (bookId: string) => {
		// Navigate to the dynamic edit page when "Edit" is clicked
		router.push(`/allbooks/${bookId}/edit`);
	};

	const handleDelete = async (id: string) => {
		const response = await deleteBook(id);
		if (response.success) {
			window.location.reload();
			toast.success('Book deleted.');
		} else {
			toast.error('Failed to delete the book.');
		}
	};

	return (
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
								<a href={book.image} target='_blank' rel='noopener noreferrer'>
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
										<DropdownMenuItem onClick={() => handleEditClick(book._id)}>
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
	);
}
