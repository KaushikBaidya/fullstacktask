import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
import './globals.css';
import { connectToMongoDB } from '@/lib/db';
import Navbar from '@/components/ui/Navbar';
// import Footer from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Libaria',
	description: 'the largest book collection',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	connectToMongoDB();
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Navbar />
				<div>{children}</div>
				<Toaster />
				{/* <Footer /> */}
			</body>
		</html>
	);
}
