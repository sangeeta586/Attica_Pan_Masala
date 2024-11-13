import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                // If the product already exists, increase the quantity
                existingItem.quantity += action.payload.quantity;
            } else {
                // Otherwise, add the new product to the cart with the initial quantity
                state.push({ ...action.payload, quantity: action.payload.quantity });
            }
        },
        removeFromCart: (state, action) => {
            const index = state.findIndex(item => item.productId === action.payload);
            if (index !== -1) state.splice(index, 1); // Remove the item by index
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.find(item => item.productId === action.payload);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.find(item => item.productId === action.payload);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; // Decrement quantity if more than 1
                } else {
                    state.splice(state.indexOf(existingItem), 1); // Remove item if quantity is 0
                }
            }
        },
        clearCart: (state) => {
            // Clear the cart by setting the length to 0
            state.length = 0;
        }
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
