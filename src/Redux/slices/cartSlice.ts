import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {enableMapSet} from 'immer';
import {Food} from "../../@types/common";


enableMapSet();

const initialState = {
    items: new Map<Food, Map<number, number>>(),
    finalPrice: 0,
    size: 0
}

type IncomingItem = {
    food: Food,
    portionSize: number
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IncomingItem>) => {
            let food = action.payload.food;
            let portionSize = action.payload.portionSize;

            let portionMap = state.items.get(food);
            if (portionMap != undefined) {
                let portionCount = portionMap.get(portionSize);
                if (portionCount != undefined) {
                    portionMap.set(portionSize, portionCount + 1)

                } else {
                    portionMap.set(portionSize, 1)
                }
            } else {
                state.items.set(food, new Map().set(portionSize, 1));

            }
            state.finalPrice += +food.prices[portionSize];
            state.size += 1;
        },
        removeFromCart: (state, action) => {
            let food = action.payload[0];
            let portionSize = action.payload[1];

            let portionMap = state.items.get(food);
            if (portionMap != undefined) {
                let portionCount = portionMap.get(portionSize);
                if (portionCount != undefined) {
                    if (portionCount == 1) {
                        portionMap.delete(portionSize);
                    } else {
                        portionMap.set(portionSize, portionCount - 1)
                    }
                    if (portionMap.size == 0) {
                        state.items.delete(food);
                    }
                }
            }
            state.finalPrice -= +food.prices[portionSize];
            state.size -= 1;
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer;