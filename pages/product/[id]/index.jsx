import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getBase64 } from '@plaiceholder/base64';

import rfetch from '../../../lib/fetch';
import { checkIfInCart } from '../../../lib/utils';
import generateRandomDescription from '../../../lib/randomDescription';
import { addToCart, removeFromCart, selectCart } from '../../../lib/slices/userSlice';

import ProductDescription from '../../../components/ProductDescription';
import CartButton from '../../../components/CartButton';

function Descriptor({ name }) {
	return <div className='text-xs font-semibold text-gray-500 text-left'>{name}</div>;
}

export default function ProductByID({ product: { id, image, name, price, categories, slug }, blurhash }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => selectCart(state));

	const inCart = checkIfInCart(cart, slug);

	const [description, setDescription] = useState([]);
	useEffect(() => {
		setDescription(generateRandomDescription());
	}, []);

	return (
		<div className='w-full min-h-full p-3 flex flex-col justify-center'>
			<div className='min-h-full shadow-lg border border-gray-200 rounded-lg flex flex-col md:flex-row overflow-hidden'>
				<div className='overflow-hidden relative flex'>
					<div
						className='absolute left-0 top-0 w-full h-full'
						style={{
							background: `url('${blurhash}') no-repeat`,
							backgroundSize: 'contain',
							filter: 'blur(2rem)',
							transform: 'scale(1.2)',
						}}
					></div>
					<Image
						className='rounded-lg rounded-bl-none rounded-br-none md:rounded-tr-none md:rounded-bl-lg'
						style={{ backdropFilter: 'blur(2rem)' }}
						src={image}
						width={620}
						height={480}
					/>
				</div>
				<div className='flex flex-1 flex-col p-5 items-start justify-between'>
					<div className='flex flex-col w-full items-start'>
						<Descriptor name='name' />
						<h2 className='text-xl lg:text-lg xl:text-4xl whitespace-nowrap font-bold mb-4'>{name}</h2>
						<Descriptor name='categories' />
						<div className='md:text-sm xl:text-base'>
							{categories.map((category) => category.name).join(', ')}
						</div>
					</div>
					<div className='w-full my-2'>
						<Descriptor name='description' />
						<ProductDescription descPoints={description} />
					</div>
					<div className='flex w-full justify-between items-center'>
						<div className='text-lg xl:text-xl'>
							<Descriptor name='price' />
							{`${price}$`}
						</div>
						<div>
							<CartButton
								inCart={inCart}
								onClick={() =>
									dispatch(inCart ? removeFromCart({ current: cart, id: slug }) : addToCart(slug))
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export const getStaticProps = async (context) => {
	const { products } = await rfetch({
		query: `query {
        products(slug: "${context.params.id}") {
          name
          id
          image
          slug
          price
          categories {
            name
          }
        }
      }`,
	});
	const image = await fetch(products[0].image).then((r) => r.arrayBuffer());
	const blurhash = await getBase64(Buffer.from(image));
	return {
		props: {
			product: products[0],
			blurhash,
		},
	};
};

export const getStaticPaths = async () => {
	const { products } = await rfetch({
		query: `query {
        products {
          slug
        }
      }`,
	});
	const p = products.map((product) => ({ params: { id: product.slug.toString() } }));
	return {
		paths: p,
		fallback: true,
	};
};
