import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    address: "",
    coordinates: { lat: null, lng: null },
  },
  reducers: {
    setLocation(state, action) {
      state.address = action.payload.address;
      state.coordinates = action.payload.coordinates;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
