export default function CartButton({ inCart, onClick }) {
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className={
				(inCart
					? 'border-purple-600 bg-purple-600 text-white hover:bg-red-500 hover:border-red-600'
					: 'hover:bg-purple-600') +
				' inline-flex border border-gray-400 items-center px-6 py-2 ml-4 font-semibold text-black transition duration-500 ease-in-out transform bg-white rounded-lg shadow-xl hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2'
			}
		>
			Cart
		</button>
	);
}
