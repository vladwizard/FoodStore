import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import deviceInfo from './slices/deviceInfo'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        device: deviceInfo,
    },
})

export type RootState = ReturnType<typeof store.getState>