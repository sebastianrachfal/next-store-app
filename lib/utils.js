export function checkIfInCart(cart, item) {
	for (let entry of cart) if (entry.item == item) return true;
	return false;
}

export function getProductsFromCart(products, cart) {
	const cartSlugs = cart.map((item) => item.item);
	const ret = [];
	for (let product of products)
		if (cartSlugs.includes(product.slug))
			ret.push({ ...product, amount: cart[cartSlugs.indexOf(product.slug)].amount });
	return ret;
}

export function calculatePriceFromProductList(products) {
	return products.map((product) => product.price * product.amount).reduce((a, b) => a + b, 0);
}
