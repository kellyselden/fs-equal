import { expect } from 'chai';
import areDirsEqual from '../../lib/are-dirs-equal';
import { pushd, popd } from 'shelljs';
import path from 'path';

describe('are-dirs-equal', function() {
  before(function() {
    pushd('test/fixtures');
  });

  after(function() {
    popd();
  });

  it('compares identical folders', function() {
    return areDirsEqual(
      'folder1',
      'same-as-folder1'
    ).then(result => {
      expect(result).to.be.true;
    });
  });

  it('compares identical folders reversed', function() {
    return areDirsEqual(
      'same-as-folder1',
      'folder1'
    ).then(result => {
      expect(result).to.be.true;
    });
  });

  it('compares different folders', function() {
    return areDirsEqual(
      'folder1',
      'different-than-folder1'
    ).then(result => {
      expect(result).to.be.false;
    });
  });

  it('compares different folders reversed', function() {
    return areDirsEqual(
      'different-than-folder1',
      'folder1'
    ).then(result => {
      expect(result).to.be.false;
    });
  });

  it('filters folder to turn different into same', function() {
    return areDirsEqual(
      'folder1',
      'different-than-folder1',
      {
        filter(fullPath) {
          let localPath = fullPath.replace(path.join(process.cwd(), path.sep), '').replace(/\\/g, '/');
          switch (localPath) {
            case 'different-than-folder1/a-folder/different-file.txt':
            case 'different-than-folder1/another-folder':
            case 'different-than-folder1/different-file.txt':
              return false;
          }
          return true;
        }
      }
    ).then(result => {
      expect(result).to.be.true;
    });
  });
});
