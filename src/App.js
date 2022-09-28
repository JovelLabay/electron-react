import React from 'react'

const { ipcRenderer } = window.require('electron')
function App() {
  const sendNotification = () => {
    ipcRenderer.send('asynchronous-message', 'ping')
  }
  const updateME = () => {
    ipcRenderer.send('update')
  }

  return (
    <div
      style={{
        backgroundColor: 'green'
      }}
    >
      <h1>Electron React App | v0.2.0</h1>
      <button onClick={sendNotification}>Send Notification</button>
      <button onClick={updateME}>Update App</button>
    </div>
  )
}

export default App
