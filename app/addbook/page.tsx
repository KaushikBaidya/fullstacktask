import CreateBookForm from '@/components/CreateBookForm';
import React from 'react';

type Props = {};

function page({}: Props) {
	return (
		<div className='w-full flex justify-around flex-col items-center h-1/2 py-28'>
			<CreateBookForm />
		</div>
	);
}

export default page;
