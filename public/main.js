const { app, BrowserWindow, ipcMain, Notification } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

ipcMain.on('asynchronous-message', (event, arg) => {
  new Notification({
    title: arg + "yawa",
    body: "This is a notification"
  }).show()
})

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})