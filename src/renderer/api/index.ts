import {ipcRenderer} from 'electron';

const api = {
  getDataMods: () => {
    return ipcRenderer.invoke('mods-pull')
  },
  setDataMod: (mod: string) => {
    return ipcRenderer.invoke('mod', mod)
  }
}
export default api;
