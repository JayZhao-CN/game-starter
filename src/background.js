'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import fs from 'fs'
import path from "path"
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 960,
    height: 540,
    minWidth: 480,
    minHeight: 270,
    maxWidth:960,
    maxHeight:540,
    frame: false,//关闭原生导航栏
    closable:true,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      preload: path.join(__dirname,"preload.js"),
      nodeIntegration: true,
    }
  })

  ipcMain.on('min', () => {
    console.log("min");
    win.minimize()
  });
  ipcMain.on('max', () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize()
    }
  });
  ipcMain.on('close', () => {
    console.log("close...");
    win.destroy()
  });
  ipcMain.on('asynchronous-message', function(event, arg) {
    console.log("收到待保存数据！--->" + arg);

    fs.open("data.txt", 'a', (err, fd)=>{
      if(err){
        console.log(err.message);
      }else{
        fs.write(fd, arg, (err, bytes)=>{
          if(err){
            console.log(err.message);
          }else{
            console.log(bytes +' bytes written');
            win.webContents.on('did-finish-load', ()=>{
              win.webContents.send('rrr', '成功');
            })

          }
        })
      }
    })

    // arg是从渲染进程返回来的数据
    // fs.writeFile(path.join(__dirname, "C:\\D\\project\\game-starter\\src\\renderer\\data\\data.txt"), arg, "utf8", (err) => {
    //   if (err) {
    //     console.log("失败");
    //     event.sender.send('rrr', "写入失败");
    //   } else {
    //     console.log("成功");
    //     event.sender.send('rrr', "写入成功");
    //   }
    // });
  });


  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
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
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
