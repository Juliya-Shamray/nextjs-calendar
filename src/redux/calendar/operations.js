import axios from "axios";
import { instance } from "./../auth/operations";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk(
  "calendar/fetchEvents",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get("/api/events");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addEvent = createAsyncThunk(
  "calendar/addEvent",
  async (event, thunkAPI) => {
    try {
      await instance.post("/api/events", event);
      return event;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeEvent = createAsyncThunk(
  "calendar/removeEvent",
  async (eventId, thunkAPI) => {
    try {
      await instance.delete(`/api/events/${eventId}`);
      return eventId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
