/*A special thanks to the contributors:
Main Author - Zero Two#0618
Main Author - Zyphen#8624
Those are are Discord names. Further below, there is a link you can join ;)!
*/

//This is where we import all of our modules
const {app, BrowserWindow, dialog, Menu} = require('electron')
const fs = require('fs')
const path = require("path");
const rpc = require('discord-rpc'); //As for right now, Discord rpc is not working everyone, please be patient

let win

  //This function creates the main browser window
  function createWindow () {
    win = new BrowserWindow({width: 1200, height: 800})
    

    win.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
  }));

    //This const template is for creating the menu bar where File, Edit, View, etc, are seen. Can be edited whenever
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New File',
            accelerator: 'Ctrl+N'
            //This has no effect right now
          },
          {
            label: 'Open File',
            accelerator: 'CmdOrCtrl+O',
            click() {
              openFile();
            }
          },
          {
            label: 'Open Folder'
          },
          {
            label: 'Save',
            accelerator: 'Ctrl+S'
          },
          {
            label: 'Save As',
            accelerator: 'Crtl+Shift+S',
            click(){
              saveFile();
            }
          },
          {
            label: 'Save All'
            //Does Nothing right now
          },
          {
            label: 'Close Window'
            //Does Nothing right now
          },
          {
            submenu: [
              {role: 'quit'}
            ]
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {role: 'undo'},
          {role: 'redo'},
          {type: 'separator'},
          {role: 'cut'},
          {role: 'copy'},
          {role: 'paste'},
          {role: 'pasteandmatchstyle'},
          {role: 'delete'},
          {role: 'selectall'}
        ]
      },
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'window',
        submenu: [
          {role: 'minimize'},
          {role: 'close'},
        ],
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Join Our Discord',
            click () { require('electron').shell.openExternal('https://discord.gg/bSfMBDk') }
          }
        ]
      }, {
       label: 'Dev',
       submenu: [
         {
           label: 'Toggle Dev Tools',
           click() {
            win.webContents.toggleDevTools();

           }
         }
       ]
      }
    ]

    //Another check made to look if the app is running on MacOS. MacOS is weird, and people can agree
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          {role: 'about'},
          {type: 'separator'},
          {role: 'services', submenu: []},
          {type: 'separator'},
          {role: 'hide'},
          {role: 'hideothers'},
          {role: 'unhide'},
          {type: 'separator'},
          {role: 'quit'}
        ]
      })

      template[2].submenu.push(
        {type: 'separator'},
        {
          label: 'Speech',
          submenu: [ {role: 'startspeaking'}, {role: 'stopspeaking'}
          ]
        }
      )

      template[4].submenu = [ {role: 'close'}, {role: 'minimize'}, {role: 'zoom'}, {type: 'separator'}, {role: 'front'}
      ]
    }
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    win.on('closed', () => {
      win = null
    })
  }

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })

  //This whole function searches for files with these 3 file extentions
  function openFile() {
    const files = dialog.showOpenDialog(win, {
      properties: ['openFile'],
      filters: [{ name: 'Editor', extensions: ['*'] }]
    });
    if (!files) return ; //I made a check so if no files are clicked, nothing happens :)

    const file = files[0];
    const fileContent = fs.readFileSync(file).toString;
    win.loadFile(file);
    fs.writeFile(file, "Hey there!", function(err) {
      if(err) {
          return console.log(err);
      }
    });
}
//End of the Open File Function

//End of code! Thank's for reading! More updates soon!
