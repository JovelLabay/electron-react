import React from 'react'

const { ipcRenderer } = window.require('electron')
function App() {

    const sendNotification = () => {
        ipcRenderer.send('asynchronous-message', 'ping')
    }

  return (
      <div>
            <h1>Electron React App</h1>
          <button onClick={sendNotification}>
              Send Notification
          </button>
      </div>
  )
}

export default App
