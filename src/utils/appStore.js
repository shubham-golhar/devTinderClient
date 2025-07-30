import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlie";
import connectionReducer from "./conectionSlice";
import requestreducer from "./requestSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestreducer,
  },
});

export default appStore;
