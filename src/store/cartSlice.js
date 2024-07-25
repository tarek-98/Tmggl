import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/coupons?code=${couponCode}`
      );
      if (response.data.length === 0) {
        throw new Error("كود خاطئ");
      }
      return {
        coupon: couponCode,
        discount: response.data[0].discount,
        endDate: response.data[0].endDate,
        discountType: response.data[0].discountType,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get("/api/cart");
    return response.data;
  }
);

// Async thunk to handle checkout
export const checkout = createAsyncThunk("cart/checkout", async (items) => {
  const response = await axios.post("/api/checkout", { items });
  return response.data;
});

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
  coupon: null,
  discount: 0,
  endDate: null,
  discountType: null,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // state.carts.push(action.payload);
      // storeInLocalStorage(state.carts);
      const isItemInCart = state.carts.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (isItemInCart) {
        const tempCart = state.carts.map((item) => {
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size
          ) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty * item.price;

            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });

        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },

    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },

    getCartTotal: (state) => {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);

      state.itemsCount = state.carts.length;
    },

    toggleCartQty: (state, action) => {
      const tempCart = state.carts.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;

          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountedPrice;
          }

          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });

      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    setCartMessageOn: (state) => {
      state.isCartMessageOn = true;
    },

    setCartMessageOff: (state) => {
      state.isCartMessageOn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupon = action.payload.coupon;
        state.discount = action.payload.discount;
        state.discountType = action.payload.discountType;
        state.endDate = action.payload.endDate;
        state.totalAmount -= action.payload.discount;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.discount = 0;
      })

      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(checkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = [];
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  setCartMessageOff,
  setCartMessageOn,
  getCartTotal,
  toggleCartQty,
  clearCart,
  removeFromCart,
} = cartSlice.actions;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;

export default cartSlice.reducer;
