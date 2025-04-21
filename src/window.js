import { join } from 'node:path';
import { BrowserWindow } from 'electron';
import { WindowRTCMain } from 'electron-window-rtc';

/**
 * Creates a new Electron BrowserWindow with the specified name and route.
 *
 * @param {string} name - The unique name to register the window with.
 * @param {string} route - The route or hash to load in the window.
 * @returns {BrowserWindow} The created BrowserWindow instance.
 */
export const createWindow = (name, route) => {
	let win = new BrowserWindow({
		width: 400,
		height: 434,
		minWidth: 400,
		minHeight: 434,
		show: false,
		autoHideMenuBar: false,
		webPreferences: {
			contextIsolation: true,
			preload: join(__dirname, './preload.js'),
			sandbox: false,
			backgroundThrottling: false,
		},
	});

	WindowRTCMain.register(name, win);

	win.on('ready-to-show', () => {
		win.show();
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		win.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}#${route}`);
	} else {
		win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`), { hash: route.replace('/', '') });
	}

	win.webContents.openDevTools();

	return win;
};