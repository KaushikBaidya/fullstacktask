import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className='bg-white text-gray-700 p-4 border-t-2 border-slate-200 w-full'>
			<div className='container mx-auto text-center'>
				<p className='text-sm'>
					&copy; {new Date().getFullYear()} Libaria. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
