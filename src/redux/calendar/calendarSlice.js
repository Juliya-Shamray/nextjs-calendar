import { createSlice } from "@reduxjs/toolkit";
import loading from "./../../app/loading";
import { addEvent, fetchEvents, removeEvent } from "./operations";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(removeEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      });
  },
});

export const calendarReducer = calendarSlice.reducer;
