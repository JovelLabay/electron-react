const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  dialog
} = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

const { autoUpdater } = require('electron-updater')

// NOTIFICATION
ipcMain.on('asynchronous-message', (event, arg) => {
  new Notification({
    title: arg + 'yawa',
    body: 'This is a notification'
  }).show()
})

// UPDATE
ipcMain.on('update', () => {
  autoUpdater.checkForUpdatesAndNotify()
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

// AUTO UPDATE
autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version is being downloaded.'
  }
  dialog.showMessageBox(dialogOpts, response => {})
})

autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'A new version has been downloaded. Restart the application to apply the updates.'
  }
  dialog.showMessageBox(dialogOpts).then(returnValue => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
