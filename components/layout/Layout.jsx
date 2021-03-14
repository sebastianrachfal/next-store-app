import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import { selectCart, setCart } from '../../lib/slices/userSlice';

import Header from './Header';

export default function Layout({ children }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => selectCart(state));

	function saveData() {
		localStorage.setItem('rachfal-cart', JSON.stringify(cart));
	}

	useEffect(() => {
		const savedString = localStorage.getItem('rachfal-cart');
		if (savedString?.length > 0) dispatch(setCart(JSON.parse(savedString)));
	}, []);

	useEffect(() => {
		document.addEventListener('visibilitychange', saveData);
		return () => document.removeEventListener('visibilitychange', saveData);
	}, [cart]);

	return (
		<div className='flex flex-col h-screen'>
			<Head>
				<title>Store</title>
				<meta property='og:title' content='Store' key='title' />
			</Head>
			<Header />
			<main className='container sm:px-0 w-full lg:px-6 mx-auto text-center bg-white rounded-xl pt-20 min-h-full'>
				{children}
			</main>
		</div>
	);
}
