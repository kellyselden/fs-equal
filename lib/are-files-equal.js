import fs from 'fs';
import denodeify from 'denodeify';
import Promise from 'promise';

const readFile = denodeify(fs.readFile);
const { all } = Promise;

export default (file1, file2) => {
  return new Promise(resolve => {
    all([
      readFile(file1, 'utf-8'),
      readFile(file2, 'utf-8')
    ])
      .then(([file1, file2]) => resolve(file1 === file2))
      .catch(() => resolve(false));
  });
};
