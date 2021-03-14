import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../lib/slices/productSlice';
import { selectCart } from '../../lib/slices/userSlice';

export default function Header() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => selectCart(state));

	return (
		<header className='z-50 fixed text-gray-700 body-font w-full'>
			<div className='flex flex-wrap p-5 mx-auto justify-between flex-row bg-gray-900'>
				<div className='inline-flex items-center flex-1'>
					<h1 className='ml-5 font-semibold tracking-tighter transition duration-1000 ease-in-out transform text-white lg:text-2xl text-bold lg:mr-8'>
						<Link href='/'>
							<a>
								<span className='text-purple-400'>#</span>Store
							</a>
						</Link>
					</h1>
				</div>
				<div className='flex-1 flex'>
					<div className='relative mx-auto text-white'>
						<input
							className='lg:text-lg border-2 placeholder-gray-300 border-gray-800 bg-gray-500 h-10 px-5 pr-32 rounded-lg text-sm focus:outline-none'
							name='search'
							placeholder='Search'
							autoComplete='off'
							onChange={(e) => {
								dispatch(setSearch(e.target.value.trim()));
							}}
						/>
						<Link href='/'>
							<button className='focus:outline-none absolute right-0 top-0 transform -translate-x-1/2 translate-y-1/2'>
								<svg
									className='text-white fill-current'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									xmlSpace='preserve'
									width='20px'
									height='20px'
								>
									<path d='M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z' />{' '}
								</svg>
							</button>
						</Link>
					</div>
				</div>

				<nav className='flex-1 inline-flex items-center justify-end text-base md:ml-auto '>
					<Link href='/cart'>
						<a className='mr-5 lg:text-xl text-sm font-semibold text-white relative'>
							cart
							<span className='absolute flex justify-center items-center right-full top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm leading-tight text-center'>
								<span>{cart.length}</span>
							</span>
						</a>
					</Link>
				</nav>
			</div>
		</header>
	);
}
