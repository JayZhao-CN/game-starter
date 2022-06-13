import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: { ...ipcRenderer, on: ipcRenderer.on }
});
