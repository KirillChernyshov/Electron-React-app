import {App, ipcMain} from 'electron';

let mods: string[] = ['cpu', 'heap', 'blink memory']; // Mods for sending data
let dataMod: string = ''; // Sets what data to send
let interval: any = null; // Interval for sending data
let ms: number = 1000; // Delay

function sleep(ms: number) { // Delay function
  return new Promise(resolve => setTimeout(resolve, ms))
}

// initialization the listeners for handling events from the renderer process
export default function initListeners(app: App) {
  /* sending data by mode */
  ipcMain.on('data-flow-mod', (event, args) => {
    dataMod = args.dataMod;
  });

  /* sending the mods pull */
  ipcMain.handle('mods-pull', async () => {
    await sleep(2000);
    return mods;
  });
  
  /* set data mod for sending data */
  ipcMain.handle('mod', async (event, mod) => {
    await sleep(2000);
    dataMod = mod;
    return dataMod;
  });
  
  /* initialize sending data */
  app.on('web-contents-created', (event, webContents) => {
    /* sending data in interval by mode */
    interval = setInterval(() => {
      switch (dataMod) {
        case 'cpu': // Sending cpu data
          webContents.send('process-data', process.getCPUUsage())
          break;
        case 'heap': // Sending heap data
          webContents.send('process-data', process.getHeapStatistics())
          break;
        case 'blink memory': // Sending blink memory data
          webContents.send('process-data', process.getBlinkMemoryInfo())
          break;
        default:
          webContents.send('warnings', 'Unknown data mod'); // Sending warn about invalid dataMod
      }
    }, ms);
    
    /* destroy sending data interval */
    webContents.on('destroyed', () => {
      clearInterval(interval);
    })
  });
  
}
