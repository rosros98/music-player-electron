const { ipcMain, app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 700,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    transparent: true,

    webPreferences: {
      contextIsolation: true,
      preload: __dirname + "/preload.js" 
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.on("close-app", () => {
  if (win) win.close(); 
});