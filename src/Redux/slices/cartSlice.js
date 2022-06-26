import {createSlice} from "@reduxjs/toolkit";
import {enableMapSet} from 'immer';


enableMapSet();
const initialState = {
    items: new Map(), //Map(food:map({portion:count}))
    finalPrice: 0,
    size:0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let food = action.payload[0];
            let portionSize = action.payload[1];

            if (state.items.has(food)) {
                if (state.items.get(food).has(portionSize)) {
                    state.items.get(food).set(portionSize, state.items.get(food).get(portionSize) + 1)

                } else {
                    state.items.get(food).set(portionSize, 1)
                }
            } else {
                state.items.set(food, new Map().set(portionSize, 1));

            }
            state.finalPrice += +food.prices[portionSize];
            state.size+=1;
        },
        removeFromCart: (state, action) => {
            let food = action.payload[0];
            let portionSize = action.payload[1];

            if (state.items.get(food).get(portionSize) == 1) {
                state.items.get(food).delete(portionSize);
            } else {
                state.items.get(food).set(portionSize, state.items.get(food).get(portionSize) - 1)
            }
            if (state.items.get(food).size == 0) {
                state.items.delete(food);
            }
            state.finalPrice -= +food.prices[portionSize];
            state.size-=1;
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer;