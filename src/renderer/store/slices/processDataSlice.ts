import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from "../../api";
import {RootState} from '../';

export const getDataMods = createAsyncThunk('process_data/getDataMods', async (data, {dispatch}) => {
  const result = await api.getDataMods();
  dispatch(setDataMod(result[0]));
  return result;
})

export const setDataMod = createAsyncThunk('process_data/setDataMod', async (mod: string, {dispatch}) => {
  dispatch(setLoading(true));
  dispatch(clearDataPull());
  return await api.setDataMod(mod);
})

const initialState: {
  dataMod: string,
  mods: string[],
  dataPull: any,
  loading: boolean,
} = {
  dataMod: "",
  mods: [],
  dataPull: [],
  loading: true,
}

export const processDataSlice = createSlice({
  name: 'process_data',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearDataPull(state) {
      state.dataPull = {};
    },
    setDataToPull(state, action) {
      state.dataPull = action.payload;
    }
  },
  extraReducers: {
    [getDataMods.fulfilled.type]: (state, action) => {
      state.mods = [...action.payload];
    },
    [setDataMod.fulfilled.type]: (state, action) => {
      state.dataMod = action.payload;
      state.loading = false;
    }
    
  }
});

export const {setDataToPull, setLoading, clearDataPull} = processDataSlice.actions;

export const dataPullSelector = (state: RootState) => state.processData.dataPull;
export const modsPullSelector = (state: RootState) => state.processData.mods;
export const loadingSelector = (state: RootState) => state.processData.loading;
export const dataModSelector = (state: RootState) => state.processData.dataMod;

const reducer = processDataSlice.reducer;
export default reducer
