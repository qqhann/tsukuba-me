const { app, BrowserWindow, ipcMain, Tray } = require('electron')

let tray = undefined
let win = undefined


const createTray = () => {
    tray = new Tray('assets/icon.png')
    tray.on('right-click', toggleWindow)
    tray.on('double-click', toggleWindow)
    tray.on('click', () => {
        toggleWindow()
    })
}

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadFile('index.html')
    win.on('blur', () => {
        if (!win.webContents.isDevToolsOpened()) {
            win.hide()
        }
    })
}

const showWindow = () => {
    // TODO: position
    win.show()
    win.focus()
}

const toggleWindow = () => {
    if (win.isVisible()) {
        win.hide()
    } else {
        showWindow()
    }
}

app.on('ready', () => {
    createTray()
    createWindow()
})

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win == null) {
        createWindow()
    }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.