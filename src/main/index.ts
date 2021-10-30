import {app, BrowserWindow} from 'electron';
import initListeners from "./listeners";
import * as path from 'path';
// import * as url from 'url';

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  
  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:4000`)
  } else {
    win.loadFile(path.join(__dirname, './renderer/index.html'));
  }
  
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

initListeners(app);
