import {configureStore} from '@reduxjs/toolkit';
import processDataReducer from './slices/processDataSlice';
import initApiListeners from "../api/listeners";

const store = configureStore({
  reducer: {
    processData: processDataReducer,
  }
})

initApiListeners(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;