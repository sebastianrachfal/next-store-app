import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import { selectCart, setAmountInCart, removeFromCart, clearCart } from '../lib/slices/userSlice';
import PRODUCT_QUERY from '../lib/productQuery';
import rfetch from '../lib/fetch';
import { getProductsFromCart, calculatePriceFromProductList } from '../lib/utils';

export default function Cart({ products }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => selectCart(state));
	const crossProducts = getProductsFromCart(products, cart);
	const price = calculatePriceFromProductList(crossProducts);

	return (
		<div className='flex justify-center my-6 '>
			<div className='flex flex-col border border-gray-200 rounded-lg w-full p-4 lg:p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5'>
				{cart.length > 0 ? (
					<div className='flex-1'>
						<table className='w-full text-sm lg:text-base rounded-lg overflow-hidden' cellSpacing='0'>
							<thead>
								<tr className='h-12 bg-purple-600 text-white p-2 w-full '>
									<th className='text-center'>Product</th>
									<th className='text-center'>
										<span className='lg:hidden' title='Quantity'>
											Qtd
										</span>
										<span className='hidden lg:inline'>Quantity</span>
									</th>
									<th className='hidden text-center md:table-cell'>Unit price</th>
									<th className='text-center'>Total price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{crossProducts.map(({ name, price, image, slug, amount }) => (
									<tr key={slug} className='border-b border-gray-200 hover:bg-gray-100'>
										<Link href='/product/[id]' as={`/product/${slug}`}>
											<td className='text-left p-2 cursor-pointer'>
												<div className='flex items-center'>
													<div className='hidden lg:block'>
														<Image
															className='rounded-lg'
															src={image}
															width={80}
															height={60}
														/>
													</div>

													<span className='ml-4 sm:text-sm md:text-base lg:text-lg font-semibold'>
														{name}
													</span>
												</div>
											</td>
										</Link>
										<td className='text-center'>
											<input
												type='number'
												value={amount}
												className='m-2 border border-gray-400 rounded-lg w-20 h-10 font-semibold text-center text-gray-700 bg-gray-100 outline-none focus:outline-none hover:text-black focus:text-black'
												onChange={(e) => {
													if (e.target.value > 0) {
														dispatch(
															setAmountInCart({
																current: cart,
																id: slug,
																amount: +e.target.value,
															})
														);
													}
												}}
											/>
										</td>
										<td className='hidden md:table-cell text-center'>
											<span className='text-sm lg:text-base font-medium'>
												{(+price).toFixed(2)}$
											</span>
										</td>
										<td className='text-center'>
											<span className='text-sm lg:text-base font-medium'>
												{(price * amount).toFixed(2)}$
											</span>
										</td>
										<td>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												x='0'
												y='0'
												enableBackground='new 0 0 512 512'
												version='1.1'
												viewBox='0 0 512 512'
												xmlSpace='preserve'
												className='w-4 h-4 cursor-pointer mx-2'
												onClick={() => dispatch(removeFromCart({ current: cart, id: slug }))}
											>
												<path d='M512 59.076L452.922 0 256 196.922 59.076 0 0 59.076 196.922 256 0 452.922 59.076 512 256 315.076 452.922 512 512 452.922 315.076 256z'></path>
											</svg>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className='my-4 mt-20 lg:flex'>
							<div className='lg:px-2 w-full'>
								<h1 className='ml-2 font-bold text-xl'>Order details</h1>
								<div>
									<OrderDetail name='Subtotal' value={price.toFixed(2)} />
									<OrderDetail name='Tax' value={(price * 0.23).toFixed(2)} />
									<OrderDetail name='Total' value={(price * 1.23).toFixed(2)} isTotal={true} />
									<div className='flex justify-end'>
										<Link href='/'>
											<button
												onClick={() => {
													dispatch(clearCart());
												}}
												className='mt-10 hover:bg-purple-600 inline-flex border border-gray-400 items-center px-6 py-2 ml-4 font-semibold text-black transition duration-500 ease-in-out transform bg-white rounded-lg shadow-xl hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
											>
												<svg
													aria-hidden='true'
													className='w-8'
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 576 512'
												>
													<path
														fill='currentColor'
														d='M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z'
													/>
												</svg>
												<span className='ml-2 mt-5px'>Procceed to checkout</span>
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className='text-xl lg:text-lg xl:text-4xl whitespace-nowrap font-bold'>
						Your cart is empty!
					</div>
				)}
			</div>
		</div>
	);
}

function OrderDetail({ name, value, isTotal }) {
	const clName =
		(isTotal ? 'text-xl lg:text-2xl font-bold' : 'text-base lg:text-lg font-semibold') +
		' lg:px-4 lg:py-2 m-2 text-center text-gray-800';
	return (
		<div className='flex justify-between border-b'>
			<div className={clName}>{name}</div>
			<div className={clName}>{value}$</div>
		</div>
	);
}

export async function getStaticProps() {
	const { products } = await rfetch(PRODUCT_QUERY);
	return { props: { products }, revalidate: 60 };
}
