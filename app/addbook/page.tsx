import Forms from '@/components/Forms';
import React from 'react';

type Props = {};

function page({}: Props) {
	return (
		<div className='flex justify-around flex-col items-center h-1/2 '>
			<h1 className=' text-4xl font-bold mt-12 mb-12'>Todos Page (Kaushik)</h1>
			<Forms />
		</div>
	);
}

export default page;
