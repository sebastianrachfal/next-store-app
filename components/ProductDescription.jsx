export default function ProductDescription({ descPoints }) {
	return (
		<ul className='list-inside text-left list-disc p-5 bg-purple-200 rounded-lg w-full text-purple-800 mt-1'>
			{descPoints.map((point) => (
				<li key={point} className='py-1'>
					{point}
				</li>
			))}
		</ul>
	);
}
