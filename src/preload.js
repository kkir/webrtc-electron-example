// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { exposeElectronAPI } from '@electron-toolkit/preload'

exposeElectronAPI()