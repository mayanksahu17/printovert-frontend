import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  productimage: "",
  color: "white",
  size: "",
  price: 200,
  stock: null,
  rating: null,
  shipped: false,
  delivered: false,
  ordered: false,
  brand: null,
  category : "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setproductimage: (state, action) => {
      state.productimage = action.payload.file;
    },

    Editsize: (state, action) => {
      state.size = action.payload.size;
    },

    Editcolor: (state, action) => {
      state.color = action.payload.color;
    },


    removeTshirt: (state, action) => {
      state.color = "white";
      state.size = null;
    },
    setprice: (state, action) => {
      state.price = action.payload.price;
     console.log(state.price);
    },

  },
});

export const {
  Editsize,
  Editcolor,
  EditFrontImage,
  Editbackimage,
  Editrightimage,
  Editleftimage,
  removeTshirt,
  setprice
} = productSlice.actions;

export default productSlice.reducer;
