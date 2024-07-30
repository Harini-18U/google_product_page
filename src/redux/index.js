import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from './services/user'
import { productsAPI } from './services/products'

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, productsAPI.middleware),
})