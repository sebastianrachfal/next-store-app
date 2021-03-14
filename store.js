import { configureStore } from '@reduxjs/toolkit';

import productReducer from './lib/slices/productSlice';
import userReducer from './lib/slices/userSlice';

export default configureStore({
	reducer: {
		product: productReducer,
		user: userReducer,
	},
	devTools: true,
});
