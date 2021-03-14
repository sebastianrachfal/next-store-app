import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart, selectCart } from '../lib/slices/userSlice';

import CartButton from '../components/CartButton';

export default memo(function ProductItem({ data: { image, name, categories, price, slug, blurhash }, inCart }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => selectCart(state));
	return (
		<div className='w-full lg:w-1/2'>
			<Link href='/product/[id]' as={`/product/${slug}`}>
				<div className='m-3 xl:m-5 flex shadow-lg border border-gray-200 rounded-lg cursor-pointer'>
					<div className='overflow-hidden relative flex rounded-lg rounded-tr-none rounded-br-none'>
						<div
							className='absolute left-0 top-0 w-full h-full'
							style={{
								background: `url('${blurhash}') no-repeat`,
								backgroundSize: 'contain',
								filter: 'blur(1rem)',
								transform: 'scale(1.2)',
							}}
						></div>
						<Image
							className='rounded-lg rounded-tr-none rounded-br-none'
							src={image}
							width={150}
							height={150}
						/>
					</div>
					<div className='flex flex-col flex-1 p-5 items-start justify-between'>
						<div className='flex flex-col w-full items-start'>
							<h2 className='text-xl lg:text-lg xl:text-xl whitespace-nowrap'>{name}</h2>
							<div className='text-gray-400 md:text-sm xl:text-base'>
								{categories.map((category) => category.name).join(', ')}
							</div>
						</div>
						<div className='flex w-full justify-between items-center'>
							<div className='text-lg xl:text-xl'>{`${price}$`}</div>
							<CartButton
								inCart={inCart}
								onClick={() =>
									dispatch(inCart ? removeFromCart({ current: cart, id: slug }) : addToCart(slug))
								}
							/>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
});
