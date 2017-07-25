import fs from 'fs';
import denodeify from 'denodeify';

const readFile = denodeify(fs.readFile);

export default (file1, file2) => {
  return new Promise(resolve => {
    Promise.all([
      readFile(file1, 'utf-8'),
      readFile(file2, 'utf-8')
    ])
      .then(([file1, file2]) => resolve(file1 === file2))
      .catch(() => resolve(false));
  });
};
