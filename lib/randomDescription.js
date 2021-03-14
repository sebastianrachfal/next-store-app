const PRODUCT_FEATURES = [
	'Elastic band',
	'Stainless blade',
	'90-degree pivot head',
	'Alloy construction',
	'Durable material',
	'Prevents hair loss',
	'Designed with comfort in mind',
	'Natural scents',
	'Transforms your everyday carry',
	'Makes it a breeze to wake up',
	'Feel fresh everyday',
	'Premium US design',
	'Patent pending',
	'Long burn',
];

export default function generateRandomDescription() {
	const lineCount = Math.round(Math.random() * 4) + 3;
	const pfCopy = [...PRODUCT_FEATURES];
	const ret = [];

	for (let i = 0; i < lineCount; i++) ret.push(pfCopy.splice(Math.round(Math.random() * (pfCopy.length - 1)), 1));

	return ret;
}
