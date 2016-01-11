import { expect } from 'chai';
import areDirsEqual from '../../lib/are-dirs-equal';

describe('are-dirs-equal', function() {
  it('compares identical folders', function() {
    return areDirsEqual(
      'test/fixtures/folder1',
      'test/fixtures/same-as-folder1'
    ).then(result => {
      expect(result).to.be.true;
    });
  });

  it('compares identical folders reversed', function() {
    return areDirsEqual(
      'test/fixtures/same-as-folder1',
      'test/fixtures/folder1'
    ).then(result => {
      expect(result).to.be.true;
    });
  });

  it('compares different folders', function() {
    return areDirsEqual(
      'test/fixtures/folder1',
      'test/fixtures/different-than-folder1'
    ).then(result => {
      expect(result).to.be.false;
    });
  });

  it('compares different folders reversed', function() {
    return areDirsEqual(
      'test/fixtures/different-than-folder1',
      'test/fixtures/folder1'
    ).then(result => {
      expect(result).to.be.false;
    });
  });
});
