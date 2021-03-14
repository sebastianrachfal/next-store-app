import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		productsInView: [],
		search: '',
	},
	reducers: {
		setProducts: (state, { payload }) => {
			let products = [...payload];
			state.productsInView = products.splice(0, 20);
			state.products = products;
		},
		fetchMoreProducts: (state, { payload }) => {
			let products = [...payload.products];
			state.productsInView = [...payload.productsInView, ...products.splice(0, 20)];
			state.products = products;
		},
		setSearch: (state, { payload }) => {
			state.search = payload;
		},
	},
});

export const selectProducts = (state) => state.product;

export const { setProducts, fetchMoreProducts, setSearch } = productSlice.actions;

export default productSlice.reducer;
