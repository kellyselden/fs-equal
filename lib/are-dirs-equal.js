import fs from 'fs';
import klaw from 'klaw';
import path from 'path';
import areFilesEqual from './are-files-equal';
import denodeify from 'denodeify';
import Promise from 'promise';

const stat = denodeify(fs.stat);
const { all } = Promise;

function trim(basePath, filePath) {
  return filePath.replace(basePath, '');
}

function exists(dir) {
  return new Promise(resolve => {
    stat(dir).then(() => resolve(true)).catch(() => resolve(false));
  });
}

export default (path1, path2) => {
  return new Promise(resolve => {
    path1 = path.resolve(path1);
    path2 = path.resolve(path2);

    let promises = [];
    let checkedPaths = [];
    klaw(path1)
      .on('data', item => {
        let filePath1 = item.path;
        let relativePath = trim(path1, filePath1);
        let filePath2 = path.join(path2, relativePath);
        let promise;
        if (item.stats.isDirectory()) {
          promise = exists(filePath2);
        } else {
          promise = areFilesEqual(filePath1, filePath2);
        }
        promises.push(promise);

        checkedPaths.push(filePath2);
      })
      .on('end', () => {
        all(promises).then(values => {
          let numberOfDifferent = values.filter(value => !value).length;
          if (numberOfDifferent) {
            return resolve(false);
          }

          let doneWalking, isFailed;
          klaw(path2)
            .on('data', ({ path: filePath2 }) => {
              if (doneWalking) {
                return;
              }

              let alreadyChecked = checkedPaths.indexOf(filePath2) !== -1;
              if (alreadyChecked) {
                return;
              }

              doneWalking = true;
              isFailed = true;
              resolve(false);
            })
            .on('end', () => {
              if (!isFailed) {
                resolve(true);
              }
            });
        });
      });
  });
};
