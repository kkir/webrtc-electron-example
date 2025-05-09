import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { createWindow } from './window';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let senderWindow;
let receiverOneWindow;
let receiverTwoWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  senderWindow = createWindow('sender', '/');
  receiverOneWindow = createWindow('receiver-one', '/receiver-one');
  receiverTwoWindow = createWindow('receiver-two', '/receiver-two');
});

app.on('before-quit', () => {
  WindowRTCMain.dispose();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
