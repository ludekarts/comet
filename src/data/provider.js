import path from "path";
import {remote} from "electron";
import wrappers from "./wrappers";
import operators from "./operators";
import {jsonLoader, exist} from "../tools/io";

const configUrl = remote.app.getPath('home') + path.sep + 'comet.config.json';

export default (assetName) => new Promise((resolve, reject) => {
  // Try to load app config file.
  exist(configUrl)
    .then(flag => flag && jsonLoader(configUrl))
    .then(config => {
      switch (assetName) {
        case 'wrappers':
          return resolve(config && config.wrappers ? wrappers.concat(config.wrappers) : wrappers);
        case 'operators':
          return resolve(config && config.operators ? operators.concat(config.operators) : operators);
        default:
          reject(new Error('Provider::Asset name not found'))
      }
    });
});
