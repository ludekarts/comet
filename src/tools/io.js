import fs from 'fs';
import {remote} from "electron";

// Load XML file.
export const fileLoader = (path) => new Promise((resolve, reject) => {
  
  const load = (url) => {
    if (!url) return reject(new Error('No url'));
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
