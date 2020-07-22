const threadModule = require("worker_threads")
const worker = threadModule.Worker

const twitchThread=new worker("./twitchThread/twitch.js")
const express = require('express')
const APP = express()
const io=require('socket.io')(APP.listen(8085))

const { app, BrowserWindow } = require('electron')
require('electron-reload')("./public");




app.disableHardwareAcceleration();

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    resize:true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile("./public/index.html")

  //win.webContents.openDevTools()
}


app.on('ready', function () {
    setTimeout(function() {
        createWindow();
    }, 300);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



//ANCHOR this is socket event handeler
io.on('connection',(socket)=>{
    console.log("New connection")
    //TODO Add this message to twitch overlay

    socket.on('msg',(data)=>{
        io.emit("newMsg",data)
    })
})