import { expect } from 'chai';
import areDirsEqual from '../../lib/are-dirs-equal';
import { pushd, popd } from 'shelljs';

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
});
