import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./slices/api/user/userSlice";
import { brandSlice } from "./slices/api/brands/brandSlice";
import { productSlice } from "./slices/api/products/productSlice";
import { dealSlice } from "./slices/api/deals/dealSlice";
import { wishlistSlice } from "./slices/api/wishlist/wishlistSlice";
import { reviewSlice } from "./slices/api/reviews/reviewSlice";
import { voteSlice } from "./slices/api/votes/voteSlice";
import { categorySlice } from "./slices/api/categories/cateogrySlice";
import { cartSlice } from "./slices/api/cart/cartSlice";
import { deliverySlice } from "./slices/api/delivery/deliverySlice";
import { addressSlice } from "./slices/api/address/addressSlice";

export const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [brandSlice.reducerPath]: brandSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [dealSlice.reducerPath]: dealSlice.reducer,
    [wishlistSlice.reducerPath]: wishlistSlice.reducer,
    [reviewSlice.reducerPath]: reviewSlice.reducer,
    [voteSlice.reducerPath]: voteSlice.reducer,
    [cartSlice.reducerPath]: cartSlice.reducer,
    [deliverySlice.reducerPath]: deliverySlice.reducer,
    [addressSlice.reducerPath]: addressSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userSlice.middleware,
      brandSlice.middleware,
      categorySlice.middleware,
      productSlice.middleware,
      dealSlice.middleware,
      wishlistSlice.middleware,
      reviewSlice.middleware,
      voteSlice.middleware,
      cartSlice.middleware,
      deliverySlice.middleware,
      addressSlice.middleware,

    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
