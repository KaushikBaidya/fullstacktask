import GetTodos from '@/components/GetTodos';
import { Featured } from '@/components/pageComponents/Featured';
import Hero from '@/components/pageComponents/Hero';

export default function Home() {
	return (
		<div className='min-h-screen relative'>
			<div>
				<Hero />
				<Featured />
			</div>
		</div>
	);
}
