import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBase64 } from '@plaiceholder/base64';

import rfetch from '../lib/fetch';
import PRODUCT_QUERY from '../lib/productQuery';
import { checkIfInCart } from '../lib/utils';
import { setProducts, fetchMoreProducts, selectProducts } from '../lib/slices/productSlice';
import { selectCart } from '../lib/slices/userSlice';

import ProductItem from '../components/ProductItem';

export default function Index({ initialProductData }) {
	const dispatch = useDispatch();
	const { search, products, productsInView } = useSelector((state) => selectProducts(state));
	const cart = useSelector((state) => selectCart(state));

	let canLoad = true;

	useEffect(() => {
		dispatch(setProducts(initialProductData));
	}, []);

	function scrollHandler() {
		const scrollLimit = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		if (
			search.length == 0 &&
			products.length > 0 &&
			canLoad &&
			scrollLimit - window.scrollY - window.innerHeight < window.innerHeight
		) {
			dispatch(fetchMoreProducts({ products, productsInView }));
			canLoad = false;
			setTimeout(() => (canLoad = true), 2000);
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [products, canLoad]);

	return (
		<>
			<div className='md:p-10 flex spacing-y-4 flex-wrap'>
				{(search.length > 0
					? [...productsInView, ...products].filter(
							(product) => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1
					  )
					: productsInView
				).map((product, i) => (
					<ProductItem key={product.id} data={product} inCart={checkIfInCart(cart, product.slug)} />
				))}
			</div>
		</>
	);
}

export async function getStaticProps() {
	const { products } = await rfetch(PRODUCT_QUERY);
	const initialProductData = await Promise.all(
		products.map(async (product) => ({
			...product,
			blurhash: await fetch(product.image)
				.then((r) => r.arrayBuffer())
				.then((r) => getBase64(Buffer.from(r))),
		}))
	);
	return { props: { initialProductData }, revalidate: 120 };
}
