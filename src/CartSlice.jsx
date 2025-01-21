import { createSlice } from '@reduxjs/toolkit';

function getTotalItems(items) {
    let totalItems = 0;
    items.forEach(item => totalItems += item.quantity);
    return totalItems;
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],  // { name, image, cost, quantity }
        totalItems: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }
            state.totalItems++;
        },
        removeItem: (state, action) => {
            const newItems = state.items.filter(item => item.name !== action.payload.name);
            if (state.items !== newItems.items) {
                state.items = newItems;
                state.totalItems = getTotalItems(state.items);
            }
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
            state.totalItems = getTotalItems(state.items);
        },
    }
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
