import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');

function createWindow() {

    win = new BrowserWindow({
        minWidth: 1250,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            devTools: serve ? true : false
        },
    });


    if (serve) {
        // get dynamic version from localhost:4200
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
        win.loadURL('http://localhost:4200');

        // The following is optional and will open the DevTools:
        win.webContents.openDevTools();
    } else {
        win.setMenu(null);
        // load the dist folder from Angular
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, `/dist/index.html`),
                protocol: 'file:',
                slashes: true,
                //icon: path.join(__dirname, 'assets/icons/favicon.png')
            })
        );
    }
    win.maximize();

    win.on('closed', () => {
        win = null;
    });
}

try {

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    // initialize the app's main window
    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });

} catch (e) {
    // Catch Error
    // throw e;
}
