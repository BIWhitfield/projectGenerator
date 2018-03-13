const fs = require('fs');
const path = require('path');

module.exports = {
  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
};
