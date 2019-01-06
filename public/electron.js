const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const notifier = require("node-notifier");
const ytpdl = require("ytplaylist-dl");
const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

function createMenu() {
  var template = [
    {
      label: "Application",
      submenu: [
        {
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:"
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: function() {
            mainWindow.reload();
          }
        },
        {
          label: "Toogle Full Screen",
          accelerator: "Ctrl+CmdOrCtrl+F",
          selector: "toggleFullScreen:"
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "Alt+CmdOrCtrl+I",
          click: function() {
            mainWindow.toggleDevTools();
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on("ready", () => {
  createWindow();
  createMenu();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("download", async function(event, arg) {
  const url = arg.url;
  const category = arg.category;
  const name = arg.name;
  const folderPath = `/Users/puntnomads/Documents/Videos/${category}/${name}`;
  await mkdir(folderPath);
  await ytpdl(url, folderPath, { format: "mp4" });
  notifier.notify({
    title: "Download Complete",
    message: "The playlist has finished downloading."
  });
});
