'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookSchema, BookFormValues } from '@/schemas/bookSchema';
import { createBook } from '@/lib/create';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CreateBookForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
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

			toast.success('Book successfully created!');

			reset();
		} catch (error) {
			console.error('Error creating book:', error);
			toast.error('Failed to create the book.');
		}
	};

	return (
		<div className='w-2/4 mx-auto mt-10 border rounded shadow-sm p-4'>
			<h2 className='text-2xl font-bold mb-4'>Add New Book</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
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
							setValueAs: (v) => v.split(',').map((g: string) => g.trim()),
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
					{isSubmitting ? 'Submitting...' : 'Create Book'}
				</Button>
			</form>
		</div>
	);
};

export default CreateBookForm;
