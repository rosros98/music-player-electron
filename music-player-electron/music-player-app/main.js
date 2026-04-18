const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 800,
    resizable: false, //se vogliamo renderlo scalabile
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    opacity: true,
    webPreferences: {
      contextIsolation: true
    }
  });
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});