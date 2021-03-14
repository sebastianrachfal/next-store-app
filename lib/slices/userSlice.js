import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		cart: [],
	},
	reducers: {
		addToCart: (state, { payload }) => {
			state.cart.push({ item: payload, amount: 1 });
		},
		clearCart: (state) => void (state.cart = []),
		removeFromCart: (state, { payload }) => {
			const { current, id } = payload;
			console.log(current, id);
			state.cart = current.filter((item) => item.item != id);
		},
		setAmountInCart: (state, { payload }) => {
			const { current, id, amount } = payload;
			let cartCopy = [];
			for (let item of current) cartCopy.push({ ...item, amount: item.item == id ? amount : item.amount });
			state.cart = cartCopy;
		},
		setCart: (state, { payload }) => {
			state.cart = payload;
		},
	},
});

export const selectCart = (state) => state.user.cart;

export const { addToCart, clearCart, removeFromCart, setAmountInCart, setCart } = userSlice.actions;

export default userSlice.reducer;
