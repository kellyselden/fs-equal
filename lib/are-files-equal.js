import fs from 'fs';
import denodeify from 'denodeify';

const readFile = denodeify(fs.readFile);

export default function areFilesEqual(file1, file2) {
  return Promise.all([
    readFile(file1, 'utf-8'),
    readFile(file2, 'utf-8')
  ])
    .then(([file1, file2]) => file1 === file2)
    .catch(() => false);
}
