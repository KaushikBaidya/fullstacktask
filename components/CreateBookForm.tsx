'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, BookFormValues } from '@/schemas/bookSchema';
import { createBook } from '@/lib/create';

const CreateBookForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<BookFormValues>({
		resolver: zodResolver(bookSchema),
	});

	const onSubmit = async (data: BookFormValues) => {
		try {
			const formData = new FormData();

			Object.entries(data).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					value.forEach((item) => formData.append(key, item));
				} else {
					formData.append(key, value);
				}
			});

			await createBook(formData);
			alert('Book successfully created!');
		} catch (error) {
			console.error('Error creating book:', error);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-10 p-4 border rounded shadow-sm'>
			<h2 className='text-2xl font-bold mb-4'>Add New Book</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4'>
					<label className='block text-gray-700'>Title</label>
					<input
						type='text'
						{...register('title')}
						className='w-full p-2 border border-gray-300 rounded mt-1'
					/>
					{errors.title && (
						<p className='text-red-500'>{errors.title.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700'>Author</label>
					<input
						type='text'
						{...register('author')}
						className='w-full p-2 border border-gray-300 rounded mt-1'
					/>
					{errors.author && (
						<p className='text-red-500'>{errors.author.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700'>
						Published Date (YYYY-MM-DD)
					</label>
					<input
						type='text'
						{...register('publishedDate')}
						className='w-full p-2 border border-gray-300 rounded mt-1'
					/>
					{errors.publishedDate && (
						<p className='text-red-500'>{errors.publishedDate.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700'>
						Genres (Comma separated)
					</label>
					<input
						type='text'
						{...register('genres', {
							setValueAs: (v) => v.split(',').map((g: string) => g.trim()),
						})}
						className='w-full p-2 border border-gray-300 rounded mt-1'
					/>
					{errors.genres && (
						<p className='text-red-500'>{errors.genres.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700'>Image URL</label>
					<input
						type='text'
						{...register('image')}
						className='w-full p-2 border border-gray-300 rounded mt-1'
					/>
					{errors.image && (
						<p className='text-red-500'>{errors.image.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700'>Description</label>
					<textarea
						{...register('description')}
						className='w-full p-2 border border-gray-300 rounded mt-1'
					/>
				</div>

				<button
					type='submit'
					className='bg-blue-500 text-white p-2 rounded mt-4 w-full'
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : 'Create Book'}
				</button>
			</form>
		</div>
	);
};

export default CreateBookForm;
