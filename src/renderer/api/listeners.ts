import {ipcRenderer} from 'electron'
import {setDataToPull} from "../store/slices/processDataSlice";


export default function initProcessDataListeners(store: any) {
  ipcRenderer.on('process-data', (event, data: any) => {
    store.dispatch(setDataToPull(data));
  })
}
