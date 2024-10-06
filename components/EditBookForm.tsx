'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, BookFormValues } from '@/schemas/bookSchema';
import { updateBook } from '@/lib/update';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface EditBookFormProps {
	initialData: BookFormValues & { _id: string };
}

const EditBookForm = ({ initialData }: EditBookFormProps) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<BookFormValues>({
		resolver: zodResolver(bookSchema),
	});

	useEffect(() => {
		setValue('title', initialData.title);
		setValue('title', initialData.title);
		setValue('author', initialData.author);
		setValue(
			'publishedDate',
			new Date(initialData.publishedDate).toISOString().slice(0, 10)
		);
		setValue('genres', initialData.genres);
		setValue('image', initialData.image);
		setValue('description', initialData.description || '');
	}, [initialData, setValue]);

	const onSubmit = async (data: BookFormValues) => {
		try {
			const formData = new FormData();

			// Append all fields to the FormData instance
			formData.append('id', initialData._id); // Append the _id here
			formData.append('title', data.title);
			formData.append('author', data.author);
			formData.append('publishedDate', data.publishedDate);
			data.genres.forEach((genre) => {
				formData.append('genres', genre); // Append each genre
			});
			formData.append('image', data.image);
			formData.append('description', data.description || '');

			const response = await updateBook(formData);

			if (response.success) {
				toast.success('Book successfully updated!');
				router.push('/allbooks'); // Redirect after update
			} else {
				toast.error(response.message || 'Failed to update the book.');
			}
		} catch (error) {
			console.error('Error updating book:', error);
			toast.error('Failed to update the book.');
		}
	};

	// const onSubmit = async (data: BookFormValues) => {
	// 	try {
	// 		const formData = new FormData();

	// 		console.log(data);

	// 		Object.entries(data).forEach(([key, value]) => {
	// 			if (Array.isArray(value)) {
	// 				value.forEach((item) => formData.append(key, item));
	// 			} else {
	// 				formData.append(key, value);
	// 			}
	// 		});

	// 		const response = await updateBook(formData);

	// 		if (response.success) {
	// 			toast.success('Book successfully updated!');
	// 			router.push('/books');
	// 		} else {
	// 			toast.error('Failed to update the book.');
	// 		}
	// 	} catch (error) {
	// 		console.error('Error updating book:', error);
	// 		toast.error('Failed to update the book.');
	// 	}
	// };

	return (
		<div className='w-2/4 mx-auto mt-10 border rounded shadow-sm p-4'>
			<h2 className='text-2xl font-bold mb-4'>Edit Book</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type='hidden' value={initialData._id} {...register('id')} />
				<div className='mb-4'>
					<Label htmlFor='title' className='block text-gray-700'>
						Title
					</Label>
					<Input
						type='text'
						id='title'
						{...register('title')}
						className='w-full mt-1'
						disabled={isSubmitting}
					/>
					{errors.title && (
						<p className='text-red-500'>{errors.title.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<Label htmlFor='author' className='block text-gray-700'>
						Author
					</Label>
					<Input
						type='text'
						id='author'
						{...register('author')}
						className='w-full mt-1'
						disabled={isSubmitting}
					/>
					{errors.author && (
						<p className='text-red-500'>{errors.author.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<Label htmlFor='publishedDate' className='block text-gray-700'>
						Published Date (YYYY-MM-DD)
					</Label>
					<Input
						type='text'
						id='publishedDate'
						{...register('publishedDate')}
						className='w-full mt-1'
						disabled={isSubmitting}
					/>
					{errors.publishedDate && (
						<p className='text-red-500'>{errors.publishedDate.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<Label htmlFor='genres' className='block text-gray-700'>
						Genres (Comma separated)
					</Label>
					<Input
						type='text'
						id='genres'
						{...register('genres', {
							setValueAs: (v) =>
								typeof v === 'string'
									? v.split(',').map((g: string) => g.trim())
									: v,
						})}
						className='w-full mt-1'
						disabled={isSubmitting}
					/>
					{errors.genres && (
						<p className='text-red-500'>{errors.genres.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<Label htmlFor='image' className='block text-gray-700'>
						Image URL
					</Label>
					<Input
						type='text'
						id='image'
						{...register('image')}
						className='w-full mt-1'
						disabled={isSubmitting}
					/>
					{errors.image && (
						<p className='text-red-500'>{errors.image.message}</p>
					)}
				</div>

				<div className='mb-4'>
					<Label htmlFor='description' className='block text-gray-700'>
						Description
					</Label>
					<Textarea
						id='description'
						{...register('description')}
						className='w-full mt-1'
						disabled={isSubmitting}
					/>
				</div>

				<Button type='submit' className='w-full' disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Update Book'}
				</Button>
			</form>
		</div>
	);
};

export default EditBookForm;
