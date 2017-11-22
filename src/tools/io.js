import fs from "fs";
import {remote} from "electron";

// Load XML file.
export const xmlLoader = (path) => new Promise((resolve, reject) => {

  const load = (url) => {
    if (!url) return resolve(undefined);
    url = url[0];
    fs.readFile(url, 'utf8', (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  };

  path
    ? load([path])
    : remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'XML', extensions: ['xml', 'cnxml'] }]
      }, load);
});


export const jsonLoader = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (error, data) => {
    error ? reject(error) : resolve(JSON.parse(data));
  });
});


export const exist = (path) => new Promise((resolve) => {
  fs.stat(path, (error) => {
    error && console.warn(error);
    resolve(!error);
  });
});

export const saveFile = (content) => {
  remote.dialog.showSaveDialog((filePath) => {
    if (!filePath) return undefined

    fs.writeFile(filePath, content, (err) => {
      if (!err) {
        remote.dialog.showMessageBox({
          title : 'Comet',
          buttons: ['OK'],
          message: 'The file has been saved!'
        });
      } else {
        remote.dialog.showErrorBox('File save error', err.message);
      }
    });
  });
};
