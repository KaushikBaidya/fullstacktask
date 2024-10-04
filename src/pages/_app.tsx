import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}
