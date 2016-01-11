import { expect } from 'chai';
import areFilesEqual from '../../lib/are-files-equal';

describe('are-files-equal', function() {
  it('compares identical files', function() {
    return areFilesEqual(
      'test/fixtures/folder1/a-file.txt',
      'test/fixtures/same-as-folder1/a-file.txt'
    ).then(result => {
      expect(result).to.be.true;
    });
  });

  it('compares different files', function() {
    return areFilesEqual(
      'test/fixtures/folder1/a-file.txt',
      'test/fixtures/folder1/another-file.txt'
    ).then(result => {
      expect(result).to.be.false;
    });
  });
});
